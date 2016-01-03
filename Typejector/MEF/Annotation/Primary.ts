namespace Typejector.Annotation {
    import Class = Typejector.Type.Class;

    export function primary(target: Object):void {
        Annotations.add(primary, {}, target);
    }
}