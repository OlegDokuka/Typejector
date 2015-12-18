///<reference path="../../Test/Compiled/typejector.d.ts"/>
namespace Example.TestEngine {
    import injection = Typejector.Annotation.injection;
    import inject = Typejector.Annotation.inject;
    import ApplicationContext = Typejector.Component.Context.ApplicationContext;
    import testMethod = Typejector.Test.Annotation.testMethod;
    import testCase = Typejector.Test.Annotation.testCase;
    import config = Typejector.Annotation.config;
    import factoryMethod = Typejector.Annotation.factoryMethod;
    import postConstructor = Typejector.Annotation.postConstructor;

    @testCase
    export class MyFirstTestCase {
        @testMethod
        public firstTestMethod() {
            expect(true).to.ok()
        }
    }

    export class SecCLass extends MyFirstTestCase{

    }

    mocha.run();
}



