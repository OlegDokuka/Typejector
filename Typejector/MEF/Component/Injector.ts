module Typejector.Component {
    import Class = Type.Class;

    export class Injector {
        private static registeredClassesAndMetadata: Array<Interface.Injectable> = new Array<Interface.Injectable>();
        private static createdSingletons: Array<Interface.Singleton<any>> = new Array<Interface.Singleton<any>>();
        public static register(injectable: Interface.Injectable) {
            let injectablePosition: number = -1;

            Injector.registeredClassesAndMetadata.forEach((value, index) => {
                injectablePosition = value.clazz.prototype === injectable.clazz.prototype
                    ? index : injectablePosition;
            });

            if (injectablePosition >= 0) {
                Injector.registeredClassesAndMetadata[injectablePosition] = injectable;
                return;
            }

            Injector.registeredClassesAndMetadata.push(injectable);
        }

        public static instance<T extends Object>(clazz: Class): T {
            let injectable: Interface.Injectable;

            injectable = Injector.registeredClassesAndMetadata.filter((value, index) =>
                value.clazz.prototype === clazz.prototype)[0];

            if (!injectable) {
                throw new Error("No registeret instance for type");
            }

            if (injectable.isSingleton) {
                return Injector.singletonInstance<T>(clazz);
            }

            return new clazz();
        }

        private static singletonInstance<T>(clazz: Class): T {
            let singleton: Interface.Singleton<T>,
                singletonIndex: number = -1;

            Injector.createdSingletons.forEach((value, index) => {
                singletonIndex = value.clazz === clazz ? index : singletonIndex;
            });

            if (singletonIndex > -1) {
                return Injector.createdSingletons[singletonIndex].instance;
            }

            singleton = { clazz: clazz, instance: new clazz() };
            Injector.createdSingletons.push(singleton);

            return singleton.instance;
        }
    }
}