module Typejector.Component.Factory.Support {
    import Class = Type.Class;

    import BeanDefinition = Config.BeanDefinition;
    import Scope = Config.Scope;

    export class AbstractBeanFactory extends FactoryBeanRegistrySupport implements ConfigurableBeanFactory {
        private prototypeScope = new PrototypeScope();
        private singletonScope = new SingletonScope();
        private registeredScopes: Array<Scope> = [];
        private beanPostProcessors: Array<BeanPostProcessor> = [];


        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void {
            this.beanPostProcessors.push(beanPostProcessor);
        }

        getBeanPostProcessors(): Array<BeanPostProcessor> {
            return this.beanPostProcessors;
        }

        containsBean(beanName: string): boolean
        containsBean(clazz: Class): boolean
        containsBean(item: Class|string): boolean {
            let beanName: string;

            assert(item);

            beanName = typeof item === typeof this.containsBean ?
                BeanNameGenerator.generateBeanName(<Class>item) : <string>item;

            return this.containsBeanDefinition(beanName);
        }

        getBean<T>(beanName: string): T
        getBean<T>(clazz: Class): T
        getBean<T>(item: Class|string): T {
            let beanDefinition: BeanDefinition;

            assert(item);

            if (typeof item === typeof "") {
                beanDefinition = this.getBeanDefinition(<string>item);
            }
            else {
                beanDefinition = this.getBeanDefinition(BeanNameGenerator.generateBeanName(<Class>item));
            }

            return this.doGetBean(beanDefinition);
        }

        protected doGetBean(beanDifinition: BeanDefinition): any {
            throw new Error("Method not implement");
        }

        registerScope(scopeName: string, scope: Scope): void {
            this.registeredScopes[scopeName] = scope;
        }

        getRegisteredScope(scopeName: string): Scope {
            if (scopeName in this.registeredScopes) {
                return this.registeredScopes[scopeName];
            }

            if (scopeName == PrototypeScope.NAME) {
                return this.prototypeScope;
            }

            if (scopeName == SingletonScope.NAME) {
                return this.singletonScope;
            }

            return undefined;
        }
    }
}