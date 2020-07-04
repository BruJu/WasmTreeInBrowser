const wasmtree = require("/home/bruju/LIRIS/WasmTreeDataset/wasm-tree-frontend");
const factory = require("@graphy/core.data.factory");
const namespace = require ("@rdfjs/namespace");
const ex = namespace("http://example.org/", factory);
const N3 = require("n3");

// wasm.greet();
console.log("before new tree");
const tree = new wasmtree.Dataset();
console.log("before add");

tree.add(factory.quad(ex.s1, ex.p1, ex.o1, factory.defaultGraph()));

console.log("before get .contentOfDataset");
const table = document.getElementById("contentOfDataset");

function escapeHtml(unsafe) {
    // source : https://stackoverflow.com/a/6234804
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function htmlize_term(term) {
    let str = "<td>";
    let graphyTerm = factory.fromTerm(term);
    str += escapeHtml(graphyTerm.concise());
    return str + "</td>";
}

function htmlize(quad) {
    let str = "<tr>";
    str += htmlize_term(quad.subject);
    str += htmlize_term(quad.predicate);
    str += htmlize_term(quad.object);
    str += htmlize_term(quad.graph);
    str += "</tr>"
    return str;
}

for (const quad of tree) {
    table.innerHTML += htmlize(quad);
}

$.get("dataset_200.ttl", function (content) {
    const parser = new N3.Parser();
    let result = parser.parse(content);
    console.log(result.length);
    console.log("End of parse");
    for (let quad of result)
        tree.add(quad);

    console.log(tree.size);

},'text');
