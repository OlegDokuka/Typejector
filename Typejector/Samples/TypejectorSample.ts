///<reference path="../MEF/Typejector"/>
module Typejector.Sample {
    import resolve = Annotation.resolve;
    import inject = Annotation.inject;
    import injection = Annotation.injection;


    @injection
    class SingletonClass {
        public cat: string = "Kitty";
        public dog: string = "Hot";

        public say() {
            alert(`${this.cat}-Cat and ${this.dog}-Dog`);
        }
    }
    @injection
    class SimpleClass {
        public say(something: string) {
            alert(`You said ${something}?`);
        }
    }

    @resolve
    class NeedInjectionsClass {
        @inject(SingletonClass)
        public helper: SingletonClass;
        @inject(SimpleClass)
        public simpleHelper: SimpleClass;

        constructor() {
            this.helper.say();
            this.simpleHelper.say("wow");
        }
    }

    class ChildClass extends NeedInjectionsClass {

    }

    var needInjection = new ChildClass();
}