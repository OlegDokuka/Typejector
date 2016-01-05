namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;
    import Collections = Typejector.Util.Collections;
    import Class = Typejector.Type.Class;

    export class MergeBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinitionRegistry: BeanDefinitionRegistry): void {
            const beanDefinitions = beanDefinitionRegistry.getBeanDefinitionNames()
                .map(it=> beanDefinitionRegistry.getBeanDefinition(it));
            const groupedBeanDefinitions = Collections.groupBy(beanDefinitions, (val, index) => {
                let parentsCount = 0;
                let parentClass = val.clazz;

                while ((parentClass = Class.getParentOf(parentClass))) {
                    parentsCount++;
                }

                return parentsCount;
            });

            for (let i = 1; i < groupedBeanDefinitions.size; i++) {
                groupedBeanDefinitions.get(i).forEach(val=> this.merge(val, beanDefinitionRegistry.getBeanDefinition(val.parent)));
            }
        }

        private merge(beanDefinition: BeanDefinition, superBeanDefinition: BeanDefinition) {
            if (superBeanDefinition.constructorArguments.length > beanDefinition.constructorArguments.length) {
                for (let i = beanDefinition.constructorArguments.length; i < superBeanDefinition.constructorArguments.length; i++) {
                    beanDefinition.constructorArguments[i] = superBeanDefinition.constructorArguments[i];
                }
            }

            superBeanDefinition.methods.forEach(it=> {
                if (!beanDefinition.methods.some(val=> val.name === it.name)) {
                    beanDefinition.methods.push(it);
                }
            });

            superBeanDefinition.properties.forEach(it=> {
                if (!beanDefinition.properties.some(val=> val.name === it.name)) {
                    beanDefinition.properties.push(it);
                }
            });
        }
    }
} 