module Typejector.Annotation {
    import Class = Type.Class;
    import BeanDescriptor = Component.Context.Config.BeanDescriptor;

    export function injection(annotation: Function[]);
    export function injection(clazz: Class, ...annotation: Function[]): void;
    export function injection(value: any, ...annotation: Function[]) {
        let descriptor: BeanDescriptor = new BeanDescriptor();

        if (typeof value === typeof []) {
            return (clazz: Class) => {
                descriptor.clazz = clazz;
                descriptor.annotations = value;

                Typejector.getContext().register(descriptor);
            }
        }
        else {
            descriptor.clazz = value;
            descriptor.annotations = annotation;

            Typejector.getContext().register(descriptor);
        }
    }
} 