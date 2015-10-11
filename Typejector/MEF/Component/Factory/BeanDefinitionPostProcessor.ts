namespace Typejector.Component.Factory {
    import BeanDefinition = Config.BeanDefinition;

    export abstract class BeanDefinitionPostProcessor {
        abstract postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
    }
} 