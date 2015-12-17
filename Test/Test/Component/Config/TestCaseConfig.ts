namespace Typejector.Test.Component.Config {
    import config = Typejector.Annotation.config;
    import postConstructor = Typejector.Annotation.postConstructor;

    declare var require;

    @config
    export class TestCaseConfig {
        @postConstructor
        private init() {
            try {
                mocha.setup('bdd');
                mocha.bail(false);
            }
            catch (e) {
            }
        }
    }
}