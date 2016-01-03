module Typejector.Component.Factory.Config {
    export interface BeanDefinition extends ResolveDefinition, AnnotatedObject {
        name: string;
        scope: string;
        factoryMethodName: string;
        initMethodName: string;
        isPrimary: boolean;
        isAbstract: boolean;
    }
} 