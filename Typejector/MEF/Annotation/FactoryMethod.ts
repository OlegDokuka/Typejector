namespace Typejector.Annotation {

    export function factoryMethod(parent:any, propertyName:string|symbol):MethodDecorator {
        Annotations.add(factoryMethod, {}, parent, propertyName);
    }
}