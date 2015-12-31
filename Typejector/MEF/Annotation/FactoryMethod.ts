namespace Typejector.Annotation {

    export function factoryMethod(parent:any, propertyName:string|symbol) {
        Annotations.add(factoryMethod, {}, parent, propertyName);
    }
}