
// class Doodler{
//     constructor(x, y, width, height, vx){
//         // this.ctx = ctx;
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.vx = vx;
//         // this.img = null;
//         // load image
//     this.doodlerRightImg = new Image();
//     // this.doodlerRightImg.src = './src/img/doodler-right.png';
//     this.doodlerRightImg.src = './src/img/doodler-right.png';
//     this.doodlerRightImg.onload = () => {
//         this.draw(ctx); // Draw the image after it's loaded
//     };

//     this.doodlerLeftImage = new Image();
//     this.doodlerLeftImage.src = "./src/img/doodler-left.png";
//     }

//     draw(ctx){
//         // draw doodler
//     ctx.fillStyle = 'green';
//     // ctx.fillRect(this.x,this.y,this.width,this.height );

//     ctx.drawImage(this.doodlerRightImg, this.x,this.y,this.width,this.height )
//     }

//     update(ctx){
//         ctx.drawImage(this.doodlerRightImg, this.x,this.y,this.width,this.height )
//     }

//     moveDoodler(e){
//         if(e.code == "ArrowRight" || e.code == "keyD"){
//             this.vx = 4;
//         }else if(e.code == "ArrowLeft" || e.code == "keyA"){
//             this.vx = -4;
//         }
//     }


// }


class Doodler {
    constructor(x, y, width, height, vx, vy) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;

        this.doodlerRightImg = new Image();
        this.doodlerRightImg.src = './src/img/doodler-right.png';

        this.doodlerLeftImage = new Image();
        this.doodlerLeftImage.src = "./src/img/doodler-left.png";

        this.currentImage = this.doodlerRightImg; // Set initial image
        this.currentDirection = 'right'; // Set initial direction
        this.currentImage.onload = () => {
            this.draw(ctx); // Draw the image after it's loaded
        };
    }

    draw(ctx) {
        // Draw doodler
        ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
    }

    update(ctx) {
        this.x += this.vx;

        if(this.x > canvasWidth){
            this.x = 0
        }else if(this.x + this.width <0){
            this.x = canvasWidth;
        }
        this.draw(ctx);

        this.y += this.vy;
        this.vy += gravity; // Apply gravity
        
    

        // Ensure the doodler doesn't fall through the bottom of the canvas
    if (this.y + this.height > canvasHeight) {
        this.y = canvasHeight - this.height;
        this.vy = 0; // Stop vertical movement when on the ground
    }
    }

    
    moveDoodler(e) {
        if (e.code === "ArrowRight" || e.code === "KeyD") {
            this.vx = 4;
            this.currentImage = this.doodlerRightImg;
            this.currentDirection = 'right';
        } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
            this.vx = -4;
            this.currentImage = this.doodlerLeftImage;
            this.currentDirection = 'left';
        }
    }
}
