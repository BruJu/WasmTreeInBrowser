/* == BENCHMARKED LIBRARIES == */
// https://github.com/BruJu/WasmTreeDataset
const wasmtree = require("/home/bruju/LIRIS/WasmTreeDataset/wasm-tree-frontend");
// https://github.com/BruJu/Portable-Reasoning-in-Web-Assembly
const sophia_wasm = require("/home/bruju/LIRIS/wasmify_sophia/sophia-wasm/pkg")
const sophia_wasm_w = require("//home/bruju/LIRIS/wasmify_sophia/sophia-wasm/pkg/wrapper")


/* == OTHER LIBRARIES (can be used both as a baseline and to steal their functions) == */
const factory = require("@graphy/core.data.factory");
const n3 = require("n3");
const graphyDataset = require('@graphy/memory.dataset.fast');

/* == ACTUAL CODE == */

const availableFiles = [
    { "triples":    10000, "filename": "persondata_en_10k.ttl"},
    { "triples":    20000, "filename": "persondata_en_20k.ttl"},
    { "triples":    40000, "filename": "persondata_en_40k.ttl"},
    { "triples":    80000, "filename": "persondata_en_80k.ttl"},
    { "triples":   100000, "filename": "persondata_en_100k.ttl"},
    { "triples":  1000000, "filename": "persondata_en_1M.ttl"},
    { "triples": 10310106, "filename": "persondata_en.ttl"}
];

function populateSourceFiles() {
    let select = $("#sourcefile");
    select.empty();

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
function addDatasetKind(className, name) {
    let select = $("#datasetkind");

    datasetKinds[name] = () => new className();

    select.append($('<option></option>')
        .attr('value', name)
        .text(name));
}
function addDatasetKindFromFunc(initializer, name) {
    let select = $("#datasetkind");

    datasetKinds[name] = initializer;

    select.append($('<option></option>')
        .attr('value', name)
        .text(name));
}

datasetsToAdd = [
    [wasmtree.Dataset            , "Wasm Tree Dataset"],
    [sophia_wasm.ArrayDataset    , "Array Dataset"],
    [sophia_wasm.LightDataset    , "Light Dataset"],
    [sophia_wasm.FastDataset     , "Fast Dataset"],
    [sophia_wasm.TreedDataset    , "Tree Dataset"],
    [sophia_wasm.FullDataset     , "Full Dataset"],
    [sophia_wasm.LightDatasetToA , "Light Dataset into Array Dataset"],
    [sophia_wasm.FastDatasetToA  , "Fast Dataset into Array Dataset"],
    [sophia_wasm.TreedDatasetToA , "Tree Dataset into Array Dataset"],
    [sophia_wasm.FullDatasetToA  , "Full Dataset into Array Dataset"],
]

initializersToAdd = [
    [() => new sophia_wasm_w.SophiaDatasetWrapper(new sophia_wasm.TreedDataset())   , "Wrapped Tree Dataset"],
    [() => new sophia_wasm_w.SophiaDatasetWrapper(new sophia_wasm.FastDataset())    , "Wrapped Fast Dataset"],
    [() => graphyDataset(), "Graphy"]
]

for (const datasetToAdd of initializersToAdd) {
    addDatasetKindFromFunc(datasetToAdd[0], datasetToAdd[1]);
}

for (const datasetToAdd of datasetsToAdd) {
    addDatasetKind(datasetToAdd[0], datasetToAdd[1]);
}



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
        //n = matchResult.size;
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

function readUserInput() {
    let file = $("#sourcefile option:selected").val();
    let dataset = $("#datasetkind option:selected").val();
    let queryNumber = $("input[name='query']:checked").val();

    if (file == null || dataset == null || queryNumber == null) {
        // TODO : error message
        return undefined;
    }

    let instancier = datasetKinds[dataset];
    if (instancier == null) {
        // TODO : error message
        return undefined;
    }

    return [file, dataset, instancier, parseInt(queryNumber)];
}

function startbenchmark() {
    const userInput = readUserInput();
    if (userInput === undefined) return;

    const [file, _, instancier, queryNumber] = readUserInput();

    changeDisableStatusOfEveryButton("true");

    benchmark(instancier, file, queryNumber,
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

            changeDisableStatusOfEveryButton(false);
        }
    );
}

function benchmarkForPlot() {
    const userInput = readUserInput();
    if (userInput === undefined) return;

    const [_file, _, _instancier, queryNumber] = userInput;

    changeDisableStatusOfEveryButton("true");

    datasets = {
        "WasmTree": () => new wasmtree.Dataset(),
        "TreeDataset": () => new sophia_wasm.TreedDataset(),
        "Graphy": graphyDataset,
        "WrappedTree": () => new sophia_wasm_w.SophiaDatasetWrapper(new sophia_wasm.TreedDataset())
    }

    // Build benchmark list
    const sizeLimit = 100000;
    const numberOFBenchs = parseInt($("#benchPlot").val());
    const benchMultiplier = parseInt($("#benchMultiplier").val());
    let totalBenchmarks = 0;

    let fileContent = {};
    
    let benchsToRun = [];

    let sizesToLoad = [];

    for (let file of availableFiles) {
        if (file.triples > sizeLimit) {
            continue;
        }

        sizesToLoad.push([file.triples, file.filename]);

        // Add benchmarks for this file
        for (let datasetName in datasets) {
            let item = {
                'datasetName': datasetName,
                'instancier': datasets[datasetName],
                'size': file.triples,
                'leftMeasures': numberOFBenchs
            };

            benchsToRun.push(item);

            totalBenchmarks++;
        }
    }

    function nextStep(i) {
        if (i == sizesToLoad.length) {
            benchmarkForPlotMeasures(benchsToRun, totalBenchmarks, benchMultiplier, queryNumber, fileContent);
        } else {
            $.get(sizesToLoad[i][1], function (content) {
                const parser = new n3.Parser();
                let quads = parser.parse(content);
                fileContent[sizesToLoad[i][0]] = quads;
                nextStep(i + 1);
            });
        }
    }

    nextStep(0);
}


function benchmarkForPlotMeasures(benchsToRun, totalBenchmarks, benchMultiplier, queryNumber, fileContent) {
    // Run benchmarks
    measures = [];
    measures.push("dataset,size,t_load,t_match,t_loop");

    function freeDataset(ds) {
        if (ds.free !== undefined) {
            ds.free();
        }
    }

    // Prepare match
    const matchPattern = getPatternForRequest(queryNumber);

    while (totalBenchmarks !== 0) {
        let randomValue = Math.floor(Math.random() * benchsToRun.length);
        let benchToRun = benchsToRun[randomValue];

        if (benchToRun.leftMeasures === 0) {
            continue;
        }

        const content = fileContent[benchToRun.size];
        console.log(benchToRun);
        for (let i = 0 ; i != benchMultiplier ; ++i) {

            // Fill the dataset
            const dataset = benchToRun.instancier();
            const beginFillTime = performance.now();
            dataset.addAll(content);
            const endFillTime = performance.now();

            // First match (used to trigger any caching system)
            freeDataset(applyMatch(dataset, matchPattern));

            // Second match (measured)
            const beginSecondMatchTime = performance.now();
            const matchResult = applyMatch(dataset, matchPattern);
            const endSecondMatchTime = performance.now();

            let iterOn;

            if (matchResult[Symbol.iterator] === undefined) {
                iterOn = {
                    [Symbol.iterator]() {
                        return {
                            iter: matchResult.getIterator(),
                            previous: undefined,
                            next() {
                                if (this.previous !== undefined) {
                                    this.previous.free();
                                    this.previous = undefined;
                                }
                                if (this.iter === undefined) {
                                    return { value: undefined, done: true };
                                }
    
                                let wasm_next = this.iter.next();
                                let done = wasm_next.done;
                                if (!done) {
                                    let wasm_quad = wasm_next.value;
                                    this.previous = wasm_quad;
                                    return { value: wasm_quad, done: false };
                                } else {
                                    wasm_next.free();
                                    this.iter.free();
                                    this.iter = undefined;
                                    return { value: undefined, done: true };
                                }
                            }
                        };
                    }
                };
            } else {
                iterOn = matchResult;
            }

            const beginForEachMeasure = performance.now();
            let n = 0;
            for (let _q of iterOn) {
                ++n;
            }
            const endForEachMeasure = performance.now();

            freeDataset(matchResult);

            freeDataset(dataset);

            const fill = (endFillTime - beginFillTime) / 1000;
            const cachedMatch = (endSecondMatchTime - beginSecondMatchTime) / 1000;
            const forEachTime = (endForEachMeasure - beginForEachMeasure) / 1000;

            measures.push(benchToRun.datasetName
                + "," + benchToRun.size
                + "," + fill + "," + cachedMatch + "," + forEachTime
            );
        }

        totalBenchmarks--;
    }

    $("#benchplot").val(JSON.stringify(measures));
    changeDisableStatusOfEveryButton(false);
}

function forEachBenchmark() {
    const userInput = readUserInput();
    if (userInput === undefined) return;

    const [datasetFilename, _1, instancier, _2] = readUserInput();
    changeDisableStatusOfEveryButton("true");

    let countMethods = [
        ["classicLoop", function (dataset) {
            let n = 0;
            for (let _ of dataset.getIteratorExperiment(2)) {
                ++n;
            }
            return n;
        }],
        ["arrayIterator", function (dataset) {
            let n = 0;
            for (let _ of dataset.getIteratorExperiment(1)) {
                ++n;
            }
            return n;
        }],
        ["almostSafeIterator", function (dataset) {
            let n = 0;
            for (let _ of dataset.getIteratorExperiment(3)) {
                ++n;
            }
            return n;
        }],
        ["forEach", function (dataset) {
            let n = 0;
            dataset.forEachExperiment(_ => { ++n; }, 1);
            return n;
        }],
        ["forEachNoLeak", function (dataset) {
            let n = 0;
            dataset.forEachExperiment(_ => { ++n; }, 2);
            return n;
        }]
    ];

    let measuredBench = {};
    let missingBenchs = [];

    const NUMBER_OF_BENCHS = 10;
    let left_benches = 0;

    for (let countMethod of countMethods) {
        measuredBench[countMethod[0]] = [];
        missingBenchs.push(NUMBER_OF_BENCHS);
        left_benches += NUMBER_OF_BENCHS;
    }

    $.get(datasetFilename, function (content) {
        const parser = new n3.Parser();
        let quads = parser.parse(content);

        let dataset = instancier();
        dataset.addAll(quads);

        while (left_benches != 0) {
            // Pick a random for each / counting method
            let forEachMethod = function(){
                let randomValue;
                do {
                    randomValue = Math.floor(Math.random() * countMethods.length);
                } while(missingBenchs[randomValue] === 0);

                --missingBenchs[randomValue];
                return countMethods[randomValue];
            }();

            const beginTime = performance.now();
            let _ = forEachMethod[1](dataset);
            const endTime = performance.now();

            measuredBench[forEachMethod[0]].push(endTime - beginTime);

            --left_benches;
        }

        dataset.free();

        $("#benchjson").val(JSON.stringify(measuredBench));
        changeDisableStatusOfEveryButton(false);
    }, 'text');
}

const listOfButtons = {
    "#startbenchmark": startbenchmark,
    "#forEachBenchmark": forEachBenchmark,
    "#benchmarkPlotButton": benchmarkForPlot
}

for (let button in listOfButtons) {
    $(button).click(listOfButtons[button]);
}

function changeDisableStatusOfEveryButton(newStatus) {
    for (let button in listOfButtons) {
        $(button).attr("disabled", newStatus);
    }
}
