declare module Typejector.Type {
    type Class = {
        new (...args: any[]): any;
    };
}
declare namespace Typejector.Util {
    class ArrayUtils {
        static remove<T>(src: Array<T>, element: T): boolean;
        static contains<T>(src: Array<T>, element: T): boolean;
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
    /** Базовый интерфейс подписки на событие. Минимальная функциональность. Можем просто отписаться и все. */
    interface ISubscription {
        Unsubscribe: {
            (): void;
        };
    }
    /** Типизированная версия. Включает ссылки на событие и callback */
    interface ITypedSubscription<ArgType> extends ISubscription {
        Callback: ICallback<ArgType>;
        Event: Event<ArgType>;
    }
}
declare module Typejector.Event {
    class Event<ArgType> {
        private Callbacks;
        /** Подписаться на событие
        * @param {ICallback<ArgType>} callback Callback, который будет вызван при вызове функции
        * @param {any} subscriber Контекст, в котором должен быть вызван callback
        * @returns {ITypedSubscription<ArgType>} Объект типизированной подписки
        */
        Subscribe(callback: Interface.ICallback<ArgType>, subscriber: any): Interface.ITypedSubscription<ArgType>;
        /**
        *   Unsubscribe some callback from current event
        *   @param {Interface.ICallback<ArgType>} subscribet callback
        **/
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
declare namespace Typejector.Component.Factory.Config {
    interface AnnotatedObject {
        annotations: Array<Function>;
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
        properties: Array<PropertyDescriptor>;
        methods: Array<MethodDescriptor>;
    }
}
declare module Typejector.Component.Factory.Config {
    interface BeanDefinition extends ResolveDefinition, AnnotatedObject {
        name: string;
        scopeNames: string[];
        factoryMethodName: string;
    }
}
declare namespace Typejector.Component.Context.Config {
    import TypeDescriptor = Factory.Config.TypeDescriptor;
    import AnnotatedObject = Component.Factory.Config.AnnotatedObject;
    class BeanDescriptor extends TypeDescriptor implements AnnotatedObject {
        annotations: Function[];
    }
}
declare namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import AnnotatedObject = Component.Factory.Config.AnnotatedObject;
    class FieldDependencyDescriptor extends DependencyDescriptor implements AnnotatedObject {
        name: string;
        annotations: Function[];
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
    import Class = Type.Class;
    function inject(requestType: Class, ...genericTypes: Class[]): any;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function injection(annotation: Function[]): any;
    function injection(clazz: Class, ...annotation: Function[]): void;
}
declare module Typejector.Annotation {
    function abstract(clazz: any): void;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function singleton(clazz: Class): void;
}
declare namespace Typejector.Annotation {
    function postConstructor(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void;
    function postConstructor(target: Object, propertyKey: string, descriptor: PropertyDescriptor, order: number): void;
    function postConstructor(order: number): MethodDecorator;
}
declare namespace Typejector.Annotation {
    import Class = Type.Class;
    function factoryMethod(returnType: Class): MethodDecorator;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function config(clazz: Class): void;
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    class Bean implements Config.BeanDefinition {
        clazz: Class;
        annotations: Function[];
        name: string;
        scopeNames: string[];
        factoryMethodName: string;
        constructorArguments: Array<Config.TypeDescriptor>;
        properties: Array<Config.PropertyDescriptor>;
        methods: Array<Config.MethodDescriptor>;
        postConstructors: Array<Config.MethodDescriptor>;
        hasAnnotation(annotation: Function): boolean;
    }
}
declare namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    class BeanNameGenerator {
        static generateBeanName(clazz: Class): string;
    }
}
declare namespace Typejector.Component {
    import Class = Type.Class;
    import BeanDefinition = Factory.Config.BeanDefinition;
    import MethodDescriptor = Factory.Config.MethodDescriptor;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    class BeanUtils {
        /**
         * Class represented by the @arg clazz object is a superclass or superinterface of @arg classFrom
         * @param clazz superclass or superinterface
         * @param classFrom class that required some checking
         * @returns Boolean result of checking
         */
        static isAssignable(clazz: Class, classFrom: Class): boolean;
        static isAbstract(beanDefinition: BeanDefinition): boolean;
        static isConfig(beanDefinition: BeanDefinition): boolean;
        static isSingleton(beanDefinition: BeanDefinition): boolean;
        static getMethodDescriptor(beanDefinition: BeanDefinition, methodName: string): MethodDescriptor;
        static getOrCreateMethodDescriptor(beanDefinition: BeanDefinition, methodName: string): MethodDescriptor;
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
        abstract postProcessAfterInitialization(bean: any, beanDefinititon: BeanDefinition): any;
        abstract postProcessBeforeInitialization(bean: any, beanDefinititon: BeanDefinition): any;
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
        protected doCreateObject(beanDefinition: BeanDefinition): any;
        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T;
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
declare namespace Typejector.Component.Factory {
    import Class = Type.Class;
    class ObjectFactoryBuilder<T> {
        private args;
        private clazz;
        withArgs(args: any[]): ObjectFactoryBuilder<T>;
        forClass(clazz: Class): ObjectFactoryBuilder<T>;
        build(): ObjectFactory<T>;
    }
}
