namespace Typejector.Component.Factory {
    import Class = Typejector.Type.Class;
    import PropertyValue = Typejector.Component.Factory.Config.PropertyValue;

    export abstract class BeanPropertiesPostProcessor extends BeanPostProcessor {
        public abstract processPropertyValues(...propertyValues: PropertyValue[]): boolean;
    }
} 