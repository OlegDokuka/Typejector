namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;

    import BeanDefinition = Config.BeanDefinition;
    import Scope = Config.Scope;

    export class PrototypeScope implements Scope {
       
        get<T>(name: string, objectFactory: ObjectFactory<T>): T {
            return objectFactory.getObject();
        }

        remove(name: string): void {

        }
    }

    export namespace PrototypeScope {
        export const NAME = "prototype";
    }
}