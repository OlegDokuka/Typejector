module Typejector.Component.Factory.Support {
    import Class = Typejector.Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    import Collections = Typejector.Util.Collections;
    import inject = Annotation.inject;
    import postConstructor = Annotation.postConstructor;
    import ObjectFactory = Factory.ObjectFactory;
    import Scope = Factory.Config.Scope;
    //todo: singleton not working. Rethink instance creation  flow
    export abstract class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory implements AutowireCapableBeanFactory {
        createBean<T>(clazz: Class): T {
            assert(clazz);

            const beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(clazz));

            return this.doCreateBean(beanDefinition);
        }
        //todo provide annotations analysing 
        
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

                    instance = this.applyBeanPostProcessorsBeforeInitialization(instance, beanDefinition);

                    instance = this.initializeBean(instance, beanDefinition);

                    instance = this.applyBeanPostProcessorsAfterInitialization(instance, beanDefinition);

                    return instance;
                }
            });

            return bean;
        }

        initializeBean<T>(instance: T, beanDefinition: BeanDefinition): T {
            assert(instance);
            assert(beanDefinition);

            beanDefinition.properties.forEach(property=> instance[property.name] = this.resolveDependency(property.clazz));


            Collections.filter(beanDefinition.methods, (it) => Collections.contains(it.annotations, inject)).forEach((method) => {
                const args = [];

                for (let argType of method.arguments) {
                    args.push(this.resolveDependency(argType));
                }

                instance[method.name].apply(instance, args);
            });

            return instance;
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

        resolveDependency(typeDescriptor: TypeDescriptor): any {
            assert(typeDescriptor);

            return this.doResolveDependency(typeDescriptor);
        }

        protected abstract doResolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}