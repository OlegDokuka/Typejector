namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Typejector.Util.Collections;
    import Class = Typejector.Type.Class;

    export class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions: Map<string, BeanDefinition> = new Map();

        containsBeanDefinition(beanClass: Class): boolean;

        containsBeanDefinition(beanName: string): boolean;

        containsBeanDefinition(value: string | Class): boolean {
            return Class.isClass(value) ? Collections.some(this.registeredBeanDefinitions, beanDef=> beanDef.clazz === value) :
                this.registeredBeanDefinitions.has(<string>value);
        }

        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void {
            assert(beanDefinition, "BeanDefinition must be presented");

            beanDefinition.name = beanName;

            this.registeredBeanDefinitions.set(beanName, beanDefinition);
        }

        getBeanDefinition(beanClass: Class): BeanDefinition;
        
        getBeanDefinition(beanName: string): BeanDefinition;
        
        getBeanDefinition(val: string | Class): BeanDefinition {
            if (!this.containsBeanDefinition(<any>val)) {
                throw new Error(`No such bean definitions found for name '${Class.isClass(val) ? BeanNameGenerator.generateBeanName(val) : val}'`);
            }

            return Class.isClass(val) ?
                Collections.firstOrDefault(Collections.filter(this.registeredBeanDefinitions, beanDef=> beanDef.clazz === val)) :
                this.registeredBeanDefinitions.get(val);
        }

        protected getRegisteredBeanDefinitions() {
            return Collections.map(this.registeredBeanDefinitions, () => [], (beanDefinition, name) => beanDefinition, (coll, beanDef) => coll.push(beanDef));
        }

        getBeanDefinitionNames(): string[] {
            return Collections.map(this.registeredBeanDefinitions, () => [], (val, key) => key, (collection, val) => collection.push(val));
        }
    }
}