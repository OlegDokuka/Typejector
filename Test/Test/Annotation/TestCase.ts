namespace Typejector.Test.Annotation {
    import Class = Type.Class;
    import injection = Typejector.Annotation.injection;
    import singleton = Typejector.Annotation.singleton;

    export function testCase(clazz: Class) {
        injection(clazz, singleton, testCase);
    }
}