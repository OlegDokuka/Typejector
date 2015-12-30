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
        

        public static contains<T>(src: Array<T>, element: T): boolean{
            assert(src);
            assert(element);

            return src.indexOf(element) > -1;
        }
    }
} 