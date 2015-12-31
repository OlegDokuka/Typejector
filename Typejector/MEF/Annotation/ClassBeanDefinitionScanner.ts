namespace Typejector.Annotation {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Bean = Typejector.Component.Factory.Support.Bean;
    import Class = Typejector.Type.Class;
    import Collections = Typejector.Util.Collections;
    import MethodDescriptor = Typejector.Component.Factory.Config.MethodDescriptor;
    import TypeDescriptor = Typejector.Component.Factory.Config.TypeDescriptor;
    import BeanNameGenerator = Typejector.Component.Factory.Support.BeanNameGenerator;
    import Reflection = Typejector.Util.Reflection;

    class ClassBeanDefinitionScanner {
        scan():void {
            const classes = Class.classes();

            classes.map(it=> {
            })
        }

        private buildBeanDefinition(clazz:Class):BeanDefinition {
            const annotations = Annotations.get(clazz);
            const bean = new Bean();

            bean.clazz = clazz;

            annotations.forEach((val, key) => {
                bean.annotations.add(key);
            });

            Object.keys(clazz).forEach(it=> {
                const property = clazz.prototype[it];

                Collections.keys(Annotations.get(clazz.prototype));

                if (Class.isClass(property)) {
                    const descriptor: MethodDescriptor = {
                        name: BeanNameGenerator.generateBeanName(property),
                        arguments: Reflection.getParamTypes(clazz.prototype, it).map(),
                        returnType: new TypeDescriptor()
                    };

                    bean.methods.add()
                }
            });


            return bean;
        }
    }
}  