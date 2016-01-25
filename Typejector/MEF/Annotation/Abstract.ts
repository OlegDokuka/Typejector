module Typejector.Annotation {

    export function abstract(clazz: any) {
        component(clazz, abstract);
    }

}  