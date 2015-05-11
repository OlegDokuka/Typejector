# Typejector
Standalone, powerful dependency injector for TypeScript and Javascript

##Requirement
EcmaScript 5 or higer and Typescript 1.5 beta or higer

##How it use?
All you need are several annotation
+@injection - annotation for class that should be imported
+@inject - annotation for property in class for which you want to insert the dependence
+@resolve - annotation for class, where exist @inject annotations

###Example of code
`module Typejector.Sample {
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
}`

##Signature
`   @injection //in this case someClass is Singleton by default
    class someClass {

    }
    @injection(false) //in this case in all dependencies of someClass2 are unique instances
    class someClass2 {

    }
`
