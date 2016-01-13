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
                .forEach(methodDesc=> {
                    const returnBeanClass = methodDesc.returnType.clazz;
                    let returnBeanDefinition: BeanDefinition;

                    if (configurableListableBeanFactory.containsBeanDefinition(returnBeanClass)) {
                        returnBeanDefinition = configurableListableBeanFactory.getBeanDefinition(returnBeanClass)
                    } else {
                        returnBeanDefinition = this.initializeDefaultBeanDefinition(methodDesc, configurableListableBeanFactory);
                    }

                    this.initializaFactoryMethod(returnBeanDefinition, beanDefinition, methodDesc, configurableListableBeanFactory)
                });

            this.lookupParentBeanDefinition(beanDefinition, configurableListableBeanFactory);
        }

        private initializeDefaultBeanDefinition(methodDescriptor: Config.MethodDescriptor, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const beanDefinition = new Bean();

            beanDefinition.clazz = methodDescriptor.returnType.clazz;
            this.processBeanDefinition(beanDefinition, configurableListableBeanFactory);
            configurableListableBeanFactory.registerBeanDefinition(BeanNameGenerator.generateBeanName(beanDefinition.clazz), beanDefinition);

            return beanDefinition;
        }

        private lookupParentBeanDefinition(beanDefinition: BeanDefinition, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const parentClass = Class.getParentOf(beanDefinition.clazz);

            if (parentClass && configurableListableBeanFactory.containsBeanDefinition(parentClass)) {
                const parentBeanDefinition = configurableListableBeanFactory.getBeanDefinition(parentClass);

                this.processFactoryMethods(parentBeanDefinition, configurableListableBeanFactory);
            }
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