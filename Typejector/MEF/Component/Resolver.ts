module Typejector.Component {
    import Class = Type.Class;
    export class Resolver {
        private static registeredResolvables: Array<Interface.Resolvable> = new Array<Interface.Resolvable>();


        public static request(parentType: Class, propertyName: string, propertyType: Class) {
            let resolvableIndex: number = -1,
                emptyDependencyList: { [x: string]: Class };

            Resolver.registeredResolvables.forEach((value, index) => {
                resolvableIndex = value.clazz === parentType ? index : resolvableIndex;
            });

            if (resolvableIndex > -1) {
                Resolver.registeredResolvables[resolvableIndex].dependencyList[propertyName] = propertyType;
                return;
            }

            emptyDependencyList = {};
            emptyDependencyList[propertyName] = propertyType;

            Resolver.registeredResolvables.push({
                clazz: parentType,
                dependencyList: emptyDependencyList
            });
        }

        public static resolve(clazz: Class) {
            return Resolver.registeredResolvables
                .filter((value, index) => value.clazz === clazz)[0].dependencyList;

        }
    }
}