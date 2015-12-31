namespace Typejector.Util {
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


        public static contains<T>(src: { forEach(func: (...args: any[]) => void) }, element: T): boolean {
            assert(src);
            assert(element);

            let result = false;

            src.forEach(it=> { if (element === it) result = true; })

            return result;
        }


        public static keys<T>(src: Map<T, any>): T[] {
            const keys: T[] = [];

            src.forEach((val, key) => keys.push(key));

            return keys;
        }
    }
} 