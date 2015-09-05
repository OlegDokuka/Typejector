namespace Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;

    export interface BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinition: BeanDefinition, beanDefinitionRegistry: BeanDefinitionRegistry): void;
    }
} 