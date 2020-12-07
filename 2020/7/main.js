const fs = require('fs');
const getEntries = () => fs.readFileSync('input.txt', 'utf-8').split('\n');

class DirectedGraph {
    verticies = {};

    addVertex(v) {
        if (!this.verticies[v]) this.verticies[v] = [];
    }

    getVertex(v) {
        return this.verticies[v] || [];
    }

    addEdge(a, b, n) {
        if (!this.verticies[a]) this.addVertex(a);
        if (!this.verticies[a].find(x => x.bag == b)) {
            this.verticies[a].push({ bag: b, value: n });
        }
    }
}

const buildGraphOne = entries => {
    const graph = new DirectedGraph();
    const numRegExp = new RegExp(/\d+/);
    const noOtherRegExp = new RegExp(/other/);

    entries.forEach(e => {
        const s = e.split(' bags contain');
        graph.addVertex(s[0]);
        s[1]
            .replace(/(bags?|\.)/g, '')
            .split(',')
            .filter(x => !noOtherRegExp.test(x))
            .forEach((b => {
                const num = parseInt(b.match(numRegExp));
                const name = b.replace(numRegExp, '').trim();
                graph.addEdge(name, s[0], num)
            }));
    });

    return graph;
}

const buildGraphTwo = entries => {
    const graph = new DirectedGraph();
    const numRegExp = new RegExp(/\d+/);
    const noOtherRegExp = new RegExp(/no other/);

    entries.forEach(e => {
        const s = e.split(' bags contain');
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

const partOne = s => {
    const g = buildGraphOne(getEntries());

    const path = [s];
    const visited = new Set([s]);
    let currentNode = s;
    while (path.length > 0) {
        let foundOutlet = false;
        let visitNode = '';
        for (let i = 0; i < g.getVertex(currentNode).length; i++) {
            const n = g.getVertex(currentNode)[i];

            if (!visited.has(n.bag)) {
                foundOutlet = true;
                visitNode = n.bag;
            }
        }
        if (foundOutlet) {
            path.push(visitNode);
            visited.add(visitNode)
        } else {
            path.pop();
        }
        currentNode = path[path.length - 1];
    }

    return visited.size - 1;
}

const partTwo = s => {
    const g = buildGraphTwo(getEntries());
    let result = 0;

    for (let i = 0; i < g.getVertex(s).length; i++) {
        const child = g.getVertex(s)[i];
        result += child.value * (1 + partTwo(child.bag))
    }

    return result;
}

console.log(partOne('shiny gold'));
console.log(partTwo('shiny gold'));