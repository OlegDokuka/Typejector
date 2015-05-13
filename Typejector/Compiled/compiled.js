var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Injector = (function () {
            function Injector() {
            }
            Injector.register = function (injectable) {
                var injectablePosition = -1;
                Injector.registeredClassesAndMetadata.forEach(function (value, index) {
                    injectablePosition = value.clazz.prototype === injectable.clazz.prototype
                        ? index : injectablePosition;
                });
                if (injectablePosition >= 0) {
                    Injector.registeredClassesAndMetadata[injectablePosition] = injectable;
                    return;
                }
                Injector.registeredClassesAndMetadata.push(injectable);
            };
            Injector.instance = function (clazz) {
                var injectable;
                injectable = Injector.registeredClassesAndMetadata.filter(function (value, index) {
                    return value.clazz.prototype === clazz.prototype;
                })[0];
                if (!injectable) {
                    throw new Error("No registeret instance for type");
                }
                if (injectable.isSingleton) {
                    return Injector.singletonInstance(injectable.creator);
                }
                return new injectable.creator();
            };
            Injector.singletonInstance = function (clazz) {
                var singleton, singletonIndex = -1;
                Injector.createdSingletons.forEach(function (value, index) {
                    singletonIndex = value.clazz === clazz ? index : singletonIndex;
                });
                if (singletonIndex > -1) {
                    return Injector.createdSingletons[singletonIndex].instance;
                }
                singleton = { clazz: clazz, instance: new clazz() };
                Injector.createdSingletons.push(singleton);
                return singleton.instance;
            };
            Injector.registeredClassesAndMetadata = new Array();
            Injector.createdSingletons = new Array();
            return Injector;
        })();
        Component.Injector = Injector;
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Resolver = (function () {
            function Resolver() {
            }
            Resolver.request = function (parentType, propertyName, propertyType) {
                var resolvableIndex = -1, emptyDependencyList;
                Resolver.registeredResolvables.forEach(function (value, index) {
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
            };
            Resolver.resolve = function (clazz) {
                return Resolver.registeredResolvables
                    .filter(function (value, index) { return value.clazz === clazz; })[0].dependencyList;
            };
            Resolver.registeredResolvables = new Array();
            return Resolver;
        })();
        Component.Resolver = Resolver;
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Resolver = Typejector.Component.Resolver;
        function inject(requestType) {
            return function (prototype, propertyName) {
                Resolver.request(prototype.constructor, propertyName, requestType);
            };
        }
        Annotation.inject = inject;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Injector = Typejector.Component.Injector;
        function injection(value, exportAs) {
            if (value === void 0) { value = true; }
            if (typeof value === typeof true && !exportAs) {
                return function (clazz) {
                    Injector.register({ isSingleton: value, clazz: clazz, creator: clazz });
                };
            }
            else if (exportAs) {
                return function (clazz) {
                    if (!(clazz.prototype instanceof exportAs)) {
                        throw new Error("Current class should be prototype of exported");
                    }
                    Injector.register({
                        isSingleton: typeof value === typeof true ? value : true,
                        clazz: clazz,
                        creator: clazz
                    });
                    Injector.register({
                        isSingleton: typeof value === typeof true ? value : true,
                        clazz: exportAs,
                        creator: clazz
                    });
                };
            }
            else {
                Injector.register({ isSingleton: true, clazz: value, creator: value });
            }
        }
        Annotation.injection = injection;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var Resolver = Typejector.Component.Resolver;
        var Injector = Typejector.Component.Injector;
        var __extends = function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };
        function resolve(clazz) {
            var classWrapper = function () {
                var argArray = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    argArray[_i - 0] = arguments[_i];
                }
                var dependencyList = Resolver.resolve(clazz);
                for (var propertyName in dependencyList) {
                    var propertyType = dependencyList[propertyName];
                    this[propertyName] = Injector.instance(propertyType);
                }
                clazz.apply(this, argArray);
            };
            __extends(classWrapper, clazz);
            return classWrapper;
        }
        Annotation.resolve = resolve;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
///<reference path="../Core/Type/Class"/>
///<reference path="Component/Interface/Injectable"/>
///<reference path="Component/Interface/Resolvable"/>
///<reference path="Component/Interface/Singleton"/>
///<reference path="Component/Injector"/>
///<reference path="Component/Resolver"/>
///<reference path="Annotation/Inject"/>
///<reference path="Annotation/Injection"/>
///<reference path="Annotation/Resolve"/>
///<reference path="MEF/Typejector"/> 
/// <reference path="Interface/IEvent.ts" />
// Typejector View Module -------
// Realize Typejector view class and halper classes such as Point and etc.
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
            /** Подписаться на событие
            * @param {ICallback<ArgType>} callback Callback, который будет вызван при вызове функции
            * @param {any} subscriber Контекст, в котором должен быть вызван callback
            * @returns {ITypedSubscription<ArgType>} Объект типизированной подписки
            */
            Event.prototype.Subscribe = function (callback, subscriber) {
                var that = this, res = {
                    Callback: callback,
                    Event: that,
                    Unsubscribe: function () { that.Unsubscribe(callback); }
                };
                this.Callbacks.push({ Callback: callback, Subscriber: subscriber });
                return res;
            };
            /**
            *   Unsubscribe some callback from current event
            *   @param {Interface.ICallback<ArgType>} subscribet callback
            **/
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
///<reference path="../../MEF/Typejector"/>
var Typejector;
(function (Typejector) {
    var Sample;
    (function (Sample) {
        var resolve = Typejector.Annotation.resolve;
        var inject = Typejector.Annotation.inject;
        var injection = Typejector.Annotation.injection;
        var InterfaceClass = (function () {
            function InterfaceClass() {
            }
            InterfaceClass.prototype.say = function () {
            };
            return InterfaceClass;
        })();
        var SingletonClass = (function (_super) {
            __extends(SingletonClass, _super);
            function SingletonClass() {
                _super.apply(this, arguments);
                this.cat = "Kitty";
                this.dog = "Hot";
            }
            SingletonClass.prototype.say = function () {
                alert(this.cat + "-Cat and " + this.dog + "-Dog");
            };
            SingletonClass = __decorate([
                injection(true, InterfaceClass)
            ], SingletonClass);
            return SingletonClass;
        })(InterfaceClass);
        var SimpleClass = (function () {
            function SimpleClass() {
            }
            SimpleClass.prototype.say = function (something) {
                alert("You said " + something + "?");
            };
            SimpleClass = __decorate([
                injection
            ], SimpleClass);
            return SimpleClass;
        })();
        var NeedInjectionsClass = (function () {
            function NeedInjectionsClass() {
                this.helper.say();
                this.simpleHelper.say("wow");
            }
            __decorate([
                inject(InterfaceClass)
            ], NeedInjectionsClass.prototype, "helper");
            __decorate([
                inject(SimpleClass)
            ], NeedInjectionsClass.prototype, "simpleHelper");
            NeedInjectionsClass = __decorate([
                resolve
            ], NeedInjectionsClass);
            return NeedInjectionsClass;
        })();
        var ChildClass = (function (_super) {
            __extends(ChildClass, _super);
            function ChildClass() {
                _super.apply(this, arguments);
            }
            return ChildClass;
        })(NeedInjectionsClass);
        var needInjection = new ChildClass();
    })(Sample = Typejector.Sample || (Typejector.Sample = {}));
})(Typejector || (Typejector = {}));
///<reference path="../../MEF/Typejector"/>
var Typejector;
(function (Typejector) {
    var Sample;
    (function (Sample) {
        var resolve = Typejector.Annotation.resolve;
        var inject = Typejector.Annotation.inject;
        var injection = Typejector.Annotation.injection;
        var SingletonClass = (function () {
            function SingletonClass() {
                this.cat = "Kitty";
                this.dog = "Hot";
            }
            SingletonClass.prototype.say = function () {
                alert(this.cat + "-Cat and " + this.dog + "-Dog");
            };
            SingletonClass = __decorate([
                injection
            ], SingletonClass);
            return SingletonClass;
        })();
        var SimpleClass = (function () {
            function SimpleClass() {
            }
            SimpleClass.prototype.say = function (something) {
                alert("You said " + something + "?");
            };
            SimpleClass = __decorate([
                injection
            ], SimpleClass);
            return SimpleClass;
        })();
        var NeedInjectionsClass = (function () {
            function NeedInjectionsClass() {
                this.helper.say();
                this.simpleHelper.say("wow");
            }
            __decorate([
                inject(SingletonClass)
            ], NeedInjectionsClass.prototype, "helper");
            __decorate([
                inject(SimpleClass)
            ], NeedInjectionsClass.prototype, "simpleHelper");
            NeedInjectionsClass = __decorate([
                resolve
            ], NeedInjectionsClass);
            return NeedInjectionsClass;
        })();
        var ChildClass = (function (_super) {
            __extends(ChildClass, _super);
            function ChildClass() {
                _super.apply(this, arguments);
            }
            return ChildClass;
        })(NeedInjectionsClass);
        var needInjection = new ChildClass();
    })(Sample = Typejector.Sample || (Typejector.Sample = {}));
})(Typejector || (Typejector = {}));
//# sourceMappingURL=compiled.js.map