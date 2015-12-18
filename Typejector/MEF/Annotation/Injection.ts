module Typejector.Annotation {
    import Class = Type.Class;
    import BeanDescriptor = Component.Context.Config.BeanDescriptor;

    export function injection(annotation: Function[]);
    export function injection(clazz: Class, ...annotation: Function[]): void;
    export function injection(value: any, ...annotation: Function[]) {

    }
} 