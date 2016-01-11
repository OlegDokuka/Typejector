namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Typejector.Util.Collections;
    import Class = Typejector.Type.Class;

    export class MergeBeanFactoryPostProcessor extends BeanFactoryPostProcessor {

        public postProcessBeanDefinition(beanDefinitionRegistry: ConfigurableListableBeanFactory): void {
            const beanDefinitions = beanDefinitionRegistry.getBeanDefinitionNames()
                .map(it=> beanDefinitionRegistry.getBeanDefinition(it));
            const groupedBeanDefinitions = this.groupBeanDefinition(beanDefinitions);
            
            //skip first group whith empty parent
            for (let i = 1; i < groupedBeanDefinitions.size; i++) {
                groupedBeanDefinitions.get(i).forEach(val=> this.merge(val, beanDefinitionRegistry.getBeanDefinition(val.parent)));
            }
        }

        private groupBeanDefinition(beanDefinitions: BeanDefinition[]) {
            return Collections.groupBy(beanDefinitions, (val, index) => {
                let parentsCount = 0;
                let parentClass = val.clazz;

                while ((parentClass = Class.getParentOf(parentClass))) {
                    parentsCount++;
                }

                return parentsCount;
            });
        }

        private merge(beanDefinition: BeanDefinition, superBeanDefinition: BeanDefinition) {
            superBeanDefinition.methods.forEach(it=> {
                if (!Collections.some(beanDefinition.methods, (val=> val.name === it.name))) {
                    beanDefinition.methods.add(it);
                }
            });

            superBeanDefinition.properties.forEach(it=> {
                if (!Collections.some(beanDefinition.properties, (val=> val.name === it.name))) {
                    beanDefinition.properties.add(it);
                }
            });

            superBeanDefinition.dependsOn.forEach(dependency=>beanDefinition.dependsOn.add(dependency));
        }
    }
} 