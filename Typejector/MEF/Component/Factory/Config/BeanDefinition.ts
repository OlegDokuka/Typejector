module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export interface BeanDefinition extends ResolveDefinition {
        metadata: Array<Metadata.Metadata>;
        name: string;
        scopeNames: string[];
    }
} 