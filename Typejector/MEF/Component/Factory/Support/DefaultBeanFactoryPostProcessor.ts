﻿namespace Typejector.Component.Factory.Support {
    import Class = Typejector.Type.Class;
    import Collections = Typejector.Util.Collections;
    import MethodDescriptor = Typejector.Component.Factory.Config.MethodDescriptor;
    import MethodArgumentDescriptor = Typejector.Component.Factory.Config.MethodArgumentDescriptor;
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

    export class DefaultBeanFactoryPostProcessor extends BeanFactoryPostProcessor {
        postProcessBeanFactory(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {
            configurableListableBeanFactory
                .getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name))
                .forEach(beanDefinition=> this.processBeanDefinition(beanDefinition, configurableListableBeanFactory));
        }

        protected processBeanDefinition(beanDefinition: BeanDefinition, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const clazz = beanDefinition.clazz;
            const parentClass = Class.getParentOf(clazz);

            if (parentClass) {
                beanDefinition.parent = BeanNameGenerator.generateBeanName(parentClass);
            }

            this.processClassAnnotations(beanDefinition);

            Object.keys(clazz.prototype).forEach(it=> {
                const property = clazz.prototype[it];

                if (property != undefined && Class.getParentOf(property) === undefined) {
                    this.processMethods(beanDefinition, it);
                }
                else {
                    this.processProperties(beanDefinition, it);
                }
            });
        }

        private processClassAnnotations(bean: BeanDefinition) {
            const clazz = bean.clazz;
            const annotations = Annotations.get(clazz);

            annotations.forEach((val, key) => {
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

            bean.annotations = annotations;
        }

        private processMethods(bean: BeanDefinition, propKey: string) {
            const clazz = bean.clazz;
            const annotations = Annotations.get(clazz.prototype, propKey);
            const containsPostConstructorAnnotation = Collections.contains(annotations, postConstructor);

            if (Collections.contains(annotations, factoryMethod) || Collections.contains(annotations, inject) || containsPostConstructorAnnotation) {
                const descriptor: MethodDescriptor = new MethodDescriptor();

                descriptor.name = propKey;
                descriptor.returnType = this.buildTypeDescriptor(clazz, Reflection.getReturnType(clazz.prototype, propKey), propKey);
                descriptor.annotations = annotations;
                descriptor.arguments = this.processMethodsArguments(bean, descriptor, Reflection.getParamTypes(clazz.prototype, propKey));

                if (containsPostConstructorAnnotation) {
                    bean.initMethodName = propKey;
                }

                bean.methods.add(descriptor);
            }
        }

        private processMethodsArguments(bean: BeanDefinition, methodDescriptor: MethodDescriptor, parametrsClasses: Class[]) {
            const result: MethodArgumentDescriptor[] = parametrsClasses
                .map((pc, index) => this.buildTypeDescriptor(bean.clazz, pc, methodDescriptor.name, index))
                .map((td, index) => {
                    const descriptor: MethodArgumentDescriptor = new MethodArgumentDescriptor();

                    descriptor.methodDescriptor = methodDescriptor;
                    descriptor.type = td;
                    descriptor.index = index;
                    descriptor.annotations = Annotations.get(bean.clazz.prototype, methodDescriptor.name, index);

                    return descriptor;
                });

            return result
        }

        private processProperties(bean: BeanDefinition, propKey: string) {
            const clazz = bean.clazz;
            const annotations = Annotations.get(clazz.prototype, propKey);

            if (Collections.contains(annotations, inject)) {
                const descriptor: PropertyDescriptor = new PropertyDescriptor();

                descriptor.name = propKey;
                descriptor.type = this.buildTypeDescriptor(clazz, Reflection.getType(clazz.prototype, propKey), propKey);
                descriptor.annotations = annotations;

                bean.properties.add(descriptor);
            }
        }

        private buildTypeDescriptor(src: Class, propType: Class, propKey: string | symbol, index?: number): TypeDescriptor {
            const paramDescriptor = new TypeDescriptor();

            paramDescriptor.clazz = propType;

            if (Collections.isCollection(propType)) {
                paramDescriptor.genericTypes = Annotations.get(src.prototype, propKey, index).get(generic)
            }

            return paramDescriptor;
        }
    }
} 