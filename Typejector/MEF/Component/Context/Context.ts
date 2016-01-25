namespace Typejector.Component.Context {
    import Class = Type.Class;
    import BeanFactory = Factory.BeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import ConfigurableListableBeanFactory = Component.Factory.ConfigurableListableBeanFactory;
    import BeanFactoryPostProcessor = Typejector.Component.Factory.BeanFactoryPostProcessor;

    export interface Context extends BeanFactory {
        register(typeDescriptor: TypeDescription);

        refresh(): void;

        run(): void;

        getBeanFactory(): ConfigurableListableBeanFactory;

        addBeanFactoryPostProcessor(beanFactoryPostProcessor: BeanFactoryPostProcessor);
    }
}