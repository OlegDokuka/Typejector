///<reference path="../../Typejector/Compiled/typejector.d.ts"/>
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
    NoiseMakerClass.prototype.doWork = function (externalNoiser) {
        this.ownNoiser.makeNoise();
    };
    Object.defineProperty(NoiseMakerClass.prototype, "doWork",
        __decorate([
            __param(0, inject(SimpleNoiser)), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], NoiseMakerClass.prototype, "doWork", Object.getOwnPropertyDescriptor(NoiseMakerClass.prototype, "doWork")));
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
//# sourceMappingURL=app.js.map