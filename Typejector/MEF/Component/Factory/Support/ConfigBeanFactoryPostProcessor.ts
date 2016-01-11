namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Util.Collections;
    import factoryMethod = Annotation.factoryMethod;

    export class ConfigBeanFactoryPostProcessor extends DefaultBeanFactoryPostProcessor {
        
        postProcessBeanFactory(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {
            configurableListableBeanFactory.getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name))
                .filter(beanDefinition=> BeanUtils.isConfig(beanDefinition))
                .forEach(beanDefinition=> this.processFactoryMethods(beanDefinition, configurableListableBeanFactory));
        }

        private processFactoryMethods(beanDefinition: BeanDefinition, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            Collections.filter(beanDefinition.methods, methodDesc=> Collections.contains(methodDesc.annotations, factoryMethod))
                .forEach(methodDesc=> this.initializaFactoryMethod(
                    Collections.firstOrDefault(configurableListableBeanFactory
                        .getBeanNamesOfType(methodDesc.returnType.clazz)
                        .map(beanName=> configurableListableBeanFactory.getBeanDefinition(beanName))
                        .filter(bd=> bd.clazz == methodDesc.returnType.clazz),
                        () => this.initializeDefaultBeanDefinition(methodDesc, configurableListableBeanFactory)
                    ), beanDefinition, methodDesc, configurableListableBeanFactory
                ));
        }

        private initializeDefaultBeanDefinition(methodDescriptor: Config.MethodDescriptor, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const beanDefinition = new Bean();

            beanDefinition.clazz = methodDescriptor.returnType.clazz;
            this.processBeanDefinition(beanDefinition, configurableListableBeanFactory);
            configurableListableBeanFactory.registerBeanDefinition(BeanNameGenerator.generateBeanName(beanDefinition.clazz), beanDefinition);

            return beanDefinition;
        }

        private initializaFactoryMethod(beanDefinition: BeanDefinition, configBeanDefiniton: BeanDefinition, factoryMethodDescriptor: Config.MethodDescriptor, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const objectGetter = () => {
                const targetObject = configurableListableBeanFactory.getBean(configBeanDefiniton.clazz);
                const resolvedArguments = factoryMethodDescriptor.arguments.map((arg) => configurableListableBeanFactory.resolveDependency(arg));

                return targetObject[factoryMethodDescriptor.name].call(targetObject, ...resolvedArguments);
            };

            beanDefinition.factoryMethodName = `${configBeanDefiniton.name}#${factoryMethodDescriptor.name}`;
            configurableListableBeanFactory.registerFactory(beanDefinition.factoryMethodName, { getObject: objectGetter })
        }
    }
} 