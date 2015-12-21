namespace Typejector.Annotation {
    import Annotations = Utils.Annotations;

    export function factoryMethod(parent:any, propertyName:string|symbol):MethodDecorator {
        Annotations.add(factoryMethod, {}, parent, propertyName);
    }
}