// Game Constants & variables
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio( "food.mp3" );
let gameOverSound = new Audio( "gameover.mp3" );
let moveSound = new Audio( "move.mp3" );
let musicSound = new Audio( 'music.mp3' );
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 7, y: 9 };

// Game functions:
function main( ctime ) {
    window.requestAnimationFrame( main );
    //  console.log(ctime)
    if ( ( ctime - lastPaintTime ) / 1000 < 1 / speed ) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide( snake ) {
    //    if you pump into yourself:
    for ( let i = 1; i < snakeArr.length; i++ ) {
        if ( snake[ i ].x === snake[ 0 ].x && snake[ i ].y === snake[ 0 ].y ) {
            return true;
        }
    }
    // if you pump into the wall:
    for ( let i = 1; i < snakeArr.length; i++) {
    if ( snake[ 0 ].x >= 18 || snake[ 0 ].x <= 0 || snake[ 0 ].y >= 18 || snake[ 0 ].y <= 0) {
        return true;
    }
}

}

function gameEngine() {
    // Updating food and  sanke array value:
    if ( isCollide( snakeArr ) ) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 }
        moveSound.pause();
        alert( "Game Over, Press any key to Play again!!" )
        gameOverSound.pause();
        snakeArr = [ { x: 13, y: 15 } ];
        musicSound.stop();
        score = 0;
    }
    // if you have eaten ypur food increment the score and regenerate the food:
    if ( snakeArr[ 0 ].y === food.y && snakeArr[ 0 ].x === food.x ) {
        foodSound.play();
        score += 1;
        if (score>highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore" , JSON.stringify(highscoreval)); 
            highscoreBox.innerHTML = "highscore:" + highscoreval;
        }
        scoreBox.innerHTML = "Score :" +score;
        snakeArr.unshift( { x: snakeArr[ 0 ].x + inputDir.x, y: snakeArr[ 0 ].y + inputDir.y } );
        let a = 2;
        let b = 16;
        food = { x: 2 + Math.round( a + ( b - a ) * Math.random() ), y: 2 + Math.round( a + ( b - a ) * Math.random() ) }
    }
    // Moving the Snake:
    for ( let i = snakeArr.length - 2; i >= 0; i-- ) {
        // const element = array[i];
        snakeArr[ i + 1 ] = { ...snakeArr[ i ] };
    }
    snakeArr[ 0 ].x += inputDir.x;
    snakeArr[ 0 ].y += inputDir.y;

    // Display the Snake and Food
    // Display Snake:
    board.innerHTML = "";
    snakeArr.forEach( ( e, index ) => {
        snakeElement = document.createElement( 'div' );
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if ( index == 0 ) {
            snakeElement.classList.add( 'head' )
        }
        else {
            snakeElement.classList.add( 'snake' )
        }
        board.appendChild( snakeElement );

    } );
    // Display food:

    foodElement = document.createElement( 'div' );
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add( 'food' )
    board.appendChild( foodElement );

}

// Main Logic Starts here:
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore" , JSON.stringify(highscoreval));   
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "Highscore: " + highscore;
}
window.requestAnimationFrame( main );
window.addEventListener( 'keydown', e => {
    inputDir = { x: 0, y: 1 }  //Start The Game
    moveSound.play();
    switch ( e.key ) {
        case "ArrowUp":
            console.log( "ArrowUp" )
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log( "ArrowDown" )
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log( "ArrowLeft" )
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log( "ArrowRight" )
            inputDir.x = 1;
            inputDir.y = 0;
            break;



        default:
            break;
    }
} )