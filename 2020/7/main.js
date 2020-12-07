const fs = require('fs');
const getEntries = () => fs.readFileSync('input.txt', 'utf-8').split('\n');

class DirectedGraph {
    verticies = {};

    addVertex(v) {
        this.verticies[v] = [];
    }

    getVertex(v) {
        return this.verticies[v];
    }

    addEdge(a, b, n) {
        this.verticies[a].push({ bag: b, value: n });
    }

    depthFirstSearch(start, target) {
        const path = [start];
        const visited = new Set([start]);
        let currentNode = start;
        while (path[path.length - 1] != target && path.length > 0) {
            let foundOutlet = false;
            let visitNode = '';
            for (let i = 0; i < this.verticies[currentNode].length; i++) {
                const n = this.verticies[currentNode][i];
                if (!visited.has(n.bag)) {
                    foundOutlet = true;
                    visitNode = n.bag;
                    if (n.bag == target) return path;
                }
            }
            if (foundOutlet) {
                path.push(visitNode)
                visited.add(visitNode)
            } else {
                path.pop();
            }
            currentNode = path[path.length - 1];
        }

        return [];
    }
}

const buildGraph = entries => {
    const graph = new DirectedGraph();
    const numRegExp = new RegExp(/\d+/);
    const noOtherRegExp = new RegExp(/no other/g);

    entries.map(e => {
        const s = e.split(' bags contain ');
        graph.addVertex(s[0]);
        s[1]
            .replace(/(bags?|\.)/g, '')
            .split(',')
            .filter(x => !noOtherRegExp.test(x))
            .forEach((b => {
                const num = parseInt(b.match(numRegExp));
                const name = b.replace(numRegExp, '').trim();
                graph.addEdge(s[0], name, num);
            }));
    });

    return graph;
}

const partOne = () => {
    const entries = getEntries();
    const g = buildGraph(entries);
    return entries.reduce((acc, current) => {
        const path = g.depthFirstSearch(current.split(' bags contain ')[0], 'shiny gold');
        if (path.length > 0) return acc + 1;
        return acc;
    }, 0);
};

const partTwo = () => {
    const entries = getEntries();
    const g = buildGraph(entries);

    console.log(g.getVertex('shiny gold'))
}

console.log(partOne());
console.log(partTwo());

