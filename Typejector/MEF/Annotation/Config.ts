﻿module Typejector.Annotation {
    import Class = Type.Class;

    export function config(clazz:Class) {
        injection(clazz, config, singleton);
    }

}  