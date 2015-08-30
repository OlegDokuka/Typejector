namespace Typejector.Component.Factory {
    import Class = Type.Class;

    export interface ListableBeanFactory extends BeanFactory {
        getBeansOfType<T>(clazz: Class): Array<T>;
        getBeanNamesOfType(clazz: Class): Array<string>;
    }
} 