var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Example;
(function (Example) {
    var ArgumentInjection;
    (function (ArgumentInjection) {
        var injection = Typejector.Annotation.injection;
        var inject = Typejector.Annotation.inject;
        var context, noiseMaker;
        var SimpleNoiser = (function () {
            function SimpleNoiser() {
                this.stringField = "SimpleClass";
            }
            SimpleNoiser.prototype.makeNoise = function () {
                alert("Noise from " + this.stringField);
            };
            SimpleNoiser = __decorate([
                injection, 
                __metadata('design:paramtypes', [])
            ], SimpleNoiser);
            return SimpleNoiser;
        })();
        var NoiseMakerClass = (function () {
            function NoiseMakerClass(externalNoiser) {
                console.assert(externalNoiser);
                this.ownNoiser = externalNoiser;
            }
            NoiseMakerClass.prototype.doWork = function () {
                this.ownNoiser.makeNoise();
            };
            NoiseMakerClass = __decorate([
                injection,
                __param(0, inject(SimpleNoiser)), 
                __metadata('design:paramtypes', [Object])
            ], NoiseMakerClass);
            return NoiseMakerClass;
        })();
        context = Typejector.getContext();
        noiseMaker = context.getBean(NoiseMakerClass);
        noiseMaker.doWork();
    })(ArgumentInjection = Example.ArgumentInjection || (Example.ArgumentInjection = {}));
})(Example || (Example = {}));
//# sourceMappingURL=app.js.map