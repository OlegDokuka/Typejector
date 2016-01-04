module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export class DependencyDescriptor extends TypeDescriptor {
        parent: Class;
    }
}