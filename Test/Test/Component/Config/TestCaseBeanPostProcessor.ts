﻿namespace Typejector.Test.Component.Config {
    import singleton = Typejector.Annotation.singleton;
    import BeanPostProcessor = Typejector.Component.Factory.BeanPostProcessor;
    import Collections = Util.Collections;
    import testCase = Test.Annotation.testCase;
    import testMethod = Test.Annotation.testMethod;
    import inject = Typejector.Annotation.inject;
    import ApplicationContext = Typejector.Component.Context.ApplicationContext;

    @singleton
    export class TestCaseBeanPostProcessor extends BeanPostProcessor {
        @inject context: ApplicationContext;

        postProcessAfterInitialization<T>(bean: T, beanDefinition: Typejector.Component.Factory.Config.BeanDefinition): T {
            if (Collections.contains(beanDefinition.annotations, testCase)) {
                beanDefinition.methods.filter(it=> Collections.contains(it.annotations, testMethod)).forEach(it => {
                    const resolvedArguments = it.arguments.map(arg => this.context.getBeanFactory().resolveDependency(arg));

                    bean[it.name].call(bean, ...resolvedArguments);
                });
            }

            return bean;
        }

        postProcessBeforeInitialization<T>(bean: T, beanDefinition: Typejector.Component.Factory.Config.BeanDefinition): T {
            return bean;
        }
    }
}