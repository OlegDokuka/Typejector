module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export class TypeDescriptor {
        clazz: Class;
        genericTypes: Array<Class>;

        public isArray(): boolean {
            return Array === this.clazz || Array.prototype.isPrototypeOf(this.clazz.prototype);
        }
    }
} 