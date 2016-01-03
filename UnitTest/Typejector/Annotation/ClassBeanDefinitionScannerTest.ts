namespace Typejector.Annotation {

    import Class = Typejector.Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;

    class A {
    }

    class B extends A {
    }

    class C extends B {
    }

    describe("ClassBeanDefinitionScanner Test", () => {
        it(`#scan`, () => {
            let scannedBeanDefinitions:Array<BeanDefinition>;

            Class.register(C);

            scannedBeanDefinitions = new ClassBeanDefinitionScanner().scan();

            if (!scannedBeanDefinitions || scannedBeanDefinitions.length !== 3) {
                throw new Error("Illegal array of Beans");
            }
        });
    });
}