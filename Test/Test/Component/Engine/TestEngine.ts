namespace Typejector.Test.Component.Engine {
    import abstract = Typejector.Annotation.abstract;
    import Class = Type.Class;

    @abstract
    export abstract class TestEngine {
        public abstract generateTest(owner: Class, mathodName: string, method: Function): Function;
    }
}