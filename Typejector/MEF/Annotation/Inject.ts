﻿module Typejector.Annotation {

    export function inject(target: Object, propertyKey: string | symbol) {
        Annotations.add(inject, {}, target, propertyKey);

        if (!(propertyKey in target)) {
            target[propertyKey] = undefined;
        }
    }
}
