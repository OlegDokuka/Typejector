var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
///<reference path="../../Test/Compiled/typejector.d.ts"/>
var Example;
(function (Example) {
    var TestEngine;
    (function (TestEngine) {
        var testMethod = Typejector.Test.Annotation.testMethod;
        var testCase = Typejector.Test.Annotation.testCase;
        var MyFirstTestCase = (function () {
            function MyFirstTestCase() {
            }
            MyFirstTestCase.prototype.firstTestMethod = function () {
                expect(true).to.ok();
            };
            Object.defineProperty(MyFirstTestCase.prototype, "firstTestMethod",
                __decorate([
                    testMethod
                ], MyFirstTestCase.prototype, "firstTestMethod", Object.getOwnPropertyDescriptor(MyFirstTestCase.prototype, "firstTestMethod")));
            MyFirstTestCase = __decorate([
                testCase
            ], MyFirstTestCase);
            return MyFirstTestCase;
        })();
        TestEngine.MyFirstTestCase = MyFirstTestCase;
        var SecCLass = (function (_super) {
            __extends(SecCLass, _super);
            function SecCLass() {
                _super.apply(this, arguments);
            }
            return SecCLass;
        })(MyFirstTestCase);
        TestEngine.SecCLass = SecCLass;
        mocha.run();
    })(TestEngine = Example.TestEngine || (Example.TestEngine = {}));
})(Example || (Example = {}));
