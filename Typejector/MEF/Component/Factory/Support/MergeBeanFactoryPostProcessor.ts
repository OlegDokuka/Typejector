namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Typejector.Util.Collections;
    import Class = Typejector.Type.Class;
    import TypeDescriptor = Typejector.Component.Factory.Config.TypeDescriptor;

    export class MergeBeanFactoryPostProcessor extends BeanFactoryPostProcessor {

        public postProcessBeanFactory(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {
            const beanDefinitions = configurableListableBeanFactory.getBeanDefinitionNames()
                .map(it=> configurableListableBeanFactory.getBeanDefinition(it));
            const groupedBeanDefinitions = this.groupBeanDefinition(beanDefinitions);

            beanDefinitions.forEach(beanDefinition=> this.processDependencies(beanDefinition, configurableListableBeanFactory))

            //skip first group whith empty parent
            for (let i = 1; i < groupedBeanDefinitions.size; i++) {
                groupedBeanDefinitions.get(i).forEach(val=> this.merge(val, configurableListableBeanFactory.getBeanDefinition(val.parent)));
            }
        }

        private processDependencies(bean: BeanDefinition, beanFactory: ConfigurableListableBeanFactory) {
            const dependencies = new Set();
            const addToDependencies = (typeDescriptor: TypeDescriptor) => Collections.isCollection(typeDescriptor.clazz) ?
                typeDescriptor.genericTypes.forEach(type=> dependencies.add(type)) :
                dependencies.add(typeDescriptor.clazz);

            bean.constructorArguments.forEach(addToDependencies);

            bean.methods.forEach(methodDesc=> methodDesc.arguments.forEach(addToDependencies));

            bean.properties.forEach(propertyDesc=> addToDependencies(propertyDesc.clazz));

            bean.dependsOn = Collections.flatMap(
                dependencies,
                () => new Set(),
                val=> beanFactory.getBeanNamesOfType(val),
                (collections, item) => collections.add(item)
            );
        }

        private groupBeanDefinition(beanDefinitions: BeanDefinition[]) {
            return Collections.groupBy(beanDefinitions, val => {
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

            superBeanDefinition.dependsOn.forEach(dependency=> beanDefinition.dependsOn.add(dependency));
        }
    }
} 