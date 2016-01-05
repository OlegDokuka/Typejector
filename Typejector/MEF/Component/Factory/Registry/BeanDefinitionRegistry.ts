module Typejector.Component.Factory.Registry {
    import BeanDefinition = Config.BeanDefinition;

    export interface BeanDefinitionRegistry {
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        getBeanDefinitionNames(): string[];
    }
} 