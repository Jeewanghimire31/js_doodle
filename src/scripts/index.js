const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let canvasWidth = 400;
let canvasHeight = 576;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

//* doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = canvasWidth/2-doodlerWidth/2;
let doodlerY = canvasHeight*7/8-doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

// *direction
let vx = 0;
let vy = 0; //doodler jump speed
let initialVelocityY = -8; //starting velocity Y
let gravity = 0.4;

// *platform
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImage;

//* score
let score = 0;
let maxScore = 0;

// * gameOver
let gameOver = false;


const doodler = new Doodler(doodlerX, doodlerY, doodlerWidth, doodlerHeight, vx, initialVelocityY);

platformImage = new Image();
platformImage.src = "./src/img/platform.png";
const animate = ()=>{
    if(gameOver){
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    doodler.draw(ctx)
    doodler.update(ctx);
     
    // Check for game over
    if (doodler.y > canvasHeight) {
        gameOver = true;
        console.log("Game Over: doodler.y", doodler.y, "canvasHeight", canvasHeight);
    }

    for(let i = 0; i<platformArray.length; i++){
        let platform = platformArray[i];
        if(doodler.vy < 0 && doodler.y < canvasHeight*3/4){
            platform.y -= initialVelocityY;  //slide platform down 
        }
        if(detectCollision(doodler, platform) && doodler.vy >=0){
            doodler.vy = initialVelocityY;
        }
        ctx.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
        

        // clear platform and create new platform
        while(platformArray.length >0 && platformArray[0].y > canvasHeight){
            platformArray.shift(); //removes first element from the array
            newPlatform();
        }
    }

    updateScore();
    ctx.fillStyle = 'black';
    ctx.font = '30px';
    ctx.fillText(score, 5, 20);

    if(gameOver){
        ctx.fillText("GameOver: Please press Space to restart")
    }

    document.addEventListener('keydown', (e) => doodler.moveDoodler(e));


    if (!gameOver) {
        requestAnimationFrame(animate);
    }
}

const placePlatform = ()=>{
    platformArray = [];

    //  starting platform
    let platform = {
        img: platformImage,
        x:canvasWidth/2,
        y:canvasHeight-50,
        width:platformWidth,
        height:platformHeight,
    }
    
    platformArray.push(platform);

    for (let i = 0; i < 6; i++){
        let randomX = Math.floor(Math.random()*canvasWidth*3/4);
        //  starting platform
     platform = {
        img: platformImage,
        x:randomX,
        y:canvasHeight-75*i-150,
        width:platformWidth,
        height:platformHeight,
    }
    
    platformArray.push(platform);
    }
}

const newPlatform = ()=>{
    let randomX = Math.floor(Math.random()*canvasWidth*3/4);
        //  starting platform
     platform = {
        img: platformImage,
        x:randomX,
        y:-platformHeight,
        width:platformWidth,
        height:platformHeight,
    }
    
    platformArray.push(platform);
}


const detectCollision = (a, b) => {
    return (
        a.x + a.width >= b.x &&
        a.x <= b.x + b.width &&
        a.y + a.height >= b.y &&
        a.y <= b.y + b.height
    );
};

const updateScore = ()=>{
    let points = Math.floor(50*Math.random());
    if(doodler.vy < 0){
        maxScore += points;
        if(score < maxScore){
            score = maxScore;
        }
    } else if(doodler.vy > 0){
        maxScore -= points;
    }
}

placePlatform();
animate();

