namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import Collections = Util.Collections;
    import factoryMethod = Annotation.factoryMethod;

    export class ConfigBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        private configurableListableBeanFactory:ConfigurableListableBeanFactory;

        constructor(beanDefinitionRegistry:ConfigurableListableBeanFactory) {
            super();
            this.configurableListableBeanFactory = beanDefinitionRegistry;
        }

        postProcessBeanDefinition(beanDefinition:BeanDefinition):void {
            if (BeanUtils.isConfig(beanDefinition)) {
                this.processConfigurationBeanDefinitionDefinition(beanDefinition);
            } else if (BeanUtils.isAssignable(<Class>BeanPostProcessor, beanDefinition.clazz)) {
                this.processBeanPostProcessorsDefinition(beanDefinition);
            } else if (BeanUtils.isAssignable(<Class>BeanDefinitionPostProcessor, beanDefinition.clazz)) {
                this.processBeanDefinitionPostProcessorsDefinition(beanDefinition);
            }
        }

        private processBeanDefinitionPostProcessorsDefinition(beanDefinition:BeanDefinition) {
            const processor = this.configurableListableBeanFactory.getBean<BeanDefinitionPostProcessor>(beanDefinition.name);

            assert(processor, "BeanDefinitionPostProcessor initialization failed");

            this.configurableListableBeanFactory.addBeanDefinitionPostProcessor(processor);
        }

        private processBeanPostProcessorsDefinition(beanDefinition:BeanDefinition) {
            const processor = this.configurableListableBeanFactory.getBean<BeanPostProcessor>(beanDefinition.name);

            assert(processor, "BeanPostProcessor initialization failed");

            this.configurableListableBeanFactory.addBeanPostProcessor(processor);
        }

        private processConfigurationBeanDefinitionDefinition(beanDefinition:BeanDefinition) {
            const targetObject = this.configurableListableBeanFactory.getBean(beanDefinition.clazz);

            beanDefinition.methods.filter((it) => Collections.contains(it.annotations, factoryMethod)).forEach((it) => {
                const beanNameForFactoryMethod = BeanNameGenerator.generateBeanName(it.returnType.clazz),
                    objectGetter = () => {
                        const resolvedArguments = it.arguments.map((arg) => this.configurableListableBeanFactory.resolveDependency(arg));


                        return targetObject[it.name].call(targetObject, ...resolvedArguments);
                    },
                    providedBeanDefinition = BeanUtils.getOrCreateBeanDefinition(this.configurableListableBeanFactory, it.returnType.clazz);


                this.configurableListableBeanFactory.registerFactory(beanNameForFactoryMethod, {getObject: objectGetter});

                providedBeanDefinition.factoryMethodName = beanNameForFactoryMethod;

                this.configurableListableBeanFactory.registerBeanDefinition(providedBeanDefinition.name, providedBeanDefinition);
            });
        }
    }
} 