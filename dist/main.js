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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const canvas = document.getElementById('grid');\nconst ctx = canvas.getContext('2d');\nctx.scale(20, 20);\n\n// Tetriminos\n// 0 is a falsey value\nfunction generateTetrimino(type) {\n    if (type === 't') {\n        return [\n            [0, 0, 0],\n            [1, 1, 1],\n            [0, 1, 0]\n        ]\n    } else if (type === 'o') {\n        return [\n            [3, 3],\n            [3, 3]\n        ]\n    } else if (type === 'l') {\n        return [\n            [0, 2, 0],\n            [0, 2, 0],\n            [0, 2, 2]\n        ]\n    } else if (type === 'j') {\n        return [\n            [0, 4, 0],\n            [0, 4, 0],\n            [4, 4, 0]\n        ]\n    } else if (type === 'i') {\n        return [\n            [0, 5, 0, 0],\n            [0, 5, 0, 0],\n            [0, 5, 0, 0],\n            [0, 5, 0, 0],\n        ]\n    } else if (type === 'z') {\n        return [\n            [6, 6, 0],\n            [0, 6, 6],\n            [0, 0, 0]\n        ]\n    } else if (type === 's') {\n        return [\n            [0, 7, 7],\n            [7, 7, 0],\n            [0, 0, 0]\n        ]\n    }\n}\n\n// Array of all tetriminos\nconst colors = [\n    null, \n    'purple',\n    'orange',\n    'yellow',\n    'blue',\n    'cyan',\n    'red',\n    'green'\n]\n\n// Randomly selects a tetrimino to play and checks for gameover\nfunction tetriminoReset() {\n    const tetriminos = ['s', 'l', 'i', 'o', 'j', 'z', 't'];\n    player.matrix = generateTetrimino(tetriminos[tetriminos.length * Math.random() | 0])\n    player.pos.y = 0;\n    player.pos.x = (gameGrid[0].length / 2) - 1;\n\n    if (collision(gameGrid, player)) {\n        gameGrid.forEach(row => row.fill(0));\n        player.gameOver = true;\n        player.time = 0;\n        player.score = 0\n        updateTime()\n        updateScore()\n    }\n}\n\n// Render game grid\nfunction createGrid(width, height) {\n    const matrix = [];\n\n    // debugger\n    while (height--) {\n        matrix.push(new Array(width).fill(0));\n    }\n\n    // console.log(matrix)\n    return matrix;\n}\n\n// Coloring in tetrimino positions on grid\nfunction placeTTetrimino(matrix, offset) {\n    matrix.forEach((row, y) => {\n        row.forEach((col, x) => {\n            if (col !== 0) {\n                ctx.fillStyle = colors[col];\n                // ctx.strokeStyle(x + offset.x, y + offset.y, 1, 1);\n                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);\n            }\n        })\n    })\n}\n\n// Player object\nconst player = {\n    pos: {x: 5, y: 5},\n    matrix: null,\n    score: 0,\n    music: false,\n    gameOver: false,\n    time: 0\n}\n\n// Default grid\nconst gameGrid = createGrid(12, 20)\n\n// Maps tetriminos to game grid\nfunction merge(gameGrid, player) {\n    player.matrix.forEach((row, y) => {\n        row.forEach((col, x) => {\n            if (col !== 0) {\n                gameGrid[y + player.pos.y][x + player.pos.x] = col;\n            }\n        })\n    })\n}\n\n// Render canvas\nfunction draw() {\n    ctx.fillStyle = '#000';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    // ctx.strokeRect(0, 0, player.pos.y, player.pos.x)\n\n    placeTTetrimino(gameGrid, {x: 0, y: 0})\n    placeTTetrimino(player.matrix, player.pos)\n}\n\nlet dropCounter = 0;\nlet dropInterval = 500;\nlet currentTime = 0;\n\n// Animate\nfunction update(time = 0) {\n    const timeChange = time - currentTime;\n    currentTime = time;\n    dropCounter += timeChange;\n\n    // console.log(time)\n    // console.log(currentTime);\n    // console.log(timeChange);\n    // console.log(dropCounter)\n\n    if (player.gameOver) {\n        // gameOver()\n    }\n\n    if (dropCounter > dropInterval) {\n        tetriminoDrop()\n        dropCounter = 0;\n    }\n\n    updateTime();\n    timer()\n    draw();\n    requestAnimationFrame(update);\n}\n\n// Collision check for bottom of grid\nfunction collision(gameGrid, player) {\n    const [m, o] = [player.matrix, player.pos];\n\n    for (let y = 0; y < m.length; y++) {\n        for (let x = 0; x < m[y].length; x++) {\n            // debugger\n            if (m[y][x] !== 0 && (gameGrid[y + o.y] && gameGrid[y + o.y][x + o.x]) !== 0) {\n                // debugger\n                return true;\n            }\n        }\n    }\n    return false;\n}\n\n// Default tetrimino action\nfunction tetriminoDrop() {\n    player.pos.y++;\n\n    if (collision(gameGrid, player)) {\n        player.pos.y--;\n        // debugger\n        merge(gameGrid, player);\n        tetriminoReset();\n        lineClear();\n        updateScore()\n    }\n    dropCounter = 0;\n}\n\nfunction tetriminoMove(dir) {\n    player.pos.x += dir;\n    if (collision(gameGrid, player)) {\n        player.pos.x -= dir;\n    }\n}\n\nfunction rotate(matrix, dir) {\n    for (let y = 0; y < matrix.length; y++) {\n        for (let x = 0; x < y; x++) {\n            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]]\n        }\n    }\n\n    if (dir > 0) {\n        matrix.forEach(row => row.reverse());\n    } else {\n        matrix.reverse()\n    }\n}\n\nfunction tetriminoRotate(dir) {\n    rotate(player.matrix, dir);\n    const pos = player.pos.x;\n    let offset = 1;\n\n    while (collision(gameGrid, player)) {\n        player.pos.x += offset;\n        offset = -(offset + (offset > 0 ? 1 : -1))\n\n        if (offset > player.matrix[0].length) {\n            rotate(player.matrix, -dir);\n            player.pos.x = pos;\n            return;\n        }\n    }\n}\n\nfunction lineClear() {\n    let rowCount = 1;\n\n    outer: for (let y = gameGrid.length - 1; y > 0; y--) {\n        for (let x = 0; x < gameGrid[y].length; x++) {\n            if (gameGrid[y][x] === 0) {\n                continue outer;\n            }\n        }\n        const row = gameGrid.splice(y, 1)[0].fill(0);\n        gameGrid.unshift(row);\n        y++;\n        player.score += rowCount * 10;\n        rowCount *= 2;\n    }\n}\n\nfunction updateScore() {\n    document.getElementById('score').innerText = player.score\n}\n\ndocument.addEventListener(\"keydown\", e => {\n    if (e.keyCode === 37) {\n        tetriminoMove(-1)\n    } else if (e.keyCode === 39) {\n        tetriminoMove(1);\n    } else if (e.keyCode === 40) {\n        tetriminoDrop();\n    } else if (e.keyCode === 90) {\n        tetriminoRotate(-1);\n    } else if (e.keyCode === 88) {\n        tetriminoRotate(1);\n    } else if (e.keyCode === 80) {\n        playMusic()\n    } else if (e.keyCode === 32) {\n        gameStart();\n    }\n})\n\nfunction playMusic() {\n    const music = document.getElementById('song');\n\n    if (!player.music) {\n        music.play();\n        player.music = true;\n    } else {\n        music.pause();\n        player.music = false;\n    }\n    \n}\n\nfunction updateTime() {\n    this.current = new Date();\n    player.time = Math.round((this.current - this.currentTime) / 1000)\n}\n\nfunction timer() {\n    document.getElementById('timer').innerText = `${player.time} seconds and counting..`;\n}\n\nfunction gameStart() {\n    this.currentTime = new Date();\n\n    playMusic()\n    tetriminoReset()\n    updateScore()\n    update()\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });