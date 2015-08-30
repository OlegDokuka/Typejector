namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export class FactoryBeanRegistrySupport extends DefaultBeanDefinitionRegistry {

        getFactory<T>(beanName: string): ObjectFactory<T>
        getFactory<T>(clazz: Class): ObjectFactory<T>
        getFactory<T>(item: Class|string): ObjectFactory<T> {
            let beanDefinition: BeanDefinition;

            if (typeof item === typeof "") {
                beanDefinition = this.getBeanDefinition(<string>item);
            }
            else {
                beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(<Class>item));
            }

            return this.doGetFactory<T>(beanDefinition);
        }

        protected doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T> {
            throw new Error("Method not implement");
        }
    }
}