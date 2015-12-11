///<reference path="../../Typejector/Compiled/typejector.d.ts"/>

import injection = Typejector.Annotation.injection;
import inject = Typejector.Annotation.inject;

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

    private ownNoiser:SimpleNoiser;

    constructor(@inject(SimpleNoiser) externalNoiser) {
        console.assert(externalNoiser);

        this.ownNoiser = externalNoiser;
    }

    doWork(@inject(SimpleNoiser) externalNoiser) {
        this.ownNoiser.makeNoise();
    }
}


context = Typejector.getContext();
noiseMaker = context.getBean<NoiseMakerClass>(NoiseMakerClass);

noiseMaker.doWork();




