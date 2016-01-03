///<reference path="../Core/Type/Class.ts"/>
///<reference path="../Core/Util/Collections.ts"/>
///<reference path="../Core/Event/Event.ts"/>
///<reference path="../Core/Exception/Assert.ts"/>
///<reference path="../Core/Collections/Map.ts"/>
///<reference path="../Core/Collections/Set.ts"/>
///<reference path="../Core/Collections/WeakMap.ts"/>
///<reference path="../Core/Collections/WeakSet.ts"/>
///<reference path="../../node_modules/reflect-metadata/Reflect.ts"/>
///<reference path="../Core/Util/Reflection.ts"/>
///<reference path="Component/Factory/Support/BeanNameGenerator.ts"/>
///<reference path="Annotation/Annotations.ts"/>
///<reference path="Component/Factory/Config/AnnotatedObject.ts"/>
///<reference path="Component/Factory/Config/TypeDescriptor.ts"/>
///<reference path="Component/Factory/Config/DependencyDescriptor.ts"/>
///<reference path="Component/Factory/Config/PropertyDescriptor.ts"/>
///<reference path="Component/Factory/Config/MethodDescriptor.ts"/>
///<reference path="Component/Factory/Config/ResolveDefinition.ts"/>
///<reference path="Component/Factory/Config/BeanDefinition.ts"/>
///<reference path="Component/Context/Config/BeanDescriptor.ts"/>
///<reference path="Component/Context/Config/FieldDependencyDescriptor.ts"/>
///<reference path="Component/Context/Config/ArgumentDependencyDescriptor.ts"/>
///<reference path="Component/Context/Config/MethodDependencyDescriptor.ts"/>
///<reference path="Annotation/Inject.ts"/>
///<reference path="Annotation/Generic.ts"/>
///<reference path="Annotation/Primary.ts"/>
///<reference path="Annotation/Injection.ts"/>
///<reference path="Annotation/Abstract.ts"/>
///<reference path="Annotation/Singleton.ts"/>
///<reference path="Annotation/PostConstructor.ts"/>
///<reference path="Annotation/FactoryMethod.ts"/>
///<reference path="Annotation/Config.ts"/>
///<reference path="Component/Factory/Support/Bean.ts"/>
///<reference path="Annotation/ClassBeanDefinitionScanner.ts"/>
///<reference path="Component/BeanUtils.ts"/>
///<reference path="Component/Factory/ObjectFactory.ts"/>
///<reference path="Component/Factory/Config/Scope.ts"/>
///<reference path="Component/Factory/Support/PrototypeScope.ts"/>
///<reference path="Component/Factory/Support/SingletonScope.ts"/>
///<reference path="Component/Factory/BeanFactory.ts"/>
///<reference path="Component/Factory/Registry/BeanDefinitionRegistry.ts"/>
///<reference path="Component/Factory/Registry/FactoryBeanRegistry.ts"/>
///<reference path="Component/Factory/AutowireCapableBeanFactory.ts"/>
///<reference path="Component/Factory/ListableBeanFactory.ts"/>
///<reference path="Component/Factory/BeanPostProcessor.ts"/>
///<reference path="Component/Factory/BeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/ConfigurableBeanFactory.ts"/>
///<reference path="Component/Factory/ConfigurableListableBeanFactory.ts"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/Support/MergeBeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/Support/ConfigBeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionRegistry.ts"/>
///<reference path="Component/Factory/Support/FactoryBeanRegistrySupport.ts"/>
///<reference path="Component/Factory/Support/AbstractBeanFactory.ts"/>
///<reference path="Component/Factory/Support/AbstractAutowireCapableBeanFactory.ts"/>
///<reference path="Component/Factory/Support/DefaultListableBeanFactory.ts"/>
///<reference path="Component/Context/Context.ts"/>
///<reference path="Component/Context/ApplicationContext.ts"/>
module Typejector {
    import Context = Component.Context.Context;
    import ApplicationContext = Component.Context.ApplicationContext;

    let context: Context = new ApplicationContext();

    export function getContext() {
        return context;
    }
}