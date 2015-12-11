///<reference path="../../Typejector/Compiled/typejector.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var injection = Typejector.Annotation.injection;
var inject = Typejector.Annotation.inject;
var postConstructor = Typejector.Annotation.postConstructor;
var context, noiseMaker;
var SimpleNoiser = (function () {
    function SimpleNoiser() {
        this.stringField = "SimpleClass";
    }
    SimpleNoiser.prototype.makeNoise = function () {
        alert("Noise from " + this.stringField);
    };
    SimpleNoiser = __decorate([
        injection
    ], SimpleNoiser);
    return SimpleNoiser;
})();
var NoiseMakerClass = (function () {
    function NoiseMakerClass() {
        this.ownNoiser = undefined;
    }
    NoiseMakerClass.prototype.doWork = function () {
        this.ownNoiser.makeNoise();
    };
    __decorate([
        inject(SimpleNoiser)
    ], NoiseMakerClass.prototype, "ownNoiser");
    Object.defineProperty(NoiseMakerClass.prototype, "doWork",
        __decorate([
            postConstructor
        ], NoiseMakerClass.prototype, "doWork", Object.getOwnPropertyDescriptor(NoiseMakerClass.prototype, "doWork")));
    NoiseMakerClass = __decorate([
        injection
    ], NoiseMakerClass);
    return NoiseMakerClass;
})();
context = Typejector.getContext();
noiseMaker = context.getBean(NoiseMakerClass);
noiseMaker.doWork();
