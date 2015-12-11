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
        }());
        Util.ArrayUtils = ArrayUtils;
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
        }());
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
        }());
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
                }());
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
                }(Config.TypeDescriptor));
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
                }(TypeDescriptor));
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
                }(DependencyDescriptor));
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
                }(DependencyDescriptor));
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
                }(Config.FieldDependencyDescriptor));
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
                }());
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
                }());
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
        }());
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
                }());
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
                }(Support.PrototypeScope));
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
            }());
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
            }());
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
                }(Factory.BeanDefinitionPostProcessor));
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
                }(Factory.BeanDefinitionPostProcessor));
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
                }(Factory.BeanDefinitionPostProcessor));
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
                        this.applyBeanDefinitionPostProcessor(beanDefinition);
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
                }());
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
                }(Support.DefaultBeanDefinitionRegistry));
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
                }(Support.FactoryBeanRegistrySupport));
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
                        var bean;
                        bean = this.doCreateObject(beanDefinition);
                        bean = this.applyBeanPostProcessorsBeforeInitialization(bean, beanDefinition);
                        bean = this.initializeBean(bean, beanDefinition);
                        bean = this.applyBeanPostProcessorsAfterInitialization(bean, beanDefinition);
                        return bean;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.doCreateObject = function (beanDefinition) {
                        var _this = this;
                        var bean, scopes, beanObjectFactory = this.getFactory(beanDefinition.name);
                        scopes = beanDefinition.scopeNames.map(function (scopeName) { return _this.getRegisteredScope(scopeName); });
                        for (var _i = 0, scopes_1 = scopes; _i < scopes_1.length; _i++) {
                            var scope = scopes_1[_i];
                            bean = scope.get(beanDefinition.name, beanObjectFactory);
                            if (bean != undefined) {
                                break;
                            }
                        }
                        return bean;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.initializeBean = function (instance, beanDefinititon) {
                        var _this = this;
                        assert(instance);
                        assert(beanDefinititon);
                        for (var _i = 0, _a = beanDefinititon.properties; _i < _a.length; _i++) {
                            var property = _a[_i];
                            instance[property.name] = this.resolveDependency(property.clazz);
                        }
                        beanDefinititon.methods.filter(function (it) { return ArrayUtils.contains(it.annotations, inject); }).forEach(function (method) {
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
                        var _this = this;
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
                    AbstractAutowireCapableBeanFactory.prototype.applyBeanPostProcessorsAfterInitialization = function (existingBean, beanDefinititon) {
                        var result = existingBean;
                        assert(existingBean);
                        assert(beanDefinititon);
                        for (var _i = 0, _a = this.getBeanPostProcessors(); _i < _a.length; _i++) {
                            var beanProcessor = _a[_i];
                            result = beanProcessor.postProcessAfterInitialization(result, beanDefinititon);
                            if (result == null) {
                                return result;
                            }
                        }
                        return result;
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
                }(Support.AbstractBeanFactory));
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
                }(Support.AbstractAutowireCapableBeanFactory));
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
            }());
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
