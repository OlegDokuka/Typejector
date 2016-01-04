module Typejector.Component.Factory.Config {
    export interface BeanDefinition extends ResolveDefinition, AnnotatedObject {
        name: string;
        parent: string;
        scope: string;
        factoryMethodName: string;
        initMethodName: string;
        isPrimary: boolean;
        isAbstract: boolean;
        isLazyInit: boolean;
        dependsOn: Set<string>;
    }
} 