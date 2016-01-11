namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Typejector.Util.Collections;

    export class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions: Map<string, BeanDefinition> = new Map();

        containsBeanDefinition(beanName: string): boolean {
            return this.registeredBeanDefinitions.has(beanName);
        }

        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void {
            assert(beanDefinition, "BeanDefinition must be presented");

            beanDefinition.name = beanName;

            this.registeredBeanDefinitions.set(beanName, beanDefinition);
        }

        getBeanDefinition(beanName: string): BeanDefinition {
            if (!this.containsBeanDefinition(beanName)) {
                throw new Error(`No such bean definitions found for name '${beanName}'`);
            }

            return this.registeredBeanDefinitions.get(beanName);
        }

        protected getRegisteredBeanDefinitions() {
            return Collections.map(this.registeredBeanDefinitions, () => [], (beanDefinition, name) => beanDefinition, (coll, beanDef) => coll.push(beanDef));
        }

        getBeanDefinitionNames(): string[] {
            return Collections.map(this.registeredBeanDefinitions, () => [], (val, key) => key, (collection, val) => collection.push(val));
        }
    }
}