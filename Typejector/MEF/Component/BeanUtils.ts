namespace Typejector.Component {
    import Class = Type.Class;
    import BeanDefinition = Factory.Config.BeanDefinition;
    import MethodDescriptor = Factory.Config.MethodDescriptor;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    import abstract = Annotation.abstract;
    import config = Annotation.config;
    import singleton = Annotation.singleton;
    import BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
    import Bean = Component.Factory.Support.Bean;
    import Collections = Typejector.Util.Collections;

    export class BeanUtils {
        /**
         * Class represented by the @arg clazz object is a superclass or superinterface of @arg classFrom
         * @param clazz superclass or superinterface 
         * @param classFrom class that required some checking 
         * @returns Boolean result of checking 
         */

        public static isAbstract(beanDefinition: BeanDefinition) {
            return Collections.contains(beanDefinition.annotations,abstract);
        }

        public static isConfig(beanDefinition: BeanDefinition) {
            return  Collections.contains(beanDefinition.annotations, config)
        }

        public static isSingleton(beanDefinition: BeanDefinition) {
            return  Collections.contains(beanDefinition.annotations,singleton);
        }
        
        public static newInstance(clazz: Class, ...args: any[]) {
            args.unshift(clazz);

            return new (clazz.bind.apply(clazz, args))();
        }

        public static createObjectFactoryFrom<T>(methodDescriptor: MethodDescriptor, parent: Class, beanFactory: ConfigurableListableBeanFactory): Factory.ObjectFactory<T> {
            return {
                getObject(): T {
                    const resolvedArguments = methodDescriptor.arguments
                        .map(val => beanFactory.resolveDependency(val)),
                        target = beanFactory.getBean(parent);

                    return target[methodDescriptor.name].call(target, ...resolvedArguments);
                }
            };
        }


    }
}