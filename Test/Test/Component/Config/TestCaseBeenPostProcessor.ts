namespace Typejector.Test.Component.Config {
    import singleton = Typejector.Annotation.singleton;
    import BeanPostProcessor = Typejector.Component.Factory.BeanPostProcessor;
    import ArrayUtils = Util.ArrayUtils;
    import testCase = Test.Annotation.testCase;
    import testMethod = Test.Annotation.testMethod;
    import inject = Typejector.Annotation.inject;
    import ApplicationContext = Typejector.Component.Context.ApplicationContext;

    @singleton
    export class TestCaseBeenPostProcessor extends BeanPostProcessor {
        @inject(ApplicationContext)
        private context: ApplicationContext;

        postProcessAfterInitialization<T>(bean: T, beanDefinititon: Typejector.Component.Factory.Config.BeanDefinition): T {
            if (ArrayUtils.contains(beanDefinititon.annotations, testCase)) {
                beanDefinititon.methods.filter(it=> ArrayUtils.contains(it.annotations, testMethod)).forEach(it => {
                    const resolvedArguments = it.arguments.map(arg => this.context.getBeanFactory().resolveDependency(arg));

                    bean[it.name].call(bean, ...resolvedArguments);
                });
            }

            return bean;
        }

        postProcessBeforeInitialization<T>(bean: T, beanDefinititon: Typejector.Component.Factory.Config.BeanDefinition): T {
            return bean;
        }
    }
}