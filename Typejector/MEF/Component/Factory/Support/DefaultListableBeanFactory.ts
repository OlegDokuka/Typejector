module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    import Scope = Config.Scope;

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

            beanDefinitions = beanDefinitions.filter(val => BeanUtils.isAssignable(clazz, val.clazz)
                && (useAbstract || !BeanUtils.isAbstract(val)));

            return beanDefinitions;
        }

        protected doGetBean(beanDefinition: BeanDefinition): any {
            let bean: any;

            if (BeanUtils.isAbstract(beanDefinition)) {
                let beanDefinitions: BeanDefinition[];

                beanDefinitions = this.doGetBeanDefinitionsOfType(beanDefinition.clazz)

                if (!beanDefinitions.length) {
                    throw new Error(`No ${beanDefinition.name} class found`);
                }

                bean = this.doGetBean(beanDefinitions.pop());
            }
            else {
                let scopes: Scope[],
                    beanObjectFactory = this.doGetFactory(beanDefinition);

                scopes = beanDefinition.scopeNames.map(scopeName=> this.getRegisteredScope(scopeName));

                for (let scope of scopes) {
                    bean = scope.get(beanDefinition.name, beanObjectFactory);

                    if (bean != undefined) {
                        break;
                    }
                }
            }

            return bean;
        }
        protected doResolveDependency(typeDescriptor: TypeDescriptor): any {
            let result;

            if (typeDescriptor.isArray()) {
                result = this.getBeansOfType(typeDescriptor.genericTypes[0]);
            }
            else {
                result = this.getBean(typeDescriptor.clazz);
            }

            return result;
        }
    }
}