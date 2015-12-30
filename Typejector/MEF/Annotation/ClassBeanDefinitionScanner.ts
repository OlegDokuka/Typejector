namespace Typejector.Annotation {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Bean = Typejector.Component.Factory.Support.Bean;
    import Class = Typejector.Type.Class;

    class ClassBeanDefinitionScanner {
        scan(): void {
            const classes = Class.classes();

            classes.map(it=> {
            })
        }

        private buildBeanDefinition(clazz: Class): BeanDefinition {
            const annotations = Annotations.get(clazz);

            annotations.forEach((key, val) => {
                bean.annotations.push(key);
            });
            
            Object.keys(clazz).map(it=>Annotations.get(clazz.prototype))

            const bean = new Bean();
            bean.clazz = clazz;


            return bean;
        }
    }
}  