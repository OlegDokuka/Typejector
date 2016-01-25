var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Example;
(function (Example) {
    var TodoMVC;
    (function (TodoMVC) {
        var injection = Typejector.Annotation.injection;
        var inject = Typejector.Annotation.inject;
        var BeanPostProcessor = Typejector.Component.Factory.BeanPostProcessor;
        var Annotations = Typejector.Annotation.Annotations;
        var singleton = Typejector.Annotation.singleton;
        function click(id) {
            return function (target, propertyKey) { return Annotations.add(click, id, target, propertyKey); };
        }
        function html(id) {
            return function (target, propertyKey) {
                var propertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
                var getter = propertyDescriptor.value;
                Object.defineProperty(target, propertyKey, {
                    get: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        var element = document.querySelector(id);
                        getter.apply(this, [element].concat(args));
                    },
                    enumerable: true,
                    configurable: true
                });
                Annotations.add(html, id, target, propertyKey);
            };
        }
        var ClickableBeanPostProcessor = (function (_super) {
            __extends(ClickableBeanPostProcessor, _super);
            function ClickableBeanPostProcessor() {
                _super.apply(this, arguments);
            }
            ClickableBeanPostProcessor.prototype.postProcessBeforeInitialization = function (bean, beanDefinition) {
                return bean;
            };
            ClickableBeanPostProcessor.prototype.postProcessAfterInitialization = function (bean, beanDefinition) {
                var clojure = function () {
                    Object.keys(Object.getPrototypeOf(bean))
                        .filter(function (key) { return Annotations.get(beanDefinition.clazz.prototype, key).has(click); })
                        .forEach(function (key) {
                        var id = Annotations.get(beanDefinition.clazz.prototype, key).get(click);
                        var element = document.querySelector(id);
                        element.addEventListener("click", function () { return bean[key](); });
                    });
                };
                if (document.readyState !== 'complete') {
                    window.addEventListener('onload', clojure, false);
                    window.addEventListener('load', clojure, false);
                }
                else {
                    clojure();
                }
                return bean;
            };
            ClickableBeanPostProcessor = __decorate([
                injection, 
                __metadata('design:paramtypes', [])
            ], ClickableBeanPostProcessor);
            return ClickableBeanPostProcessor;
        })(BeanPostProcessor);
        TodoMVC.ClickableBeanPostProcessor = ClickableBeanPostProcessor;
        var Model = (function () {
            function Model() {
                this.taskList = [];
                this.subscribers = [];
            }
            Model.prototype.subscribe = function (observer) {
                this.subscribers.push(observer);
            };
            Model.prototype.addTask = function (task) {
                this.taskList.push(task);
                this.notifyAll("addTask");
            };
            Model.prototype.notifyAll = function (propKey) {
                var _this = this;
                this.subscribers.forEach(function (subscriber) { return subscriber.onChange(_this, propKey); });
            };
            Model = __decorate([
                injection, 
                __metadata('design:paramtypes', [])
            ], Model);
            return Model;
        })();
        TodoMVC.Model = Model;
        var Controller = (function () {
            function Controller() {
            }
            Controller.prototype.addTask = function (element) {
                if (element.value) {
                    this.model.addTask(element.value);
                }
            };
            Controller.prototype.updateList = function (element) {
                var element, appendChild = ();
            };
            __decorate([
                inject, 
                __metadata('design:type', Model)
            ], Controller.prototype, "model", void 0);
            __decorate([
                click("#add-task"),
                html("#task"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLInputElement]), 
                __metadata('design:returntype', void 0)
            ], Controller.prototype, "addTask", null);
            __decorate([
                html("#tasks"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLElement]), 
                __metadata('design:returntype', void 0)
            ], Controller.prototype, "updateList", null);
            Controller = __decorate([
                singleton, 
                __metadata('design:paramtypes', [])
            ], Controller);
            return Controller;
        })();
        TodoMVC.Controller = Controller;
        Typejector.context.run();
    })(TodoMVC = Example.TodoMVC || (Example.TodoMVC = {}));
})(Example || (Example = {}));
//# sourceMappingURL=app.js.map