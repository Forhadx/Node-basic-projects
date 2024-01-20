/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst routes = __webpack_require__(/*! ./routes */ \"./routes/index.js\");\r\n\r\nconst app = express();\r\napp.use(express.json());\r\n\r\napp.use(\"/\", routes);\r\n\r\napp.listen(5000, ()=> {\r\n  console.log(\"server listening on port 5000\");\r\n\r\n  mongoose.connect(\r\n    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sonyg.mongodb.net/mongo_practice`,\r\n    () => {\r\n      console.log(\"db connection established\");\r\n    }\r\n  );\r\n});\r\n\n\n//# sourceURL=webpack://mongoose_kayle/./app.js?");

/***/ }),

/***/ "./controllers/index.js":
/*!******************************!*\
  !*** ./controllers/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const UserModel = __webpack_require__(/*! ../models/User */ \"./models/User.js\");\r\n\r\nexports.getUsers = async (req, res, next) => {\r\n  try {\r\n    const data = await UserModel.find();\r\n    return res.json({\r\n      msg: \"all users\",\r\n      data,\r\n    });\r\n  } catch (err) {\r\n    console.log(\"fetch error: \", err);\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://mongoose_kayle/./controllers/index.js?");

/***/ }),

/***/ "./models/User.js":
/*!************************!*\
  !*** ./models/User.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\n\r\nconst User = new mongoose.Schema({\r\n  name: String,\r\n  age: Number,\r\n});\r\n\r\nmodule.exports = mongoose.model(\"User\", User);\r\n\n\n//# sourceURL=webpack://mongoose_kayle/./models/User.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\n\r\nconst controller = __webpack_require__(/*! ../controllers */ \"./controllers/index.js\");\r\n\r\nconst router = express.Router();\r\n\r\nrouter.get('/users', controller.getUsers);\r\n\r\nmodule.exports = router; \n\n//# sourceURL=webpack://mongoose_kayle/./routes/index.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;