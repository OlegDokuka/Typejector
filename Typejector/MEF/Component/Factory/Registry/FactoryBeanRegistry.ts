namespace Typejector.Component.Factory.Registry {

    export interface FactoryBeanRegistry {
        registerFactory<T>(beanName: string, factory: ObjectFactory<T>): void;
        getFactory<T>(beanName: string): ObjectFactory<T>;
    }
} 