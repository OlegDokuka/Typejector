/// <reference path="../../Typejector/MEF/Typejector.ts"/>
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts"/>
/// <reference path="Component/Engine/TestEngine.ts"/>
/// <reference path="Component/Engine/Jasmine/JasmineTestEngine.ts"/>
/// <reference path="Annotation/TestCase.ts"/>
/// <reference path="Annotation/TestMethod.ts"/>
/// <reference path="Component/Config/TestCaseBeenPostProcessor.ts"/>
/// <reference path="Component/Config/TestCaseBeenDefinitionPostProcessor.ts"/>
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

    describe("Test application", () => {
        let bean = Typejector.getContext().getBean<TestClass>(TestClass);

        it("test", () => {
            expect(bean.test.test).toEqual("Yoio");
        });
    });
}