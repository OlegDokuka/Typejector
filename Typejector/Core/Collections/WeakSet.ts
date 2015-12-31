interface WeakSet<T> {
    add(value: T): WeakSet<T>;
    clear(): void;
    delete(value: T): boolean;
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new (): WeakSet<any>;
    new <T>(): WeakSet<T>;
    prototype: WeakSet<any>;
}
declare var WeakSet: WeakSetConstructor;