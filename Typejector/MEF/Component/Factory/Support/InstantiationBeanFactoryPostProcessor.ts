namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Collections = Util.Collections;
    import factoryMethod = Annotation.factoryMethod;

    export class InstantiationBeanFactoryPostProcessor extends MergedBeanFactoryPostProcessor {
        postProcessBeanFactory(configurableListableBeanFactory: ConfigurableListableBeanFactory): void {

            configurableListableBeanFactory.getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name))
                .filter(beanDefinition=> BeanUtils.isConfig(beanDefinition) || BeanUtils.isSingleton(beanDefinition))
                .forEach(beanDefinition=> this.instantiateBean(beanDefinition));
        }

        private sortBeanDefinitions(configurableListableBeanFactory: ConfigurableListableBeanFactory) {
            const sortingGraph = new Graph();
            const beanDefinitions = configurableListableBeanFactory.getBeanDefinitionNames()
                .map(name=> configurableListableBeanFactory.getBeanDefinition(name));
            const sortedBeanDefinitions: BeanDefinition[] = [];

            beanDefinitions.forEach(bd=> sortingGraph.addNode(bd.name));
            beanDefinitions.forEach(bd=> bd.dependsOn.forEach(dependency=> sortingGraph.addEdge(bd.name, dependency)));

            sortingGraph.sort().forEach(index=> sortedBeanDefinitions.push(beanDefinitions[index]));
        }

        private instantiateBean(beanDefinition: BeanDefinition) {

        }
    }

    class Node {
        id: string;
        visited: boolean;
        edges: number[];

        constructor(id: string) {
            this.id = id;
            this.visited = false;
            this.edges = [];
        }
    };


    class Graph {
        nodes: Node[] = [];

        findNode(id: string): number {
            var i;
            var found;

            if (this.nodes.length == 0) {
                return -1;
            }

            i = 0;
            found = false;
            while (i < this.nodes.length) {
                if (this.nodes[i].id == id) {
                    found = true;
                }
                if (found) {
                    break;
                }
                i++;
            }
            if (found) {
                return i;
            } else {
                return -1;
            }
        }

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
            var n;
            var i = this.findNode(src);
            var j = this.findNode(dst);
            if (i >= 0 && j >= 0) {
                n = this.nodes[i].edges.push(j);
            }
        }

        // topological sorting - return array of IDs
        // see http://en.wikipedia.org/wiki/Topological_sort
        // (alternative algorithm)
        sort(): number[] {
            var i, j, m;
            var L = [], Lid = [];
            var that = this;

            for (i in this.nodes) {
                this.nodes[i].visited = false;
            }

            function _visit(n) {
                var j;
                if (!that.nodes[n].visited) {
                    that.nodes[n].visited = true;
                    for (j in that.nodes[n].edges) {
                        m = that.nodes[n].edges[j];
                        _visit(m);
                    }
                    L.push(n);
                }
            }
            for (i in this.nodes) {
                _visit(i);
            }

            for (i in L) {
                j = L[i];
                Lid.push(this.nodes[j].id);
            }
            return Lid;
        }
    }
} 