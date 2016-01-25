namespace Typejector.Component.Factory.Config {
    import Class = Typejector.Type.Class;

    export interface PropertyValue {
        name?: string;
        instance: Object;
        type: TypeDescriptor;
    }
} 