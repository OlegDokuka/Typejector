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
                src.forEach(function (it) { if (element === it)
                    result = true; });
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
            Collections.filter = function (src, filter) {
                var collection = Object.create(Object.getPrototypeOf(src));
                src.forEach(function (val, key) { return filter(val, key) ? Collections.add(collection, key, val) : void 0; });
                return collection;
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
"use strict";
var Reflect;
(function (Reflect) {
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
        var Factory;
        (function (Factory) {
            var BeanDefinitionPostProcessor = (function () {
                function BeanDefinitionPostProcessor() {
                }
                return BeanDefinitionPostProcessor;
            })();
            Factory.BeanDefinitionPostProcessor = BeanDefinitionPostProcessor;
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
                var DefaultBeanDefinitionRegistry = (function () {
                    function DefaultBeanDefinitionRegistry() {
                        this.registeredBeanDefinitions = [];
                    }
                    DefaultBeanDefinitionRegistry.prototype.containsBeanDefinition = function (beanName) {
                        return this.registeredBeanDefinitions.some(function (it) { return it.name === beanName; });
                    };
                    DefaultBeanDefinitionRegistry.prototype.registerBeanDefinition = function (beanName, beanDefinition) {
                        assert(beanDefinition, "BeanDefinition must be presented");
                        var existedBeanDefinition = this.registeredBeanDefinitions.filter(function (it) { return it.name === beanName; })[0];
                        if (existedBeanDefinition == undefined) {
                            this.registeredBeanDefinitions.push(beanDefinition);
                        }
                        else {
                            var beanPosition = this.registeredBeanDefinitions.indexOf(existedBeanDefinition);
                            this.registeredBeanDefinitions[beanPosition] = beanDefinition;
                        }
                    };
                    DefaultBeanDefinitionRegistry.prototype.getBeanDefinition = function (beanName) {
                        if (!this.containsBeanDefinition(beanName)) {
                            throw new Error("No such bean definitions found for name '" + beanName + "'");
                        }
                        return this.registeredBeanDefinitions.filter(function (it) { return it.name === beanName; })[0];
                    };
                    DefaultBeanDefinitionRegistry.prototype.getRegisteredBeanDefinitions = function () {
                        return this.registeredBeanDefinitions;
                    };
                    DefaultBeanDefinitionRegistry.prototype.getBeanDefinitionNames = function () {
                        return this.registeredBeanDefinitions.map(function (it) { return it.name; });
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
                var DefaultBeanDefinitionPostProcessor = (function (_super) {
                    __extends(DefaultBeanDefinitionPostProcessor, _super);
                    function DefaultBeanDefinitionPostProcessor() {
                        _super.apply(this, arguments);
                    }
                    DefaultBeanDefinitionPostProcessor.prototype.postProcessBeanDefinition = function (beanDefinitionRegistry) {
                        var _this = this;
                        beanDefinitionRegistry
                            .getBeanDefinitionNames()
                            .map(function (name) { return beanDefinitionRegistry.getBeanDefinition(name); })
                            .forEach(function (bean) {
                            var clazz = bean.clazz;
                            var parentClass = Class.getParentOf(clazz);
                            bean.name = BeanNameGenerator.generateBeanName(clazz);
                            if (parentClass) {
                                bean.parent = BeanNameGenerator.generateBeanName(parentClass);
                            }
                            _this.processClassAnnotations(bean);
                            Object.keys(clazz.prototype).forEach(function (it) {
                                var property = clazz.prototype[it];
                                if (property != undefined && Class.getParentOf(property) === undefined) {
                                    _this.processMethods(bean, it);
                                }
                                else {
                                    _this.processProperties(bean, it);
                                }
                            });
                        });
                    };
                    DefaultBeanDefinitionPostProcessor.prototype.processClassAnnotations = function (bean) {
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
                    DefaultBeanDefinitionPostProcessor.prototype.processMethods = function (bean, propKey) {
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
                    DefaultBeanDefinitionPostProcessor.prototype.processProperties = function (bean, propKey) {
                        var clazz = bean.clazz;
                        var annotations = Collections.map(Annotations.get(clazz.prototype, propKey), function () { return new Set(); }, function (value, key) { return key; }, function (set, item) { return set.add(item); });
                        if (Collections.contains(annotations, inject)) {
                            var descriptor = {
                                name: propKey,
                                clazz: this.buildTypeDescriptor(clazz, Reflection.getType(clazz, propKey), propKey),
                                annotations: annotations
                            };
                            bean.properties.add(descriptor);
                        }
                    };
                    DefaultBeanDefinitionPostProcessor.prototype.buildTypeDescriptor = function (src, propType, propKey, index) {
                        var paramDescriptor = new TypeDescriptor();
                        paramDescriptor.clazz = propType;
                        if (Collections.isCollection(propType)) {
                            paramDescriptor.genericTypes = Annotations.get(src.prototype, propKey, index).get(generic);
                        }
                        return paramDescriptor;
                    };
                    return DefaultBeanDefinitionPostProcessor;
                })(Factory.BeanDefinitionPostProcessor);
                Support.DefaultBeanDefinitionPostProcessor = DefaultBeanDefinitionPostProcessor;
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
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
                        var registry = new Support.DefaultBeanDefinitionRegistry();
                        var mockBean = createMockBeanDefinition();
                        registry.registerBeanDefinition("MockClass", mockBean);
                        new Support.DefaultBeanDefinitionPostProcessor().postProcessBeanDefinition(registry);
                        if (!mockBean.methods.size || !mockBean.properties.size) {
                            throw new Error("Incorrect BeanDefinition expected");
                        }
                    });
                });
            })(Support = Factory.Support || (Factory.Support = {}));
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
//# sourceMappingURL=typejector.js.map