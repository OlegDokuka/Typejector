namespace Typejector.Test.Component.Engine {
    import singleton = Typejector.Annotation.singleton;
    import Class = Type.Class;

    @singleton
    export class MochaTestEngine extends TestEngine {
        public generateTest(owner:Class, methodName:string, method:Function):Function {
            // ReSharper disable once Lambda
            const jasmineTest = function () {
                describe("Test application", () => {
                    it(`Test Method: ${methodName}`, () => {
                        // ReSharper disable once SuspiciousThisUsage
                        assert(method.call(this));
                    });
                });
            };

            return jasmineTest;
        }
    }
}