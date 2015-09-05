module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    export class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory implements AutowireCapableBeanFactory {
        createBean<T>(clazz: Class): T {
            assert(clazz);

            let beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(clazz));

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
            let resolvedValues: any[];

            resolvedValues = beanDefinition.constructorArguments
                .map((td) => this.resolveDependency(td));

            return BeanUtils.newInstance(beanDefinition.clazz, resolvedValues);
        }

        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T {
            assert(instance);
            assert(beanDefinititon);


            //let superBeanDefinition = this.getBeanDefinition(beanDefinititon.clazz

            for (let property of beanDefinititon.properties) {
                instance[property.name] = this.resolveDependency(property.clazz);
            }
            for (let method of beanDefinititon.methods) {
                let args = [];

                for (let argType of method.arguments) {
                    args.push(this.resolveDependency(argType));
                }

                instance[method.name].apply(instance, args);
            }

            return instance;
        }

        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T {
           	let result = existingBean;


            assert(existingBean);
            assert(beanDefinititon);


            for (let beanProcessor of this.getBeanPostProcessors()) {
                result = beanProcessor.postProcessBeforeInitialization(result, beanDefinititon);

                if (result == null) {
                    return result;
                }
            }
            return result;
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
                    return this.createBean<T>(beanDefinition.clazz);
                }
            };
        }

        resolveDependency(typeDescriptor: TypeDescriptor): any {
            assert(typeDescriptor);

            return this.doResolveDependency(typeDescriptor);
        }

        protected doResolveDependency(typeDescriptor: TypeDescriptor): any {
            throw new Error("Method not implement");
        }
    }
}