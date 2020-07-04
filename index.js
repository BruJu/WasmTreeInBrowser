/* == BENCHMARKED LIBRARIES == */
// https://github.com/BruJu/WasmTreeDataset
const wasmtree = require("/home/bruju/LIRIS/WasmTreeDataset/wasm-tree-frontend");
// https://github.com/BruJu/Portable-Reasoning-in-Web-Assembly
const sophia_wasm = require("/home/bruju/LIRIS/Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg")

/* == OTHER LIBRARIES (can be used both as a baseline and to steal their functions) == */
const factory = require("@graphy/core.data.factory");
const n3 = require("n3");
//const graphy = require("graphy");

/* == ACTUAL CODE == */

// Returns a pattern in the form of an array of 4 terms
// Aligned with sophia_rdf_wasm_benchmark (or whatever name I gave to my sophia_benchmark fork)
function getPatternForRequest(requestNumber) {
    let pattern = [undefined, undefined, undefined, undefined];
    if (requestNumber == 1 || requestNumber == 3) {
        pattern[1] = n3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
        pattern[2] = n3.DataFactory.namedNode('http://dbpedia.org/ontology/Person');
    }
    
    if (requestNumber == 2 || requestNumber == 4) {
        pattern[0] = n3.DataFactory.namedNode('http://dbpedia.org/resource/Vincent_Descombes_Sevoie');
    }

    if (requestNumber <= 2) {
        pattern[3] = n3.DataFactory.defaultGraph();
    }

    return pattern;
}

// Returns dataset.match(matchPattern)
function applyMatch(dataset, matchPattern) {
    return dataset.match(matchPattern[0], matchPattern[1], matchPattern[2], matchPattern[3]);
}

function benchmark(datasetInstancier, datasetFilename, requestNumber, callback) {
    $.get(datasetFilename, function (content) {
        function freeDataset(ds) {
            if (ds.free !== undefined) {
                ds.free();
            }
        }

        const parser = new n3.Parser();
        let result = parser.parse(content);
        // Fill the dataset
        const dataset = datasetInstancier();

        const beginFillTime = performance.now();
        dataset.addAll(result);
        const endFillTime = performance.now();

        // Prepare match
        const matchPattern = getPatternForRequest(requestNumber);

        // First match (used to trigger any caching system)
        freeDataset(applyMatch(dataset, matchPattern));

        // Second match (measured)
        const beginSecondMatchTime = performance.now();
        const matchResult = applyMatch(dataset, matchPattern);
        const endSecondMatchTime = performance.now();

        const beginForEachMeasure = performance.now();
        let n = 0;
        matchResult.forEach(_ => { ++n; });
        const endForEachMeasure = performance.now();

        freeDataset(matchResult);

        freeDataset(dataset);

        if (callback !== undefined) {
            callback({
                fill: endFillTime - beginFillTime,
                cachedMatch: endSecondMatchTime - beginSecondMatchTime,
                forEachTime: endForEachMeasure - beginForEachMeasure,
                forEachCount: n
            });
        }
    },'text');
}

benchmark(() => new wasmtree.Dataset(), "persondata_en_1M.ttl", 1, 
    console.log
);
