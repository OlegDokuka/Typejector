namespace Typejector.Component.Factory.Support {
    import inject = Typejector.Annotation.inject;

    class MockClass {
        @inject
        prop: MockClass;

        @inject
        testmethod(arg: MockClass) {
        }
    }

    function createMockBeanDefinition() {
        const bean = new Bean();
        bean.clazz = MockClass;

        return bean;
    }

    describe("DefaultBeanDefinitionPostProcessor Integration Test", () => {
        it("Test DefaultBeanDefinitionPostProcessor#postProcessBeanDefinition method initialize bean definition correctly", () => {
            const registry = new DefaultListableBeanFactory();
            const mockBean = createMockBeanDefinition();

            registry.registerBeanDefinition("MockClass", mockBean);

            new DefaultBeanDefinitionPostProcessor().postProcessBeanDefinition(<any>registry);

            if (!mockBean.methods.size || !mockBean.properties.size || !mockBean.dependsOn.size) {
                throw new Error("Incorrect BeanDefinition expected");
            }
        });
    });
}