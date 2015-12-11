/// <reference path="../../Typejector/MEF/Typejector.ts"/>
/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/expect.js/expect.js.d.ts"/>
/// <reference path="Component/Engine/TestEngine.ts"/>
/// <reference path="Component/Engine/Mocha/MochaTestEngine.ts"/>
/// <reference path="Annotation/TestCase.ts"/>
/// <reference path="Annotation/TestMethod.ts"/>
/// <reference path="Component/Config/TestCaseBeanPostProcessor.ts"/>
/// <reference path="Component/Config/TestCaseBeanDefinitionPostProcessor.ts"/>
module Typejector.Test {
    import injection = Typejector.Annotation.injection;
    import inject = Typejector.Annotation.inject;
    import ApplicationContext = Typejector.Component.Context.ApplicationContext;
    import testMethod = Test.Annotation.testMethod;
    import testCase = Test.Annotation.testCase;
    import config = Typejector.Annotation.config;
    import factoryMethod = Typejector.Annotation.factoryMethod;

    @injection
    export class MockClass {
        test = "Hi";
    }
    @config
    export class TestConfig {
        @factoryMethod(MockClass)
        getMock() {
            const mock = new MockClass();

            mock.test = "Yoio";

            return mock;
        }
    }

    @injection
    export class TestClass {
        @inject(MockClass)
        test: MockClass;

        @inject(ApplicationContext)
        context: ApplicationContext;
    }

    @testCase
    export class MyFirstTestCase {
        @testMethod
        public firstTestMethod() {
            return true;
        }
    }
}