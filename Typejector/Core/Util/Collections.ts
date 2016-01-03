namespace Typejector.Util {
    import Class = Typejector.Type.Class;

    export class Collections {
        public static remove<T>(src: Array<T>, element: T): boolean {
            assert(src);
            assert(element);

            const index = src.indexOf(element);

            if (index > -1) {
                src.splice(index, 1);
                return true;
            }

            return false;
        }


        public static contains<T>(src: { forEach(callbackfn: (value: T, index: T, collection: any) => void, thisArg?: any) },
            element: T): boolean {
            assert(src);
            assert(element);

            let result = false;

            src.forEach(it=> { if (element === it) result = true; });

            return result;
        }


        public static add<T, U>(src: any, key: T, value: U) {
            assert(src);
            assert(value);

            if (src instanceof Array) {
                src.splice(key, 0, value);
            } else if (src instanceof Set || src instanceof WeakSet) {
                src.add(value);
            } else if (src instanceof Map || src instanceof WeakMap) {
                src.set(key, value);
            }
            else {
                throw new Error("Unexpected source type")
            }
        }


        public static map<T, U, K>(src: { forEach(callbackfn: (value: T, index: T, collection: any) => void, thisArg?: any) },
            supplier: () => K, transformer: (value: T, index: any) => U, accumulator: (collection: K, item: U) => void): K {
            const collection = supplier();

            src.forEach((value, key) => {
                accumulator(collection, transformer(value, key));
            });

            return collection;
        }


        public static filter<T>(src: { forEach(callbackfn: (value: T, index: T, collection: any) => void, thisArg?: any) },
            filter: (val: T, key: any) => boolean) {
            const collection = Object.create(Object.getPrototypeOf(src));

            src.forEach((val, key) => filter(val, key) ? Collections.add(collection, key, val) : void 0);

            return collection;
        }


        public static keys<T>(src: Map<T, any>): T[] {
            const keys: T[] = [];

            src.forEach((val, key) => keys.push(key));

            return keys;
        }


        public static isCollection(obj: any) {
            return Class.isClass(obj) ?
                obj == Map || obj == Set || obj == WeakMap || obj == WeakSet :
                obj instanceof Array ||
                obj instanceof Map ||
                obj instanceof Set ||
                obj instanceof WeakMap ||
                obj instanceof WeakSet;
        }
    }
} 