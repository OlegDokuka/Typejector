module Typejector.Annotation {
    import Class = Type.Class;
    import DependencyDescriptor = Component.Factory.Config.DependencyDescriptor;
    import FieldDependencyDescriptor = Component.Context.Config.FieldDependencyDescriptor;
    import ArgumentDependencyDescriptor = Component.Context.Config.ArgumentDependencyDescriptor;
    import MethodDependencyDescriptor = Component.Context.Config.MethodDependencyDescriptor;

    export function inject(requestType: Class, ...genericTypes: Class[]): any {
        return (prototype: any, ...properties: any[]) => {
            let argsCount = properties.length,
                descriptor: DependencyDescriptor;

            switch (argsCount) {
                case 1: {
                    descriptor = new FieldDependencyDescriptor();

                    descriptor.clazz = requestType;
                    descriptor.parent = prototype.constructor;
                    descriptor.genericTypes = genericTypes;
                    (<FieldDependencyDescriptor>descriptor).name = properties[0];
                } break;
                case 2: {
                    if (typeof properties[1] === typeof 1) {
                        descriptor = new ArgumentDependencyDescriptor();
                        descriptor.clazz = requestType;
                        descriptor.genericTypes = genericTypes;
                        (<ArgumentDependencyDescriptor>descriptor).name = properties[0];
                        (<ArgumentDependencyDescriptor>descriptor).position = properties[1];
                        if (typeof prototype === typeof inject) {
                            descriptor.parent = prototype;
                        }
                        else if (typeof prototype === typeof Object.prototype) {
                            descriptor.parent = prototype.constructor;
                        }
                    }
                } break;
            }

            Typejector.getContext().register(descriptor);
        }
    }
} 