namespace Typejector.Component.Context {
    import Class = Type.Class;
    import ConfigurableListableBeanFactory = Factory.ConfigurableListableBeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import BeanDefinition = Component.Factory.Config.BeanDefinition;
    import BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
    import Bean = Component.Factory.Support.Bean;
    import BeanFactoryPostProcessor = Typejector.Component.Factory.BeanFactoryPostProcessor;
    import DefaultBeanFactoryPostProcessor = Component.Factory.Support.DefaultBeanFactoryPostProcessor;
    import MergeBeanFactoryPostProcessor = Component.Factory.Support.MergeBeanFactoryPostProcessor;
    import ConfigBeanFactoryPostProcessor = Component.Factory.Support.ConfigBeanFactoryPostProcessor;
    import InstantiationBeanFactoryPostProcessor = Component.Factory.Support.InstantiationBeanFactoryPostProcessor;
    import MergedBeanFactoryPostProcessor = Component.Factory.MergedBeanFactoryPostProcessor;
    import MethodDependencyDescriptor = Config.MethodDependencyDescriptor;
    import singleton = Annotation.singleton;
    import SingletonScope = Typejector.Component.Factory.Support.SingletonScope;

    export class ApplicationContext implements Context {
        private mainBeanFactory: ConfigurableListableBeanFactory = new Factory.Support.DefaultListableBeanFactory();
        private beanFactoryPostProcessors: BeanFactoryPostProcessor[] = [];

        //TODO: Add autoconfiguration for avoding initialization in constructor
        constructor() {
        }

        refresh() {
            const singletonScope = this.mainBeanFactory.getRegisteredScope(SingletonScope.NAME);
            
            this.beanFactoryPostProcessors = [];
            this.mainBeanFactory.getBeanDefinitionNames().forEach(name=> singletonScope.remove(name));
            
            this.initialize();
            this.initializePostProcessors();
            
            this.beanFactoryPostProcessors
                .filter(bfpp=> !(bfpp instanceof MergedBeanFactoryPostProcessor))
                .forEach(bfpp=> bfpp.postProcessBeanFactory(this.mainBeanFactory));
            this.beanFactoryPostProcessors
                .filter(bfpp=> (bfpp instanceof MergedBeanFactoryPostProcessor))
                .forEach(bfpp=> bfpp.postProcessBeanFactory(this.mainBeanFactory));
        }

        private initializePostProcessors() {
            this.beanFactoryPostProcessors.push(new DefaultBeanFactoryPostProcessor());
            this.beanFactoryPostProcessors.push(new MergeBeanFactoryPostProcessor());
            this.beanFactoryPostProcessors.push(new ConfigBeanFactoryPostProcessor());
            this.beanFactoryPostProcessors.push(new InstantiationBeanFactoryPostProcessor(this));
        }

        private initialize(): void {
            const applicationContextBeanDefinition = new Bean();

            applicationContextBeanDefinition.name = BeanNameGenerator.generateBeanName(ApplicationContext);
            applicationContextBeanDefinition.clazz = ApplicationContext;
            applicationContextBeanDefinition.factoryMethodName = applicationContextBeanDefinition.name;
            applicationContextBeanDefinition.annotations.add(singleton);

            this.mainBeanFactory.registerFactory(applicationContextBeanDefinition.factoryMethodName, {
                getObject: () => this
            });
            this.mainBeanFactory.registerBeanDefinition(applicationContextBeanDefinition.name, applicationContextBeanDefinition);
        }

        register(typeDescriptor: TypeDescription) {
        }

        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
        getBean<T>(item: Class | string): T {
            return this.mainBeanFactory.getBean<T>(<any>item);
        }

        getBeanFactory(): ConfigurableListableBeanFactory { return this.mainBeanFactory; }


        addBeanFactoryPostProcessor(beanFactoryPostProcessor: BeanFactoryPostProcessor) {
            this.beanFactoryPostProcessors.push(beanFactoryPostProcessor);
        }

        run() {
            const beanDefinitions = new Annotation.ClassBeanDefinitionScanner().scan();

            beanDefinitions.forEach(beanDefinition=> this.mainBeanFactory.registerBeanDefinition(BeanNameGenerator.generateBeanName(beanDefinition.clazz), beanDefinition));
            this.refresh();
        }
    }
}