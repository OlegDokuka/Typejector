﻿module Typejector.Component.Factory.Support {
    import Class = Typejector.Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import DependencyDescriptor = Config.DependencyDescriptor;
    import MethodArgumentDescriptor = Config.MethodArgumentDescriptor;
    import PropertyDescriptor = Config.PropertyDescriptor;
    import AnnotatedObject = Config.AnnotatedObject;
    import PropertyValue = Config.PropertyValue;
    import Collections = Typejector.Util.Collections;
    import postConstructor = Annotation.postConstructor;
    import ObjectFactory = Factory.ObjectFactory;
    import Scope = Factory.Config.Scope;
    import Annotations = Typejector.Annotation.Annotations;
    import inject = Annotation.inject;
    import lazy = Annotation.lazy;

    export abstract class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory implements AutowireCapableBeanFactory {
        createBean<T>(clazz: Class): T {
            assert(clazz);

            const beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(clazz));

            return this.doCreateBean(beanDefinition);
        }

        protected doCreateBean(beanDefinition: BeanDefinition) {
            let bean: any,
                scope: Scope = this.getRegisteredScope(beanDefinition.scope),
                beanObjectFactory = this.getFactory(beanDefinition.name);

            bean = scope.get(beanDefinition.name, {
                getObject: () => {
                    let instance = beanObjectFactory.getObject();

                    if (instance == undefined) {
                        return instance;
                    }

                    instance = this.initializeBean(instance, beanDefinition);

                    return instance;
                }
            });

            return bean;
        }

        initializeBean<T>(instance: T, beanDefinition: BeanDefinition): T {
            assert(instance);
            assert(beanDefinition);

            instance = this.applyBeanPostProcessorsBeforeInitialization(instance, beanDefinition);

            this.doResolvePropertyValues(beanDefinition, Collections.toArray(beanDefinition.properties));
            //todo inject all autowired values

            Collections
                .filter(beanDefinition.methods, (it) => Collections.contains(it.annotations, inject))
                .forEach((method) => {
                    this.doResolvePropertyValues(beanDefinition, method.arguments);
                    //todo get all properties and then invoke method 
                });

            instance = this.applyBeanPostProcessorsAfterInitialization(instance, beanDefinition);

            return instance;
        }

        protected doResolvePropertyValues(beanDefinition: BeanDefinition, params: PropertyDecorator[] | MethodArgumentDescriptor[]) {
            const properties: PropertyValue[] = BeanUtils.createPropetyValuesFrom(beanDefinition, ...<any>params);
            const processed = this.getBeanPostProcessors()
                .filter(it=> it instanceof BeanPropertiesPostProcessor)
                .every(it=> (it as BeanPropertiesPostProcessor).processPropertyValues(...properties));

            if (!processed) {
                throw new Error(`Propety values processing fails on bean name "${beanDefinition.name}"`)
            }

            return properties;
        }

        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T {
            let instance = existingBean;


            assert(existingBean);
            assert(beanDefinititon);


            for (let beanProcessor of this.getBeanPostProcessors()) {
                instance = beanProcessor.postProcessBeforeInitialization(instance, beanDefinititon);

                if (instance == null) {
                    return instance;
                }
            }

            return instance;
        }

        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T {
            let instance = existingBean;


            assert(existingBean);
            assert(beanDefinititon);


            for (let beanProcessor of this.getBeanPostProcessors()) {
                instance = beanProcessor.postProcessAfterInitialization(instance, beanDefinititon);

                if (instance == undefined) {
                    return instance;
                }
            }


            Collections.filter(beanDefinititon.methods, (it) => Collections.contains(it.annotations, postConstructor)).forEach((method) => {
                const args = [];

                for (let argType of method.arguments) {
                    args.push(this.resolveDependency(argType));
                }

                instance[method.name].apply(instance, args);
            });

            return instance;
        }

        protected doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T> {
            return {
                getObject: () => {
                    const resolvedValues = beanDefinition.constructorArguments
                        .map((td) => {
                            assert(td);

                            return this.resolveDependency(td);
                        });

                    return BeanUtils.newInstance(beanDefinition.clazz, ...resolvedValues);
                }
            };
        }

        resolveDependency(typeDescriptor: DependencyDescriptor): any {
            assert(typeDescriptor);

            return this.doResolveDependency(typeDescriptor);
        }

        protected abstract doResolveDependency(typeDescriptor: DependencyDescriptor): any;
    }
}