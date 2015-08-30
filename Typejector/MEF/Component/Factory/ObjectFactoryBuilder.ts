namespace Typejector.Component.Factory {
    import Class = Type.Class;

    export class ObjectFactoryBuilder<T> {
        private args = [];
        private clazz: Class;

        withArgs(args: any[]) {
            this.args = args;
            return this;
        }

        forClass(clazz: Class) {
            this.clazz = clazz;
            return this;
        }

        build(): ObjectFactory<T> {
            return {
                getObject: () => {
                    return new (this.clazz.bind.apply(this.clazz, this.args))();
                }
            }
        }
    }
} 