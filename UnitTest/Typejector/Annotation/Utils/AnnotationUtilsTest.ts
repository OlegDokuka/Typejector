/**
 * Created by Shadowgun on 20.12.2015.
 */
namespace Typejector.Annotation.Utils {
    function testAnnotation() {

    }

    describe("AnnotationUtils Test", () => {
        it(`#add`, () => {
            AnnotationUtils.add(testAnnotation, {test: "hi"}, testAnnotation, "test");
        });
        it(`#get`, () => {

            const result:Map<any,any> = AnnotationUtils.get(testAnnotation, "test");

            assert(result);

            if (!result.size) {
                throw new Error("Empty map");
            }
        });
    });
}