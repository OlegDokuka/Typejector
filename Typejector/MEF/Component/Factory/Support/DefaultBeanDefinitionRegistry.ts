namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;

    export class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions: Array<BeanDefinition> = [];
        private beanDefinitionPostProcessors: Array<BeanDefinitionPostProcessor> = [];

        containsBeanDefinition(beanName: string): boolean {
            return this.registeredBeanDefinitions.some(it=> it.name === beanName);
        }

        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void {
            assert(beanDefinition, "BeanDefinition must be presented");

            const existedBeanDefinition = this.registeredBeanDefinitions.filter(it => it.name === beanName)[0];

            if (existedBeanDefinition == undefined) {
                this.registeredBeanDefinitions.push(beanDefinition);
            }
            else {
                const beanPosition = this.registeredBeanDefinitions.indexOf(existedBeanDefinition);

                this.registeredBeanDefinitions[beanPosition] = beanDefinition;
            }

            this.applyBeanDefinitionPostProcessor(beanDefinition);
        }

        getBeanDefinition(beanName: string): BeanDefinition {
            if (!this.containsBeanDefinition(beanName)) {
                throw new Error(`No such bean definitions found for name '${beanName}'`);
            }
            //todo: find primary bean or
            return this.registeredBeanDefinitions.filter(it=> it.name === beanName)[0];
        }

        addBeanDefinitionPostProcessor(beanDefinitionPostProcessor: BeanDefinitionPostProcessor): void {
            this.beanDefinitionPostProcessors.push(beanDefinitionPostProcessor);
        }

        protected getRegisteredBeanDefinitions() {
            return this.registeredBeanDefinitions;
        }

        private applyBeanDefinitionPostProcessor(beanDefinition: BeanDefinition) {
            for (let processor of this.beanDefinitionPostProcessors) {
                processor.postProcessBeanDefinition(beanDefinition);
            }
        }

        getBeanDefinitionNames(): string[] {
            return this.registeredBeanDefinitions.map(it=> it.name);
        }

    }
}