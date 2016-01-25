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


        public static contains<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) },
            element: T): boolean {
            assert(src);
            assert(element);

            let result = false;

            if (src instanceof Array) {
                result = src.indexOf(element) > -1;
            } else if (src instanceof Map || src instanceof Set || src instanceof WeakMap || src instanceof WeakSet) {
                result = (<any>src).has(element);
            }

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


        public static map<T, U, K>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) },
            supplier: () => K, transformer: (value: T, index: any) => U, accumulator: (collection: K, item: U) => void): K {
            const collection = supplier();

            src.forEach((value, key) => {
                accumulator(collection, transformer(value, key));
            });

            return collection;
        }


        public static flatMap<T, U, K>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) },
            supplier: () => K, transformer: (value: T, index: any) => U[], accumulator: (collection: K, item: U) => void): K {
            const collection = supplier();

            src.forEach((value, key) => {
                transformer(value, key).forEach(val=> accumulator(collection, val));
            });

            return collection;
        }


        public static firstOrDefault<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) }): T;


        public static firstOrDefault<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) }, defaultVal: T): T;


        public static firstOrDefault<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) }, lazyGetter: () => T): T;


        public static firstOrDefault<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) }, val?: any): T {
            let result: T = undefined;

            if (src instanceof Array) {
                result = src[0];
            } else {
                src.forEach(val=> result != undefined ? void 0 : result = val);
            }

            return result == undefined ? (val instanceof Function ? ((result = val()) ? result : val) : val) : result;
        }


        public static filter<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void, thisArg?: any) },
            filter: (val: T, key: any) => boolean) {
            const collection: typeof src = Collections.create(src);

            if (src instanceof Array) {
                return src.filter(filter);
            }

            src.forEach((val, key) => filter(val, key) ? Collections.add(collection, key, val) : void 0);

            return collection;
        }


        public static groupBy<T, U>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) },
            classifier: (value: T, index: any) => U): Map<U, Array<T>>;


        public static groupBy<T, U, K>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) },
            classifier: (value: T, index: any) => U, transformer: (value: T, index: any) => K): Map<U, Array<K>>;


        public static groupBy<T, U, K>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) },
            classifier: (value: T, index: any) => U, transformer?: (value: T, index: any) => any): Map<U, Array<any>> {
            const result: Map<U, Array<any>> = new Map();

            transformer = transformer ? transformer : (val: T, index) => val;

            src.forEach((val, key) => {
                const classKey = classifier(val, key);
                let group = result.get(classKey);

                if (!group) {
                    group = [];
                    result.set(classKey, group);
                }

                group.push(transformer(val, key));
            })

            return result;
        }


        public static some<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) }, predicate: (val: T, index) => boolean): boolean {
            let result = false;

            if (src instanceof Array) {
                result = src.some(predicate)
            } else {
                src.forEach((val, key) => { if (predicate(val, key)) { result = true; } });
            }

            return result;
        }


        public static keys<T>(src: Map<T, any>): T[] {
            const keys: T[] = [];

            src.forEach((val, key) => keys.push(key));

            return keys;
        }


        public static toArray<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) });
        public static toArray<T, U>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) }, transformer: (val: T, key: any) => U);
        public static toArray<T, U>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) }, transformer?: (val: T, key: any) => U) {
            const result = [];

            if (transformer) {
                src.forEach((val, key) => result.push(transformer(val, key)))
            } else {
                src.forEach(val => result.push(val))
            }

            return result;
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

        private static create<T>(src: { forEach(callbackfn: (value: T, index: any, collection: any) => void) }) {
            let result: typeof src;

            if (src instanceof Map) {
                result = new Map<T, any>();
            } else if (src instanceof Set) {
                result = new Set<T>();
            } else {
                result = [];
            }

            return result;
        }
    }
} 