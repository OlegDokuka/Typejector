///<reference path="../../Typejector/Compiled/typejector.d.ts"/>

namespace Example.TodoMVC {
    import injection = Typejector.Annotation.injection;
    import inject = Typejector.Annotation.inject;
    import ApplicationContext = Typejector.Component.Context.ApplicationContext;
    import config = Typejector.Annotation.config;
    import factoryMethod = Typejector.Annotation.factoryMethod;
    import postConstructor = Typejector.Annotation.postConstructor;
    import BeanPostProcessor = Typejector.Component.Factory.BeanPostProcessor;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Typejector.Util.Collections;
    import Annotations = Typejector.Annotation.Annotations;
    import singleton = Typejector.Annotation.singleton;

    function click(id: string): MethodDecorator {
        return (target: Object, propertyKey: string) => Annotations.add(click, id, target, propertyKey);
    }

    function html(id: string) {
        return (target: Object, propertyKey: string) => {
            const propertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            const getter: Function = propertyDescriptor.value;

            Object.defineProperty(target, propertyKey, {
                get: function(...args) {
                    const element = document.querySelector(id);

                    getter.apply(this, [element].concat(args));
                },
                enumerable: true,
                configurable: true
            });

            Annotations.add(html, id, target, propertyKey);
        };
    }

    @injection
    export class ClickableBeanPostProcessor extends BeanPostProcessor {
        postProcessBeforeInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T {
            return bean;
        }

        postProcessAfterInitialization<T extends Object>(bean: T, beanDefinition: BeanDefinition): T {
            const clojure = () => {
                Object.keys(Object.getPrototypeOf(bean))
                    .filter(key=> Annotations.get(beanDefinition.clazz.prototype, key).has(click))
                    .forEach(key=> {
                        const id = <string>Annotations.get(beanDefinition.clazz.prototype, key).get(click);
                        const element = document.querySelector(id);

                        element.addEventListener("click", () => bean[key]());
                    });
            };

            if (document.readyState !== 'complete') {
                window.addEventListener('onload', clojure, false);
                window.addEventListener('load', clojure, false);
            }
            else {
                clojure();
            }


            return bean;
        }
    }

    export interface Observable<T> {
        subscribe(observer: Observer<T>): void;
    }

    export interface Observer<T> {
        onChange(target: T, propertyKey);
    }

    @injection
    export class Model implements Observable<Model> {
        private taskList: Array<string> = [];
        public subscribers: Array<Observer<Model>> = [];


        subscribe(observer: Observer<Model>): void {
            this.subscribers.push(observer);
        }

        public addTask(task: string) {
            this.taskList.push(task);

            this.notifyAll("addTask");
        }

        private notifyAll(propKey: string) {
            this.subscribers.forEach(subscriber=> subscriber.onChange(this, propKey));
        }
    }

    @singleton
    export class Controller {
        @inject
        private model: Model;

        @click("#add-task")
        @html("#task")
        addTask(element: HTMLInputElement) {
            if (element.value) {
                this.model.addTask(element.value);
            }
        }

        @html("#tasks")
        updateList(element:HTMLElement){
            const
            element.appendChild()
        }
    }

    Typejector.context.run();
}



