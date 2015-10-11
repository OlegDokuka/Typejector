namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export abstract class FactoryBeanRegistrySupport extends DefaultBeanDefinitionRegistry implements Registry.FactoryBeanRegistry {
        private registeredFactoriesBeans: { [key: string]: ObjectFactory<any> } = {};


        registerFactory<T>(beanName: string, factory: ObjectFactory<T>): void;
        registerFactory<T>(clazz: Class, factory: ObjectFactory<T>): void;
        registerFactory<T>(item: Class | string, factory: ObjectFactory<T>): void {
            let name: string;

            if (typeof item === typeof "") {
                name = <string>item;
            }
            else {
                name = BeanNameGenerator.generateBeanName(<Class>item);
            }

            this.registeredFactoriesBeans[name] = factory;
        }

        getFactory<T>(beanName: string): ObjectFactory<T>;
        getFactory<T>(clazz: Class): ObjectFactory<T>;
        getFactory<T>(item: Class | string): ObjectFactory<T> {
            let beanDefinition: BeanDefinition;

            if (typeof item === typeof "") {
                beanDefinition = this.getBeanDefinition(<string>item);
            }
            else {
                beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(<Class>item));
            }


            if (beanDefinition.factoryMethodName && beanDefinition.factoryMethodName in this.registeredFactoriesBeans) {
                return this.registeredFactoriesBeans[beanDefinition.factoryMethodName];
            }

            return this.doGetFactory<T>(beanDefinition);
        }

        protected abstract doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T>;
    }
}