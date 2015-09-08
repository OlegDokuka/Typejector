namespace Typejector.Component {
    import Class = Type.Class;
    import BeanDefinition = Factory.Config.BeanDefinition;

    export class BeanUtils {
        public static isAssignable(clazz:Class, classFrom:Class):boolean {
            return clazz === classFrom || clazz.prototype.isPrototypeOf(classFrom.prototype);
        }

        public static isAbstract(beanDefinition:BeanDefinition) {
            return Metadata.InterfaceMetadata.test(beanDefinition.metadata);
        }

        public static isSingleton(beanDefinition:BeanDefinition) {
            return Metadata.SingletonMetadata.test(beanDefinition.metadata);
        }

        public static newInstance(clazz:Class, ...args:any[]) {
            args.unshift(clazz);

            return new (clazz.bind.apply(clazz, args))();
        }
    }
}