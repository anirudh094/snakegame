let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.wav');
const gameOverSound = new Audio('gameover.wav');
const moveSound = new Audio('move.wav');
const musicSound = new Audio('music.mp3');
let speed = 7;
let lastPainttime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = {x:6 , y:7};
let score = 0;


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPainttime) / 1000 < 1 / speed) {
        return;
    }
    lastPainttime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into your self
    
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    
    // If you bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
    
    return false;
}

function gameEngine(){
    // Updating Snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over");
        snakeArr = [{x:13 , y:15}];
        musicSound.play();
        score = 0;
    }

    //If snake eats food then increment snake and regenerate food

    if(snakeArr[0].y===food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=10;
        scoreBox.innerHTML="Score : "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random())};
    }

    // To move snake
    for (let i = snakeArr.length -2; i>=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('snakehead');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic For Game
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0 , y:1} // Game Starts
    moveSound.play();
    snakehead = document.querySelector('.snakehead');
    switch (e.key) {
        case "ArrowUp":
            //console.log("ArrowUp");
            //document.snakehead.style.backgroundImage = "url('snakeheadup.png')";
            inputDir.x = 0;
            inputDir.y = -1 ;
            break;

        case "ArrowDown":
            //console.log("ArrowDown");
            //document.snakehead.style.backgroundImage = "url('snakehead.png')";
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            //console.log("ArrowLeft");
            //document.snakehead.style.backgroundImage = "url('snakeheadleft.png')";
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            //console.log("ArrowRight");
            //document.snakehead.style.backgroundImage = "url('snakeheadright.png')";
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})