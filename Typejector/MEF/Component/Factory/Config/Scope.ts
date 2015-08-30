namespace Typejector.Component.Factory.Config {

    export interface Scope {
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;

        remove(name: string): void;
    }
} 