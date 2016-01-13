var Typejector;
(function (Typejector) {
    var Type;
    (function (Type) {
        var Class;
        (function (Class) {
            var classCache = [];
            var baseClass = Object.getPrototypeOf(Function);
            function register(clazz) {
                if (!clazz || classCache.indexOf(clazz) > -1) {
                    return;
                }
                classCache.push(clazz);
            }
            Class.register = register;
            function classes() {
                var classes = [];
                classCache.forEach(function (it) { return classes.push(it); });
                return classes;
            }
            Class.classes = classes;
            function isClass(val) {
                return typeof val === "function";
            }
            Class.isClass = isClass;
            function getParentOf(src) {
                var isFunction = Function.prototype.isPrototypeOf(src);
                var parentClass = Object.getPrototypeOf(src);
                if (isFunction) {
                    var parentPrototype = Object.getPrototypeOf(src.prototype);
                    if (parentClass != baseClass || parentPrototype.constructor !== Object) {
                        return parentPrototype.constructor;
                    }
                    else {
                        return undefined;
                    }
                }
                return parentClass;
            }
            Class.getParentOf = getParentOf;
            function isAssignable(clazz, classFrom) {
                return clazz === classFrom || clazz.prototype.isPrototypeOf(classFrom.prototype);
            }
            Class.isAssignable = isAssignable;
        })(Class = Type.Class || (Type.Class = {}));
    })(Type = Typejector.Type || (Typejector.Type = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Util;
    (function (Util) {
        var Class = Typejector.Type.Class;
        var Collections = (function () {
            function Collections() {
            }
            Collections.remove = function (src, element) {
                assert(src);
                assert(element);
                var index = src.indexOf(element);
                if (index > -1) {
                    src.splice(index, 1);
                    return true;
                }
                return false;
            };
            Collections.contains = function (src, element) {
                assert(src);
                assert(element);
                var result = false;
                if (src instanceof Array) {
                    result = src.indexOf(element) > -1;
                }
                else if (src instanceof Map || src instanceof Set || src instanceof WeakMap || src instanceof WeakSet) {
                    result = src.has(element);
                }
                return result;
            };
            Collections.add = function (src, key, value) {
                assert(src);
                assert(value);
                if (src instanceof Array) {
                    src.splice(key, 0, value);
                }
                else if (src instanceof Set || src instanceof WeakSet) {
                    src.add(value);
                }
                else if (src instanceof Map || src instanceof WeakMap) {
                    src.set(key, value);
                }
                else {
                    throw new Error("Unexpected source type");
                }
            };
            Collections.map = function (src, supplier, transformer, accumulator) {
                var collection = supplier();
                src.forEach(function (value, key) {
                    accumulator(collection, transformer(value, key));
                });
                return collection;
            };
            Collections.flatMap = function (src, supplier, transformer, accumulator) {
                var collection = supplier();
                src.forEach(function (value, key) {
                    transformer(value, key).forEach(function (val) { return accumulator(collection, val); });
                });
                return collection;
            };
            Collections.firstOrDefault = function (src, val) {
                var result = undefined;
                if (src instanceof Array) {
                    result = src[0];
                }
                else {
                    src.forEach(function (val) { return result == undefined ? void 0 : result = val; });
                }
                return result == undefined ? (val instanceof Function ? ((result = val()) ? result : val) : val) : result;
            };
            Collections.filter = function (src, filter) {
                var collection = Object.create(Object.getPrototypeOf(src));
                if (src instanceof Array) {
                    return src.filter(filter);
                }
                src.forEach(function (val, key) { return filter(val, key) ? Collections.add(collection, key, val) : void 0; });
                return collection;
            };
            Collections.groupBy = function (src, classifier, transformer) {
                var result = new Map();
                transformer = transformer ? transformer : function (val, index) { return val; };
                src.forEach(function (val, key) {
                    var classKey = classifier(val, key);
                    var group = result.get(classKey);
                    if (!group) {
                        group = [];
                        result.set(classKey, group);
                    }
                    group.push(transformer(val, key));
                });
                return result;
            };
            Collections.some = function (src, predicate) {
                var result = false;
                if (src instanceof Array) {
                    result = src.some(predicate);
                }
                else {
                    src.forEach(function (val, key) { if (predicate(val, key)) {
                        result = true;
                    } });
                }
                return result;
            };
            Collections.keys = function (src) {
                var keys = [];
                src.forEach(function (val, key) { return keys.push(key); });
                return keys;
            };
            Collections.isCollection = function (obj) {
                return Class.isClass(obj) ?
                    obj == Map || obj == Set || obj == WeakMap || obj == WeakSet :
                    obj instanceof Array ||
                        obj instanceof Map ||
                        obj instanceof Set ||
                        obj instanceof WeakMap ||
                        obj instanceof WeakSet;
            };
            return Collections;
        })();
        Util.Collections = Collections;
    })(Util = Typejector.Util || (Typejector.Util = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Event;
    (function (Event_1) {
        var Event = (function () {
            function Event() {
                this.Callbacks = [];
                this.Trigger = function (arg, context) {
                    var callbacks = this.Callbacks, callback;
                    for (var i = 0; i < callbacks.length; i++) {
                        callback = callbacks[i];
                        callback.Callback.apply(callback.Subscriber, [arg, context]);
                    }
                };
            }
            Event.prototype.Subscribe = function (callback, subscriber) {
                var that = this, res = {
                    Callback: callback,
                    Event: that,
                    Unsubscribe: function () { that.Unsubscribe(callback); }
                };
                this.Callbacks.push({ Callback: callback, Subscriber: subscriber });
                return res;
            };
            Event.prototype.Unsubscribe = function (callback) {
                var filteredList = [];
                for (var i = 0; i < this.Callbacks.length; i++) {
                    if (this.Callbacks[i].Callback !== callback) {
                        filteredList.push(this.Callbacks[i]);
                    }
                }
                this.Callbacks = filteredList;
            };
            return Event;
        })();
        Event_1.Event = Event;
    })(Event = Typejector.Event || (Typejector.Event = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Exception;
    (function (Exception) {
        var IllegalArgumentException = (function () {
            function IllegalArgumentException(message) {
                this.name = "IllegalArgumentException";
                this.message = "Argument cannot be null";
                this.prototype = new Error;
                this.message = message ? message : this.message;
            }
            return IllegalArgumentException;
        })();
        Exception.IllegalArgumentException = IllegalArgumentException;
        function assert(object, message) {
            if (object == undefined) {
                throw new IllegalArgumentException(message);
            }
        }
        Exception.assert = assert;
    })(Exception = Typejector.Exception || (Typejector.Exception = {}));
})(Typejector || (Typejector = {}));
function assert(object, message) {
    Typejector.Exception.assert(object, message);
}
var Reflect;
(function (Reflect) {
    "use strict";
    var functionPrototype = Object.getPrototypeOf(Function);
    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var __Metadata__ = new _WeakMap();
    function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetDescriptor)) {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsObject(target)) {
                throw new TypeError();
            }
            else if (IsUndefined(targetKey)) {
                throw new TypeError();
            }
            else if (!IsObject(targetDescriptor)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
        }
        else if (!IsUndefined(targetKey)) {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsObject(target)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
        }
        else {
            if (!IsArray(decorators)) {
                throw new TypeError();
            }
            else if (!IsConstructor(target)) {
                throw new TypeError();
            }
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
            if (!IsUndefined(targetKey)) {
                if (!IsObject(target)) {
                    throw new TypeError();
                }
                targetKey = ToPropertyKey(targetKey);
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
            }
            else {
                if (!IsConstructor(target)) {
                    throw new TypeError();
                }
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
            }
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
    }
    Reflect.defineMetadata = defineMetadata;
    function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasMetadata = hasMetadata;
    function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
    }
    Reflect.getMetadata = getMetadata;
    function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    function getMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryMetadataKeys(target, targetKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryOwnMetadataKeys(target, targetKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    function deleteMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
            throw new TypeError();
        }
        else if (!IsUndefined(targetKey)) {
            targetKey = ToPropertyKey(targetKey);
        }
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        if (IsUndefined(metadataMap)) {
            return false;
        }
        if (!metadataMap.delete(metadataKey)) {
            return false;
        }
        if (metadataMap.size > 0) {
            return true;
        }
        var targetMetadata = __Metadata__.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0) {
            return true;
        }
        __Metadata__.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated)) {
                if (!IsConstructor(decorated)) {
                    throw new TypeError();
                }
                target = decorated;
            }
        }
        return target;
    }
    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated)) {
                if (!IsObject(decorated)) {
                    throw new TypeError();
                }
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            decorator(target, propertyKey);
        }
    }
    function GetOrCreateMetadataMap(target, targetKey, create) {
        var targetMetadata = __Metadata__.get(target);
        if (!targetMetadata) {
            if (!create) {
                return undefined;
            }
            targetMetadata = new _Map();
            __Metadata__.set(target, targetMetadata);
        }
        var keyMetadata = targetMetadata.get(targetKey);
        if (!keyMetadata) {
            if (!create) {
                return undefined;
            }
            keyMetadata = new _Map();
            targetMetadata.set(targetKey, keyMetadata);
        }
        return keyMetadata;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return true;
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        }
        return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
            return false;
        }
        return Boolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        }
        return undefined;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
            return undefined;
        }
        return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = GetPrototypeOf(O);
        if (parent === null) {
            return ownKeys;
        }
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) {
            return ownKeys;
        }
        if (ownKeys.length <= 0) {
            return parentKeys;
        }
        var set = new _Set();
        var keys = [];
        for (var _i = 0; _i < ownKeys.length; _i++) {
            var key = ownKeys[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0; _a < parentKeys.length; _a++) {
            var key = parentKeys[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    function OrdinaryOwnMetadataKeys(target, targetKey) {
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        var keys = [];
        if (metadataMap) {
            metadataMap.forEach(function (_, key) { return keys.push(key); });
        }
        return keys;
    }
    function IsUndefined(x) {
        return x === undefined;
    }
    function IsArray(x) {
        return Array.isArray(x);
    }
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function IsConstructor(x) {
        return typeof x === "function";
    }
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    function ToPropertyKey(value) {
        if (IsSymbol(value)) {
            return value;
        }
        return String(value);
    }
    function GetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype) {
            return proto;
        }
        if (proto !== functionPrototype) {
            return proto;
        }
        var prototype = O.prototype;
        var prototypeProto = Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype) {
            return proto;
        }
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function") {
            return proto;
        }
        if (constructor === O) {
            return proto;
        }
        return constructor;
    }
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        function Map() {
            this._keys = [];
            this._values = [];
            this._cache = cacheSentinel;
        }
        Map.prototype = {
            get size() {
                return this._keys.length;
            },
            has: function (key) {
                if (key === this._cache) {
                    return true;
                }
                if (this._find(key) >= 0) {
                    this._cache = key;
                    return true;
                }
                return false;
            },
            get: function (key) {
                var index = this._find(key);
                if (index >= 0) {
                    this._cache = key;
                    return this._values[index];
                }
                return undefined;
            },
            set: function (key, value) {
                this.delete(key);
                this._keys.push(key);
                this._values.push(value);
                this._cache = key;
                return this;
            },
            delete: function (key) {
                var index = this._find(key);
                if (index >= 0) {
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    this._cache = cacheSentinel;
                    return true;
                }
                return false;
            },
            clear: function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cache = cacheSentinel;
            },
            forEach: function (callback, thisArg) {
                var size = this.size;
                for (var i = 0; i < size; ++i) {
                    var key = this._keys[i];
                    var value = this._values[i];
                    this._cache = key;
                    callback.call(this, value, key, this);
                }
            },
            _find: function (key) {
                var keys = this._keys;
                var size = keys.length;
                for (var i = 0; i < size; ++i) {
                    if (keys[i] === key) {
                        return i;
                    }
                }
                return -1;
            }
        };
        return Map;
    }
    function CreateSetPolyfill() {
        var cacheSentinel = {};
        function Set() {
            this._map = new _Map();
        }
        Set.prototype = {
            get size() {
                return this._map.length;
            },
            has: function (value) {
                return this._map.has(value);
            },
            add: function (value) {
                this._map.set(value, value);
                return this;
            },
            delete: function (value) {
                return this._map.delete(value);
            },
            clear: function () {
                this._map.clear();
            },
            forEach: function (callback, thisArg) {
                this._map.forEach(callback, thisArg);
            }
        };
        return Set;
    }
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var isNode = typeof global !== "undefined" && Object.prototype.toString.call(global.process) === '[object process]';
        var nodeCrypto = isNode && require("crypto");
        var hasOwn = Object.prototype.hasOwnProperty;
        var keys = {};
        var rootKey = CreateUniqueKey();
        function WeakMap() {
            this._key = CreateUniqueKey();
        }
        WeakMap.prototype = {
            has: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table) {
                    return this._key in table;
                }
                return false;
            },
            get: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table) {
                    return table[this._key];
                }
                return undefined;
            },
            set: function (target, value) {
                var table = GetOrCreateWeakMapTable(target, true);
                table[this._key] = value;
                return this;
            },
            delete: function (target) {
                var table = GetOrCreateWeakMapTable(target, false);
                if (table && this._key in table) {
                    return delete table[this._key];
                }
                return false;
            },
            clear: function () {
                this._key = CreateUniqueKey();
            }
        };
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i) {
                buffer[i] = Math.random() * 255 | 0;
            }
        }
        function GenRandomBytes(size) {
            if (nodeCrypto) {
                var data = nodeCrypto.randomBytes(size);
                return data;
            }
            else if (typeof Uint8Array === "function") {
                var data = new Uint8Array(size);
                if (typeof crypto !== "undefined") {
                    crypto.getRandomValues(data);
                }
                else if (typeof msCrypto !== "undefined") {
                    msCrypto.getRandomValues(data);
                }
                else {
                    FillRandomBytes(data, size);
                }
                return data;
            }
            else {
                var data = new Array(size);
                FillRandomBytes(data, size);
                return data;
            }
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8) {
                    result += "-";
                }
                if (byte < 16) {
                    result += "0";
                }
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
        function CreateUniqueKey() {
            var key;
            do {
                key = "@@WeakMap@@" + CreateUUID();
            } while (hasOwn.call(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create) {
                    return undefined;
                }
                Object.defineProperty(target, rootKey, { value: Object.create(null) });
            }
            return target[rootKey];
        }
        return WeakMap;
    }
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    __global.Reflect[p] = Reflect[p];
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof window !== "undefined" ? window :
        typeof WorkerGlobalScope !== "undefined" ? self :
            typeof global !== "undefined" ? global :
                Function("return this;")());
})(Reflect || (Reflect = {}));
var Typejector;
(function (Typejector) {
    var Util;
    (function (Util) {
        var Reflection = (function () {
            function Reflection() {
            }
            Reflection.getReturnType = function (prototype, targetKey) {
                return Reflect.getMetadata(Reflection.RETURN_TYPE_KEY, prototype, targetKey);
            };
            Reflection.getParamTypes = function (target, targetKey) {
                return Reflect.getMetadata(Reflection.PARAM_TYPES_KEY, target, targetKey);
            };
            Reflection.getType = function (target, targetKey) {
                return Reflect.getMetadata(Reflection.TYPE_KEY, target, targetKey);
            };
            Reflection.RETURN_TYPE_KEY = "design:returntype";
            Reflection.PARAM_TYPES_KEY = "design:paramtypes";
            Reflection.TYPE_KEY = "design:type";
            return Reflection;
        })();
        Util.Reflection = Reflection;
    })(Util = Typejector.Util || (Typejector.Util = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var BeanNameGenerator = (function () {
                    function BeanNameGenerator() {
                    }
                    BeanNameGenerator.generateBeanName = function (clazz) {
                        return clazz['name'] ? clazz['name'] : BeanNameGenerator.extractFunctionName(clazz);
                    };
                    BeanNameGenerator.extractFunctionName = function (clazz) {
                        var expression = /^function (.*?)\(\)/ig, matches = expression.exec(clazz.toString());
                        return matches[1];
                    };
                    return BeanNameGenerator;
                })();
                Support.BeanNameGenerator = BeanNameGenerator;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Collections = Typejector.Util.Collections;
        var BeanNameGenerator = Typejector.Component.Factory.Support.BeanNameGenerator;
        var Annotations = (function () {
            function Annotations() {
            }
            Annotations.add = function (annotation, annotationData, target, targetKey, paramIndex) {
                var metadataValue = Reflect.getMetadata(Annotations.ANNOTATION_KEY, target, targetKey = paramIndex == undefined ? targetKey : targetKey + "$" + paramIndex);
                metadataValue = metadataValue == undefined ? [] : metadataValue;
                if (!Collections.contains(metadataValue, annotation)) {
                    metadataValue.push(annotation);
                }
                Reflect.defineMetadata(Annotations.ANNOTATION_DATA_KEY + BeanNameGenerator.generateBeanName(annotation), annotationData, target, targetKey);
                Reflect.defineMetadata(Annotations.ANNOTATION_KEY, metadataValue, target, targetKey);
                return Annotations;
            };
            Annotations.get = function (target, targetKey, paramIndex) {
                var result = new Map();
                var metadataValue = Reflect.getMetadata(Annotations.ANNOTATION_KEY, target, targetKey = paramIndex == undefined ? targetKey : targetKey + "$" + paramIndex);
                if (metadataValue) {
                    metadataValue.forEach(function (annotation) { return result.set(annotation, Reflect.getMetadata(Annotations.ANNOTATION_DATA_KEY + BeanNameGenerator.generateBeanName(annotation), target, targetKey)); });
                }
                return result;
            };
            Annotations.ANNOTATION_KEY = "design:annotation";
            Annotations.ANNOTATION_DATA_KEY = "design:annotation:";
            return Annotations;
        })();
        Annotation.Annotations = Annotations;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Config;
            (function (Config) {
                var TypeDescriptor = (function () {
                    function TypeDescriptor() {
                    }
                    return TypeDescriptor;
                })();
                Config.TypeDescriptor = TypeDescriptor;
            })(Config = Factory.Config || (Factory.Config = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Config;
            (function (Config) {
                var DependencyDescriptor = (function (_super) {
                    __extends(DependencyDescriptor, _super);
                    function DependencyDescriptor() {
                        _super.apply(this, arguments);
                    }
                    return DependencyDescriptor;
                })(Config.TypeDescriptor);
                Config.DependencyDescriptor = DependencyDescriptor;
            })(Config = Factory.Config || (Factory.Config = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Context;
        (function (Context) {
            var Config;
            (function (Config) {
                var TypeDescriptor = Component.Factory.Config.TypeDescriptor;
                var BeanDescriptor = (function (_super) {
                    __extends(BeanDescriptor, _super);
                    function BeanDescriptor() {
                        _super.apply(this, arguments);
                        this.annotations = new Set();
                    }
                    return BeanDescriptor;
                })(TypeDescriptor);
                Config.BeanDescriptor = BeanDescriptor;
            })(Config = Context.Config || (Context.Config = {}));
        })(Context = Component.Context || (Component.Context = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Context;
        (function (Context) {
            var Config;
            (function (Config) {
                var DependencyDescriptor = Component.Factory.Config.DependencyDescriptor;
                var FieldDependencyDescriptor = (function (_super) {
                    __extends(FieldDependencyDescriptor, _super);
                    function FieldDependencyDescriptor() {
                        _super.apply(this, arguments);
                        this.annotations = new Set();
                    }
                    return FieldDependencyDescriptor;
                })(DependencyDescriptor);
                Config.FieldDependencyDescriptor = FieldDependencyDescriptor;
            })(Config = Context.Config || (Context.Config = {}));
        })(Context = Component.Context || (Component.Context = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Context;
        (function (Context) {
            var Config;
            (function (Config) {
                var DependencyDescriptor = Component.Factory.Config.DependencyDescriptor;
                var ArgumentDependencyDescriptor = (function (_super) {
                    __extends(ArgumentDependencyDescriptor, _super);
                    function ArgumentDependencyDescriptor() {
                        _super.apply(this, arguments);
                    }
                    return ArgumentDependencyDescriptor;
                })(DependencyDescriptor);
                Config.ArgumentDependencyDescriptor = ArgumentDependencyDescriptor;
            })(Config = Context.Config || (Context.Config = {}));
        })(Context = Component.Context || (Component.Context = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Context;
        (function (Context) {
            var Config;
            (function (Config) {
                var MethodDependencyDescriptor = (function (_super) {
                    __extends(MethodDependencyDescriptor, _super);
                    function MethodDependencyDescriptor() {
                        _super.apply(this, arguments);
                        this.arguments = [];
                    }
                    return MethodDependencyDescriptor;
                })(Config.FieldDependencyDescriptor);
                Config.MethodDependencyDescriptor = MethodDependencyDescriptor;
            })(Config = Context.Config || (Context.Config = {}));
        })(Context = Component.Context || (Component.Context = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function inject(target, propertyKey) {
            Annotation.Annotations.add(inject, {}, target, propertyKey);
            if (!(propertyKey in target)) {
                target[propertyKey] = undefined;
            }
        }
        Annotation.inject = inject;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function lazy(target, propertyKey) {
            Annotation.Annotations.add(lazy, {}, target, propertyKey);
        }
        Annotation.lazy = lazy;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function generic() {
            var classes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classes[_i - 0] = arguments[_i];
            }
            return function (target, propertyKey, paramIndex) {
                return Annotation.Annotations.add(generic, classes, target, propertyKey, paramIndex instanceof Number ? paramIndex : undefined);
            };
        }
        Annotation.generic = generic;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function primary(target) {
            Annotation.Annotations.add(primary, {}, target);
        }
        Annotation.primary = primary;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Class = Typejector.Type.Class;
        function injection(clazz) {
            var annotations = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                annotations[_i - 1] = arguments[_i];
            }
            Class.register(clazz);
            Annotation.Annotations.add(injection, {}, clazz);
            annotations.forEach(function (annotation) { return Annotation.Annotations.add(annotation, {}, clazz); });
        }
        Annotation.injection = injection;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function abstract(clazz) {
            Annotation.injection(clazz, abstract);
        }
        Annotation.abstract = abstract;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function singleton(clazz) {
            Annotation.injection(clazz, singleton);
        }
        Annotation.singleton = singleton;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function postConstructor(target, propertyKey) {
            Annotation.Annotations.add(postConstructor, {}, target, propertyKey);
        }
        Annotation.postConstructor = postConstructor;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Reflection = Typejector.Util.Reflection;
        var Class = Typejector.Type.Class;
        function factoryMethod(parent, propertyName) {
            var returnType = Reflection.getReturnType(parent, propertyName);
            Annotation.Annotations.add(factoryMethod, {}, parent, propertyName);
            Class.register(returnType);
        }
        Annotation.factoryMethod = factoryMethod;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function config(clazz) {
            Annotation.injection(clazz, config, Annotation.singleton);
        }
        Annotation.config = config;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Bean = (function () {
                    function Bean() {
                        this.annotations = new Set();
                        this.scope = "prototype";
                        this.isPrimary = false;
                        this.isAbstract = false;
                        this.isLazyInit = false;
                        this.constructorArguments = [];
                        this.properties = new Set();
                        this.methods = new Set();
                        this.dependsOn = new Set();
                    }
                    return Bean;
                })();
                Support.Bean = Bean;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Bean = Typejector.Component.Factory.Support.Bean;
        var Class = Typejector.Type.Class;
        var Collections = Typejector.Util.Collections;
        var ClassBeanDefinitionScanner = (function () {
            function ClassBeanDefinitionScanner() {
            }
            ClassBeanDefinitionScanner.prototype.scan = function () {
                var _this = this;
                var classes = new Set();
                Class.classes().forEach(function (val) {
                    classes.add(val);
                    _this.deepScanning(val).forEach(function (val) { return classes.add(val); });
                });
                return Collections.map(classes, function () { return []; }, function (it) { return _this.buildBeanDefinition(it); }, function (collection, it) { return collection.push(it); });
            };
            ClassBeanDefinitionScanner.prototype.buildBeanDefinition = function (clazz) {
                var bean = new Bean();
                bean.clazz = clazz;
                return bean;
            };
            ClassBeanDefinitionScanner.prototype.deepScanning = function (clazz) {
                var classes = [];
                var nextClass = clazz;
                while ((nextClass = Class.getParentOf(nextClass))) {
                    classes.push(nextClass);
                }
                return classes;
            };
            return ClassBeanDefinitionScanner;
        })();
        Annotation.ClassBeanDefinitionScanner = ClassBeanDefinitionScanner;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var abstract = Typejector.Annotation.abstract;
        var config = Typejector.Annotation.config;
        var singleton = Typejector.Annotation.singleton;
        var Collections = Typejector.Util.Collections;
        var BeanUtils = (function () {
            function BeanUtils() {
            }
            BeanUtils.isAbstract = function (beanDefinition) {
                return Collections.contains(beanDefinition.annotations, abstract);
            };
            BeanUtils.isConfig = function (beanDefinition) {
                return Collections.contains(beanDefinition.annotations, config);
            };
            BeanUtils.isSingleton = function (beanDefinition) {
                return Collections.contains(beanDefinition.annotations, singleton);
            };
            BeanUtils.newInstance = function (clazz) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                args.unshift(clazz);
                return new (clazz.bind.apply(clazz, args))();
            };
            BeanUtils.createObjectFactoryFrom = function (methodDescriptor, parent, beanFactory) {
                return {
                    getObject: function () {
                        var resolvedArguments = methodDescriptor.arguments
                            .map(function (val) { return beanFactory.resolveDependency(val); }), target = beanFactory.getBean(parent);
                        return (_a = target[methodDescriptor.name]).call.apply(_a, [target].concat(resolvedArguments));
                        var _a;
                    }
                };
            };
            return BeanUtils;
        })();
        Component.BeanUtils = BeanUtils;
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var PrototypeScope = (function () {
                    function PrototypeScope() {
                    }
                    PrototypeScope.prototype.get = function (name, objectFactory) {
                        return objectFactory.getObject();
                    };
                    PrototypeScope.prototype.remove = function (name) {
                    };
                    return PrototypeScope;
                })();
                Support.PrototypeScope = PrototypeScope;
                var PrototypeScope;
                (function (PrototypeScope) {
                    PrototypeScope.NAME = "prototype";
                })(PrototypeScope = Support.PrototypeScope || (Support.PrototypeScope = {}));
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var SingletonScope = (function (_super) {
                    __extends(SingletonScope, _super);
                    function SingletonScope() {
                        _super.apply(this, arguments);
                        this.objectCache = [];
                    }
                    SingletonScope.prototype.get = function (name, objectFactory) {
                        var result;
                        if (name in this.objectCache && (result = this.objectCache[name]) != undefined) {
                            return result;
                        }
                        result = _super.prototype.get.call(this, name, objectFactory);
                        this.objectCache[name] = result;
                        return result;
                    };
                    SingletonScope.prototype.remove = function (name) {
                        delete this.objectCache[name];
                    };
                    return SingletonScope;
                })(Support.PrototypeScope);
                Support.SingletonScope = SingletonScope;
                var SingletonScope;
                (function (SingletonScope) {
                    SingletonScope.NAME = "singleton";
                })(SingletonScope = Support.SingletonScope || (Support.SingletonScope = {}));
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var BeanPostProcessor = (function () {
                function BeanPostProcessor() {
                }
                return BeanPostProcessor;
            })();
            Factory.BeanPostProcessor = BeanPostProcessor;
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var BeanFactoryPostProcessor = (function () {
                function BeanFactoryPostProcessor() {
                }
                return BeanFactoryPostProcessor;
            })();
            Factory.BeanFactoryPostProcessor = BeanFactoryPostProcessor;
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var MergedBeanFactoryPostProcessor = (function (_super) {
                __extends(MergedBeanFactoryPostProcessor, _super);
                function MergedBeanFactoryPostProcessor() {
                    _super.apply(this, arguments);
                }
                return MergedBeanFactoryPostProcessor;
            })(Factory.BeanFactoryPostProcessor);
            Factory.MergedBeanFactoryPostProcessor = MergedBeanFactoryPostProcessor;
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Class = Typejector.Type.Class;
                var Collections = Typejector.Util.Collections;
                var TypeDescriptor = Typejector.Component.Factory.Config.TypeDescriptor;
                var BeanNameGenerator = Typejector.Component.Factory.Support.BeanNameGenerator;
                var Reflection = Typejector.Util.Reflection;
                var Annotations = Typejector.Annotation.Annotations;
                var generic = Typejector.Annotation.generic;
                var postConstructor = Typejector.Annotation.postConstructor;
                var singleton = Typejector.Annotation.singleton;
                var primary = Typejector.Annotation.primary;
                var abstract = Typejector.Annotation.abstract;
                var inject = Typejector.Annotation.inject;
                var lazy = Typejector.Annotation.lazy;
                var factoryMethod = Typejector.Annotation.factoryMethod;
                var DefaultBeanFactoryPostProcessor = (function (_super) {
                    __extends(DefaultBeanFactoryPostProcessor, _super);
                    function DefaultBeanFactoryPostProcessor() {
                        _super.apply(this, arguments);
                    }
                    DefaultBeanFactoryPostProcessor.prototype.postProcessBeanFactory = function (configurableListableBeanFactory) {
                        var _this = this;
                        configurableListableBeanFactory
                            .getBeanDefinitionNames()
                            .map(function (name) { return configurableListableBeanFactory.getBeanDefinition(name); })
                            .forEach(function (beanDefinition) { return _this.processBeanDefinition(beanDefinition, configurableListableBeanFactory); });
                    };
                    DefaultBeanFactoryPostProcessor.prototype.processBeanDefinition = function (beanDefinition, configurableListableBeanFactory) {
                        var _this = this;
                        var clazz = beanDefinition.clazz;
                        var parentClass = Class.getParentOf(clazz);
                        if (parentClass) {
                            beanDefinition.parent = BeanNameGenerator.generateBeanName(parentClass);
                        }
                        this.processClassAnnotations(beanDefinition);
                        Object.keys(clazz.prototype).forEach(function (it) {
                            var property = clazz.prototype[it];
                            if (property != undefined && Class.getParentOf(property) === undefined) {
                                _this.processMethods(beanDefinition, it);
                            }
                            else {
                                _this.processProperties(beanDefinition, it);
                            }
                        });
                        this.processDependencies(beanDefinition, configurableListableBeanFactory);
                    };
                    DefaultBeanFactoryPostProcessor.prototype.processClassAnnotations = function (bean) {
                        var clazz = bean.clazz;
                        var annotations = Annotations.get(clazz);
                        annotations.forEach(function (val, key) {
                            bean.annotations.add(key);
                            if (key == singleton) {
                                bean.scope = "singleton";
                            }
                            else if (key == primary) {
                                bean.isPrimary = true;
                            }
                            else if (key == abstract) {
                                bean.isAbstract = true;
                            }
                            else if (key == lazy) {
                                bean.isLazyInit = true;
                            }
                        });
                    };
                    DefaultBeanFactoryPostProcessor.prototype.processMethods = function (bean, propKey) {
                        var _this = this;
                        var clazz = bean.clazz;
                        var annotations = Collections.map(Annotations.get(clazz.prototype, propKey), function () { return new Set(); }, function (value, key) { return key; }, function (set, item) { return set.add(item); });
                        var containsPostConstructorAnnotation = Collections.contains(annotations, postConstructor);
                        if (Collections.contains(annotations, factoryMethod) || Collections.contains(annotations, inject) || containsPostConstructorAnnotation) {
                            var descriptor = {
                                name: propKey,
                                arguments: Reflection.getParamTypes(clazz.prototype, propKey).map(function (type, index) { return _this.buildTypeDescriptor(clazz, type, propKey, index); }),
                                returnType: this.buildTypeDescriptor(clazz, Reflection.getReturnType(clazz.prototype, propKey), propKey),
                                annotations: annotations
                            };
                            if (containsPostConstructorAnnotation) {
                                bean.initMethodName = propKey;
                            }
                            bean.methods.add(descriptor);
                        }
                    };
                    DefaultBeanFactoryPostProcessor.prototype.processProperties = function (bean, propKey) {
                        var clazz = bean.clazz;
                        var annotations = Collections.map(Annotations.get(clazz.prototype, propKey), function () { return new Set(); }, function (value, key) { return key; }, function (set, item) { return set.add(item); });
                        if (Collections.contains(annotations, inject)) {
                            var descriptor = {
                                name: propKey,
                                clazz: this.buildTypeDescriptor(clazz, Reflection.getType(clazz.prototype, propKey), propKey),
                                annotations: annotations
                            };
                            bean.properties.add(descriptor);
                        }
                    };
                    DefaultBeanFactoryPostProcessor.prototype.processDependencies = function (bean, beanFactory) {
                        var dependencies = new Set();
                        var addToDependencies = function (typeDescriptor) { return Collections.isCollection(typeDescriptor.clazz) ?
                            typeDescriptor.genericTypes.forEach(function (type) { return dependencies.add(type); }) :
                            dependencies.add(typeDescriptor.clazz); };
                        bean.constructorArguments.forEach(addToDependencies);
                        bean.methods.forEach(function (methodDesc) { return methodDesc.arguments.forEach(addToDependencies); });
                        bean.properties.forEach(function (propertyDesc) { return addToDependencies(propertyDesc.clazz); });
                        bean.dependsOn = Collections.flatMap(dependencies, function () { return new Set(); }, function (val) { return beanFactory.getBeanNamesOfType(val); }, function (collections, item) { return collections.add(item); });
                    };
                    DefaultBeanFactoryPostProcessor.prototype.buildTypeDescriptor = function (src, propType, propKey, index) {
                        var paramDescriptor = new TypeDescriptor();
                        paramDescriptor.clazz = propType;
                        if (Collections.isCollection(propType)) {
                            paramDescriptor.genericTypes = Annotations.get(src.prototype, propKey, index).get(generic);
                        }
                        return paramDescriptor;
                    };
                    return DefaultBeanFactoryPostProcessor;
                })(Factory.BeanFactoryPostProcessor);
                Support.DefaultBeanFactoryPostProcessor = DefaultBeanFactoryPostProcessor;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Collections = Typejector.Util.Collections;
                var Class = Typejector.Type.Class;
                var MergeBeanFactoryPostProcessor = (function (_super) {
                    __extends(MergeBeanFactoryPostProcessor, _super);
                    function MergeBeanFactoryPostProcessor() {
                        _super.apply(this, arguments);
                    }
                    MergeBeanFactoryPostProcessor.prototype.postProcessBeanFactory = function (beanDefinitionRegistry) {
                        var _this = this;
                        var beanDefinitions = beanDefinitionRegistry.getBeanDefinitionNames()
                            .map(function (it) { return beanDefinitionRegistry.getBeanDefinition(it); });
                        var groupedBeanDefinitions = this.groupBeanDefinition(beanDefinitions);
                        for (var i = 1; i < groupedBeanDefinitions.size; i++) {
                            groupedBeanDefinitions.get(i).forEach(function (val) { return _this.merge(val, beanDefinitionRegistry.getBeanDefinition(val.parent)); });
                        }
                    };
                    MergeBeanFactoryPostProcessor.prototype.groupBeanDefinition = function (beanDefinitions) {
                        return Collections.groupBy(beanDefinitions, function (val, index) {
                            var parentsCount = 0;
                            var parentClass = val.clazz;
                            while ((parentClass = Class.getParentOf(parentClass))) {
                                parentsCount++;
                            }
                            return parentsCount;
                        });
                    };
                    MergeBeanFactoryPostProcessor.prototype.merge = function (beanDefinition, superBeanDefinition) {
                        superBeanDefinition.methods.forEach(function (it) {
                            if (!Collections.some(beanDefinition.methods, (function (val) { return val.name === it.name; }))) {
                                beanDefinition.methods.add(it);
                            }
                        });
                        superBeanDefinition.properties.forEach(function (it) {
                            if (!Collections.some(beanDefinition.properties, (function (val) { return val.name === it.name; }))) {
                                beanDefinition.properties.add(it);
                            }
                        });
                        superBeanDefinition.dependsOn.forEach(function (dependency) { return beanDefinition.dependsOn.add(dependency); });
                    };
                    return MergeBeanFactoryPostProcessor;
                })(Factory.BeanFactoryPostProcessor);
                Support.MergeBeanFactoryPostProcessor = MergeBeanFactoryPostProcessor;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Class = Typejector.Type.Class;
                var Collections = Typejector.Util.Collections;
                var factoryMethod = Typejector.Annotation.factoryMethod;
                var ConfigBeanFactoryPostProcessor = (function (_super) {
                    __extends(ConfigBeanFactoryPostProcessor, _super);
                    function ConfigBeanFactoryPostProcessor() {
                        _super.apply(this, arguments);
                    }
                    ConfigBeanFactoryPostProcessor.prototype.postProcessBeanFactory = function (configurableListableBeanFactory) {
                        var _this = this;
                        configurableListableBeanFactory.getBeanDefinitionNames()
                            .map(function (name) { return configurableListableBeanFactory.getBeanDefinition(name); })
                            .filter(function (beanDefinition) { return Component.BeanUtils.isConfig(beanDefinition); })
                            .forEach(function (beanDefinition) { return _this.processFactoryMethods(beanDefinition, configurableListableBeanFactory); });
                    };
                    ConfigBeanFactoryPostProcessor.prototype.processFactoryMethods = function (beanDefinition, configurableListableBeanFactory) {
                        var _this = this;
                        Collections.filter(beanDefinition.methods, function (methodDesc) { return Collections.contains(methodDesc.annotations, factoryMethod); })
                            .forEach(function (methodDesc) {
                            var returnBeanClass = methodDesc.returnType.clazz;
                            var returnBeanDefinition;
                            if (configurableListableBeanFactory.containsBeanDefinition(returnBeanClass)) {
                                returnBeanDefinition = configurableListableBeanFactory.getBeanDefinition(returnBeanClass);
                            }
                            else {
                                returnBeanDefinition = _this.initializeDefaultBeanDefinition(methodDesc, configurableListableBeanFactory);
                            }
                            _this.initializaFactoryMethod(returnBeanDefinition, beanDefinition, methodDesc, configurableListableBeanFactory);
                        });
                        this.lookupParentBeanDefinition(beanDefinition, configurableListableBeanFactory);
                    };
                    ConfigBeanFactoryPostProcessor.prototype.initializeDefaultBeanDefinition = function (methodDescriptor, configurableListableBeanFactory) {
                        var beanDefinition = new Support.Bean();
                        beanDefinition.clazz = methodDescriptor.returnType.clazz;
                        this.processBeanDefinition(beanDefinition, configurableListableBeanFactory);
                        configurableListableBeanFactory.registerBeanDefinition(Support.BeanNameGenerator.generateBeanName(beanDefinition.clazz), beanDefinition);
                        return beanDefinition;
                    };
                    ConfigBeanFactoryPostProcessor.prototype.lookupParentBeanDefinition = function (beanDefinition, configurableListableBeanFactory) {
                        var parentClass = Class.getParentOf(beanDefinition.clazz);
                        if (parentClass && configurableListableBeanFactory.containsBeanDefinition(parentClass)) {
                            var parentBeanDefinition = configurableListableBeanFactory.getBeanDefinition(parentClass);
                            this.processFactoryMethods(parentBeanDefinition, configurableListableBeanFactory);
                        }
                    };
                    ConfigBeanFactoryPostProcessor.prototype.initializaFactoryMethod = function (beanDefinition, configBeanDefiniton, factoryMethodDescriptor, configurableListableBeanFactory) {
                        var objectGetter = function () {
                            var targetObject = configurableListableBeanFactory.getBean(configBeanDefiniton.clazz);
                            var resolvedArguments = factoryMethodDescriptor.arguments.map(function (arg) { return configurableListableBeanFactory.resolveDependency(arg); });
                            return (_a = targetObject[factoryMethodDescriptor.name]).call.apply(_a, [targetObject].concat(resolvedArguments));
                            var _a;
                        };
                        beanDefinition.factoryMethodName = configBeanDefiniton.name + "#" + factoryMethodDescriptor.name;
                        configurableListableBeanFactory.registerFactory(beanDefinition.factoryMethodName, { getObject: objectGetter });
                    };
                    return ConfigBeanFactoryPostProcessor;
                })(Support.DefaultBeanFactoryPostProcessor);
                Support.ConfigBeanFactoryPostProcessor = ConfigBeanFactoryPostProcessor;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var InstantiationBeanFactoryPostProcessor = (function (_super) {
                    __extends(InstantiationBeanFactoryPostProcessor, _super);
                    function InstantiationBeanFactoryPostProcessor() {
                        _super.apply(this, arguments);
                    }
                    InstantiationBeanFactoryPostProcessor.prototype.postProcessBeanFactory = function (configurableListableBeanFactory) {
                        var _this = this;
                        configurableListableBeanFactory.getBeanDefinitionNames()
                            .map(function (name) { return configurableListableBeanFactory.getBeanDefinition(name); })
                            .filter(function (beanDefinition) { return Component.BeanUtils.isConfig(beanDefinition) || Component.BeanUtils.isSingleton(beanDefinition); })
                            .forEach(function (beanDefinition) { return _this.instantiateBean(beanDefinition); });
                    };
                    InstantiationBeanFactoryPostProcessor.prototype.sortBeanDefinitions = function (configurableListableBeanFactory) {
                        var sortingGraph = new Graph();
                        var beanDefinitions = configurableListableBeanFactory.getBeanDefinitionNames()
                            .map(function (name) { return configurableListableBeanFactory.getBeanDefinition(name); });
                        var sortedBeanDefinitions = [];
                        beanDefinitions.forEach(function (bd) { return sortingGraph.addNode(bd.name); });
                        beanDefinitions.forEach(function (bd) { return bd.dependsOn.forEach(function (dependency) { return sortingGraph.addEdge(bd.name, dependency); }); });
                        sortingGraph.sort().forEach(function (index) { return sortedBeanDefinitions.push(beanDefinitions[index]); });
                    };
                    InstantiationBeanFactoryPostProcessor.prototype.instantiateBean = function (beanDefinition) {
                    };
                    return InstantiationBeanFactoryPostProcessor;
                })(Factory.MergedBeanFactoryPostProcessor);
                Support.InstantiationBeanFactoryPostProcessor = InstantiationBeanFactoryPostProcessor;
                var Node = (function () {
                    function Node(id) {
                        this.id = id;
                        this.visited = false;
                        this.edges = [];
                    }
                    return Node;
                })();
                ;
                var Graph = (function () {
                    function Graph() {
                        this.nodes = [];
                    }
                    Graph.prototype.findNode = function (id) {
                        var i;
                        var found;
                        if (this.nodes.length == 0) {
                            return -1;
                        }
                        i = 0;
                        found = false;
                        while (i < this.nodes.length) {
                            if (this.nodes[i].id == id) {
                                found = true;
                            }
                            if (found) {
                                break;
                            }
                            i++;
                        }
                        if (found) {
                            return i;
                        }
                        else {
                            return -1;
                        }
                    };
                    Graph.prototype.addNode = function (id) {
                        if (this.findNode(id) < 0) {
                            var edges = [];
                            var n = new Node(id);
                            this.nodes.push(n);
                        }
                    };
                    Graph.prototype.addEdge = function (src, dst) {
                        var n;
                        var i = this.findNode(src);
                        var j = this.findNode(dst);
                        if (i >= 0 && j >= 0) {
                            n = this.nodes[i].edges.push(j);
                        }
                    };
                    Graph.prototype.sort = function () {
                        var i, j, m;
                        var L = [], Lid = [];
                        var that = this;
                        for (i in this.nodes) {
                            this.nodes[i].visited = false;
                        }
                        function _visit(n) {
                            var j;
                            if (!that.nodes[n].visited) {
                                that.nodes[n].visited = true;
                                for (j in that.nodes[n].edges) {
                                    m = that.nodes[n].edges[j];
                                    _visit(m);
                                }
                                L.push(n);
                            }
                        }
                        for (i in this.nodes) {
                            _visit(i);
                        }
                        for (i in L) {
                            j = L[i];
                            Lid.push(this.nodes[j].id);
                        }
                        return Lid;
                    };
                    return Graph;
                })();
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Collections = Typejector.Util.Collections;
                var Class = Typejector.Type.Class;
                var DefaultBeanDefinitionRegistry = (function () {
                    function DefaultBeanDefinitionRegistry() {
                        this.registeredBeanDefinitions = new Map();
                    }
                    DefaultBeanDefinitionRegistry.prototype.containsBeanDefinition = function (value) {
                        return Class.isClass(value) ? Collections.some(this.registeredBeanDefinitions, function (beanDef) { return beanDef.clazz === value; }) :
                            this.registeredBeanDefinitions.has(value);
                    };
                    DefaultBeanDefinitionRegistry.prototype.registerBeanDefinition = function (beanName, beanDefinition) {
                        assert(beanDefinition, "BeanDefinition must be presented");
                        beanDefinition.name = beanName;
                        this.registeredBeanDefinitions.set(beanName, beanDefinition);
                    };
                    DefaultBeanDefinitionRegistry.prototype.getBeanDefinition = function (val) {
                        if (!this.containsBeanDefinition(val)) {
                            throw new Error("No such bean definitions found for name '" + (Class.isClass(val) ? Support.BeanNameGenerator.generateBeanName(val) : val) + "'");
                        }
                        return Class.isClass(val) ?
                            Collections.firstOrDefault(Collections.filter(this.registeredBeanDefinitions, function (beanDef) { return beanDef.clazz === val; })) :
                            this.registeredBeanDefinitions.get(val);
                    };
                    DefaultBeanDefinitionRegistry.prototype.getRegisteredBeanDefinitions = function () {
                        return Collections.map(this.registeredBeanDefinitions, function () { return []; }, function (beanDefinition, name) { return beanDefinition; }, function (coll, beanDef) { return coll.push(beanDef); });
                    };
                    DefaultBeanDefinitionRegistry.prototype.getBeanDefinitionNames = function () {
                        return Collections.map(this.registeredBeanDefinitions, function () { return []; }, function (val, key) { return key; }, function (collection, val) { return collection.push(val); });
                    };
                    return DefaultBeanDefinitionRegistry;
                })();
                Support.DefaultBeanDefinitionRegistry = DefaultBeanDefinitionRegistry;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var FactoryBeanRegistrySupport = (function (_super) {
                    __extends(FactoryBeanRegistrySupport, _super);
                    function FactoryBeanRegistrySupport() {
                        _super.apply(this, arguments);
                        this.registeredFactoriesBeans = {};
                    }
                    FactoryBeanRegistrySupport.prototype.registerFactory = function (item, factory) {
                        var name;
                        if (typeof item === typeof "") {
                            name = item;
                        }
                        else {
                            name = Support.BeanNameGenerator.generateBeanName(item);
                        }
                        this.registeredFactoriesBeans[name] = factory;
                    };
                    FactoryBeanRegistrySupport.prototype.getFactory = function (item) {
                        var beanDefinition;
                        if (typeof item === typeof "") {
                            beanDefinition = this.getBeanDefinition(item);
                        }
                        else {
                            beanDefinition = this.getBeanDefinition(Support.BeanNameGenerator.generateBeanName(item));
                        }
                        if (beanDefinition.factoryMethodName && beanDefinition.factoryMethodName in this.registeredFactoriesBeans) {
                            return this.registeredFactoriesBeans[beanDefinition.factoryMethodName];
                        }
                        return this.doGetFactory(beanDefinition);
                    };
                    return FactoryBeanRegistrySupport;
                })(Support.DefaultBeanDefinitionRegistry);
                Support.FactoryBeanRegistrySupport = FactoryBeanRegistrySupport;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Class = Typejector.Type.Class;
                var AbstractBeanFactory = (function (_super) {
                    __extends(AbstractBeanFactory, _super);
                    function AbstractBeanFactory() {
                        _super.apply(this, arguments);
                        this.prototypeScope = new Support.PrototypeScope();
                        this.singletonScope = new Support.SingletonScope();
                        this.registeredScopes = [];
                        this.beanPostProcessors = [];
                    }
                    AbstractBeanFactory.prototype.addBeanPostProcessor = function (beanPostProcessor) {
                        this.beanPostProcessors.push(beanPostProcessor);
                    };
                    AbstractBeanFactory.prototype.getBeanPostProcessors = function () {
                        return this.beanPostProcessors;
                    };
                    AbstractBeanFactory.prototype.getBean = function (item) {
                        var beanDefinition;
                        assert(item);
                        if (Class.isClass(item)) {
                            beanDefinition = this.getBeanDefinition(item);
                        }
                        else {
                            beanDefinition = this.getBeanDefinition(item);
                        }
                        return this.doGetBean(beanDefinition);
                    };
                    AbstractBeanFactory.prototype.registerScope = function (scopeName, scope) {
                        this.registeredScopes[scopeName] = scope;
                    };
                    AbstractBeanFactory.prototype.getRegisteredScope = function (scopeName) {
                        if (scopeName in this.registeredScopes) {
                            return this.registeredScopes[scopeName];
                        }
                        if (scopeName === Support.PrototypeScope.NAME) {
                            return this.prototypeScope;
                        }
                        if (scopeName === Support.SingletonScope.NAME) {
                            return this.singletonScope;
                        }
                        return undefined;
                    };
                    return AbstractBeanFactory;
                })(Support.FactoryBeanRegistrySupport);
                Support.AbstractBeanFactory = AbstractBeanFactory;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Collections = Typejector.Util.Collections;
                var inject = Typejector.Annotation.inject;
                var postConstructor = Typejector.Annotation.postConstructor;
                var AbstractAutowireCapableBeanFactory = (function (_super) {
                    __extends(AbstractAutowireCapableBeanFactory, _super);
                    function AbstractAutowireCapableBeanFactory() {
                        _super.apply(this, arguments);
                    }
                    AbstractAutowireCapableBeanFactory.prototype.createBean = function (clazz) {
                        assert(clazz);
                        var beanDefinition = this.getBeanDefinition(Support.BeanNameGenerator.generateBeanName(clazz));
                        return this.doCreateBean(beanDefinition);
                    };
                    AbstractAutowireCapableBeanFactory.prototype.doCreateBean = function (beanDefinition) {
                        var _this = this;
                        var bean, scope = this.getRegisteredScope(beanDefinition.scope), beanObjectFactory = this.getFactory(beanDefinition.name);
                        bean = scope.get(beanDefinition.name, {
                            getObject: function () {
                                var instance = beanObjectFactory.getObject();
                                if (instance == undefined) {
                                    return instance;
                                }
                                instance = _this.applyBeanPostProcessorsBeforeInitialization(instance, beanDefinition);
                                instance = _this.initializeBean(instance, beanDefinition);
                                instance = _this.applyBeanPostProcessorsAfterInitialization(instance, beanDefinition);
                                return instance;
                            }
                        });
                        return bean;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.initializeBean = function (instance, beanDefinition) {
                        var _this = this;
                        assert(instance);
                        assert(beanDefinition);
                        beanDefinition.properties.forEach(function (property) { return instance[property.name] = _this.resolveDependency(property.clazz); });
                        Collections.filter(beanDefinition.methods, function (it) { return Collections.contains(it.annotations, inject); }).forEach(function (method) {
                            var args = [];
                            for (var _i = 0, _a = method.arguments; _i < _a.length; _i++) {
                                var argType = _a[_i];
                                args.push(_this.resolveDependency(argType));
                            }
                            instance[method.name].apply(instance, args);
                        });
                        return instance;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function (existingBean, beanDefinititon) {
                        var instance = existingBean;
                        assert(existingBean);
                        assert(beanDefinititon);
                        for (var _i = 0, _a = this.getBeanPostProcessors(); _i < _a.length; _i++) {
                            var beanProcessor = _a[_i];
                            instance = beanProcessor.postProcessBeforeInitialization(instance, beanDefinititon);
                            if (instance == null) {
                                return instance;
                            }
                        }
                        return instance;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function (existingBean, beanDefinititon) {
                        var _this = this;
                        var instance = existingBean;
                        assert(existingBean);
                        assert(beanDefinititon);
                        for (var _i = 0, _a = this.getBeanPostProcessors(); _i < _a.length; _i++) {
                            var beanProcessor = _a[_i];
                            instance = beanProcessor.postProcessAfterInitialization(instance, beanDefinititon);
                            if (instance == undefined) {
                                return instance;
                            }
                        }
                        Collections.filter(beanDefinititon.methods, function (it) { return Collections.contains(it.annotations, postConstructor); }).forEach(function (method) {
                            var args = [];
                            for (var _i = 0, _a = method.arguments; _i < _a.length; _i++) {
                                var argType = _a[_i];
                                args.push(_this.resolveDependency(argType));
                            }
                            instance[method.name].apply(instance, args);
                        });
                        return instance;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.doGetFactory = function (beanDefinition) {
                        var _this = this;
                        return {
                            getObject: function () {
                                var resolvedValues = beanDefinition.constructorArguments
                                    .map(function (td) {
                                    assert(td);
                                    return _this.resolveDependency(td);
                                });
                                return Component.BeanUtils.newInstance.apply(Component.BeanUtils, [beanDefinition.clazz].concat(resolvedValues));
                            }
                        };
                    };
                    AbstractAutowireCapableBeanFactory.prototype.resolveDependency = function (typeDescriptor) {
                        assert(typeDescriptor);
                        return this.doResolveDependency(typeDescriptor);
                    };
                    return AbstractAutowireCapableBeanFactory;
                })(Support.AbstractBeanFactory);
                Support.AbstractAutowireCapableBeanFactory = AbstractAutowireCapableBeanFactory;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Class = Typejector.Type.Class;
                var Collections = Typejector.Util.Collections;
                var DefaultListableBeanFactory = (function (_super) {
                    __extends(DefaultListableBeanFactory, _super);
                    function DefaultListableBeanFactory() {
                        _super.apply(this, arguments);
                    }
                    DefaultListableBeanFactory.prototype.getBeansOfType = function (clazz) {
                        assert(clazz);
                        return this.doGetBeansOfType(clazz);
                    };
                    DefaultListableBeanFactory.prototype.getBeanNamesOfType = function (clazz) {
                        assert(clazz);
                        return this.doGetBeanNamesOfType(clazz);
                    };
                    DefaultListableBeanFactory.prototype.doGetBeanNamesOfType = function (clazz) {
                        var beanDefinitions, beanNames;
                        assert(clazz);
                        beanDefinitions = this.doGetBeanDefinitionsOfType(clazz, true);
                        beanNames = beanDefinitions.map(function (bd) { return bd.name; });
                        return beanNames;
                    };
                    DefaultListableBeanFactory.prototype.doGetBeansOfType = function (clazz) {
                        var _this = this;
                        var beanDefinitions, beans;
                        beanDefinitions = this.doGetBeanDefinitionsOfType(clazz);
                        beans = beanDefinitions.map(function (bd) { return _this.doGetBean(bd); });
                        return beans;
                    };
                    DefaultListableBeanFactory.prototype.doGetBeanDefinitionsOfType = function (clazz, useAbstract) {
                        var beanDefinitions = this.getRegisteredBeanDefinitions();
                        beanDefinitions = beanDefinitions.filter(function (val) { return Class.isAssignable(clazz, val.clazz)
                            && (useAbstract || !Component.BeanUtils.isAbstract(val)); });
                        return beanDefinitions;
                    };
                    DefaultListableBeanFactory.prototype.doGetBean = function (beanDefinition) {
                        var bean;
                        if (Component.BeanUtils.isAbstract(beanDefinition)) {
                            var beanDefinitions = this.doGetBeanDefinitionsOfType(beanDefinition.clazz);
                            if (!beanDefinitions.length) {
                                throw new Error("No " + beanDefinition.name + " class found");
                            }
                            bean = this.doGetBean(beanDefinitions.pop());
                        }
                        else {
                            bean = this.createBean(beanDefinition.clazz);
                        }
                        return bean;
                    };
                    DefaultListableBeanFactory.prototype.doResolveDependency = function (typeDescriptor) {
                        var result;
                        if (Collections.isCollection(typeDescriptor.clazz)) {
                            result = this.getBeansOfType(typeDescriptor.genericTypes[0]);
                        }
                        else {
                            result = this.getBean(typeDescriptor.clazz);
                        }
                        return result;
                    };
                    return DefaultListableBeanFactory;
                })(Support.AbstractAutowireCapableBeanFactory);
                Support.DefaultListableBeanFactory = DefaultListableBeanFactory;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Context;
        (function (Context) {
            var BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
            var Bean = Component.Factory.Support.Bean;
            var singleton = Typejector.Annotation.singleton;
            var ApplicationContext = (function () {
                function ApplicationContext() {
                    this.mainBeanFactory = new Component.Factory.Support.DefaultListableBeanFactory();
                    this.initialize();
                }
                ApplicationContext.prototype.initialize = function () {
                    var _this = this;
                    var applicationContextBeanDefinition = new Bean();
                    applicationContextBeanDefinition.name = BeanNameGenerator.generateBeanName(ApplicationContext);
                    applicationContextBeanDefinition.clazz = ApplicationContext;
                    applicationContextBeanDefinition.factoryMethodName = applicationContextBeanDefinition.name;
                    applicationContextBeanDefinition.annotations.add(singleton);
                    this.mainBeanFactory.registerFactory(applicationContextBeanDefinition.factoryMethodName, {
                        getObject: function () { return _this; }
                    });
                    this.mainBeanFactory.registerBeanDefinition(applicationContextBeanDefinition.name, applicationContextBeanDefinition);
                };
                ApplicationContext.prototype.register = function (typeDescriptor) {
                };
                ApplicationContext.prototype.getBean = function (item) {
                    return this.mainBeanFactory.getBean(item);
                };
                ApplicationContext.prototype.getBeanFactory = function () { return this.mainBeanFactory; };
                return ApplicationContext;
            })();
            Context.ApplicationContext = ApplicationContext;
        })(Context = Component.Context || (Component.Context = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var ApplicationContext = Typejector.Component.Context.ApplicationContext;
    var context = new ApplicationContext();
    function getContext() {
        return context;
    }
    Typejector.getContext = getContext;
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function testAnnotation() {
        }
        describe("Annotations Utils Test", function () {
            it("#add", function () {
                Annotation.Annotations.add(testAnnotation, { test: "hi" }, testAnnotation, "test");
            });
            it("#get", function () {
                var result = Annotation.Annotations.get(testAnnotation, "test");
                assert(result);
                if (!result.size) {
                    throw new Error("Empty map");
                }
            });
        });
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Annotations = Typejector.Annotation.Annotations;
        describe("Annotations Integration Test", function () {
            it("Inject Annotation Existing Test", function () {
                var Test = (function () {
                    function Test() {
                    }
                    __decorate([
                        Annotation.inject, 
                        __metadata('design:type', String)
                    ], Test.prototype, "prop", void 0);
                    return Test;
                })();
                var result = Annotations.get(Test.prototype, "prop");
                if (result.size === 0 || result.get(Annotation.inject) == undefined) {
                    throw new Error("There are no annoataion presented");
                }
            });
        });
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Class = Typejector.Type.Class;
        var A = (function () {
            function A() {
            }
            return A;
        })();
        var B = (function (_super) {
            __extends(B, _super);
            function B() {
                _super.apply(this, arguments);
            }
            return B;
        })(A);
        var C = (function (_super) {
            __extends(C, _super);
            function C() {
                _super.apply(this, arguments);
            }
            return C;
        })(B);
        describe("ClassBeanDefinitionScanner Test", function () {
            it("#scan", function () {
                var scannedBeanDefinitions;
                Class.register(C);
                scannedBeanDefinitions = new Annotation.ClassBeanDefinitionScanner().scan();
                if (!scannedBeanDefinitions || scannedBeanDefinitions.length !== 3) {
                    throw new Error("Illegal array of Beans");
                }
            });
        });
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Util;
    (function (Util) {
        describe("Collections Utils Test", function () {
            it("#add", function () {
            });
        });
    })(Util = Typejector.Util || (Typejector.Util = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Type;
    (function (Type) {
        describe("Class Test", function () {
            it("#getParentOf should return undefined for Function", function () {
                var parent = Type.Class.getParentOf(Function);
                if (parent) {
                    throw new Error("Parent of Function should be undefined");
                }
            });
            it("#getParentOf should return something for {new Object()}", function () {
                var parent = Type.Class.getParentOf({});
                if (!parent) {
                    throw new Error("Parent of {} should not be undefined");
                }
            });
            it("#getParentOf should return something for String", function () {
                var parent = Type.Class.getParentOf("");
                if (!parent) {
                    throw new Error("Parent of {} should not be undefined");
                }
            });
        });
    })(Type = Typejector.Type || (Typejector.Type = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var inject = Typejector.Annotation.inject;
                var MockClass = (function () {
                    function MockClass() {
                    }
                    MockClass.prototype.testmethod = function (arg) {
                    };
                    __decorate([
                        inject, 
                        __metadata('design:type', MockClass)
                    ], MockClass.prototype, "prop", void 0);
                    __decorate([
                        inject, 
                        __metadata('design:type', Function), 
                        __metadata('design:paramtypes', [MockClass]), 
                        __metadata('design:returntype', void 0)
                    ], MockClass.prototype, "testmethod", null);
                    return MockClass;
                })();
                function createMockBeanDefinition() {
                    var bean = new Support.Bean();
                    bean.clazz = MockClass;
                    return bean;
                }
                describe("DefaultBeanDefinitionPostProcessor Integration Test", function () {
                    it("Test DefaultBeanDefinitionPostProcessor#postProcessBeanDefinition method initialize bean definition correctly", function () {
                        var registry = new Support.DefaultListableBeanFactory();
                        var mockBean = createMockBeanDefinition();
                        registry.registerBeanDefinition("MockClass", mockBean);
                        new Support.DefaultBeanFactoryPostProcessor().postProcessBeanFactory(registry);
                        if (!mockBean.methods.size || !mockBean.properties.size || !mockBean.dependsOn.size) {
                            throw new Error("Incorrect BeanDefinition expected");
                        }
                    });
                });
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var inject = Typejector.Annotation.inject;
                var ParentOfMock = (function () {
                    function ParentOfMock() {
                    }
                    ParentOfMock.prototype.parenttestmethod = function (arg) {
                    };
                    __decorate([
                        inject, 
                        __metadata('design:type', ParentOfMock)
                    ], ParentOfMock.prototype, "anotherProp", void 0);
                    __decorate([
                        inject, 
                        __metadata('design:type', Function), 
                        __metadata('design:paramtypes', [ParentOfMock]), 
                        __metadata('design:returntype', void 0)
                    ], ParentOfMock.prototype, "parenttestmethod", null);
                    return ParentOfMock;
                })();
                var MockClass = (function (_super) {
                    __extends(MockClass, _super);
                    function MockClass() {
                        _super.apply(this, arguments);
                    }
                    MockClass.prototype.testmethod = function (arg) {
                    };
                    __decorate([
                        inject, 
                        __metadata('design:type', MockClass)
                    ], MockClass.prototype, "prop", void 0);
                    __decorate([
                        inject, 
                        __metadata('design:type', Function), 
                        __metadata('design:paramtypes', [MockClass]), 
                        __metadata('design:returntype', void 0)
                    ], MockClass.prototype, "testmethod", null);
                    return MockClass;
                })(ParentOfMock);
                function createMockBeanDefinition() {
                    var bean = new Support.Bean();
                    bean.clazz = MockClass;
                    return bean;
                }
                function createParentOfMockBeanDefinition() {
                    var bean = new Support.Bean();
                    bean.clazz = ParentOfMock;
                    return bean;
                }
                describe("MergeBeanDefinitionPostProcessor Integration Test", function () {
                    it("Test MergeBeanDefinitionPostProcessor#postProcessBeanDefinition method initialize bean definition correctly", function () {
                        var registry = new Support.DefaultListableBeanFactory();
                        var mockBean = createMockBeanDefinition();
                        var parentOfMockBean = createParentOfMockBeanDefinition();
                        registry.registerBeanDefinition("MockClass", mockBean);
                        registry.registerBeanDefinition("ParentOfMock", parentOfMockBean);
                        new Support.DefaultBeanFactoryPostProcessor().postProcessBeanFactory(registry);
                        new Support.MergeBeanFactoryPostProcessor().postProcessBeanFactory(registry);
                        if (mockBean.methods.size != 2 || mockBean.properties.size != 2 || mockBean.dependsOn.size != 2) {
                            throw new Error("Incorrect BeanDefinition expected");
                        }
                    });
                });
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
//# sourceMappingURL=typejector.js.map