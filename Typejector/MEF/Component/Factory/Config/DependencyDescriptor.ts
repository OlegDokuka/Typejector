namespace Typejector.Component.Factory.Config {
    import Class = Typejector.Type.Class;

    export class DependencyDescriptor {
        parentBeanName: string;
        occurrence: AnnotatedObject;

        static of(beanName: string, desription: AnnotatedObject) {
            assert(beanName);
            assert(desription);

            const result: DependencyDescriptor = new DependencyDescriptor();

            result.parentBeanName = beanName;
            result.occurrence = desription;

            return result;
        }
    }
} 