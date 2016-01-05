module Typejector.Type {
    export type Class = {
        new (...args:any[]): any;
        prototype: any;
    };

    export namespace Class {
        const classCache:Class[] = [];
        const baseClass = Object.getPrototypeOf(Function);

        export function register(clazz:Class) {
            if (!clazz || classCache.indexOf(clazz) > -1) {
                return;
            }

            classCache.push(clazz);
        }

        export function classes():Class[] {
            let classes:Class[] = [];

            classCache.forEach(it=> classes.push(it));

            return classes;
        }

        export function isClass(val:any):val is Class {
            return typeof val === "function";
        }

        /**
         * Find parent class of inputed class, if there is no parent class of inputted class method return undefind
         * @param {Typejector.Type.Class} src
         * @returns {Typejector.Type.Class} or {undefined} if there is no parent class
         */
        export function getParentOf(src:any):Class {
            const isFunction = Function.prototype.isPrototypeOf(src);
            const parentClass = Object.getPrototypeOf(src);

            if (isFunction) {
                const parentPrototype = Object.getPrototypeOf(src.prototype);

                if (parentClass != baseClass || parentPrototype.constructor !== Object) {
                    return parentPrototype.constructor;
                }
                else {
                    return undefined;
                }
            }

            return parentClass;
        }

        export function isAssignable(clazz:Class, classFrom:Class):boolean {
            return clazz === classFrom || clazz.prototype.isPrototypeOf(classFrom.prototype);
        }
    }
}