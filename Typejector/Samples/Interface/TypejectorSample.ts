///<reference path="../../MEF/Typejector"/>
module Typejector.Sample {
    import resolve = Annotation.resolve;
    import inject = Annotation.inject;
    import injection = Annotation.injection;

    class InterfaceClass {
        public cat: string;
        public dog: string;

        public say() {

        }
    }

    @injection(true, InterfaceClass)
    class SingletonClass extends InterfaceClass {
        public cat: string = "Kitty";
        public dog: string = "Hot";

        public say() {
            alert(`${this.cat}-Cat and ${this.dog}-Dog`);
        }
    }

    @injection(true, InterfaceClass)
    class MockInterfaceClass extends InterfaceClass {
        public cat: string = "Kitty";
        public dog: string = "Hot";

        public say() {
            alert(`Mock-${this.cat}-Cat and Mock-${this.dog}-Dog`);
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
        @inject(InterfaceClass)
        public helper: InterfaceClass;
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