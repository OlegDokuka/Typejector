module Typejector.Component.Factory.Registry {
    import BeanDefinition = Config.BeanDefinition;
    import Class = Typejector.Type.Class;

    export interface BeanDefinitionRegistry {
        containsBeanDefinition(beanClass: Class);
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanClass: Class): BeanDefinition;
        getBeanDefinition(beanName: string): BeanDefinition;
        getBeanDefinitionNames(): string[];
    }
} 