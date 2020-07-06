
# 🕸️🏭🌳 🔥🦊

*Web Tree on Firefox* (but I am 7 years old and I discovered unicode emoji)

This repository is a WIP html basic interface to benchmark and profile Wasm Tree and Sopha WASM in a browser.

# How to

- Fix the paths in index.js
    - [wasm_tree](https://github.com/BruJu/WasmTreeDataset) isn't extracted
    from npm registry because the one that is published has been compiled for
    NodeJS
    - [sophia_wasm](https://github.com/BruJu/Portable-Reasoning-in-Web-Assembly/tree/master/sophia-wasm)
    isn't even published on NodeJS.
    - They need to be compiled with `wasm-pack build`. `--target bundler` is the default
- `cd data` `make` `cd ..` to download the persondata dataset. The benchmark performed here
is heavily inspired from [sophia_benchmark](https://github.com/pchampin/sophia_benchmark).
- `npm start`


## License

Built using the npm **wasm-app** template.

Licensied under the MIT License
