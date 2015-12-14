/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
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
        var ArrayUtils = (function () {
            function ArrayUtils() {
            }
            ArrayUtils.remove = function (src, element) {
                assert(src);
                assert(element);
                var index = src.indexOf(element);
                if (index > -1) {
                    src.splice(index, 1);
                    return true;
                }
                return false;
            };
            ArrayUtils.contains = function (src, element) {
                assert(src);
                assert(element);
                return src.indexOf(element) > -1;
            };
            return ArrayUtils;
        })();
        Util.ArrayUtils = ArrayUtils;
    })(Util = Typejector.Util || (Typejector.Util = {}));
})(Typejector || (Typejector = {}));
/// <reference path="Interface/IEvent.ts" />
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
                    TypeDescriptor.prototype.isArray = function () {
                        return Array === this.clazz || Array.prototype.isPrototypeOf(this.clazz.prototype);
                    };
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
                        this.annotations = [];
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
        var FieldDependencyDescriptor = Typejector.Component.Context.Config.FieldDependencyDescriptor;
        var ArgumentDependencyDescriptor = Typejector.Component.Context.Config.ArgumentDependencyDescriptor;
        function inject(requestType) {
            var genericTypes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                genericTypes[_i - 1] = arguments[_i];
            }
            return function (prototype) {
                var properties = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    properties[_i - 1] = arguments[_i];
                }
                var argsCount = properties.length, descriptor;
                var a = Reflect.getMetadata("design:type", prototype.constructor, properties[0]);
                var b = Reflect.getMetadata("design:type", prototype, properties[0]);
                switch (argsCount) {
                    case 1:
                        {
                            descriptor = new FieldDependencyDescriptor();
                            descriptor.clazz = requestType;
                            descriptor.parent = prototype.constructor;
                            descriptor.genericTypes = genericTypes;
                            descriptor.name = properties[0];
                            descriptor.annotations.push(inject);
                        }
                        break;
                    case 2:
                        {
                            if (typeof properties[1] === typeof 1) {
                                descriptor = new ArgumentDependencyDescriptor();
                                descriptor.clazz = requestType;
                                descriptor.genericTypes = genericTypes;
                                descriptor.methodName = properties[0];
                                descriptor.position = properties[1];
                                if (typeof prototype === typeof inject) {
                                    descriptor.parent = prototype;
                                }
                                else if (typeof prototype === typeof Object.prototype) {
                                    descriptor.parent = prototype.constructor;
                                }
                            }
                        }
                        break;
                }
                Typejector.getContext().register(descriptor);
            };
        }
        Annotation.inject = inject;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var BeanDescriptor = Typejector.Component.Context.Config.BeanDescriptor;
        function injection(value) {
            var annotation = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                annotation[_i - 1] = arguments[_i];
            }
            var descriptor = new BeanDescriptor();
            if (typeof value === typeof []) {
                return function (clazz) {
                    descriptor.clazz = clazz;
                    descriptor.annotations = value;
                    Typejector.getContext().register(descriptor);
                };
            }
            else {
                descriptor.clazz = value;
                descriptor.annotations = annotation;
                Typejector.getContext().register(descriptor);
            }
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
        var MethodDependencyDescriptor = Typejector.Component.Context.Config.MethodDependencyDescriptor;
        function postConstructor(target, propertyKey, descriptor, order) {
            if (propertyKey && descriptor) {
                var dependencyDescriptor = new MethodDependencyDescriptor();
                dependencyDescriptor.parent = target.constructor;
                dependencyDescriptor.name = propertyKey;
                dependencyDescriptor.annotations.push(postConstructor);
                Typejector.getContext().register(dependencyDescriptor);
            }
            else {
                return function (parent, propertyName, propertyDescriptor) {
                    postConstructor(parent, propertyName, propertyDescriptor, target);
                };
            }
        }
        Annotation.postConstructor = postConstructor;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var MethodDependencyDescriptor = Typejector.Component.Context.Config.MethodDependencyDescriptor;
        var TypeDescriptor = Typejector.Component.Factory.Config.TypeDescriptor;
        function factoryMethod(returnType) {
            return function (parent, propertyName, propertyDescriptor) {
                var dependencyDescriptor = new MethodDependencyDescriptor(), typeDescriptor = new TypeDescriptor();
                typeDescriptor.clazz = returnType;
                dependencyDescriptor.annotations.push(factoryMethod);
                dependencyDescriptor.parent = parent.constructor;
                dependencyDescriptor.name = propertyName;
                dependencyDescriptor.returnType = typeDescriptor;
                Typejector.getContext().register(dependencyDescriptor);
            };
        }
        Annotation.factoryMethod = factoryMethod;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function config(clazz) {
            Annotation.injection(clazz, Annotation.singleton, config);
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
                        this.isReady = false;
                        this.annotations = [];
                        this.scopeNames = [];
                        this.constructorArguments = [];
                        this.properties = [];
                        this.methods = [];
                        this.postConstructors = [];
                    }
                    Bean.prototype.hasAnnotation = function (annotation) {
                        return this.annotations.some(function (val) { return val === annotation; });
                    };
                    return Bean;
                })();
                Support.Bean = Bean;
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
                var BeanNameGenerator = (function () {
                    function BeanNameGenerator() {
                    }
                    BeanNameGenerator.generateBeanName = function (clazz) {
                        return clazz.toString();
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
    var Component;
    (function (Component) {
        var abstract = Typejector.Annotation.abstract;
        var config = Typejector.Annotation.config;
        var singleton = Typejector.Annotation.singleton;
        var BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
        var Bean = Component.Factory.Support.Bean;
        var BeanUtils = (function () {
            function BeanUtils() {
            }
            BeanUtils.isAssignable = function (clazz, classFrom) {
                return clazz === classFrom || clazz.prototype.isPrototypeOf(classFrom.prototype);
            };
            BeanUtils.isAbstract = function (beanDefinition) {
                return beanDefinition.annotations.some(function (it) { return it === abstract; });
            };
            BeanUtils.isConfig = function (beanDefinition) {
                return beanDefinition.annotations.some(function (it) { return it === config; });
            };
            BeanUtils.isSingleton = function (beanDefinition) {
                return beanDefinition.annotations.some(function (it) { return it === singleton; });
            };
            BeanUtils.getMethodDescriptor = function (beanDefinition, methodName) {
                return beanDefinition.methods
                    .filter(function (md) { return md.name === methodName; })[0];
            };
            BeanUtils.getOrCreateMethodDescriptor = function (beanDefinition, methodName) {
                var existedMethodDescriptor = BeanUtils.getMethodDescriptor(beanDefinition, methodName);
                return existedMethodDescriptor != undefined ? existedMethodDescriptor : beanDefinition.methods[beanDefinition.methods.push({
                    name: methodName,
                    arguments: [],
                    annotations: [],
                    returnType: undefined
                }) - 1];
            };
            BeanUtils.getOrCreateBeanDefinition = function (beanFactory, clazz) {
                var beanDefinition;
                var beanName = BeanNameGenerator.generateBeanName(clazz);
                if (beanFactory.containsBeanDefinition(beanName)) {
                    beanDefinition = beanFactory.getBeanDefinition(beanName);
                }
                else {
                    beanDefinition = new Bean();
                    beanDefinition.clazz = clazz;
                    beanDefinition.name = beanName;
                }
                return beanDefinition;
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
                var DefaultBeanDefinitionPostProcessor = (function (_super) {
                    __extends(DefaultBeanDefinitionPostProcessor, _super);
                    function DefaultBeanDefinitionPostProcessor() {
                        _super.apply(this, arguments);
                    }
                    DefaultBeanDefinitionPostProcessor.prototype.postProcessBeanDefinition = function (beanDefinition) {
                        beanDefinition.scopeNames.forEach(function (it, id) { return it === Support.SingletonScope.NAME || it === Support.PrototypeScope.NAME ?
                            beanDefinition.scopeNames.splice(id, 1) : void (0); });
                        if (Component.BeanUtils.isSingleton(beanDefinition)) {
                            beanDefinition.scopeNames.push(Support.SingletonScope.NAME);
                        }
                        else {
                            beanDefinition.scopeNames.push(Support.PrototypeScope.NAME);
                        }
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
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var MergeBeanDefinitionPostProcessor = (function (_super) {
                    __extends(MergeBeanDefinitionPostProcessor, _super);
                    function MergeBeanDefinitionPostProcessor(beanDefinitionRegistry) {
                        _super.call(this);
                        this.beanDefinitionRegistry = beanDefinitionRegistry;
                    }
                    MergeBeanDefinitionPostProcessor.prototype.postProcessBeanDefinition = function (beanDefinition) {
                        var _this = this;
                        this.beanDefinitionRegistry.getBeanDefinitionNames()
                            .map(function (it) { return _this.beanDefinitionRegistry.getBeanDefinition(it); })
                            .filter(function (it) { return it.clazz !== beanDefinition.clazz && Component.BeanUtils.isAssignable(it.clazz, beanDefinition.clazz); })
                            .forEach(function (it) { return _this.merge(beanDefinition, it); });
                    };
                    MergeBeanDefinitionPostProcessor.prototype.merge = function (beanDefinition, superBeanDefinition) {
                        if (superBeanDefinition.constructorArguments.length > beanDefinition.constructorArguments.length) {
                            for (var i = beanDefinition.constructorArguments.length; i < superBeanDefinition.constructorArguments.length; i++) {
                                beanDefinition.constructorArguments[i] = superBeanDefinition.constructorArguments[i];
                            }
                        }
                        superBeanDefinition.methods.forEach(function (it) {
                            if (!beanDefinition.methods.some(function (val) { return val.name === it.name; })) {
                                beanDefinition.methods.push(it);
                            }
                        });
                        superBeanDefinition.properties.forEach(function (it) {
                            if (!beanDefinition.properties.some(function (val) { return val.name === it.name; })) {
                                beanDefinition.properties.push(it);
                            }
                        });
                    };
                    return MergeBeanDefinitionPostProcessor;
                })(Factory.BeanDefinitionPostProcessor);
                Support.MergeBeanDefinitionPostProcessor = MergeBeanDefinitionPostProcessor;
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
                var ArrayUtils = Typejector.Util.ArrayUtils;
                var factoryMethod = Typejector.Annotation.factoryMethod;
                var ConfigBeanDefinitionPostProcessor = (function (_super) {
                    __extends(ConfigBeanDefinitionPostProcessor, _super);
                    function ConfigBeanDefinitionPostProcessor(beanDefinitionRegistry) {
                        _super.call(this);
                        this.configurableListableBeanFactory = beanDefinitionRegistry;
                    }
                    ConfigBeanDefinitionPostProcessor.prototype.postProcessBeanDefinition = function (beanDefinition) {
                        if (Component.BeanUtils.isConfig(beanDefinition)) {
                            this.processConfigurationBeanDefinitionDefinition(beanDefinition);
                        }
                        else if (Component.BeanUtils.isAssignable(Factory.BeanPostProcessor, beanDefinition.clazz)) {
                            this.processBeanPostProcessorsDefinition(beanDefinition);
                        }
                        else if (Component.BeanUtils.isAssignable(Factory.BeanDefinitionPostProcessor, beanDefinition.clazz)) {
                            this.processBeanDefinitionPostProcessorsDefinition(beanDefinition);
                        }
                    };
                    ConfigBeanDefinitionPostProcessor.prototype.processBeanDefinitionPostProcessorsDefinition = function (beanDefinition) {
                        var processor = this.configurableListableBeanFactory.getBean(beanDefinition.name);
                        assert(processor, "BeanDefinitionPostProcessor initialization failed");
                        this.configurableListableBeanFactory.addBeanDefinitionPostProcessor(processor);
                    };
                    ConfigBeanDefinitionPostProcessor.prototype.processBeanPostProcessorsDefinition = function (beanDefinition) {
                        var processor = this.configurableListableBeanFactory.getBean(beanDefinition.name);
                        assert(processor, "BeanPostProcessor initialization failed");
                        this.configurableListableBeanFactory.addBeanPostProcessor(processor);
                    };
                    ConfigBeanDefinitionPostProcessor.prototype.processConfigurationBeanDefinitionDefinition = function (beanDefinition) {
                        var _this = this;
                        beanDefinition.methods.filter(function (it) { return ArrayUtils.contains(it.annotations, factoryMethod); }).forEach(function (it) {
                            var beanNameForFactoryMethod = Support.BeanNameGenerator.generateBeanName(it.returnType.clazz), objectGetter = function () {
                                var resolvedArguments = it.arguments.map(function (arg) { return _this.configurableListableBeanFactory.resolveDependency(arg); }), targetObject = _this.configurableListableBeanFactory.getBean(beanDefinition.clazz);
                                return (_a = targetObject[it.name]).call.apply(_a, [targetObject].concat(resolvedArguments));
                                var _a;
                            }, providedBeanDefinition = Component.BeanUtils.getOrCreateBeanDefinition(_this.configurableListableBeanFactory, it.returnType.clazz);
                            _this.configurableListableBeanFactory.registerFactory(beanNameForFactoryMethod, { getObject: objectGetter });
                            providedBeanDefinition.factoryMethodName = beanNameForFactoryMethod;
                            _this.configurableListableBeanFactory.registerBeanDefinition(providedBeanDefinition.name, providedBeanDefinition);
                        });
                    };
                    return ConfigBeanDefinitionPostProcessor;
                })(Factory.BeanDefinitionPostProcessor);
                Support.ConfigBeanDefinitionPostProcessor = ConfigBeanDefinitionPostProcessor;
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
                var DefaultBeanDefinitionRegistry = (function () {
                    function DefaultBeanDefinitionRegistry() {
                        this.registeredBeanDefinitions = [];
                        this.beanDefinitionPostProcessors = [];
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
                        if (beanDefinition.isReady) {
                            this.applyBeanDefinitionPostProcessor(beanDefinition);
                        }
                    };
                    DefaultBeanDefinitionRegistry.prototype.getBeanDefinition = function (beanName) {
                        if (!this.containsBeanDefinition(beanName)) {
                            throw new Error("No such bean definitions found for name '" + beanName + "'");
                        }
                        return this.registeredBeanDefinitions.filter(function (it) { return it.name === beanName; })[0];
                    };
                    DefaultBeanDefinitionRegistry.prototype.addBeanDefinitionPostProcessor = function (beanDefinitionPostProcessor) {
                        this.beanDefinitionPostProcessors.push(beanDefinitionPostProcessor);
                    };
                    DefaultBeanDefinitionRegistry.prototype.getRegisteredBeanDefinitions = function () {
                        return this.registeredBeanDefinitions;
                    };
                    DefaultBeanDefinitionRegistry.prototype.applyBeanDefinitionPostProcessor = function (beanDefinition) {
                        for (var _i = 0, _a = this.beanDefinitionPostProcessors; _i < _a.length; _i++) {
                            var processor = _a[_i];
                            processor.postProcessBeanDefinition(beanDefinition);
                        }
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
                    AbstractBeanFactory.prototype.containsBean = function (item) {
                        var beanName;
                        assert(item);
                        beanName = typeof item === typeof this.containsBean ?
                            Support.BeanNameGenerator.generateBeanName(item) : item;
                        return this.containsBeanDefinition(beanName);
                    };
                    AbstractBeanFactory.prototype.getBean = function (item) {
                        var beanDefinition;
                        assert(item);
                        if (typeof item === typeof "") {
                            beanDefinition = this.getBeanDefinition(item);
                        }
                        else {
                            beanDefinition = this.getBeanDefinition(Support.BeanNameGenerator.generateBeanName(item));
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
                var ArrayUtils = Typejector.Util.ArrayUtils;
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
                        var bean, scopes, beanObjectFactory = this.getFactory(beanDefinition.name);
                        scopes = beanDefinition.scopeNames.map(function (scopeName) { return _this.getRegisteredScope(scopeName); });
                        for (var _i = 0; _i < scopes.length; _i++) {
                            var scope = scopes[_i];
                            bean = scope.get(beanDefinition.name, {
                                getObject: function () {
                                    var bean = beanObjectFactory.getObject();
                                    if (bean == undefined) {
                                        return bean;
                                    }
                                    bean = _this.applyBeanPostProcessorsBeforeInitialization(bean, beanDefinition);
                                    bean = _this.initializeBean(bean, beanDefinition);
                                    bean = _this.applyBeanPostProcessorsAfterInitialization(bean, beanDefinition);
                                    return bean;
                                }
                            });
                            if (bean != undefined) {
                                break;
                            }
                        }
                        return bean;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.initializeBean = function (instance, beanDefinition) {
                        var _this = this;
                        assert(instance);
                        assert(beanDefinition);
                        for (var _i = 0, _a = beanDefinition.properties; _i < _a.length; _i++) {
                            var property = _a[_i];
                            instance[property.name] = this.resolveDependency(property.clazz);
                        }
                        beanDefinition.methods.filter(function (it) { return ArrayUtils.contains(it.annotations, inject); }).forEach(function (method) {
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
                        beanDefinititon.methods.filter(function (it) { return ArrayUtils.contains(it.annotations, postConstructor); }).forEach(function (method) {
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
                        beanDefinitions = beanDefinitions.filter(function (val) { return Component.BeanUtils.isAssignable(clazz, val.clazz)
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
                        if (typeDescriptor.isArray()) {
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
            var DependencyDescriptor = Component.Factory.Config.DependencyDescriptor;
            var BeanDescriptor = Context.Config.BeanDescriptor;
            var ArgumentDependencyDescriptor = Context.Config.ArgumentDependencyDescriptor;
            var FieldDependencyDescriptor = Context.Config.FieldDependencyDescriptor;
            var BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
            var Bean = Component.Factory.Support.Bean;
            var DefaultBeanDefinitionPostProcessor = Component.Factory.Support.DefaultBeanDefinitionPostProcessor;
            var MergeBeanDefinitionPostProcessor = Component.Factory.Support.MergeBeanDefinitionPostProcessor;
            var ConfigBeanDefinitionPostProcessor = Component.Factory.Support.ConfigBeanDefinitionPostProcessor;
            var MethodDependencyDescriptor = Context.Config.MethodDependencyDescriptor;
            var singleton = Typejector.Annotation.singleton;
            var ApplicationContext = (function () {
                function ApplicationContext() {
                    this.mainBeanFactory = new Component.Factory.Support.DefaultListableBeanFactory();
                    this.mainBeanFactory.addBeanDefinitionPostProcessor(new DefaultBeanDefinitionPostProcessor());
                    this.mainBeanFactory.addBeanDefinitionPostProcessor(new MergeBeanDefinitionPostProcessor(this.mainBeanFactory));
                    this.mainBeanFactory.addBeanDefinitionPostProcessor(new ConfigBeanDefinitionPostProcessor(this.mainBeanFactory));
                    this.initialize();
                }
                ApplicationContext.prototype.initialize = function () {
                    var _this = this;
                    var applicationContextBeanDefinition = new Bean();
                    applicationContextBeanDefinition.name = BeanNameGenerator.generateBeanName(ApplicationContext);
                    applicationContextBeanDefinition.clazz = ApplicationContext;
                    applicationContextBeanDefinition.factoryMethodName = applicationContextBeanDefinition.name;
                    applicationContextBeanDefinition.annotations.push(singleton);
                    applicationContextBeanDefinition.isReady = true;
                    this.mainBeanFactory.registerFactory(applicationContextBeanDefinition.factoryMethodName, {
                        getObject: function () { return _this; }
                    });
                    this.mainBeanFactory.registerBeanDefinition(applicationContextBeanDefinition.name, applicationContextBeanDefinition);
                };
                ApplicationContext.prototype.register = function (typeDescriptor) {
                    var beanDefinition;
                    if (typeDescriptor instanceof DependencyDescriptor) {
                        beanDefinition = Component.BeanUtils.getOrCreateBeanDefinition(this.mainBeanFactory, typeDescriptor.parent);
                        if (typeDescriptor instanceof ArgumentDependencyDescriptor) {
                            if (typeDescriptor.methodName) {
                                var methodDescriptor = Component.BeanUtils.getOrCreateMethodDescriptor(beanDefinition, typeDescriptor.methodName);
                                methodDescriptor.arguments[typeDescriptor.position] = typeDescriptor;
                            }
                            else {
                                beanDefinition.constructorArguments[typeDescriptor.position] = typeDescriptor;
                            }
                        }
                        else if (typeDescriptor instanceof MethodDependencyDescriptor) {
                            var existedMethodDescriptor = Component.BeanUtils.getMethodDescriptor(beanDefinition, typeDescriptor.name);
                            if (existedMethodDescriptor) {
                                (_a = existedMethodDescriptor.arguments).push.apply(_a, typeDescriptor.arguments);
                                (_b = existedMethodDescriptor.annotations).push.apply(_b, typeDescriptor.annotations);
                                existedMethodDescriptor.returnType = typeDescriptor.returnType ? typeDescriptor.returnType : existedMethodDescriptor.returnType;
                            }
                            else {
                                beanDefinition.methods.push(typeDescriptor);
                            }
                        }
                        else if (typeDescriptor instanceof FieldDependencyDescriptor) {
                            beanDefinition.properties.push({ name: typeDescriptor.name, clazz: typeDescriptor, annotations: typeDescriptor.annotations });
                        }
                    }
                    else if (typeDescriptor instanceof BeanDescriptor) {
                        beanDefinition = Component.BeanUtils.getOrCreateBeanDefinition(this.mainBeanFactory, typeDescriptor.clazz);
                        beanDefinition.annotations = typeDescriptor.annotations;
                        beanDefinition.isReady = true;
                    }
                    assert(beanDefinition, "no bean definition resolved from passed info");
                    this.mainBeanFactory.registerBeanDefinition(beanDefinition.name, beanDefinition);
                    var _a, _b;
                };
                ApplicationContext.prototype.containsBean = function (item) {
                    return this.mainBeanFactory.containsBean(item);
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
///<reference path="../../node_modules/reflect-metadata/Reflect.ts"/>
///<reference path="../Core/Type/Class.ts"/>
///<reference path="../Core/Util/ArrayUtils.ts"/>
///<reference path="../Core/Event/Event.ts"/>
///<reference path="../Core/Exception/Assert.ts"/>
///<reference path="Component/Factory/Config/AnnotatedObject.ts"/>
///<reference path="Component/Factory/Config/TypeDescriptor.ts"/>
///<reference path="Component/Factory/Config/DependencyDescriptor.ts"/>
///<reference path="Component/Factory/Config/PropertyDescriptor.ts"/>
///<reference path="Component/Factory/Config/MethodDescriptor.ts"/>
///<reference path="Component/Factory/Config/ResolveDefinition.ts"/>
///<reference path="Component/Factory/Config/BeanDefinition.ts"/>
///<reference path="Component/Context/Config/BeanDescriptor.ts"/>
///<reference path="Component/Context/Config/FieldDependencyDescriptor.ts"/>
///<reference path="Component/Context/Config/ArgumentDependencyDescriptor.ts"/>
///<reference path="Component/Context/Config/MethodDependencyDescriptor.ts"/>
///<reference path="Annotation/Inject.ts"/>
///<reference path="Annotation/Injection.ts"/>
///<reference path="Annotation/Abstract.ts"/>
///<reference path="Annotation/Singleton.ts"/>
///<reference path="Annotation/PostConstructor.ts"/>
///<reference path="Annotation/FactoryMethod.ts"/>
///<reference path="Annotation/Config.ts"/>
///<reference path="Component/Factory/Support/Bean.ts"/>
///<reference path="Component/Factory/Support/BeanNameGenerator.ts"/>
///<reference path="Component/BeanUtils.ts"/>
///<reference path="Component/Factory/ObjectFactory.ts"/>
///<reference path="Component/Factory/Config/Scope.ts"/>
///<reference path="Component/Factory/Support/PrototypeScope.ts"/>
///<reference path="Component/Factory/Support/SingletonScope.ts"/>
///<reference path="Component/Factory/BeanFactory.ts"/>
///<reference path="Component/Factory/Registry/BeanDefinitionRegistry.ts"/>
///<reference path="Component/Factory/Registry/FactoryBeanRegistry.ts"/>
///<reference path="Component/Factory/AutowireCapableBeanFactory.ts"/>
///<reference path="Component/Factory/ListableBeanFactory.ts"/>
///<reference path="Component/Factory/BeanPostProcessor.ts"/>
///<reference path="Component/Factory/BeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/ConfigurableBeanFactory.ts"/>
///<reference path="Component/Factory/ConfigurableListableBeanFactory.ts"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/Support/MergeBeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/Support/ConfigBeanDefinitionPostProcessor.ts"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionRegistry.ts"/>
///<reference path="Component/Factory/Support/FactoryBeanRegistrySupport.ts"/>
///<reference path="Component/Factory/Support/AbstractBeanFactory.ts"/>
///<reference path="Component/Factory/Support/AbstractAutowireCapableBeanFactory.ts"/>
///<reference path="Component/Factory/Support/DefaultListableBeanFactory.ts"/>
///<reference path="Component/Context/Context.ts"/>
///<reference path="Component/Context/ApplicationContext.ts"/>
var Typejector;
(function (Typejector) {
    var ApplicationContext = Typejector.Component.Context.ApplicationContext;
    var context = new ApplicationContext();
    function getContext() {
        return context;
    }
    Typejector.getContext = getContext;
})(Typejector || (Typejector = {}));
///<reference path="./MEF/Typejector.ts"/> 
//# sourceMappingURL=typejector.js.map