/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bootstrap.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.wasm": function() {
/******/ 			return {
/******/ 				"./sophia_wasm_bg.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_termtype_a4a786613f0caa0c": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_termtype_a4a786613f0caa0c"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_value_e1025b733d3dba1e": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_value_e1025b733d3dba1e"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_language_879613ccdf6a457b": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_language_879613ccdf6a457b"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_datatype_2ba7293e0b888706": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_datatype_2ba7293e0b888706"](p0i32);
/******/ 					},
/******/ 					"__wbg_log_83c9c7e7afe8209f": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_log_83c9c7e7afe8209f"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_is_null": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_is_null"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbg_term_new": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_term_new"](p0i32);
/******/ 					},
/******/ 					"__wbg_subject_048e66f68a4b1268": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_subject_048e66f68a4b1268"](p0i32);
/******/ 					},
/******/ 					"__wbg_object_54cb599f4cc13178": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_object_54cb599f4cc13178"](p0i32);
/******/ 					},
/******/ 					"__wbg_predicate_348a7e9650639bdd": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_predicate_348a7e9650639bdd"](p0i32);
/******/ 					},
/******/ 					"__wbg_graph_4185eaeb9b616609": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_graph_4185eaeb9b616609"](p0i32);
/******/ 					},
/******/ 					"__wbg_quadsgetrustptr_e356b53a099c2f60": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_quadsgetrustptr_e356b53a099c2f60"](p0i32);
/******/ 					},
/******/ 					"__wbg_quad_new": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_quad_new"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_75cef6ca00ba6515": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_75cef6ca00ba6515"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_is_falsy": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_is_falsy"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_a4d4b90cb7b6cef6": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_a4d4b90cb7b6cef6"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_d6660d2c5b1b0122": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_d6660d2c5b1b0122"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_8af02521c77b8172": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_8af02521c77b8172"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_fd13de8002947660": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_fd13de8002947660"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_cd4122b7c7bee63a": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_cd4122b7c7bee63a"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_4d9e9165c5b31627": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_4d9e9165c5b31627"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_85e6682f053e1121": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_85e6682f053e1121"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_16ee8ea079b18b62": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_16ee8ea079b18b62"](p0i32);
/******/ 					},
/******/ 					"__wbg_getsophiadatasetptr_bdb7942fc9f67c06": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getsophiadatasetptr_bdb7942fc9f67c06"](p0i32);
/******/ 					},
/******/ 					"__wbg_self_1b7a39e3a92c949c": function() {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_self_1b7a39e3a92c949c"]();
/******/ 					},
/******/ 					"__wbg_require_604837428532a733": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_require_604837428532a733"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_crypto_968f1772287e2df0": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_crypto_968f1772287e2df0"](p0i32);
/******/ 					},
/******/ 					"__wbg_getRandomValues_a3d34b4fee3c2869": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getRandomValues_a3d34b4fee3c2869"](p0i32);
/******/ 					},
/******/ 					"__wbg_getRandomValues_f5e14ab7ac8e995d": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_getRandomValues_f5e14ab7ac8e995d"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_randomFillSync_d5bd2d655fdf256a": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_randomFillSync_d5bd2d655fdf256a"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_get_5fd9dd78e47d6ed2": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_get_5fd9dd78e47d6ed2"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_length_0f0e68fde7e14c19": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_length_0f0e68fde7e14c19"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_is_function": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_is_function"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_is_object": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_is_object"](p0i32);
/******/ 					},
/******/ 					"__wbg_next_3d6c9b2822b18fae": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_next_3d6c9b2822b18fae"](p0i32);
/******/ 					},
/******/ 					"__wbg_next_d2c829783697bd8e": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_next_d2c829783697bd8e"](p0i32);
/******/ 					},
/******/ 					"__wbg_done_a16709ea72553788": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_done_a16709ea72553788"](p0i32);
/******/ 					},
/******/ 					"__wbg_value_3093fb48085878da": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_value_3093fb48085878da"](p0i32);
/******/ 					},
/******/ 					"__wbg_iterator_f89e8caf932523b1": function() {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_iterator_f89e8caf932523b1"]();
/******/ 					},
/******/ 					"__wbg_get_f2faf882de3801f1": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_get_f2faf882de3801f1"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_1f85aaa5836dfb23": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_call_1f85aaa5836dfb23"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_0d50725e1ae68303": function() {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_new_0d50725e1ae68303"]();
/******/ 					},
/******/ 					"__wbg_pop_b02b7e73b5ac41c0": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_pop_b02b7e73b5ac41c0"](p0i32);
/******/ 					},
/******/ 					"__wbg_push_46274b393147c746": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_push_46274b393147c746"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_reverse_20f3cefd76d7f0da": function(p0i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_reverse_20f3cefd76d7f0da"](p0i32);
/******/ 					},
/******/ 					"__wbg_call_0246f1c8ff252fb6": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_call_0246f1c8ff252fb6"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_call_740b86f47a550a76": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbg_call_740b86f47a550a76"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbindgen_string_get": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_string_get"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 		"../WasmTreeDataset/wasm-tree-backend/pkg/wasm_tree_backend_bg.wasm": function() {
/******/ 			return {
/******/ 				"./wasm_tree_backend_bg.js": {
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../WasmTreeDataset/wasm-tree-backend/pkg/wasm_tree_backend_bg.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"1":["../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.wasm","../WasmTreeDataset/wasm-tree-backend/pkg/wasm_tree_backend_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../Portable-Reasoning-in-Web-Assembly/sophia-wasm/pkg/sophia_wasm_bg.wasm":"c6bf99c8895f508cc720","../WasmTreeDataset/wasm-tree-backend/pkg/wasm_tree_backend_bg.wasm":"9eee1ff0eb2da00c9530"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bootstrap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bootstrap.js":
/*!**********************!*\
  !*** ./bootstrap.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// A dependency graph that contains any wasm must all be imported\n// asynchronously. This `bootstrap.js` file does the single async import, so\n// that no one else needs to worry about it again.\nPromise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.t.bind(null, /*! ./index.js */ \"./index.js\", 7))\n  .catch(e => console.error(\"Error importing `index.js`:\", e));\n\n\n//# sourceURL=webpack:///./bootstrap.js?");

/***/ })

/******/ });