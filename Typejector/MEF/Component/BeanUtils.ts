namespace Typejector.Component {
    import Class = Type.Class;
    import BeanDefinition = Factory.Config.BeanDefinition;
    import PropertyValue = Factory.Config.PropertyValue;
    import PropertyDescriptor = Factory.Config.PropertyDescriptor;
    import MethodArgumentDescriptor = Factory.Config.MethodArgumentDescriptor;
    import AnnotatedObject = Factory.Config.AnnotatedObject;
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import MethodDescriptor = Factory.Config.MethodDescriptor;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    import abstract = Annotation.abstract;
    import config = Annotation.config;
    import singleton = Annotation.singleton;
    import BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
    import Bean = Component.Factory.Support.Bean;
    import Collections = Typejector.Util.Collections;

    export class BeanUtils {

        public static isAbstract(beanDefinition: BeanDefinition) {
            return Collections.contains(beanDefinition.annotations, abstract);
        }

        public static isConfig(beanDefinition: BeanDefinition) {
            return Collections.contains(beanDefinition.annotations, config)
        }

        public static isSingleton(beanDefinition: BeanDefinition) {
            return Collections.contains(beanDefinition.annotations, singleton);
        }

        public static newInstance(clazz: Class, ...args: any[]) {
            args.unshift(clazz);

            return new (clazz.bind.apply(clazz, args))();
        }

        public static createPropetyValuesFrom(beanDefinition: BeanDefinition, ...properties: PropertyDescriptor[]);

        public static createPropetyValuesFrom(beanDefinition: BeanDefinition, ...properties: MethodArgumentDescriptor[]);

        public static createPropetyValuesFrom(beanDefinition: BeanDefinition, ...properties: AnnotatedObject[]) {
            return properties.map(it=> ({ dependency: DependencyDescriptor.of(beanDefinition.name, it), instanceGetter: undefined }));
        }

        // public static createObjectFactoryFrom<T>(methodDescriptor: MethodDescriptor, parent: Class, beanFactory: ConfigurableListableBeanFactory): Factory.ObjectFactory<T> {
        //     return {
        //         getObject(): T {
        //             const resolvedArguments = methodDescriptor.arguments
        //                 .map(val => beanFactory.resolveDependency({occurrence: val, })),
        //                 target = beanFactory.getBean(parent);

        //             return target[methodDescriptor.name].call(target, ...resolvedArguments);
        //         }
        //     };
        // }
    }
}