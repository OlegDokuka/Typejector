module Typejector.Type {
    export type Class = {
        new (...args: any[]): any;
        prototype: any;
    };

    export namespace Class {
        const classCache: Function[] = [];

        export function register(clazz: Function) {
            if (classCache.indexOf(it=> it === clazz) > -1) {
                return;
            }

            classCache.push(clazz);
        }

        export function classes(): Function[] {
            let classes: Function[] = [];

            classCache.forEach(it=> classes.push(it));

            return classes;
        }

        export function isClass(val: any): val is Class {
            return typeof val === "function";
        }
    }
}