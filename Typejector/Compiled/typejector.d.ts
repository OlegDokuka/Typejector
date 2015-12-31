declare module Typejector.Type {
    type Class = {
        new (...args: any[]): any;
        prototype: any;
    };
    namespace Class {
        function register(clazz: Function): void;
        function classes(): Function[];
        function isClass(val: any): val is Class;
    }
}
declare namespace Typejector.Util {
    class Collections {
        static remove<T>(src: Array<T>, element: T): boolean;
        static contains<T>(src: {
            forEach(func: (...args: any[]) => void);
        }, element: T): boolean;
        static keys<T>(src: Map<T, any>): T[];
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
    }
}
declare namespace Typejector.Annotation {
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
        isArray(): boolean;
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
        scope: string;
        factoryMethodName: string;
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
        annotations: Set<Function>;
        name: string;
        scope: string;
        factoryMethodName: string;
        constructorArguments: Array<Config.TypeDescriptor>;
        properties: Set<Config.PropertyDescriptor>;
        methods: Set<Config.MethodDescriptor>;
        postConstructors: Array<Config.MethodDescriptor>;
    }
}
declare namespace Typejector.Component {
    import Class = Type.Class;
    import BeanDefinition = Factory.Config.BeanDefinition;
    import MethodDescriptor = Factory.Config.MethodDescriptor;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    class BeanUtils {
        static isAssignable(clazz: Class, classFrom: Class): boolean;
        static isAbstract(beanDefinition: BeanDefinition): any;
        static isConfig(beanDefinition: BeanDefinition): any;
        static isSingleton(beanDefinition: BeanDefinition): any;
        static getMethodDescriptor(beanDefinition: BeanDefinition, methodName: string): any;
        static getOrCreateMethodDescriptor(beanDefinition: BeanDefinition, methodName: string): any;
        static getOrCreateBeanDefinition(beanFactory: ConfigurableListableBeanFactory, clazz: Class): BeanDefinition;
        static newInstance(clazz: Class, ...args: any[]): any;
        static createObjectFactoryFrom<T>(methodDescriptor: MethodDescriptor, parent: Class, beanFactory: ConfigurableListableBeanFactory): Factory.ObjectFactory<T>;
    }
}
declare namespace Typejector.Component.Factory {
    interface ObjectFactory<T> {
        getObject(): T;
    }
}
declare namespace Typejector.Component.Factory.Config {
    interface Scope {
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;
        remove(name: string): void;
    }
}
declare namespace Typejector.Component.Factory.Support {
    import Scope = Config.Scope;
    class PrototypeScope implements Scope {
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;
        remove(name: string): void;
    }
    namespace PrototypeScope {
        const NAME: string;
    }
}
declare namespace Typejector.Component.Factory.Support {
    class SingletonScope extends PrototypeScope {
        private objectCache;
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;
        remove(name: string): void;
    }
    namespace SingletonScope {
        const NAME: string;
    }
}
declare namespace Typejector.Component.Factory {
    import Class = Type.Class;
    interface BeanFactory {
        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
    }
}
declare module Typejector.Component.Factory.Registry {
    import BeanDefinition = Config.BeanDefinition;
    interface BeanDefinitionRegistry {
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        addBeanDefinitionPostProcessor(beanDefinitionPostProcessor: BeanDefinitionPostProcessor): void;
        getBeanDefinitionNames(): string[];
    }
}
declare namespace Typejector.Component.Factory.Registry {
    interface FactoryBeanRegistry {
        registerFactory<T>(beanName: string, factory: ObjectFactory<T>): void;
        getFactory<T>(beanName: string): ObjectFactory<T>;
    }
}
declare namespace Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    interface AutowireCapableBeanFactory extends BeanFactory {
        createBean<T>(clazz: Class): T;
        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        resolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}
declare namespace Typejector.Component.Factory {
    import Class = Type.Class;
    interface ListableBeanFactory extends BeanFactory {
        getBeansOfType<T>(clazz: Class): Array<T>;
        getBeanNamesOfType(clazz: Class): Array<string>;
    }
}
declare namespace Typejector.Component.Factory {
    import BeanDefinition = Config.BeanDefinition;
    abstract class BeanPostProcessor {
        abstract postProcessAfterInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T;
        abstract postProcessBeforeInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T;
    }
}
declare namespace Typejector.Component.Factory {
    import BeanDefinition = Config.BeanDefinition;
    abstract class BeanDefinitionPostProcessor {
        abstract postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
    }
}
declare namespace Typejector.Component.Factory {
    import Scope = Config.Scope;
    interface ConfigurableBeanFactory extends BeanFactory {
        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void;
        registerScope(scopeName: string, scope: Scope): void;
        getRegisteredScope(scopeName: string): Scope;
    }
}
declare namespace Typejector.Component.Factory {
    interface ConfigurableListableBeanFactory extends ListableBeanFactory, AutowireCapableBeanFactory, ConfigurableBeanFactory, Registry.BeanDefinitionRegistry, Registry.FactoryBeanRegistry {
    }
}
declare namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    class DefaultBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
    }
}
declare namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;
    class MergeBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        private beanDefinitionRegistry;
        constructor(beanDefinitionRegistry: BeanDefinitionRegistry);
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
        private merge(beanDefinition, superBeanDefinition);
    }
}
declare namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    class ConfigBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        private configurableListableBeanFactory;
        constructor(beanDefinitionRegistry: ConfigurableListableBeanFactory);
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
        private processBeanDefinitionPostProcessorsDefinition(beanDefinition);
        private processBeanPostProcessorsDefinition(beanDefinition);
        private processConfigurationBeanDefinitionDefinition(beanDefinition);
    }
}
declare namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions;
        private beanDefinitionPostProcessors;
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        addBeanDefinitionPostProcessor(beanDefinitionPostProcessor: BeanDefinitionPostProcessor): void;
        protected getRegisteredBeanDefinitions(): BeanDefinition[];
        private applyBeanDefinitionPostProcessor(beanDefinition);
        getBeanDefinitionNames(): string[];
    }
}
declare namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    abstract class FactoryBeanRegistrySupport extends DefaultBeanDefinitionRegistry implements Registry.FactoryBeanRegistry {
        private registeredFactoriesBeans;
        registerFactory<T>(beanName: string, factory: ObjectFactory<T>): void;
        registerFactory<T>(clazz: Class, factory: ObjectFactory<T>): void;
        getFactory<T>(beanName: string): ObjectFactory<T>;
        getFactory<T>(clazz: Class): ObjectFactory<T>;
        protected abstract doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T>;
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import Scope = Config.Scope;
    abstract class AbstractBeanFactory extends FactoryBeanRegistrySupport implements ConfigurableBeanFactory {
        private prototypeScope;
        private singletonScope;
        private registeredScopes;
        private beanPostProcessors;
        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void;
        getBeanPostProcessors(): Array<BeanPostProcessor>;
        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
        protected abstract doGetBean(beanDifinition: BeanDefinition): any;
        registerScope(scopeName: string, scope: Scope): void;
        getRegisteredScope(scopeName: string): Scope;
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    import ObjectFactory = Factory.ObjectFactory;
    abstract class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory implements AutowireCapableBeanFactory {
        createBean<T>(clazz: Class): T;
        protected doCreateBean(beanDefinition: BeanDefinition): any;
        initializeBean<T>(instance: T, beanDefinition: BeanDefinition): T;
        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        protected doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T>;
        resolveDependency(typeDescriptor: TypeDescriptor): any;
        protected abstract doResolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    class DefaultListableBeanFactory extends AbstractAutowireCapableBeanFactory implements ListableBeanFactory {
        getBeansOfType<T>(clazz: Class): Array<T>;
        getBeanNamesOfType(clazz: Class): Array<string>;
        protected doGetBeanNamesOfType(clazz: Class): string[];
        protected doGetBeansOfType(clazz: Class): any[];
        protected doGetBeanDefinitionsOfType(clazz: Class, useAbstract?: boolean): BeanDefinition[];
        protected doGetBean(beanDefinition: BeanDefinition): any;
        protected doResolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}
declare namespace Typejector.Component.Context {
    import BeanFactory = Factory.BeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import ConfigurableListableBeanFactory = Component.Factory.ConfigurableListableBeanFactory;
    interface Context extends BeanFactory {
        register(typeDescriptor: TypeDescription): any;
        getBeanFactory(): ConfigurableListableBeanFactory;
    }
}
declare namespace Typejector.Component.Context {
    import Class = Type.Class;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    class ApplicationContext implements Context {
        private mainBeanFactory;
        constructor();
        private initialize();
        register(typeDescriptor: TypeDescription): void;
        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
        getBeanFactory(): ConfigurableListableBeanFactory;
    }
}
declare module Typejector {
    import Context = Component.Context.Context;
    function getContext(): Context;
}
