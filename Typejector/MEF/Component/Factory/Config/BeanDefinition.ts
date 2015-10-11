module Typejector.Component.Factory.Config {
    export interface BeanDefinition extends ResolveDefinition, AnnotatedObject {
        name: string;
        scopeNames: string[];
        factoryMethodName: string;
    }
} 