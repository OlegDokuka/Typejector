﻿namespace Typejector.Component.Factory.Config {
    import Class = Type.Class;
    
    export interface ResolveDefinition {
        clazz: Class;
        constructorArguments: Array<TypeDescriptor>;
        properties: Set<PropertyDescriptor>;
        methods: Set<MethodDescriptor>;
    }
} 