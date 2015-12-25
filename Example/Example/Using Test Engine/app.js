var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<reference path="../../Test/Test/Typejector.ts"/>
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
                return expect(true);
            };
            Object.defineProperty(MyFirstTestCase.prototype, "firstTestMethod",
                __decorate([
                    testMethod, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], MyFirstTestCase.prototype, "firstTestMethod", Object.getOwnPropertyDescriptor(MyFirstTestCase.prototype, "firstTestMethod")));
            MyFirstTestCase = __decorate([
                testCase, 
                __metadata('design:paramtypes', [])
            ], MyFirstTestCase);
            return MyFirstTestCase;
        })();
        TestEngine.MyFirstTestCase = MyFirstTestCase;
    })(TestEngine = Example.TestEngine || (Example.TestEngine = {}));
})(Example || (Example = {}));
//# sourceMappingURL=app.js.map