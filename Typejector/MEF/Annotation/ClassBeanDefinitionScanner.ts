namespace Typejector.Annotation {
    import Class = Typejector.Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Bean = Typejector.Component.Factory.Support.Bean;

    class ClassBeanDefinitionScanner {
        scan(): void {
            const classes = Class.classes();
            
            classes.map(it=> {})
        }
        
        private buildBeanDefinition():BeanDefinition {
            const bean = new Bean();
            
            
            return bean;
        }
    }
}  