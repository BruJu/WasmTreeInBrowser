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

function populateSourceFiles() {
    let select = $("#sourcefile");
    select.empty();

    const availableFiles = [
        { "triples":    10000, "filename": "persondata_en_10k.ttl"},
        { "triples":    20000, "filename": "persondata_en_20k.ttl"},
        { "triples":    40000, "filename": "persondata_en_40k.ttl"},
        { "triples":    80000, "filename": "persondata_en_80k.ttl"},
        { "triples":   100000, "filename": "persondata_en_100k.ttl"},
        { "triples":  1000000, "filename": "persondata_en_1M.ttl"},
        { "triples": 10310106, "filename": "persondata_en.ttl"}
    ];

    $.each(availableFiles, function() {
        select.append(
            $('<option />')
                .val(this.filename)
                .text(this.filename + " (" + this.triples + " triples)")
        );
    });
}

populateSourceFiles();

datasetKinds = {};
function addDatasetKind(initializer, name) {
    let select = $("#datasetkind");

    datasetKinds[name] = initializer;

    select.append($('<option></option>')
        .attr('value', name)
        .text(name));
}

addDatasetKind(() => new wasmtree.Dataset(), "Wasm Tree");
addDatasetKind(() => new sophia_wasm.ArrayDataset(), "Array Dataset");

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

//benchmark(() => new wasmtree.Dataset(), "persondata_en_1M.ttl", 1, 
//    console.log
//);

function startbenchmark() {
    let file = $("#sourcefile option:selected").val();
    let dataset = $("#datasetkind option:selected").val();
    let queryNumber = $("input[name='query']:checked").val();

    if (file == null || dataset == null || queryNumber == null) {
        // TODO : error message
        return;
    }

    let instancier = datasetKinds[dataset];
    if (instancier == null) {
        // TODO : error message
        return;
    }

    $("#startbenchmark").attr("disabled", "true");

    benchmark(instancier, file, parseInt(queryNumber),
        results => {
            function f(num) {
                return num.toLocaleString(undefined, { maximumFractionDigits: 3, minimumFractionDigits: 0 });
            }

            let parsedResults = [];
            parsedResults.push({ label: "Fill (ms)", value: f(results.fill) });
            parsedResults.push({ label: "Match (ms)", value: f(results.cachedMatch) });
            parsedResults.push({ label: "Count (ms)", value: f(results.forEachTime) });
            parsedResults.push({ label: "Match + Count (ms)", value: f(results.cachedMatch + results.forEachTime) });
            parsedResults.push({ label: "# Quads", value: results.forEachCount });

            let template = $("#resulttable_template").text();
            let content = Mustache.render(template, parsedResults);
            $("#resulttable").html(content);

            $("#startbenchmark").attr("disabled", false);
        }
    );
}

$("#startbenchmark").click(startbenchmark);
