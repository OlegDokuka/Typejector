namespace Typejector.Component.Factory.Support {

    describe("Provider Integration Test", () => {
        it("Test that provider correctly works", () => {
            const testObj = {};

            Object.defineProperty(testObj, "testProp", Provider.of(() => "Hello World!"));

            if (testObj["testProp"] !== "Hello World!") {
                throw new Error("Provider return unexpected value");
            }
        });
    });
}