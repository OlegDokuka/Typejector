/// <reference path="../../typings/mocha/mocha.d.ts" />
declare module Typejector.Type {
    type Class = {
        new (...args: any[]): any;
        prototype: any;
    };
    namespace Class {
        function register(clazz: Class): void;
        function classes(): Class[];
        function isClass(val: any): val is Class;
        function getParentOf(src: any): Class;
        function isAssignable(clazz: Class, classFrom: Class): boolean;
    }
}
declare namespace Typejector.Util {
    class Collections {
        static remove<T>(src: Array<T>, element: T): boolean;
        static contains<T>(src: {
            forEach(callbackfn: (value: T, index: T, collection: any) => void, thisArg?: any);
        }, element: T): boolean;
        static add<T, U>(src: any, key: T, value: U): void;
        static map<T, U, K>(src: {
            forEach(callbackfn: (value: T, index: T, collection: any) => void, thisArg?: any);
        }, supplier: () => K, transformer: (value: T, index: any) => U, accumulator: (collection: K, item: U) => void): K;
        static filter<T>(src: {
            forEach(callbackfn: (value: T, index: T, collection: any) => void, thisArg?: any);
        }, filter: (val: T, key: any) => boolean): any;
        static keys<T>(src: Map<T, any>): T[];
        static isCollection(obj: any): boolean;
    }
}
declare module Typejector.Event.Interface {
    interface ICallback<ArgType> {
        (arg: ArgType, context?: any): any;
    }
    interface ICallbackDesc<ArgType> {
        Callback: ICallback<ArgType>;
        Subscriber: any;
    }
    interface ISubscription {
        Unsubscribe: {
            (): void;
        };
    }
    interface ITypedSubscription<ArgType> extends ISubscription {
        Callback: ICallback<ArgType>;
        Event: Event<ArgType>;
    }
}
declare module Typejector.Event {
    class Event<ArgType> {
        private Callbacks;
        Subscribe(callback: Interface.ICallback<ArgType>, subscriber: any): Interface.ITypedSubscription<ArgType>;
        Unsubscribe(callback: Interface.ICallback<ArgType>): void;
        Trigger: Interface.ICallback<ArgType>;
    }
}
declare namespace Typejector.Exception {
    class IllegalArgumentException implements Error {
        name: string;
        message: string;
        prototype: Error;
        constructor(message?: string);
    }
    function assert(object: any, message?: string): void;
}
declare function assert(object: any, message?: string): void;
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): Map<K, V>;
    size: number;
}
interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(): Map<K, V>;
    prototype: Map<any, any>;
}
declare var Map: MapConstructor;
interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    size: number;
}
interface SetConstructor {
    new (): Set<any>;
    new <T>(): Set<T>;
    prototype: Set<any>;
}
declare var Set: SetConstructor;
interface WeakMap<K, V> {
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;
}
interface WeakMapConstructor {
    new (): WeakMap<any, any>;
    new <K, V>(): WeakMap<K, V>;
    prototype: WeakMap<any, any>;
}
declare var WeakMap: WeakMapConstructor;
interface WeakSet<T> {
    add(value: T): WeakSet<T>;
    clear(): void;
    delete(value: T): boolean;
    has(value: T): boolean;
}
interface WeakSetConstructor {
    new (): WeakSet<any>;
    new <T>(): WeakSet<T>;
    prototype: WeakSet<any>;
}
declare var WeakSet: WeakSetConstructor;
declare module Reflect {
    function decorate(decorators: ClassDecorator[], target: Function): Function;
    function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: Object, targetKey: string | symbol, descriptor?: PropertyDescriptor): PropertyDescriptor;
    function metadata(metadataKey: any, metadataValue: any): {
        (target: Function): void;
        (target: Object, targetKey: string | symbol): void;
    };
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object): void;
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object, targetKey: string | symbol): void;
    function hasMetadata(metadataKey: any, target: Object): boolean;
    function hasMetadata(metadataKey: any, target: Object, targetKey: string | symbol): boolean;
    function hasOwnMetadata(metadataKey: any, target: Object): boolean;
    function hasOwnMetadata(metadataKey: any, target: Object, targetKey: string | symbol): boolean;
    function getMetadata(metadataKey: any, target: Object): any;
    function getMetadata(metadataKey: any, target: Object, targetKey: string | symbol): any;
    function getOwnMetadata(metadataKey: any, target: Object): any;
    function getOwnMetadata(metadataKey: any, target: Object, targetKey: string | symbol): any;
    function getMetadataKeys(target: Object): any[];
    function getMetadataKeys(target: Object, targetKey: string | symbol): any[];
    function getOwnMetadataKeys(target: Object): any[];
    function getOwnMetadataKeys(target: Object, targetKey: string | symbol): any[];
    function deleteMetadata(metadataKey: any, target: Object): boolean;
    function deleteMetadata(metadataKey: any, target: Object, targetKey: string | symbol): boolean;
}
declare namespace Typejector.Util {
    import Class = Typejector.Type.Class;
    class Reflection {
        private static RETURN_TYPE_KEY;
        private static PARAM_TYPES_KEY;
        private static TYPE_KEY;
        static getReturnType(prototype: any, targetKey: string | symbol): Class;
        static getParamTypes(clazz: Class): Class[];
        static getParamTypes(prototype: any, targetKey: string | symbol): Class[];
        static getType(target: any, targetKey: string | symbol): Class;
    }
}
declare namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    class BeanNameGenerator {
        static generateBeanName(clazz: Class): string;
        private static extractFunctionName(clazz);
    }
}
declare namespace Typejector.Annotation {
    class Annotations {
        static ANNOTATION_KEY: string;
        private static ANNOTATION_DATA_KEY;
        static add(annotation: any, annotationData: any, target: Object): any;
        static add(annotation: any, annotationData: any, target: Object, targetKey: string | symbol): any;
        static add(annotation: any, annotationData: any, target: Object, targetKey: string | symbol, paramIndex: number): any;
        static get(target: Object): Map<any, any>;
        static get(target: Object, targetKey: string | symbol): Map<any, any>;
        static get(target: Object, targetKey: string | symbol, paramIndex: number): Map<any, any>;
    }
}
declare namespace Typejector.Component.Factory.Config {
    interface AnnotatedObject {
        annotations: Set<Function>;
    }
}
declare module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    class TypeDescriptor {
        clazz: Class;
        genericTypes: Array<Class>;
    }
}
declare module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    class DependencyDescriptor extends TypeDescriptor {
        parent: Class;
    }
}
declare module Typejector.Component.Factory.Config {
    interface PropertyDescriptor extends AnnotatedObject {
        name: string;
        clazz: TypeDescriptor;
    }
}
declare module Typejector.Component.Factory.Config {
    interface MethodDescriptor extends AnnotatedObject {
        name: string;
        arguments: Array<TypeDescriptor>;
        returnType: TypeDescriptor;
    }
}
declare namespace Typejector.Component.Factory.Config {
    import Class = Type.Class;
    interface ResolveDefinition {
        clazz: Class;
        constructorArguments: Array<TypeDescriptor>;
        properties: Set<PropertyDescriptor>;
        methods: Set<MethodDescriptor>;
    }
}
declare module Typejector.Component.Factory.Config {
    interface BeanDefinition extends ResolveDefinition, AnnotatedObject {
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
declare namespace Typejector.Component.Context.Config {
    import TypeDescriptor = Factory.Config.TypeDescriptor;
    import AnnotatedObject = Component.Factory.Config.AnnotatedObject;
    class BeanDescriptor extends TypeDescriptor implements AnnotatedObject {
        annotations: Set<Function>;
    }
}
declare namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import AnnotatedObject = Component.Factory.Config.AnnotatedObject;
    class FieldDependencyDescriptor extends DependencyDescriptor implements AnnotatedObject {
        name: string;
        annotations: Set<Function>;
    }
}
declare namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    class ArgumentDependencyDescriptor extends DependencyDescriptor {
        position: number;
        methodName: string;
    }
}
declare namespace Typejector.Component.Context.Config {
    import MethodDescriptor = Factory.Config.MethodDescriptor;
    import TypeDescriptor = Factory.Config.TypeDescriptor;
    class MethodDependencyDescriptor extends FieldDependencyDescriptor implements MethodDescriptor {
        arguments: Array<TypeDescriptor>;
        returnType: TypeDescriptor;
    }
}
declare module Typejector.Annotation {
    function inject(target: Object, propertyKey: string | symbol): void;
}
declare module Typejector.Annotation {
    function lazy(target: Object, propertyKey?: string | symbol): void;
}
declare namespace Typejector.Annotation {
    import Class = Typejector.Type.Class;
    function generic(...classes: Class[]): (target: Object, propertyKey: string | symbol, paramIndex?: any) => any;
}
declare namespace Typejector.Annotation {
    function primary(target: Object): void;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function injection(clazz: Class, ...annotations: Function[]): void;
}
declare module Typejector.Annotation {
    function abstract(clazz: any): void;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function singleton(clazz: Class): void;
}
declare namespace Typejector.Annotation {
    function postConstructor(target: Object, propertyKey: string): void;
}
declare namespace Typejector.Annotation {
    function factoryMethod(parent: any, propertyName: string | symbol): void;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function config(clazz: Class): void;
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    class Bean implements Config.BeanDefinition {
        clazz: Class;
        parent: string;
        annotations: Set<Function>;
        name: string;
        scope: string;
        factoryMethodName: string;
        initMethodName: string;
        isPrimary: boolean;
        isAbstract: boolean;
        isLazyInit: boolean;
        constructorArguments: Array<Config.TypeDescriptor>;
        properties: Set<Config.PropertyDescriptor>;
        methods: Set<Config.MethodDescriptor>;
        dependsOn: Set<string>;
    }
}
declare namespace Typejector.Annotation {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    class ClassBeanDefinitionScanner {
        scan(): BeanDefinition[];
        private buildBeanDefinition(clazz);
        private deepScanning(clazz);
    }
}
declare namespace Typejector.Component.Factory {
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;
    abstract class BeanDefinitionPostProcessor {
        abstract postProcessBeanDefinition(beanDefinitionRegistry: BeanDefinitionRegistry): void;
    }
}
declare module Typejector.Component.Factory.Registry {
    import BeanDefinition = Config.BeanDefinition;
    interface BeanDefinitionRegistry {
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        getBeanDefinitionNames(): string[];
    }
}
declare namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions;
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        protected getRegisteredBeanDefinitions(): BeanDefinition[];
        getBeanDefinitionNames(): string[];
    }
}
declare namespace Typejector.Component.Factory.Support {
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;
    class DefaultBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinitionRegistry: BeanDefinitionRegistry): void;
        private processClassAnnotations(bean);
        private processMethods(bean, propKey);
        private processProperties(bean, propKey);
        private buildTypeDescriptor(src, propType, propKey, index?);
    }
}
declare namespace Typejector.Annotation {
}
declare namespace Typejector.Annotation {
}
declare namespace Typejector.Annotation {
}
declare namespace Typejector.Util {
}
declare namespace Typejector.Type {
}
declare namespace Typejector.Component.Factory.Support {
}
declare namespace Typejector {
}
