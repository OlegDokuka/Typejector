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
            __decorate([
                testMethod, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], MyFirstTestCase.prototype, "firstTestMethod", null);
            MyFirstTestCase = __decorate([
                testCase, 
                __metadata('design:paramtypes', [])
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
//# sourceMappingURL=app.js.map