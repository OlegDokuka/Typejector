namespace Typejector.Util {
    import Class = Typejector.Type.Class;

    export class Reflection {
        private static RETURN_TYPE_KEY = "design:returntype";
        private static PARAM_TYPES_KEY = "design:paramtypes";
        private static TYPE_KEY = "design:type";

        public static getReturnType(prototype:any, targetKey:string|symbol):Class {
            return Reflect.getMetadata(Reflection.RETURN_TYPE_KEY, prototype, targetKey);
        }

        public static getParamTypes(clazz:Class):Class[];
        public static getParamTypes(prototype:any, targetKey:string|symbol):Class[];
        public static getParamTypes(target:any, targetKey?:string|symbol):Class[] {
            return Reflect.getMetadata(Reflection.PARAM_TYPES_KEY, target, targetKey);
        }

        public static getType(target:any, targetKey:string|symbol):Class {
            return Reflect.getMetadata(Reflection.TYPE_KEY, target, targetKey);
        }
    }
}