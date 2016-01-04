namespace Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    import BeanDefinitionRegistry = Registry.BeanDefinitionRegistry;

    export class MergeBeanDefinitionPostProcessor extends  BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinitionRegistry: BeanDefinitionRegistry): void {
            beanDefinitionRegistry.getBeanDefinitionNames()
                .map(it=> beanDefinitionRegistry.getBeanDefinition(it))
                .filter(it=> it.clazz !== beanDefinition.clazz && BeanUtils.isAssignable(it.clazz, beanDefinition.clazz))
                .forEach(it=> this.merge(beanDefinition, it));
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