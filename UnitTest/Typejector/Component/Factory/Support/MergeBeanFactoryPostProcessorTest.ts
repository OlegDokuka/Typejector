namespace Typejector.Component.Factory.Support {
    import inject = Typejector.Annotation.inject;

    class ParentOfMock {
        @inject
        anotherProp: ParentOfMock;

        @inject
        parenttestmethod(arg: ParentOfMock) {
        }
    }

    class MockClass extends ParentOfMock {
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

    function createParentOfMockBeanDefinition() {
        const bean = new Bean();
        bean.clazz = ParentOfMock;

        return bean;
    }

    describe("MergeBeanDefinitionPostProcessor Integration Test", () => {
        it("Test MergeBeanDefinitionPostProcessor#postProcessBeanDefinition method initialize bean definition correctly", () => {
            const registry = new DefaultListableBeanFactory();
            const mockBean = createMockBeanDefinition();
            const parentOfMockBean = createParentOfMockBeanDefinition();

            registry.registerBeanDefinition("MockClass", mockBean);
            registry.registerBeanDefinition("ParentOfMock", parentOfMockBean);

            new DefaultBeanFactoryPostProcessor().postProcessBeanFactory(registry);
            new MergeBeanFactoryPostProcessor().postProcessBeanFactory(registry);

            if (mockBean.methods.size != 2 || mockBean.properties.size != 2 || mockBean.dependsOn.size != 2) {
                throw new Error("Incorrect BeanDefinition expected");
            }
        });
    });
}