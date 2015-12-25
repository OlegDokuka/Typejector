﻿module Typejector.Component.Factory.Support {
    import Class = Type.Class;

    export class Bean implements Config.BeanDefinition {
        clazz: Class;

        annotations: Function[] = [];
        name: string;
        scope: string = "";
        factoryMethodName: string;

        constructorArguments: Array<Config.TypeDescriptor> = [];
        properties: Array<Config.PropertyDescriptor> = [];
        methods: Array<Config.MethodDescriptor> = [];
        postConstructors: Array<Config.MethodDescriptor> = [];

        public hasAnnotation(annotation: Function): boolean {
            return this.annotations.some((val) => val === annotation);
        }
    }
} 