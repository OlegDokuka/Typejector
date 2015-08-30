namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;

    export class DefaultBeanDefinitionPostProcessor implements BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void {
            beanDefinition.scopeNames.forEach((it, id) => it == SingletonScope.NAME || it == PrototypeScope.NAME ?
                beanDefinition.scopeNames.splice(id, 1) : void (0));

            if (BeanUtils.isSingleton(beanDefinition)) {
                beanDefinition.scopeNames.push(SingletonScope.NAME);
            }
            else {
                beanDefinition.scopeNames.push(PrototypeScope.NAME);
            }
        }
    }
} 