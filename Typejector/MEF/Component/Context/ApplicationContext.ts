namespace Typejector.Component.Context {
    import Class = Type.Class;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import BeanDescriptor = Config.BeanDescriptor;
    import ConstructorDependencyDescriptor = Config.ConstructorDependencyDescriptor;
    import FieldDependencyDescriptor = Config.FieldDependencyDescriptor;
    import MethodDependencyDescriptor = Config.MethodDependencyDescriptor;
    import BeanDefinition = Component.Factory.Config.BeanDefinition;
    import BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
    import MethodDescriptor = Component.Factory.Config.MethodDescriptor;
    import Bean = Component.Factory.Support.Bean;
    import DefaultBeanDefinitionPostProcessor = Component.Factory.Support.DefaultBeanDefinitionPostProcessor;
    import MergeBeanDefinitionPostProcessor = Component.Factory.Support.MergeBeanDefinitionPostProcessor;

    export class ApplicationContext implements Context {
        private mainBeanFactory = new Factory.Support.DefaultListableBeanFactory();

        //TODO: Add autoconfiguration for avoding initialization in constructor
        constructor() {
            this.mainBeanFactory.addBeanDefinitionPostProcessor(new DefaultBeanDefinitionPostProcessor());
            this.mainBeanFactory.addBeanDefinitionPostProcessor(new MergeBeanDefinitionPostProcessor());
        }

        register(typeDescriptor: TypeDescription) {
            let beanDefinition: BeanDefinition;

            if (typeDescriptor instanceof DependencyDescriptor) {
                beanDefinition = this.doGetOrCreateBeanDefinition(typeDescriptor.parent);

                if (typeDescriptor instanceof MethodDependencyDescriptor) {
                    let methodDescriptor: MethodDescriptor;

                    methodDescriptor = (methodDescriptor = beanDefinition.methods
                        .filter((md) => md.name === typeDescriptor.name)[0]) ? methodDescriptor :
                        (beanDefinition.methods[beanDefinition.methods.push({
                            name: typeDescriptor.name,
                            arguments: []
                        }) - 1]);

                    methodDescriptor.arguments[typeDescriptor.position] = typeDescriptor;
                }
                else if (typeDescriptor instanceof ConstructorDependencyDescriptor) {
                    beanDefinition.constructorArguments[typeDescriptor.position] = typeDescriptor;
                }
                else if (typeDescriptor instanceof FieldDependencyDescriptor) {
                    beanDefinition.properties.push({ name: typeDescriptor.name, clazz: typeDescriptor });
                }
            }
            else if (typeDescriptor instanceof BeanDescriptor) {
                beanDefinition = this.doGetOrCreateBeanDefinition(typeDescriptor.clazz);

                beanDefinition.metadata = typeDescriptor.metadata;

            }

            assert(beanDefinition, "no bean definition resolved from passed info");

            this.mainBeanFactory.registerBeanDefinition(beanDefinition.name, beanDefinition);
        }

        protected doGetOrCreateBeanDefinition(clazz: Class): BeanDefinition {
            let beanDefinition: BeanDefinition,
                beanName: string;

            beanName = BeanNameGenerator.generateBeanName(clazz);

            if (this.mainBeanFactory.containsBeanDefinition(beanName)) {
                beanDefinition = this.mainBeanFactory.getBeanDefinition(beanName);
            }
            else {
                beanDefinition = new Bean();
                beanDefinition.clazz = clazz;
                beanDefinition.name = beanName;
            }

            return beanDefinition;
        }

        containsBean(beanName: string): boolean
        containsBean(clazz: Class): boolean
        containsBean(item: Class|string): boolean {
            return this.mainBeanFactory.containsBean(<any>item);
        }

        getBean<T>(beanName: string): T
        getBean<T>(clazz: Class): T
        getBean<T>(item: Class|string): T {
            return this.mainBeanFactory.getBean<T>(<any>item);
        }
    }
}