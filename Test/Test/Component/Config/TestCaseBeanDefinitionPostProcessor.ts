namespace Typejector.Test.Component.Config {
    import singleton = Typejector.Annotation.singleton;
    import Collections = Util.Collections;
    import testCase = Test.Annotation.testCase;
    import testMethod = Test.Annotation.testMethod;
    import inject = Typejector.Annotation.inject;
    import ApplicationContext = Typejector.Component.Context.ApplicationContext;
    import BeanDefinitionPostProcessor = Typejector.Component.Factory.BeanDefinitionPostProcessor;

    @singleton
    export class TestCaseBeanDefinitionPostProcessor extends BeanDefinitionPostProcessor {
        @inject
        private context: ApplicationContext;

        postProcessBeanDefinition(beanDefinition: Typejector.Component.Factory.Config.BeanDefinition): void {
            if (Collections.contains(beanDefinition.annotations, testCase)) {
                assert(this.context.getBean(beanDefinition.clazz), "TestCase instantiation failed");
            }
        }
    }
}