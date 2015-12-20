namespace Typejector.Collections {

    const cacheSentinel = <any>{};

    export class Map<K, V> {
        private keys:K[] = [];
        private values:V[] = [];
        private cache:K = cacheSentinel;

        public get size() {
            return this.keys.length;
        };

        public  has(key:K):boolean {
            if (key === this.cache) {
                return true;
            }
            if (this.find(key) >= 0) {
                this.cache = key;
                return true;
            }
            return false;
        };

        public get(key:K):any {
            let index = this.find(key);
            if (index >= 0) {
                this.cache = key;
                return this.values[index];
            }
            return undefined;
        };

        public set(key:K, value:V):Map<K, V> {
            this.delete(key);
            this.keys.push(key);
            this.values.push(value);
            this.cache = key;

            return this;
        };

        public delete(key:K):boolean {
            let index = this.find(key);
            if (index >= 0) {
                this.keys.splice(index, 1);
                this.values.splice(index, 1);
                this.cache = cacheSentinel;
                return true;
            }
            return false;
        };

        public clear():void {
            this.keys.length = 0;
            this.values.length = 0;
            this.cache = cacheSentinel;
        };

        public forEach(callback:(value:V, key:K, map:Map<K, V>) => void, thisArg?:any):void {
            let size = this.size;
            for (let i = 0; i < size; ++i) {
                let key = this.keys[i];
                let value = this.values[i];
                this.cache = key;
                callback.call(this, value, key, this);
            }
        };

        private find(key:K):number {
            const keys = this.keys;
            const size = keys.length;
            for (let i = 0; i < size; ++i) {
                if (keys[i] === key) {
                    return i;
                }
            }
            return -1;
        }


    }
}
interface Map<K, V> {
    clear(): void;
    delete(key:K): boolean;
    forEach(callbackfn:(value:V, index:K, map:Map<K, V>) => void, thisArg?:any): void;
    get(key:K): V;
    has(key:K): boolean;
    set(key:K, value?:V): Map<K, V>;
    size: number;
}
interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(): Map<K, V>;
    prototype: Map<any, any>;
}
declare var Map:MapConstructor;

Map = Map == undefined ? Typejector.Collections.Map : Map;