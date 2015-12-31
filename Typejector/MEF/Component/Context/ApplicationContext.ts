namespace Typejector.Component.Context {
    import Class = Type.Class;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import BeanDescriptor = Config.BeanDescriptor;
    import ArgumentDependencyDescriptor = Config.ArgumentDependencyDescriptor;
    import FieldDependencyDescriptor = Config.FieldDependencyDescriptor;
    import BeanDefinition = Component.Factory.Config.BeanDefinition;
    import BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
    import Bean = Component.Factory.Support.Bean;
    import DefaultBeanDefinitionPostProcessor = Component.Factory.Support.DefaultBeanDefinitionPostProcessor;
    import MergeBeanDefinitionPostProcessor = Component.Factory.Support.MergeBeanDefinitionPostProcessor;
    import ConfigBeanDefinitionPostProcessor = Component.Factory.Support.ConfigBeanDefinitionPostProcessor;
    import MethodDependencyDescriptor = Config.MethodDependencyDescriptor;
    import singleton = Annotation.singleton;

    export class ApplicationContext implements Context {
        private mainBeanFactory: ConfigurableListableBeanFactory = new Factory.Support.DefaultListableBeanFactory();

        //TODO: Add autoconfiguration for avoding initialization in constructor
        constructor() {
            this.mainBeanFactory.addBeanDefinitionPostProcessor(new DefaultBeanDefinitionPostProcessor());
            this.mainBeanFactory.addBeanDefinitionPostProcessor(new MergeBeanDefinitionPostProcessor(this.mainBeanFactory));
            this.mainBeanFactory.addBeanDefinitionPostProcessor(new ConfigBeanDefinitionPostProcessor(this.mainBeanFactory));
            
            this.initialize();
        }

        private initialize(): void {
            const applicationContextBeanDefinition = new Bean();

            applicationContextBeanDefinition.name = BeanNameGenerator.generateBeanName(ApplicationContext);
            applicationContextBeanDefinition.clazz = ApplicationContext;
            applicationContextBeanDefinition.factoryMethodName = applicationContextBeanDefinition.name;
            applicationContextBeanDefinition.annotations.push(singleton);

            this.mainBeanFactory.registerFactory(applicationContextBeanDefinition.factoryMethodName, {
                getObject: () => this
            });
            this.mainBeanFactory.registerBeanDefinition(applicationContextBeanDefinition.name, applicationContextBeanDefinition);
        }

        register(typeDescriptor: TypeDescription) {
            let beanDefinition: BeanDefinition;

            if (typeDescriptor instanceof DependencyDescriptor) {
                beanDefinition = BeanUtils.getOrCreateBeanDefinition(this.mainBeanFactory, typeDescriptor.parent);

                if (typeDescriptor instanceof ArgumentDependencyDescriptor) {
                    if (typeDescriptor.methodName) {
                        const methodDescriptor = BeanUtils.getOrCreateMethodDescriptor(beanDefinition, typeDescriptor.methodName);
                        methodDescriptor.arguments[typeDescriptor.position] = typeDescriptor;
                    }
                    else {
                        beanDefinition.constructorArguments[typeDescriptor.position] = typeDescriptor;
                    }
                }
                else if (typeDescriptor instanceof MethodDependencyDescriptor) {
                    const existedMethodDescriptor = BeanUtils.getMethodDescriptor(beanDefinition, typeDescriptor.name);

                    if (existedMethodDescriptor) {
                        existedMethodDescriptor.arguments.push(...typeDescriptor.arguments);
                        existedMethodDescriptor.annotations.push(...typeDescriptor.annotations);
                        existedMethodDescriptor.returnType = typeDescriptor.returnType ? typeDescriptor.returnType : existedMethodDescriptor.returnType;
                    } else {
                        beanDefinition.methods.push(typeDescriptor);
                    }
                } else if (typeDescriptor instanceof FieldDependencyDescriptor) {
                    beanDefinition.properties.push({ name: typeDescriptor.name, clazz: typeDescriptor, annotations: typeDescriptor.annotations });
                }
            }
            else if (typeDescriptor instanceof BeanDescriptor) {
                beanDefinition = BeanUtils.getOrCreateBeanDefinition(this.mainBeanFactory, typeDescriptor.clazz);

                beanDefinition.annotations = typeDescriptor.annotations;
            }

            assert(beanDefinition, "no bean definition resolved from passed info");

            this.mainBeanFactory.registerBeanDefinition(beanDefinition.name, beanDefinition);
        }



        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        containsBean(item: Class | string): boolean {
            return this.mainBeanFactory.containsBean(<any>item);
        }

        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
        getBean<T>(item: Class | string): T {
            return this.mainBeanFactory.getBean<T>(<any>item);
        }

        getBeanFactory(): ConfigurableListableBeanFactory { return this.mainBeanFactory; }
    }
}