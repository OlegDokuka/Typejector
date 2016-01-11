namespace Typejector.Component.Factory {

    export abstract class BeanFactoryPostProcessor {
        abstract postProcessBeanFactory(beanFactory: ConfigurableListableBeanFactory): void;
    }
} 