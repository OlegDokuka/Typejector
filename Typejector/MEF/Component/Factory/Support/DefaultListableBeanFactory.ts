module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    import ReferenceDescriptor = Config.ReferenceDescriptor;
    import Scope = Config.Scope;
    import Collections = Typejector.Util.Collections;

    export class DefaultListableBeanFactory extends AbstractAutowireCapableBeanFactory implements ListableBeanFactory {
        getBeansOfType<T>(clazz: Class): Array<T> {
            assert(clazz);

            return this.doGetBeansOfType(clazz);
        }

        getBeanNamesOfType(clazz: Class): Array<string> {
            assert(clazz);

            return this.doGetBeanNamesOfType(clazz);
        }

        protected doGetBeanNamesOfType(clazz: Class) {
            let beanDefinitions: BeanDefinition[],
                beanNames: string[];

            assert(clazz);

            beanDefinitions = this.doGetBeanDefinitionsOfType(clazz, true);

            beanNames = beanDefinitions.map((bd) => bd.name);

            return beanNames;
        }

        protected doGetBeansOfType(clazz: Class) {
            let beanDefinitions: BeanDefinition[],
                beans: Array<any>;

            beanDefinitions = this.doGetBeanDefinitionsOfType(clazz);

            beans = beanDefinitions.map(bd => this.doGetBean(bd));

            return beans;
        }

        protected doGetBeanDefinitionsOfType(clazz: Class, useAbstract?: boolean) {
            let beanDefinitions = this.getRegisteredBeanDefinitions();

            beanDefinitions = beanDefinitions.filter(val => Class.isAssignable(clazz, val.clazz)
                && (useAbstract || !BeanUtils.isAbstract(val)));

            return beanDefinitions;
        }

        protected doGetBean(beanDefinition: BeanDefinition): any {
            let bean: any;

            if (BeanUtils.isAbstract(beanDefinition) && !beanDefinition.factoryMethodName) {
                const beanDefinitions: BeanDefinition[]
                    = this.doGetBeanDefinitionsOfType(beanDefinition.clazz);

                if (!beanDefinitions.length) {
                    throw new Error(`No ${beanDefinition.name} class found`);
                }

                bean = this.doGetBean(beanDefinitions.pop());
            }
            else {
                bean = this.createBean(beanDefinition.clazz);
            }

            return bean;
        }
        
        protected doResolveDependency(typeDescriptor: ReferenceDescriptor): any {
            let result;

            if (Collections.isCollection(typeDescriptor.clazz)) {
                result = this.getBeansOfType(typeDescriptor.genericTypes[0]);
            }
            else {
                result = this.getBean(typeDescriptor.clazz);
            }

            return result;
        }
    }
}