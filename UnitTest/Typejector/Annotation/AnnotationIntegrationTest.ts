namespace Typejector.Annotation {
    import Annotations =  Typejector.Annotation.Annotations;

    describe("Annotations Integration Test", () => {
        it("Inject Annotation Existing Test", () => {
            class Test {
                @inject
                prop:String
            }

            const result:Map<any,any> = Annotations.get(Test.prototype, "prop");

            if (result.size === 0 || result.get(inject) == undefined) {
                throw new Error("There are no annoataion presented")
            }
        });
    });
}