namespace Typejector.Component.Factory.Support {
    import inject = Typejector.Annotation.inject;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;

    class ParentOfMock {
    }

    class MockClass {
        @inject
        prop: ParentOfMock;
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

    describe("InstantiationBeanFactoryPostProcessor Integration Test", () => {
        it("Test InstantiationBeanFactoryPostProcessor#postProcessBeanDefinition method initialize bean definition correctly", () => {
            const registry = new DefaultListableBeanFactory();
            const mockBean = createMockBeanDefinition();
            const parentOfMockBean = createParentOfMockBeanDefinition();
            let sortedBeanDefinitions: BeanDefinition[];

            registry.registerBeanDefinition("MockClass", mockBean);
            registry.registerBeanDefinition("ParentOfMock", parentOfMockBean);

            new DefaultBeanFactoryPostProcessor().postProcessBeanFactory(registry);
            new MergeBeanFactoryPostProcessor().postProcessBeanFactory(registry);
            sortedBeanDefinitions = (<any>new InstantiationBeanFactoryPostProcessor()).sortBeanDefinitions(registry);

            if (sortedBeanDefinitions[0] !== parentOfMockBean && sortedBeanDefinitions[1] !== mockBean) {
                throw new Error("Incorrect sorting expected");
            }
        });
    });
}