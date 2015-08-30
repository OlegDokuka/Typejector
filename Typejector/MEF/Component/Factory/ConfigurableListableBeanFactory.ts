
namespace Typejector.Component.Factory {
    import Class = Type.Class;

    export interface ConfigurableListableBeanFactory extends ListableBeanFactory,
        AutowireCapableBeanFactory, ConfigurableBeanFactory {
    }
} 