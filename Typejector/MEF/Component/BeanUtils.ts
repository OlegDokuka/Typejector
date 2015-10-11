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

    export class BeanUtils {
        /**
         * Class represented by the @arg clazz object is a superclass or superinterface of @arg classFrom
         * @param clazz superclass or superinterface 
         * @param classFrom class that required some checking 
         * @returns Boolean result of checking 
         */
        public static isAssignable(clazz: Class, classFrom: Class): boolean {
            return clazz === classFrom || clazz.prototype.isPrototypeOf(classFrom.prototype);
        }

        public static isAbstract(beanDefinition: BeanDefinition) {
            return beanDefinition.annotations.some(it => it === abstract);
        }

        public static isConfig(beanDefinition: BeanDefinition) {
            return beanDefinition.annotations.some(it => it === config);
        }

        public static isSingleton(beanDefinition: BeanDefinition) {
            return beanDefinition.annotations.some(it => it === singleton);
        }

        public static getMethodDescriptor(beanDefinition: BeanDefinition, methodName: string) {
            return beanDefinition.methods
                .filter((md) => md.name === methodName)[0];
        }

        public static getOrCreateMethodDescriptor(beanDefinition: BeanDefinition, methodName: string) {
            const existedMethodDescriptor = BeanUtils.getMethodDescriptor(beanDefinition, methodName);

            return existedMethodDescriptor != undefined ? existedMethodDescriptor : beanDefinition.methods[beanDefinition.methods.push({
                name: methodName,
                arguments: [],
                annotations: [],
                returnType: undefined
            }) - 1];
        }

        public static getOrCreateBeanDefinition(beanFactory: ConfigurableListableBeanFactory, clazz: Class): BeanDefinition {
            let beanDefinition: BeanDefinition;
            const beanName = BeanNameGenerator.generateBeanName(clazz);

            if (beanFactory.containsBeanDefinition(beanName)) {
                beanDefinition = beanFactory.getBeanDefinition(beanName);
            }
            else {
                beanDefinition = new Bean();
                beanDefinition.clazz = clazz;
                beanDefinition.name = beanName;
            }

            return beanDefinition;
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