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
        var MockInterfaceClass = (function (_super) {
            __extends(MockInterfaceClass, _super);
            function MockInterfaceClass() {
                _super.apply(this, arguments);
                this.cat = "Kitty";
                this.dog = "Hot";
            }
            MockInterfaceClass.prototype.say = function () {
                alert("Mock-" + this.cat + "-Cat and Mock-" + this.dog + "-Dog");
            };
            MockInterfaceClass = __decorate([
                injection(true, InterfaceClass)
            ], MockInterfaceClass);
            return MockInterfaceClass;
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
//# sourceMappingURL=TypejectorSample.js.map