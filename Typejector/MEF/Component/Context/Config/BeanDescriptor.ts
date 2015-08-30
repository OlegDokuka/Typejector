namespace Typejector.Component.Context.Config {
    import TypeDescriptor = Factory.Config.TypeDescriptor;
    import Metadata = Component.Metadata.Metadata

    export class BeanDescriptor extends TypeDescriptor {
        metadata: Metadata[];
    }
}