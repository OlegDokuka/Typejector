namespace Typejector.Component.Factory {
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;

    export abstract class BeanDefinitionPostProcessor {
        abstract postProcessBeanDefinition(beanDefinitionRegistry: BeanDefinitionRegistry): void;
    }
} 