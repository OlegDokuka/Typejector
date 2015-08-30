namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    //TODO: it doesnot work! Provide name generation!
    export class BeanNameGenerator {
        public static generateBeanName(clazz: Class): string {
            return clazz.toString();
        }
    }
}