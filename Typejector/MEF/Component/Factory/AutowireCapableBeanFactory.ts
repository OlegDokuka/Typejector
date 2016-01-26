namespace Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import DependencyDescriptor = Config.DependencyDescriptor;

    export interface AutowireCapableBeanFactory extends BeanFactory {
        createBean<T>(clazz: Class): T;

        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T;

        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T

        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;

        resolveDependency(typeDescriptor: DependencyDescriptor): any;
    }
} 