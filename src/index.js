const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
ctx.scale(20, 20);

// Tetriminos
// 0 is a falsey value
function generateTetrimino(type) {
    if (type === 't') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    } else if (type === 'o') {
        return [
            [3, 3],
            [3, 3]
        ]
    } else if (type === 'l') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2]
        ]
    } else if (type === 'j') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ]
    } else if (type === 'i') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ]
    } else if (type === 'z') {
        return [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0]
        ]
    } else if (type === 's') {
        return [
            [0, 7, 7],
            [7, 7, 0],
            [0, 0, 0]
        ]
    }
}

// Array of all tetriminos
const colors = [
    null, 
    'purple',
    'orange',
    'yellow',
    'blue',
    'cyan',
    'red',
    'green'
]

// Randomly selects a tetrimino to play and checks for gameover
function tetriminoReset() {
    const tetriminos = ['s', 'l', 'i', 'o', 'j', 'z', 't'];
    player.matrix = generateTetrimino(tetriminos[tetriminos.length * Math.random() | 0])
    player.pos.y = 0;
    player.pos.x = (gameGrid[0].length / 2) - 1;

    if (collision(gameGrid, player)) {
        gameGrid.forEach(row => row.fill(0));
        player.gameOver = true;
        player.score = 0
        updateScore()
    }
}

// Render game grid
function createGrid(width, height) {
    const matrix = [];

    // debugger
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }

    // console.log(matrix)
    return matrix;
}

// Coloring in tetrimino positions on grid
function placeTTetrimino(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col !== 0) {
                ctx.fillStyle = colors[col];
                // ctx.strokeStyle(x + offset.x, y + offset.y, 1, 1);
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        })
    })
}

// Player object
const player = {
    pos: {x: 5, y: 5},
    matrix: null,
    score: 0,
    music: false,
    gameOver: false,
    time: 0
}

// Default grid
const gameGrid = createGrid(12, 20)

// Maps tetriminos to game grid
function merge(gameGrid, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col !== 0) {
                gameGrid[y + player.pos.y][x + player.pos.x] = col;
            }
        })
    })
}

// Render canvas
function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.strokeRect(0, 0, player.pos.y, player.pos.x)

    placeTTetrimino(gameGrid, {x: 0, y: 0})
    placeTTetrimino(player.matrix, player.pos)
}

let dropCounter = 0;
let dropInterval = 1000;
let currentTime = 0;

// Animate
function update(time = 0) {
    const timeChange = time - currentTime;
    currentTime = time;
    dropCounter += timeChange;

    if (player.gameOver) {
        // gameOver()
    }

    if (dropCounter > dropInterval) {
        tetriminoDrop()
        dropCounter = 0;
    }

    updateTime();
    timer()
    draw();
    requestAnimationFrame(update);
}

// Collision check for bottom of grid
function collision(gameGrid, player) {
    const [m, o] = [player.matrix, player.pos];

    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            // debugger
            if (m[y][x] !== 0 && (gameGrid[y + o.y] && gameGrid[y + o.y][x + o.x]) !== 0) {
                // debugger
                return true;
            }
        }
    }
    return false;
}

// Default tetrimino action
function tetriminoDrop() {
    player.pos.y++;

    if (collision(gameGrid, player)) {
        player.pos.y--;
        // debugger
        merge(gameGrid, player);
        tetriminoReset();
        lineClear();
        updateScore()
    }
    dropCounter = 0;
}

function tetriminoMove(dir) {
    player.pos.x += dir;
    if (collision(gameGrid, player)) {
        player.pos.x -= dir;
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]]
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse()
    }
}

function tetriminoRotate(dir) {
    rotate(player.matrix, dir);
    const pos = player.pos.x;
    let offset = 1;

    while (collision(gameGrid, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1))

        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function lineClear() {
    let rowCount = 1;

    outer: for (let y = gameGrid.length - 1; y > 0; y--) {
        for (let x = 0; x < gameGrid[y].length; x++) {
            if (gameGrid[y][x] === 0) {
                continue outer;
            }
        }
        const row = gameGrid.splice(y, 1)[0].fill(0);
        gameGrid.unshift(row);
        y++;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function updateScore() {
    document.getElementById('score').innerText = player.score
}

document.addEventListener("keydown", e => {
    if (e.keyCode === 37) {
        tetriminoMove(-1)
    } else if (e.keyCode === 39) {
        tetriminoMove(1);
    } else if (e.keyCode === 40) {
        tetriminoDrop();
    } else if (e.keyCode === 90) {
        tetriminoRotate(-1);
    } else if (e.keyCode === 88) {
        tetriminoRotate(1);
    } else if (e.keyCode === 80) {
        playMusic()
    } else if (e.keyCode === 32) {
        gameStart();
    }
})

function playMusic() {
    const music = document.getElementById('song');

    if (!player.music) {
        music.play();
        player.music = true;
    } else {
        music.pause();
        player.music = false;
    }
    
}

function updateTime() {
    this.current = new Date();
    player.time = Math.round((this.current - this.currentTime) / 1000)
}

function timer() {
    document.getElementById('timer').innerText = `${player.time} and counting..`;
}

function gameStart() {
    this.currentTime = new Date();

    playMusic()
    tetriminoReset()
    updateScore()
    update()
}
