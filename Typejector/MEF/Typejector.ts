///<reference path="../Core/Type/Class"/>
///<reference path="../Core/Event/Event"/>
///<reference path="../Core/Exception/Assert"/>
///<reference path="Component/Metadata/Metadata"/>
///<reference path="Component/Metadata/SingletonMetadata"/>
///<reference path="Component/Metadata/InterfaceMetadata"/>
///<reference path="Component/Factory/Config/TypeDescriptor"/>
///<reference path="Component/Factory/Config/DependencyDescriptor"/>
///<reference path="Component/Factory/Config/PropertyDescriptor"/>
///<reference path="Component/Factory/Config/MethodDescriptor"/>
///<reference path="Component/Factory/Config/ResolveDefinition"/>
///<reference path="Component/Factory/Config/BeanDefinition"/>
///<reference path="Component/Factory/Support/Bean"/>
///<reference path="Component/BeanUtils"/>
///<reference path="Component/Factory/ObjectFactory"/>
///<reference path="Component/Factory/Config/Scope"/>
///<reference path="Component/Factory/Support/PrototypeScope"/>
///<reference path="Component/Factory/Support/SingletonScope"/>
///<reference path="Component/Factory/BeanFactory"/>
///<reference path="Component/Factory/Registry/BeanDefinitionRegistry"/>
///<reference path="Component/Factory/AutowireCapableBeanFactory"/>
///<reference path="Component/Factory/ListableBeanFactory"/>
///<reference path="Component/Factory/BeanPostProcessor"/>
///<reference path="Component/Factory/BeanDefinitionPostProcessor"/>
///<reference path="Component/Factory/ConfigurableBeanFactory"/>
///<reference path="Component/Factory/ConfigurableListableBeanFactory"/>
///<reference path="Component/Factory/Support/BeanNameGenerator"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionPostProcessor"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionRegistry"/>
///<reference path="Component/Factory/Support/FactoryBeanRegistrySupport"/>
///<reference path="Component/Factory/Support/AbstractBeanFactory"/>
///<reference path="Component/Factory/Support/AbstractAutowireCapableBeanFactory"/>
///<reference path="Component/Factory/Support/DefaultListableBeanFactory"/>
///<reference path="Component/Context/Context"/>
///<reference path="Component/Context/Config/BeanDescriptor"/>
///<reference path="Component/Context/Config/ConstructorDependencyDescriptor"/>
///<reference path="Component/Context/Config/MethodDependencyDescriptor"/>
///<reference path="Component/Context/Config/FieldDependencyDescriptor"/>
///<reference path="Component/Context/ApplicationContext"/>
///<reference path="Annotation/Inject"/>
///<reference path="Annotation/Injection"/>
///<reference path="Annotation/Interface"/>
///<reference path="Annotation/Singleton"/>
module Typejector {
    import Context = Component.Context.Context;
    import ApplicationContext = Component.Context.ApplicationContext;

    let context: Context = new ApplicationContext();

    export function getContext() {
        return context;
    }
}