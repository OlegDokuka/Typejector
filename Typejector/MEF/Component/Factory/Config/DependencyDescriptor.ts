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

        get parametrTypeDescriptor(): TypeDescriptor {
            const occurrence = this.occurrence;

            if (occurrence instanceof MethodArgumentDescriptor) {
                return occurrence.type;
            } else if (occurrence instanceof PropertyDescriptor) {
                return occurrence.type;
            }

            throw new Error("Inccorect occurrence type");
        }
    }
} 