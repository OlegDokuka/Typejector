namespace Typejector.Component.Context {
    import Class = Type.Class;
    import BeanFactory = Factory.BeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import ConfigurableListableBeanFactory = Component.Factory.ConfigurableListableBeanFactory;

    export interface Context extends BeanFactory {
        register(typeDescriptor: TypeDescription);

        getBeanFactory(): ConfigurableListableBeanFactory;
    }
}