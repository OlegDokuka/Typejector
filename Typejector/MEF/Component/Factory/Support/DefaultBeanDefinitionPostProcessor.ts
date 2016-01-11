namespace Typejector.Component.Factory.Support {
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
    import lazy = Typejector.Annotation.lazy;
    import factoryMethod = Typejector.Annotation.factoryMethod;

    //todo: provide dependencOn seeking
    export class DefaultBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinitionRegistry: ConfigurableListableBeanFactory): void {
            beanDefinitionRegistry
                .getBeanDefinitionNames()
                .map(name=> beanDefinitionRegistry.getBeanDefinition(name))
                .forEach(bean=> {
                    const clazz = bean.clazz;
                    const parentClass = Class.getParentOf(clazz);

                    if (parentClass) {
                        bean.parent = BeanNameGenerator.generateBeanName(parentClass);
                    }

                    this.processClassAnnotations(bean);

                    Object.keys(clazz.prototype).forEach(it=> {
                        const property = clazz.prototype[it];

                        if (property != undefined && Class.getParentOf(property) === undefined) {
                            this.processMethods(bean, it);
                        }
                        else {
                            this.processProperties(bean, it);
                        }
                    });

                    this.processDependencies(bean, beanDefinitionRegistry);
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
                } else if (key == lazy) {
                    bean.isLazyInit = true;
                }
            });
        }

        private processMethods(bean: BeanDefinition, propKey: string) {
            const clazz = bean.clazz;
            const annotations = Collections.map(Annotations.get(clazz.prototype, propKey), () => new Set(), (value, key) => key, (set, item) => set.add(item));
            const containsPostConstructorAnnotation = Collections.contains(annotations, postConstructor);

            if (Collections.contains(annotations, factoryMethod) || Collections.contains(annotations, inject) || containsPostConstructorAnnotation) {
                const descriptor: MethodDescriptor = {
                    name: propKey,
                    arguments: Reflection.getParamTypes(clazz.prototype, propKey).map((type, index) => this.buildTypeDescriptor(clazz, type, propKey, index)),
                    returnType: this.buildTypeDescriptor(clazz, Reflection.getReturnType(clazz.prototype, propKey), propKey),
                    annotations: annotations
                };

                if (containsPostConstructorAnnotation) {
                    bean.initMethodName = propKey;
                }

                bean.methods.add(descriptor);
            }
        }

        private processProperties(bean: BeanDefinition, propKey: string) {
            const clazz = bean.clazz;
            const annotations = Collections.map(Annotations.get(clazz.prototype, propKey), () => new Set(), (value, key) => key, (set, item) => set.add(item));

            if (Collections.contains(annotations, inject)) {
                const descriptor: PropertyDescriptor = {
                    name: propKey,
                    clazz: this.buildTypeDescriptor(clazz, Reflection.getType(clazz.prototype, propKey), propKey),
                    annotations: annotations
                };

                bean.properties.add(descriptor);
            }
        }

        private processDependencies(bean: BeanDefinition, beanFactory: ConfigurableListableBeanFactory) {
            const dependencies = new Set();
            const addToDependencies = (typeDescriptor: TypeDescriptor) => Collections.isCollection(typeDescriptor.clazz) ?
                typeDescriptor.genericTypes.forEach(type=> dependencies.add(type)) :
                dependencies.add(typeDescriptor.clazz);

            bean.constructorArguments.forEach(addToDependencies);

            bean.methods.forEach(methodDesc=> methodDesc.arguments.forEach(addToDependencies));

            bean.properties.forEach(propertyDesc=> addToDependencies(propertyDesc.clazz));

            bean.dependsOn = Collections.flatMap(
                dependencies,
                () => new Set(),
                val=> beanFactory.getBeanNamesOfType(val),
                (collections, item) => collections.add(item)
            );
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