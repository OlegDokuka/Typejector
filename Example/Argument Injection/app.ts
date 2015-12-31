///<reference path="../../Typejector/Compiled/typejector.d.ts"/>
module Example.ArgumentInjection {
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

        constructor(@inject(SimpleNoiser) externalNoiser:SimpleNoiser) {
            console.assert(externalNoiser);

            this.ownNoiser = externalNoiser;
        }

        doWork() {
            this.ownNoiser.makeNoise();
        }
    }


    context = Typejector.getContext();
    noiseMaker = context.getBean<NoiseMakerClass>(NoiseMakerClass);

    noiseMaker.doWork();
}




