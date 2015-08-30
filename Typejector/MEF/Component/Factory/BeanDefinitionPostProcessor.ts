namespace Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export interface BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
    }
} 