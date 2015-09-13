namespace Typejector.Util {
    export class ArrayUtils {
        public static remove<T>(src: Array<T>, element: T): boolean {
            assert(src);
            assert(element);

            let index = src.indexOf(element);

            if (index > -1) {
                src.splice(index, 1);
                return true;
            }

            return false;
        }
    }
} 