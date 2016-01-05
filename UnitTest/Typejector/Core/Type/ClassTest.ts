namespace Typejector.Type {
    describe("Class Test", () => {
        it(`#getParentOf should return undefined for Function`, () => {
            const parent = Class.getParentOf(Function);

            if (parent) {
                throw new Error("Parent of Function should be undefined")
            }
        });

        it(`#getParentOf should return something for {new Object()}`, () => {
            const parent = Class.getParentOf({});

            if (!parent) {
                throw new Error("Parent of {} should not be undefined");
            }
        });

        it(`#getParentOf should return something for String`, () => {
            const parent = Class.getParentOf("");

            if (!parent) {
                throw new Error("Parent of {} should not be undefined");
            }
        });
    });
}