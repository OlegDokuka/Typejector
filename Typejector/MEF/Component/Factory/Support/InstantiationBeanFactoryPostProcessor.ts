namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Util.Collections;
    import factoryMethod = Annotation.factoryMethod;

    export class InstantiationBeanFactoryPostProcessor extends MergedBeanFactoryPostProcessor {
        constructor(private context: Context.ApplicationContext) {
            super();
        }

        postProcessBeanFactory(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {
            const sortedBeanDefinitions = this.sortBeanDefinitions(configurableListableBeanFactory);

            sortedBeanDefinitions
                .filter(beanDefinition=> beanDefinition.clazz !== BeanPostProcessor && Class.isAssignable(<any>BeanPostProcessor, beanDefinition.clazz))
                .map(beanDefinition=> <BeanPostProcessor>this.instantiateBean(beanDefinition, configurableListableBeanFactory))
                .forEach(beanPostProcessor=> configurableListableBeanFactory.addBeanPostProcessor(beanPostProcessor));

            sortedBeanDefinitions
                .filter(beanDefinition=> (BeanUtils.isConfig(beanDefinition) || BeanUtils.isSingleton(beanDefinition)) && !beanDefinition.isLazyInit)
                .forEach(beanDefinition=> this.instantiateBean(beanDefinition, configurableListableBeanFactory));

            sortedBeanDefinitions
                .filter(beanDefinition=> beanDefinition.clazz !== BeanFactoryPostProcessor && Class.isAssignable(<any>BeanFactoryPostProcessor, beanDefinition.clazz))
                .map(beanDefinition=> <BeanFactoryPostProcessor>this.instantiateBean(beanDefinition, configurableListableBeanFactory))
                .forEach(beanFactoryPostProcessor=> this.context.addBeanFactoryPostProcessor(beanFactoryPostProcessor));
        }

        protected sortBeanDefinitions(configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const sortingGraph = new Graph();
            const beanDefinitions = configurableListableBeanFactory.getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name));
            const sortedBeanDefinitions: BeanDefinition[] = [];

            beanDefinitions.forEach(bd=> sortingGraph.addNode(bd.name));
            beanDefinitions.forEach(bd=> bd.dependsOn.forEach(dependency=> sortingGraph.addEdge(bd.name, dependency)));

            sortingGraph.sort().forEach(name=> sortedBeanDefinitions.push(configurableListableBeanFactory.getBeanDefinition(name)));

            return sortedBeanDefinitions;
        }

        private instantiateBean(beanDefinition: BeanDefinition, configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            return configurableListableBeanFactory.getBean(beanDefinition.name);
        }
    }

    class Node {
        id: string;
        visited: boolean = false;
        precessed: boolean = false;
        edges: number[] = [];

        constructor(id: string) {
            this.id = id;
        }
    };


    class Graph {
        nodes: Node[] = [];

        // add nodes - id is a unique string for identification
        addNode(id: string) {
            if (this.findNode(id) < 0) {
                var edges = [];
                var n = new Node(id);
                this.nodes.push(n);
            }
        }

        // add edge - work well for DAGs
        // if you don't work with DAGs, then use
        // add_edge(i, j) ; add_edge(j, i);
        addEdge(src: string, dst: string) {
            const i = this.findNode(src);
            const j = this.findNode(dst);

            if (i >= 0 && j >= 0) {
                this.nodes[i].edges.push(j);
            }
        }

        // topological sorting - return array of IDs
        // see http://en.wikipedia.org/wiki/Topological_sort
        // (alternative algorithm)
        sort(): string[] {
            let nodesIndices: Array<number> = []
            let nodesIdentities: Array<string> = [];
            let visit = (n: number) => {
                const node = this.nodes[n];

                if (!node.visited) {
                    if (node.precessed) {
                        throw new Error(`Circular reference for "${node.id}"`)
                    }

                    node.precessed = true;
                    node.edges.forEach(visit)
                    node.visited = true;

                    nodesIndices.push(n);
                }
            };

            this.resetNodes();

            for (let i in this.nodes) {
                visit(i);
            }

            nodesIndices.forEach(index=> nodesIdentities.push(this.nodes[index].id))

            return nodesIdentities;
        }

        private resetNodes() {
            this.nodes.forEach(node=> {
                node.visited = false;
                node.precessed = false;
            });
        }

        private findNode(id: string): number {
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].id === id) {
                    return i;
                }
            }

            return -1;
        }
    }
} 