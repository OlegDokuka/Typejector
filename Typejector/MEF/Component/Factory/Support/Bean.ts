module Typejector.Component.Factory.Support {
    import Class = Type.Class;

    export class Bean implements Config.BeanDefinition {
        clazz: Class;

        annotations: Set<Function> = new Set();
        name: string;
        scope: string = "";
        factoryMethodName: string;

        constructorArguments: Array<Config.TypeDescriptor> = [];
        properties: Set<Config.PropertyDescriptor> = new Set();
        methods: Set<Config.MethodDescriptor> = new Set();
        postConstructors: Array<Config.MethodDescriptor> = [];
    }
} 