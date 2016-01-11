namespace Typejector.Component.Factory {

    export abstract class BeanDefinitionPostProcessor {
        abstract postProcessBeanDefinition(beanFactory: ConfigurableListableBeanFactory): void;
    }
} 