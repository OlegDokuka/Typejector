namespace Typejector.Component.Factory.Support {
    import BeanPropertiesPostProcessor = Typejector.Component.Factory.BeanPropertiesPostProcessor;
    import Class = Typejector.Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import PropertyValue = Typejector.Component.Factory.Config.PropertyValue;
    import Collections = Typejector.Util.Collections;

    export class InitializeBeanPostProcessor extends BeanPropertiesPostProcessor {

        constructor(private beanFactory: ConfigurableListableBeanFactory) {
            super();
        }

        public processPropertyValues(...propertyValues: PropertyValue[]): boolean {
            propertyValues.forEach((val, index) => {
                try {
                    val.instanceGetter = { getObject: () => this.beanFactory.resolveDependency(val.dependency) }
                } catch (e) {

                }
            });

            return true;
        }

        public postProcessAfterInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T {
            return bean;
        }


        public postProcessBeforeInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T {
            return bean;
        }
    }
} 