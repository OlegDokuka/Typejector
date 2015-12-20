namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;

    export class BeanNameGenerator {
        public static generateBeanName(clazz:Class):string {
            return clazz['name'] ? clazz['name'] : BeanNameGenerator.extractFunctionName(clazz);
        }

        private static extractFunctionName(clazz:Class):string {
            const expression = /^function (.*?)\(\)/ig,
                matches = expression.exec(clazz.toString());

            return matches[1];
        }
    }
}