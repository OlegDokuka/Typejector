namespace Typejector.Annotation {
    import Reflection = Typejector.Util.Reflection;
    import Class = Typejector.Type.Class;

    export function factoryMethod(parent: any, propertyName: string | symbol) {
        const returnType: Class = Reflection.getReturnType(parent, propertyName);

        Annotations.add(factoryMethod, {}, parent, propertyName);
        Class.register(returnType);
    }
}