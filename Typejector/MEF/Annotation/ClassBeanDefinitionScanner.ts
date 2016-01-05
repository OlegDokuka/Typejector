namespace Typejector.Annotation {
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Bean = Typejector.Component.Factory.Support.Bean;
    import Class = Typejector.Type.Class;
    import Collections = Typejector.Util.Collections;

    export class ClassBeanDefinitionScanner {
        scan(): BeanDefinition[] {
            const classes = new Set<Class>();

            Class.classes().forEach((val: Class) => {
                classes.add(val);
                this.deepScanning(val).forEach((val) => classes.add(val))
            });

            return Collections.map(classes, () => [], it=> this.buildBeanDefinition(it), (collection, it) => collection.push(it));
        }

        private buildBeanDefinition(clazz: Class): BeanDefinition {
            const bean = new Bean();

            bean.clazz = clazz;

            return bean;
        }

        private deepScanning(clazz: Class): Class[] {
            const classes: Class[] = [];
            let nextClass = clazz;

            while ((nextClass = Class.getParentOf(nextClass))) {
                classes.push(nextClass);
            }

            return classes;
        }
    }
}  