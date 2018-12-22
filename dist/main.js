/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// console save method to generate the JSON File\n(function(console){\n\n    console.save = function(data, filename){\n\n        if(!data) {\n            console.error('Console.save: No data');\n            return;\n        }\n\n        if(!filename) filename = 'console.json';\n\n        if(typeof data === \"object\"){\n            data = JSON.stringify(data, undefined, 4);\n        }\n\n        var blob = new Blob([data], {type: 'text/json'}),\n            e    = document.createEvent('MouseEvents'),\n            a    = document.createElement('a');\n\n        a.download = filename;\n        a.href = window.URL.createObjectURL(blob);\n        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');\n        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);\n        a.dispatchEvent(e);\n    };\n\n})(console);\n\n\n// Module pattern for the SEO stats util.\nconst SeoStatsModule = (()=> {\n    \n    let _seoReport = {}; // Object to hold final JSON which will be saved in the file\n    let _elemsToFix = 0; // element count which are not found implementing attributes\n\n    // Styles for the console message.\n    let _consoleMsgStyle = {\n        message: 'font-size: 14px; font-weight:bold; color: #05c705; text-shadow: 1px 1px 0 rgba(0,0,0,0.1);',\n        warning: 'font-size: 16px; font-weight:bold; color: #e47d00; text-shadow: 1px 1px 0 rgba(0,0,0,0.1);',\n        error: [\n            'font-size: 20px;  color: #c70505; text-shadow: 1px 1px 0 rgba(0,0,0,0.1);', \n            'font-weight:bold'\n        ]\n    };\n    \n    // This method use querySelectorAll method and returns the count of the element as per configuration\n    const retrieveElementsCount = (tagName, attr, tagReport) => {\n        let noOfElems = 0;\n        let totalNoOfElems = 0;\n        let attrStatus = 'without';\n\n        let domQueryString = `${tagName}:not([${attr}]), ${tagName}[${attr}=\"\"]`;\n\n        if (attr.indexOf('=') > -1) {\n            domQueryString = `${tagName}[${attr}]`;\n            attrStatus = 'with';\n        }\n\n        totalNoOfElems = document.querySelectorAll(tagName).length;\n        tagReport.totalElements = totalNoOfElems;\n    \n        if(attr.trim().length) {\n            noOfElems = document.querySelectorAll(domQueryString).length;\n            _elemsToFix += noOfElems;\n            tagReport[attrStatus + attr.charAt().toUpperCase() + attr.substr(1)] = noOfElems;\n        }\n        \n        _seoReport[tagName] = tagReport;\n    };\n\n\n    // This functions checks for the attr type if it is an array it executes retrieveElementsCount the according to that\n    const retrieveElementsByAttrType = (tagName, attrs='') => {\n        var tagReport = {};\n        if(attrs instanceof Array && attrs.length >= 1) {\n            attrs.forEach(attr => {\n                retrieveElementsCount(tagName, attr, tagReport);\n            });\n        } else if (typeof(attrs) === 'string') {\n            retrieveElementsCount(tagName, attrs, tagReport);\n        } else {\n            console.error('Configuration Object is wrong. Please pass proper configuration object')\n        }\n\n    };\n\n    // This function takes an arguement of type: object, which are basically tags and their values and outputs a json file with SEO stats \n    const generateSeoStats = (tagsForSEO, jsonFileName=\"seoStats.json\") => {\n        for (const [tagName, attrs] of Object.entries(tagsForSEO)) {\n            retrieveElementsByAttrType(tagName, attrs);\n        }\n\n        console.table(_seoReport);\n\n        if (_elemsToFix && _elemsToFix <= 2) {\n            console.log(`%cYou can ignore it for now. But don't forget to fix this.`, _consoleMsgStyle.message);\n        }\n\n        if (_elemsToFix > 2 && _elemsToFix <= 5) {\n            console.log(`%cThis looks bad. You should fix it now.`, _consoleMsgStyle.warning);\n        }\n           \n        if (_elemsToFix >= 6) {\n            console.log(`%cStop\\nfix this first or %c\\nI will hunt you down.`, _consoleMsgStyle.error[0], _consoleMsgStyle.error[0] + _consoleMsgStyle.error[1]);\n        }\n\n        // console.save(_seoReport, jsonFileName);\n    };\n\n    return {\n        generateSeoStats\n    };\n\n})();\n\n/* Configuration object\n*\n* 'key' is element tag,\n* 'value' could be empty string, an atrribute or an array of attributes. \n* Util will check for those elements on which this attribute is empty or not applied.\n* If an attribute with its data is passed in object value, for example { 'meta': 'name=keywords' }, \n* then util will give count of no. of elements available in page with this attribute and data\n*\n*/\nconst tagsForSEO = {\n    'h1':[],\n    'img':['alt', 'title'], \n    'a':'href',\n    'meta':['name', 'name=keywords', 'name=author', 'name=description', 'name=robots'],\n};\n\n/*\n* This function generates SEO stats and creates a JSON file, first parameter will be configuration object i.e. which elements needs to be checked\n* Second parameter is option, It is fileName with .json extension\n*/\nSeoStatsModule.generateSeoStats(tagsForSEO);\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });