module Typejector.Annotation {
    import Class = Type.Class;
    import Metadata = Typejector.Component.Metadata.Metadata;
    import BeanDescriptor = Component.Context.Config.BeanDescriptor;

    export function injection(metadata: Metadata[])
    export function injection(clazz: Class, ...metadata: Metadata[]): void
    export function injection(value: any, ...metadata: Metadata[]) {
        let descriptor: BeanDescriptor = new BeanDescriptor();

        if (typeof value === typeof []) {
            return (clazz: Class) => {
                descriptor.clazz = clazz;
                descriptor.metadata = value;

                Typejector.getContext().register(descriptor);
            }
        }
        else {
            descriptor.clazz = value
            descriptor.metadata = metadata;

            Typejector.getContext().register(descriptor);
        }
    }
} 