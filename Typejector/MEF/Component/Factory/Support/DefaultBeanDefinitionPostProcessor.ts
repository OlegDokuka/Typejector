namespace Typejector.Component.Factory.Support {
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;
    import Class = Typejector.Type.Class;
    import Collections = Typejector.Util.Collections;
    import MethodDescriptor = Typejector.Component.Factory.Config.MethodDescriptor;
    import PropertyDescriptor = Typejector.Component.Factory.Config.PropertyDescriptor;
    import TypeDescriptor = Typejector.Component.Factory.Config.TypeDescriptor;
    import BeanNameGenerator = Typejector.Component.Factory.Support.BeanNameGenerator;
    import Reflection = Typejector.Util.Reflection;
    import Annotations = Typejector.Annotation.Annotations;
    import generic = Typejector.Annotation.generic;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import postConstructor = Typejector.Annotation.postConstructor;
    import singleton = Typejector.Annotation.singleton;
    import primary = Typejector.Annotation.primary;
    import abstract = Typejector.Annotation.abstract;
    import inject = Typejector.Annotation.inject;
//todo: provide initializing of parent
//todo: provide Lazy annotation 
//todo: provide dependencOn seeking
    export class DefaultBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinitionRegistry: BeanDefinitionRegistry): void {
            beanDefinitionRegistry
                .getBeanDefinitionNames()
                .map(name=> beanDefinitionRegistry.getBeanDefinition(name))
                .forEach(bean=> {
                    const clazz = bean.clazz;

                    this.processClassAnnotations(bean)

                    Object.keys(clazz).forEach(it=> {
                        const property = clazz.prototype[it];

                        if (property === Function) {
                            this.processMethods(bean, it);
                        }
                        else {
                            this.processProperties(bean, it);
                        }
                    });
                });
        }

        private processClassAnnotations(bean: BeanDefinition) {
            const clazz = bean.clazz;
            const annotations = Annotations.get(clazz);

            annotations.forEach((val, key) => {
                bean.annotations.add(key);
                if (key == singleton) {
                    bean.scope = "singleton";
                } else if (key == primary) {
                    bean.isPrimary = true;
                } else if (key == abstract) {
                    bean.isAbstract = true;
                }
            });
        }

        private processMethods(bean: BeanDefinition, propKey: string) {
            const clazz = bean.clazz;
            const annotations = Collections.map(Annotations.get(clazz, propKey), () => new Set(), (value, key) => key, (set, item) => set.add(item));
            const containsPostContructorAnnotation = Collections.contains(annotations, postConstructor);

            if (Collections.contains(annotations, inject) || containsPostContructorAnnotation) {
                const descriptor: MethodDescriptor = {
                    name: propKey,
                    arguments: Reflection.getParamTypes(clazz.prototype, propKey).map((type, index) => this.buildTypeDescriptor(clazz, type, propKey, index)),
                    returnType: this.buildTypeDescriptor(clazz, Reflection.getReturnType(clazz.prototype, propKey), propKey),
                    annotations: annotations
                };

                if (containsPostContructorAnnotation) {
                    bean.initMethodName = propKey;
                }

                bean.methods.add(descriptor);
            }
        }

        private processProperties(bean: BeanDefinition, propKey: string) {
            const clazz = bean.clazz;
            const annotations = Collections.map(Annotations.get(clazz, propKey), () => new Set(), (value, key) => key, (set, item) => set.add(item));

            if (Collections.contains(annotations, inject)) {
                const descriptor: PropertyDescriptor = {
                    name: propKey,
                    clazz: this.buildTypeDescriptor(clazz, Reflection.getType(clazz, propKey), propKey),
                    annotations: annotations
                };

                bean.properties.add(descriptor);
            }
        }

        private buildTypeDescriptor(src: Class, propType: Class, propKey: string | symbol, index?: number) {
            const paramDescriptor = new TypeDescriptor();

            paramDescriptor.clazz = propType;
            
            if (Collections.isCollection(propType)) {
                paramDescriptor.genericTypes = Annotations.get(src.prototype, propKey, index).get(generic)
            }

            return paramDescriptor;
        }
    }
} 