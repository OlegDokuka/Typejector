namespace Typejector.Component.Factory {
    import Class = Type.Class;

    export interface BeanFactory {
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
    }
} 