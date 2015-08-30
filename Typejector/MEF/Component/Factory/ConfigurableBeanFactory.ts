namespace Typejector.Component.Factory {
    import Scope = Config.Scope;

    export interface ConfigurableBeanFactory extends BeanFactory {
        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void;

        registerScope(scopeName: string, scope: Scope): void;

        getRegisteredScope(scopeName: string): Scope;
    }
} 