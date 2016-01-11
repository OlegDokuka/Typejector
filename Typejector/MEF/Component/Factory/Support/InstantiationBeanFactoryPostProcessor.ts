namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Util.Collections;
    import factoryMethod = Annotation.factoryMethod;

    export class InstantiationBeanFactoryPostProcessor extends BeanFactoryPostProcessor {
        //private configurableListableBeanFactory: ConfigurableListableBeanFactory;

        postProcessBeanFactory(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {

            configurableListableBeanFactory.getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name))
                .filter(beanDefinition=> BeanUtils.isConfig(beanDefinition) || BeanUtils.isSingleton(beanDefinition))
                .forEach(beanDefinition=> this.instantiateBean(beanDefinition));
        }

        private instantiateBean(beanDefinition: BeanDefinition) {
               
        }
    }
} 