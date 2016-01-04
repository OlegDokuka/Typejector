module Typejector.Type {
    export type Class = {
        new (...args: any[]): any;
        prototype: any;
    };

    export namespace Class {
        const classCache: Class[] = [];

        export function register(clazz: Class) {
            if (classCache.indexOf(clazz) > -1) {
                return;
            }

            classCache.push(clazz);
        }

        export function classes(): Class[] {
            let classes: Class[] = [];

            classCache.forEach(it=> classes.push(it));

            return classes;
        }

        export function isClass(val: any): val is Class {
            return typeof val === "function";
        }

        export function getParentOf(src: Class): Class {
            return Object.getPrototypeOf(src.prototype).constructor;
        }
    }
}