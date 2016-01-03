module Typejector.Component.Factory.Support {
    import Class = Type.Class;

    export class Bean implements Config.BeanDefinition {
        clazz: Class;

        annotations: Set<Function> = new Set();

        name: string;
        scope: string = "prototype";
        factoryMethodName: string;
        initMethodName: string;

        isPrimary: boolean = false;
        isAbstract: boolean = false;

        constructorArguments: Array<Config.TypeDescriptor> = [];
        properties: Set<Config.PropertyDescriptor> = new Set();
        methods: Set<Config.MethodDescriptor> = new Set();
    }
} 