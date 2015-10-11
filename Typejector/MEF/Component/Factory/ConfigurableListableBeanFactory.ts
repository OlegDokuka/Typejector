
namespace Typejector.Component.Factory {
    export interface ConfigurableListableBeanFactory extends ListableBeanFactory,
        AutowireCapableBeanFactory, ConfigurableBeanFactory,
        Registry.BeanDefinitionRegistry, Registry.FactoryBeanRegistry {
    }
} 