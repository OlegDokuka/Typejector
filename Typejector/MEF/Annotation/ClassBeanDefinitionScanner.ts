namespace Typejector.Annotation {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Bean = Typejector.Component.Factory.Support.Bean;
    import Class = Typejector.Type.Class;
    import Collections = Typejector.Util.Collections;
    import MethodDescriptor = Typejector.Component.

    class ClassBeanDefinitionScanner {
        scan(): void {
            const classes = Class.classes();

            classes.map(it=> {
            })
        }

        private buildBeanDefinition(clazz: Class): BeanDefinition {
            const annotations = Annotations.get(clazz);
            const bean = new Bean();
            
            bean.clazz = clazz;
            
            annotations.forEach((key, val) => {
                bean.annotations.add(key);
            });

            Object.keys(clazz).forEach(it=> {
                Collections.keys(Annotations.get(clazz.prototype));
                
                if(typeof it === "function"){
                    const descriptor = new MethodDescriptor();
                    bean.methods.add()
                }
            })



            return bean;
        }
    }
}  