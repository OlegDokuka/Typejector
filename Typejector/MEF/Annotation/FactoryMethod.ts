namespace Typejector.Annotation {
    import MethodDependencyDescriptor = Component.Context.Config.MethodDependencyDescriptor;
    import Class = Type.Class;
    import TypeDescriptor = Component.Factory.Config.TypeDescriptor;

    export function factoryMethod(returnType: Class): MethodDecorator {
        return (parent: any, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
            const dependencyDescriptor = new MethodDependencyDescriptor(),
                typeDescriptor = new TypeDescriptor();

            typeDescriptor.clazz = returnType;
            dependencyDescriptor.annotations.push(factoryMethod);
            dependencyDescriptor.parent = parent.constructor;
            dependencyDescriptor.name = propertyName;
            dependencyDescriptor.returnType = typeDescriptor;

            Typejector.getContext().register(dependencyDescriptor);
        };
    }
}