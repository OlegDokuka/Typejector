module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import Collections = Typejector.Util.Collections;
    import BeanDefinition = Config.BeanDefinition;
    import Scope = Config.Scope;

    export abstract class AbstractBeanFactory extends FactoryBeanRegistrySupport implements ConfigurableBeanFactory {
        private prototypeScope = new PrototypeScope();
        private singletonScope = new SingletonScope();
        private registeredScopes: Array<Scope> = [];
        private beanPostProcessors: Set<BeanPostProcessor> = new Set();

        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void {
            this.beanPostProcessors.add(beanPostProcessor);
        }

        getBeanPostProcessors(): Array<BeanPostProcessor> {
            return Collections.toArray(this.beanPostProcessors);
        }

        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
        getBean<T>(item: Class | string): T {
            let beanDefinition: BeanDefinition;

            assert(item);

            if (Class.isClass(item)) {
                beanDefinition = this.getBeanDefinition(item);
            }
            else {
                beanDefinition = this.getBeanDefinition(item);
            }

            return this.doGetBean(beanDefinition);
        }

        protected abstract doGetBean(beanDifinition: BeanDefinition): any;

        registerScope(scopeName: string, scope: Scope): void {
            this.registeredScopes[scopeName] = scope;
        }

        getRegisteredScope(scopeName: string): Scope {
            if (scopeName in this.registeredScopes) {
                return this.registeredScopes[scopeName];
            }

            if (scopeName === PrototypeScope.NAME) {
                return this.prototypeScope;
            }

            if (scopeName === SingletonScope.NAME) {
                return this.singletonScope;
            }

            return undefined;
        }
    }
}