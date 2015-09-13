module Typejector.Component.Factory.Support {
    import Class = Type.Class;

    export class Bean implements Config.BeanDefinition {
        clazz: Class;
        metadata: Array<Metadata.Metadata> = [];

        name: string;
        scopeNames: string[] = [];

        constructorArguments: Array<Config.TypeDescriptor> = [];
        properties: Array<Config.PropertyDescriptor> = [];
        methods: Array<Config.MethodDescriptor> = [];
        postConstructors: Array<Config.MethodDescriptor> = [];

        public hasMetadata(metadata: { new (): Metadata.Metadata }): boolean {
            return this.metadata.some((val) => val instanceof metadata);
        }
    }
} 