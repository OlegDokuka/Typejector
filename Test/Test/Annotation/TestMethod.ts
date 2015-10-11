namespace Typejector.Test.Annotation {
    import TestEngine = Component.Engine.TestEngine;
    import MethodDependencyDescriptor = Typejector.Component.Context.Config.MethodDependencyDescriptor;

    export function testMethod(parent: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
        const engine = Typejector.getContext().getBean<TestEngine>(<any>TestEngine),
            methodDependencyDescriptor = new MethodDependencyDescriptor();

        methodDependencyDescriptor.parent = parent.constructor;
        methodDependencyDescriptor.annotations.push(testMethod);
        methodDependencyDescriptor.name = propertyName;

        Typejector.getContext().register(methodDependencyDescriptor);

        propertyDescriptor.value = engine.generateTest(parent.constructor, propertyName, propertyDescriptor.value);

        //return propertyDescriptor;
    }
}