namespace Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export interface BeanPostProcessor {
        postProcessAfterInitialization(bean: any, beanDefinititon: BeanDefinition): any;
        postProcessBeforeInitialization(bean: any, beanDefinititon: BeanDefinition): any;
    }
} 