namespace Typejector.Component.Factory.Config {
    import Class = Typejector.Type.Class;
    import Provider = Typejector.Component.Factory.Support.Provider;

    export interface PropertyValue {
        instanceGetter: ObjectFactory<any>;
        dependency: DependencyDescriptor;
    }
} 