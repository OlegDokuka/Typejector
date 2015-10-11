module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    import ArrayUtils = Util.ArrayUtils;
    import inject = Annotation.inject;
    import postConstructor = Annotation.postConstructor;
    import ObjectFactory = Factory.ObjectFactory;
    import Scope = Factory.Config.Scope;

    export abstract class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory implements AutowireCapableBeanFactory {
        createBean<T>(clazz: Class): T {
            assert(clazz);

            const  beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(clazz));

            return this.doCreateBean(beanDefinition);
        }

        protected doCreateBean(beanDefinition: BeanDefinition) {
            let bean: any;

            bean = this.doCreateObject(beanDefinition);

            bean = this.applyBeanPostProcessorsBeforeInitialization(bean, beanDefinition);

            bean = this.initializeBean(bean, beanDefinition);

            bean = this.applyBeanPostProcessorsAfterInitialization(bean, beanDefinition);

            return bean;
        }

        protected doCreateObject(beanDefinition: BeanDefinition) {
            let bean:any,
                scopes: Scope[],
                beanObjectFactory = this.getFactory(beanDefinition.name);

            scopes = beanDefinition.scopeNames.map(scopeName=> this.getRegisteredScope(scopeName));

            for (let scope of scopes) {
                bean = scope.get(beanDefinition.name, beanObjectFactory);

                if (bean != undefined) {
                    break;
                }
            }

            return bean;
        }

        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T {
            assert(instance);
            assert(beanDefinititon);

            for (let property of beanDefinititon.properties) {
                instance[property.name] = this.resolveDependency(property.clazz);
            }

            beanDefinititon.methods.filter((it) => ArrayUtils.contains(it.annotations, inject)).forEach((method) => {
                const  args = [];

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
            
            beanDefinititon.methods.filter((it) => ArrayUtils.contains(it.annotations, postConstructor)).forEach((method) => {
                const args = [];

                for (let argType of method.arguments) {
                    args.push(this.resolveDependency(argType));
                }

                instance[method.name].apply(instance, args);
            });

            return instance;
        }

        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T {
            let result = existingBean;


            assert(existingBean);
            assert(beanDefinititon);


            for (let beanProcessor of this.getBeanPostProcessors()) {
                result = beanProcessor.postProcessAfterInitialization(result, beanDefinititon);

                if (result == null) {
                    return result;
                }
            }
            return result;
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