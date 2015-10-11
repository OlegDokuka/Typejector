namespace Typejector.Test.Component.Engine {
    import singleton = Typejector.Annotation.singleton;
    import Class = Type.Class;

    @singleton
    export class JasmineTestEngine extends TestEngine {
        public generateTest(owner: Class, mathodName: string, method: Function): Function {
            // ReSharper disable once Lambda
            const jasmineTest = function () {
                describe("Test application", () => {
                    it(`Test Method: ${mathodName}`, () => {
                        // ReSharper disable once SuspiciousThisUsage
                        expect(method.call(this)).toBeDefined();
                    });
                });
            };

            return jasmineTest;
        }
    }
}