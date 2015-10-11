namespace Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export abstract class BeanPostProcessor {
        abstract postProcessAfterInitialization<T extends Object>(bean: T, beanDefinititon: BeanDefinition): T;
        abstract postProcessBeforeInitialization<T extends Object>(bean: T, beanDefinititon: BeanDefinition): T;
    }
} 