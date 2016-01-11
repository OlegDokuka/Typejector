namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Util.Collections;
    import factoryMethod = Annotation.factoryMethod;

    export class ConfigBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        //private configurableListableBeanFactory: ConfigurableListableBeanFactory;

        postProcessBeanDefinition(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {
            // if (BeanUtils.isConfig(beanDefinition)) {
            //     this.processConfigurationBeanDefinitionDefinition(beanDefinition);
            // } else if (Class.isAssignable(<Class>BeanPostProcessor, beanDefinition.clazz)) {
            //     this.processBeanPostProcessorsDefinition(beanDefinition);
            // } else if (Class.isAssignable(<Class>BeanDefinitionPostProcessor, beanDefinition.clazz)) {
            //     this.processBeanDefinitionPostProcessorsDefinition(beanDefinition);
            // }
            configurableListableBeanFactory.getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name))
                .filter(beanDefinition=> BeanUtils.isConfig(beanDefinition))
        }

        private processFactoryMethods(beanDefinition: BeanDefinition, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            Collections.map(
                Collections.filter(beanDefinition.methods, methodDesc=> Collections.contains(methodDesc.annotations, factoryMethod)),
                () => new Set(),
                methodDesc=> configurableListableBeanFactory
                    .getBeanNamesOfType(methodDesc.returnType.clazz)
                    .map(beanName=> configurableListableBeanFactory.getBeanDefinition(beanName))
                    .filter(bd=>bd.clazz == methodDesc.returnType.clazz),
                
        }

        // private processBeanPostProcessorsDefinition(beanDefinition: BeanDefinition) {
        //     const processor = this.configurableListableBeanFactory.getBean<BeanPostProcessor>(beanDefinition.name);

        //     assert(processor, "BeanPostProcessor initialization failed");

        //     this.configurableListableBeanFactory.addBeanPostProcessor(processor);
        // }

        private processConfigurationBeanDefinitionDefinition(beanDefinition: BeanDefinition) {
            // const targetObject = this.configurableListableBeanFactory.getBean(beanDefinition.clazz);

            // Collections.filter(beanDefinition.methods, (it) => Collections.contains(it.annotations, factoryMethod)).forEach((it) => {
            //     const beanNameForFactoryMethod = BeanNameGenerator.generateBeanName(it.returnType.clazz),
            //         objectGetter = () => {
            //             const resolvedArguments = it.arguments.map((arg) => this.configurableListableBeanFactory.resolveDependency(arg));


            //             return targetObject[it.name].call(targetObject, ...resolvedArguments);
            //         },
            //         providedBeanDefinition = BeanUtils.getOrCreateBeanDefinition(this.configurableListableBeanFactory, it.returnType.clazz);


            //     this.configurableListableBeanFactory.registerFactory(beanNameForFactoryMethod, { getObject: objectGetter });

            //     providedBeanDefinition.factoryMethodName = beanNameForFactoryMethod;

            //     this.configurableListableBeanFactory.registerBeanDefinition(providedBeanDefinition.name, providedBeanDefinition);
            // });
        }
    }
} 