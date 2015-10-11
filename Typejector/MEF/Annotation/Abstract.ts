module Typejector.Annotation {

    export function abstract(clazz: any) {
        injection(clazz, abstract);
    }

}  