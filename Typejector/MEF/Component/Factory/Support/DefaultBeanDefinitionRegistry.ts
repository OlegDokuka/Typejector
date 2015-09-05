namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions: Array<BeanDefinition> = [];
        private beanDefinitionPostProcessors: Array<BeanDefinitionPostProcessor> = [];

        containsBeanDefinition(beanName: string): boolean {
            return this.registeredBeanDefinitions.some(it=> it.name == beanName);
        }

        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void {
            let existedBeanDefinition: BeanDefinition;


            assert(beanDefinition, "BeanDefinition must be presented");


            this.applyBeanDefinitionPostProcessor(beanDefinition);

            existedBeanDefinition = this.registeredBeanDefinitions.filter(it=> it.name == beanName)[0];

            if (existedBeanDefinition == undefined) {
                this.registeredBeanDefinitions.push(beanDefinition);
            }
            else {
                let beanPosition = this.registeredBeanDefinitions.indexOf(existedBeanDefinition);

                this.registeredBeanDefinitions[beanPosition] = beanDefinition;
            }
        }

        getBeanDefinition(beanName: string): BeanDefinition {
            if (!this.containsBeanDefinition(beanName)) {
                throw new Error("No such bean definitions found");
            }

            return this.registeredBeanDefinitions.filter(it=> it.name == beanName)[0];
        }

        addBeanDefinitionPostProcessor(beanDefinitionPostProcessor: BeanDefinitionPostProcessor): void {
            this.beanDefinitionPostProcessors.push(beanDefinitionPostProcessor);
        }

        protected getRegisteredBeanDefinitions() {
            return this.registeredBeanDefinitions;
        }

        private applyBeanDefinitionPostProcessor(beanDefinition: BeanDefinition) {
            for (let processor of this.beanDefinitionPostProcessors) {
                processor.postProcessBeanDefinition(beanDefinition, this);
            }
        }

        public getBeanDefinitionNames(): string[] {
            let resultBeanDefinitionNames = [];

            for (let name in this.registeredBeanDefinitions) {
                resultBeanDefinitionNames.push(name);
            }

            return resultBeanDefinitionNames;
        }

    }
}