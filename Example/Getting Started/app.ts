///<reference path="../../Typejector/Compiled/typejector.d.ts"/>

import injection = Typejector.Annotation.injection;
import inject = Typejector.Annotation.inject;
import postConstructor = Typejector.Annotation.postConstructor;

let context:Typejector.Component.Context.Context,
    noiseMaker:NoiseMakerClass;

@injection
class SimpleNoiser {
    stringField:string = "SimpleClass";

    makeNoise():void {
        alert(`Noise from ${this.stringField}`);
    }
}

@injection
 class NoiseMakerClass {
    @inject(SimpleNoiser) ownNoiser:SimpleNoiser = undefined;

    @postConstructor
    doWork() {
        this.ownNoiser.makeNoise();
    }
}


context = Typejector.getContext();
noiseMaker = context.getBean<NoiseMakerClass>(NoiseMakerClass);

noiseMaker.doWork();




