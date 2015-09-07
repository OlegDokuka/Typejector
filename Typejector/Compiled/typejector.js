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
        var Metadata;
        (function (Metadata) {
            var SingletonMetadata = (function () {
                function SingletonMetadata() {
                    this.name = SingletonMetadata.NAME;
                    this.value = true;
                }
                return SingletonMetadata;
            })();
            Metadata.SingletonMetadata = SingletonMetadata;
            var SingletonMetadata;
            (function (SingletonMetadata) {
                SingletonMetadata.NAME = "singleton";
                function test(items) {
                    return items.some(function (val) { return val.name === SingletonMetadata.NAME; });
                }
                SingletonMetadata.test = test;
            })(SingletonMetadata = Metadata.SingletonMetadata || (Metadata.SingletonMetadata = {}));
        })(Metadata = Component.Metadata || (Component.Metadata = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Metadata;
        (function (Metadata) {
            var InterfaceMetadata = (function () {
                function InterfaceMetadata() {
                    this.name = InterfaceMetadata.NAME;
                    this.value = true;
                }
                return InterfaceMetadata;
            })();
            Metadata.InterfaceMetadata = InterfaceMetadata;
            var InterfaceMetadata;
            (function (InterfaceMetadata) {
                InterfaceMetadata.NAME = "interface";
                function test(items) {
                    return items.some(function (val) { return val.name === InterfaceMetadata.NAME; });
                }
                InterfaceMetadata.test = test;
            })(InterfaceMetadata = Metadata.InterfaceMetadata || (Metadata.InterfaceMetadata = {}));
        })(Metadata = Component.Metadata || (Component.Metadata = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
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
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var Bean = (function () {
                    function Bean() {
                        this.metadata = [];
                        this.scopeNames = [];
                        this.constructorArguments = [];
                        this.properties = [];
                        this.methods = [];
                    }
                    Bean.prototype.hasMetadata = function (metadata) {
                        return this.metadata.some(function (val) { return val instanceof metadata; });
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
        var BeanUtils = (function () {
            function BeanUtils() {
            }
            BeanUtils.isAssignable = function (clazz, classFrom) {
                return clazz === classFrom || clazz.prototype.isPrototypeOf(classFrom.prototype);
            };
            BeanUtils.isAbstract = function (beanDefinition) {
                return Component.Metadata.InterfaceMetadata.test(beanDefinition.metadata);
            };
            BeanUtils.isSingleton = function (beanDefinition) {
                return Component.Metadata.SingletonMetadata.test(beanDefinition.metadata);
            };
            BeanUtils.newInstance = function (clazz) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return new (clazz.bind.apply(clazz, args))();
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
            var Support;
            (function (Support) {
                //TODO: it doesnot work! Provide name generation!
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
        var Factory;
        (function (Factory) {
            var Support;
            (function (Support) {
                var DefaultBeanDefinitionPostProcessor = (function () {
                    function DefaultBeanDefinitionPostProcessor() {
                    }
                    DefaultBeanDefinitionPostProcessor.prototype.postProcessBeanDefinition = function (beanDefinition, beanDefinitionRegistry) {
                        beanDefinition.scopeNames.forEach(function (it, id) { return it == Support.SingletonScope.NAME || it == Support.PrototypeScope.NAME ?
                            beanDefinition.scopeNames.splice(id, 1) : void (0); });
                        if (Component.BeanUtils.isSingleton(beanDefinition)) {
                            beanDefinition.scopeNames.push(Support.SingletonScope.NAME);
                        }
                        else {
                            beanDefinition.scopeNames.push(Support.PrototypeScope.NAME);
                        }
                    };
                    return DefaultBeanDefinitionPostProcessor;
                })();
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
                var MergeBeanDefinitionPostProcessor = (function () {
                    function MergeBeanDefinitionPostProcessor() {
                    }
                    MergeBeanDefinitionPostProcessor.prototype.postProcessBeanDefinition = function (beanDefinition, beanDefinitionRegistry) {
                        var _this = this;
                        beanDefinitionRegistry.getBeanDefinitionNames()
                            .map(function (it) { return beanDefinitionRegistry.getBeanDefinition(it); })
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
                })();
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
                var DefaultBeanDefinitionRegistry = (function () {
                    function DefaultBeanDefinitionRegistry() {
                        this.registeredBeanDefinitions = [];
                        this.beanDefinitionPostProcessors = [];
                    }
                    DefaultBeanDefinitionRegistry.prototype.containsBeanDefinition = function (beanName) {
                        return this.registeredBeanDefinitions.some(function (it) { return it.name == beanName; });
                    };
                    DefaultBeanDefinitionRegistry.prototype.registerBeanDefinition = function (beanName, beanDefinition) {
                        var existedBeanDefinition;
                        assert(beanDefinition, "BeanDefinition must be presented");
                        this.applyBeanDefinitionPostProcessor(beanDefinition);
                        existedBeanDefinition = this.registeredBeanDefinitions.filter(function (it) { return it.name == beanName; })[0];
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
                            throw new Error("No such bean definitions found");
                        }
                        return this.registeredBeanDefinitions.filter(function (it) { return it.name == beanName; })[0];
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
                            processor.postProcessBeanDefinition(beanDefinition, this);
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
                    }
                    FactoryBeanRegistrySupport.prototype.getFactory = function (item) {
                        var beanDefinition;
                        if (typeof item === typeof "") {
                            beanDefinition = this.getBeanDefinition(item);
                        }
                        else {
                            beanDefinition = this.getBeanDefinition(Support.BeanNameGenerator.generateBeanName(item));
                        }
                        return this.doGetFactory(beanDefinition);
                    };
                    FactoryBeanRegistrySupport.prototype.doGetFactory = function (beanDefinition) {
                        throw new Error("Method not implement");
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
                    AbstractBeanFactory.prototype.doGetBean = function (beanDifinition) {
                        throw new Error("Method not implement");
                    };
                    AbstractBeanFactory.prototype.registerScope = function (scopeName, scope) {
                        this.registeredScopes[scopeName] = scope;
                    };
                    AbstractBeanFactory.prototype.getRegisteredScope = function (scopeName) {
                        if (scopeName in this.registeredScopes) {
                            return this.registeredScopes[scopeName];
                        }
                        if (scopeName == Support.PrototypeScope.NAME) {
                            return this.prototypeScope;
                        }
                        if (scopeName == Support.SingletonScope.NAME) {
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
                        var resolvedValues;
                        resolvedValues = beanDefinition.constructorArguments
                            .map(function (td) { return _this.resolveDependency(td); });
                        return Component.BeanUtils.newInstance(beanDefinition.clazz, resolvedValues);
                    };
                    AbstractAutowireCapableBeanFactory.prototype.initializeBean = function (instance, beanDefinititon) {
                        assert(instance);
                        assert(beanDefinititon);
                        //let superBeanDefinition = this.getBeanDefinition(beanDefinititon.clazz
                        for (var _i = 0, _a = beanDefinititon.properties; _i < _a.length; _i++) {
                            var property = _a[_i];
                            instance[property.name] = this.resolveDependency(property.clazz);
                        }
                        for (var _b = 0, _c = beanDefinititon.methods; _b < _c.length; _b++) {
                            var method = _c[_b];
                            var args = [];
                            for (var _d = 0, _e = method.arguments; _d < _e.length; _d++) {
                                var argType = _e[_d];
                                args.push(this.resolveDependency(argType));
                            }
                            instance[method.name].apply(instance, args);
                        }
                        return instance;
                    };
                    AbstractAutowireCapableBeanFactory.prototype.applyBeanPostProcessorsBeforeInitialization = function (existingBean, beanDefinititon) {
                        var result = existingBean;
                        assert(existingBean);
                        assert(beanDefinititon);
                        for (var _i = 0, _a = this.getBeanPostProcessors(); _i < _a.length; _i++) {
                            var beanProcessor = _a[_i];
                            result = beanProcessor.postProcessBeforeInitialization(result, beanDefinititon);
                            if (result == null) {
                                return result;
                            }
                        }
                        return result;
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
                                return _this.createBean(beanDefinition.clazz);
                            }
                        };
                    };
                    AbstractAutowireCapableBeanFactory.prototype.resolveDependency = function (typeDescriptor) {
                        assert(typeDescriptor);
                        return this.doResolveDependency(typeDescriptor);
                    };
                    AbstractAutowireCapableBeanFactory.prototype.doResolveDependency = function (typeDescriptor) {
                        throw new Error("Method not implement");
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
                        var _this = this;
                        var bean;
                        if (Component.BeanUtils.isAbstract(beanDefinition)) {
                            var beanDefinitions;
                            beanDefinitions = this.doGetBeanDefinitionsOfType(beanDefinition.clazz);
                            if (!beanDefinitions.length) {
                                throw new Error("No " + beanDefinition.name + " class found");
                            }
                            bean = this.doGetBean(beanDefinitions.pop());
                        }
                        else {
                            var scopes, beanObjectFactory = this.doGetFactory(beanDefinition);
                            scopes = beanDefinition.scopeNames.map(function (scopeName) { return _this.getRegisteredScope(scopeName); });
                            for (var _i = 0; _i < scopes.length; _i++) {
                                var scope = scopes[_i];
                                bean = scope.get(beanDefinition.name, beanObjectFactory);
                                if (bean != undefined) {
                                    break;
                                }
                            }
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
                var ConstructorDependencyDescriptor = (function (_super) {
                    __extends(ConstructorDependencyDescriptor, _super);
                    function ConstructorDependencyDescriptor() {
                        _super.apply(this, arguments);
                    }
                    return ConstructorDependencyDescriptor;
                })(DependencyDescriptor);
                Config.ConstructorDependencyDescriptor = ConstructorDependencyDescriptor;
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
                    }
                    return MethodDependencyDescriptor;
                })(Config.ConstructorDependencyDescriptor);
                Config.MethodDependencyDescriptor = MethodDependencyDescriptor;
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
            var DependencyDescriptor = Component.Factory.Config.DependencyDescriptor;
            var BeanDescriptor = Context.Config.BeanDescriptor;
            var ConstructorDependencyDescriptor = Context.Config.ConstructorDependencyDescriptor;
            var FieldDependencyDescriptor = Context.Config.FieldDependencyDescriptor;
            var MethodDependencyDescriptor = Context.Config.MethodDependencyDescriptor;
            var BeanNameGenerator = Component.Factory.Support.BeanNameGenerator;
            var Bean = Component.Factory.Support.Bean;
            var DefaultBeanDefinitionPostProcessor = Component.Factory.Support.DefaultBeanDefinitionPostProcessor;
            var MergeBeanDefinitionPostProcessor = Component.Factory.Support.MergeBeanDefinitionPostProcessor;
            var ApplicationContext = (function () {
                //TODO: Add autoconfiguration for avoding initialization in constructor
                function ApplicationContext() {
                    this.mainBeanFactory = new Component.Factory.Support.DefaultListableBeanFactory();
                    this.mainBeanFactory.addBeanDefinitionPostProcessor(new DefaultBeanDefinitionPostProcessor());
                    this.mainBeanFactory.addBeanDefinitionPostProcessor(new MergeBeanDefinitionPostProcessor());
                }
                ApplicationContext.prototype.register = function (typeDescriptor) {
                    var beanDefinition;
                    if (typeDescriptor instanceof DependencyDescriptor) {
                        beanDefinition = this.doGetOrCreateBeanDefinition(typeDescriptor.parent);
                        if (typeDescriptor instanceof MethodDependencyDescriptor) {
                            var methodDescriptor;
                            methodDescriptor = (methodDescriptor = beanDefinition.methods
                                .filter(function (md) { return md.name === typeDescriptor.name; })[0]) ? methodDescriptor :
                                (beanDefinition.methods[beanDefinition.methods.push({
                                    name: typeDescriptor.name,
                                    arguments: []
                                }) - 1]);
                            methodDescriptor.arguments[typeDescriptor.position] = typeDescriptor;
                        }
                        else if (typeDescriptor instanceof ConstructorDependencyDescriptor) {
                            beanDefinition.constructorArguments[typeDescriptor.position] = typeDescriptor;
                        }
                        else if (typeDescriptor instanceof FieldDependencyDescriptor) {
                            beanDefinition.properties.push({ name: typeDescriptor.name, clazz: typeDescriptor });
                        }
                    }
                    else if (typeDescriptor instanceof BeanDescriptor) {
                        beanDefinition = this.doGetOrCreateBeanDefinition(typeDescriptor.clazz);
                        beanDefinition.metadata = typeDescriptor.metadata;
                    }
                    assert(beanDefinition, "no bean definition resolved from passed info");
                    this.mainBeanFactory.registerBeanDefinition(beanDefinition.name, beanDefinition);
                };
                ApplicationContext.prototype.doGetOrCreateBeanDefinition = function (clazz) {
                    var beanDefinition, beanName;
                    beanName = BeanNameGenerator.generateBeanName(clazz);
                    if (this.mainBeanFactory.containsBeanDefinition(beanName)) {
                        beanDefinition = this.mainBeanFactory.getBeanDefinition(beanName);
                    }
                    else {
                        beanDefinition = new Bean();
                        beanDefinition.clazz = clazz;
                        beanDefinition.name = beanName;
                    }
                    return beanDefinition;
                };
                ApplicationContext.prototype.containsBean = function (item) {
                    return this.mainBeanFactory.containsBean(item);
                };
                ApplicationContext.prototype.getBean = function (item) {
                    return this.mainBeanFactory.getBean(item);
                };
                return ApplicationContext;
            })();
            Context.ApplicationContext = ApplicationContext;
        })(Context = Component.Context || (Component.Context = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        var FieldDependencyDescriptor = Typejector.Component.Context.Config.FieldDependencyDescriptor;
        var ConstructorDependencyDescriptor = Typejector.Component.Context.Config.ConstructorDependencyDescriptor;
        var MethodDependencyDescriptor = Typejector.Component.Context.Config.MethodDependencyDescriptor;
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
                        }
                        break;
                    case 2:
                        {
                            if (typeof properties[1] === typeof 1) {
                                if (typeof prototype === typeof inject) {
                                    descriptor = new ConstructorDependencyDescriptor();
                                    descriptor.clazz = requestType;
                                    descriptor.parent = prototype;
                                    descriptor.genericTypes = genericTypes;
                                    descriptor.position = properties[1];
                                }
                                else if (typeof prototype === typeof Object.prototype) {
                                    descriptor = new MethodDependencyDescriptor();
                                    descriptor.clazz = requestType;
                                    descriptor.parent = prototype.constructor;
                                    descriptor.genericTypes = genericTypes;
                                    descriptor.name = properties[0];
                                    descriptor.position = properties[1];
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
            var metadata = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                metadata[_i - 1] = arguments[_i];
            }
            var descriptor = new BeanDescriptor();
            if (typeof value === typeof []) {
                return function (clazz) {
                    descriptor.clazz = clazz;
                    descriptor.metadata = value;
                    Typejector.getContext().register(descriptor);
                };
            }
            else {
                descriptor.clazz = value;
                descriptor.metadata = metadata;
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
        function interface(clazz) {
            Annotation.injection(clazz, new Typejector.Component.Metadata.InterfaceMetadata());
        }
        Annotation.interface = interface;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
var Typejector;
(function (Typejector) {
    var Annotation;
    (function (Annotation) {
        function singleton(clazz) {
            Annotation.injection(clazz, new Typejector.Component.Metadata.SingletonMetadata());
        }
        Annotation.singleton = singleton;
    })(Annotation = Typejector.Annotation || (Typejector.Annotation = {}));
})(Typejector || (Typejector = {}));
///<reference path="../Core/Type/Class"/>
///<reference path="../Core/Event/Event"/>
///<reference path="../Core/Exception/Assert"/>
///<reference path="Component/Metadata/Metadata"/>
///<reference path="Component/Metadata/SingletonMetadata"/>
///<reference path="Component/Metadata/InterfaceMetadata"/>
///<reference path="Component/Factory/Config/TypeDescriptor"/>
///<reference path="Component/Factory/Config/DependencyDescriptor"/>
///<reference path="Component/Factory/Config/PropertyDescriptor"/>
///<reference path="Component/Factory/Config/MethodDescriptor"/>
///<reference path="Component/Factory/Config/ResolveDefinition"/>
///<reference path="Component/Factory/Config/BeanDefinition"/>
///<reference path="Component/Factory/Support/Bean"/>
///<reference path="Component/BeanUtils"/>
///<reference path="Component/Factory/ObjectFactory"/>
///<reference path="Component/Factory/Config/Scope"/>
///<reference path="Component/Factory/Support/PrototypeScope"/>
///<reference path="Component/Factory/Support/SingletonScope"/>
///<reference path="Component/Factory/BeanFactory"/>
///<reference path="Component/Factory/Registry/BeanDefinitionRegistry"/>
///<reference path="Component/Factory/AutowireCapableBeanFactory"/>
///<reference path="Component/Factory/ListableBeanFactory"/>
///<reference path="Component/Factory/BeanPostProcessor"/>
///<reference path="Component/Factory/BeanDefinitionPostProcessor"/>
///<reference path="Component/Factory/ConfigurableBeanFactory"/>
///<reference path="Component/Factory/ConfigurableListableBeanFactory"/>
///<reference path="Component/Factory/Support/BeanNameGenerator"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionPostProcessor"/>
///<reference path="Component/Factory/Support/MergeBeanDefinitionPostProcessor"/>
///<reference path="Component/Factory/Support/DefaultBeanDefinitionRegistry"/>
///<reference path="Component/Factory/Support/FactoryBeanRegistrySupport"/>
///<reference path="Component/Factory/Support/AbstractBeanFactory"/>
///<reference path="Component/Factory/Support/AbstractAutowireCapableBeanFactory"/>
///<reference path="Component/Factory/Support/DefaultListableBeanFactory"/>
///<reference path="Component/Context/Context"/>
///<reference path="Component/Context/Config/BeanDescriptor"/>
///<reference path="Component/Context/Config/ConstructorDependencyDescriptor"/>
///<reference path="Component/Context/Config/MethodDependencyDescriptor"/>
///<reference path="Component/Context/Config/FieldDependencyDescriptor"/>
///<reference path="Component/Context/ApplicationContext"/>
///<reference path="Annotation/Inject"/>
///<reference path="Annotation/Injection"/>
///<reference path="Annotation/Interface"/>
///<reference path="Annotation/Singleton"/>
var Typejector;
(function (Typejector) {
    var ApplicationContext = Typejector.Component.Context.ApplicationContext;
    var context = new ApplicationContext();
    function getContext() {
        return context;
    }
    Typejector.getContext = getContext;
})(Typejector || (Typejector = {}));
///<reference path="./MEF/Typejector"/> 
var Typejector;
(function (Typejector) {
    var Component;
    (function (Component) {
        var Factory;
        (function (Factory) {
            var ObjectFactoryBuilder = (function () {
                function ObjectFactoryBuilder() {
                    this.args = [];
                }
                ObjectFactoryBuilder.prototype.withArgs = function (args) {
                    this.args = args;
                    return this;
                };
                ObjectFactoryBuilder.prototype.forClass = function (clazz) {
                    this.clazz = clazz;
                    return this;
                };
                ObjectFactoryBuilder.prototype.build = function () {
                    var _this = this;
                    return {
                        getObject: function () {
                            return new (_this.clazz.bind.apply(_this.clazz, _this.args))();
                        }
                    };
                };
                return ObjectFactoryBuilder;
            })();
            Factory.ObjectFactoryBuilder = ObjectFactoryBuilder;
        })(Factory = Component.Factory || (Component.Factory = {}));
    })(Component = Typejector.Component || (Typejector.Component = {}));
})(Typejector || (Typejector = {}));
//# sourceMappingURL=typejector.js.map