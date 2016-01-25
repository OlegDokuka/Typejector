/// <reference path="../../Typejector/Compiled/typejector.d.ts" />
declare namespace Example.TodoMVC {
    import BeanPostProcessor = Typejector.Component.Factory.BeanPostProcessor;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    class ClickableBeanPostProcessor extends BeanPostProcessor {
        postProcessBeforeInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T;
        postProcessAfterInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T;
    }
    interface Observable<T> {
        subscribe(observer: Observer<T>): void;
    }
    interface Observer<T> {
        onChange(target: T, propertyKey: any): any;
    }
    class Model implements Observable<Model> {
        private taskList;
        subscribers: Array<Observer<Model>>;
        subscribe(observer: Observer<Model>): void;
        addTask(task: string): void;
        private notifyAll(propKey);
    }
    class Controller {
        private model;
        addTask(element: HTMLInputElement): void;
        updateList(element: HTMLElement): void;
    }
}
