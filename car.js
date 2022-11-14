
class Car{
    constructor(x,y,width,height,controlType){
        this.originalXValue = x;
        this.originalYValue = y;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
  
        this.x1=this.x - this.width/2;
        this.y1=this.y - this.height/2;

        this.x2=this.x + this.width/2;
        this.y2=this.y - this.height/2;

        this.x3=this.x + this.width/2;
        this.y3=this.y + this.height/2;

        this.x4=this.x - this.width/2;
        this.y4=this.y + this.height/2;

        this.sprite=new Image();
        this.sprite.src='https://i.ibb.co/1RHSRGc/Png-Item-5112270.png';
        
        this.useBrain=controlType=="AI"

        this.speed=0;
        this.acceleration=0.5;
        this.maxSpeed=5;
        this.friction=0.2;
        this.angle=1;
        this.timer=1;
        
        
        

        this.sensor = new Sensor(this);
        this.brain = new NeuralNetwork([this.sensor.rayCount,6,4]);
        this.controls =new Controls(controlType);
    }
    
    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
        const offsets=this.sensor.readings.map(
            s=>s==null?0:1-s.offset
        );
        const outputs=NeuralNetwork.feedForward(offsets,this.brain);
        // console.log(outputs);
        
        if(this.useBrain){
            this.controls.forward=outputs[0];
            this.controls.left=outputs[1];
            this.controls.right=outputs[2];
            this.controls.reverse=outputs[3];
        }
    }

    #move(){
    if(this.controls.forward){
        this.speed+=this.acceleration;
    }
    if(this.controls.reverse){
        this.speed-=this.acceleration;
    }
    if(this.speed>this.maxSpeed){
        this.speed=this.maxSpeed;
    }
    if(this.speed<-this.maxSpeed/2){
        this.speed=-this.maxSpeed/2;
    }
    if(this.speed>0){
        this.speed-=this.friction;
    }
    if(this.speed<0){
        this.speed+=this.friction;
    }
    if(Math.abs(this.speed)<this.friction){
        this.speed=0;
    }
    if(this.speed!=0){
        const flip=this.speed>0?1:-1;
        if(this.controls.left){
        this.angle+=0.075*flip;
        }
        if(this.controls.right){
        this.angle-=0.075*flip;
        }
    }

    this.x-=Math.sin(this.angle)*this.speed;
    this.y-=Math.cos(this.angle)*this.speed;

    this.x1-=Math.sin(this.angle)*this.speed;
    this.y1-=Math.cos(this.angle)*this.speed;

    this.x2-=Math.sin(this.angle)*this.speed;
    this.y2-=Math.cos(this.angle)*this.speed;

    this.x3-=Math.sin(this.angle)*this.speed;
    this.y3-=Math.cos(this.angle)*this.speed;

    this.x4-=Math.sin(this.angle)*this.speed;
    this.y4-=Math.cos(this.angle)*this.speed;

    // this.x1 = this.x - (this.width/2) * Math.cos(this.angle) - (this.height/2) * Math.sin(this.angle); //top left
    // this.y1 = this.y - (this.width/2) * Math.sin(this.angle) + (this.height/2) * Math.cos(this.angle);
    
    // this.x2 = this.x + (this.width/2) * Math.cos(this.angle) - (this.height/2) * Math.sin(this.angle);  // top right
    // this.y2 = this.y + (this.width/2) * Math.sin(this.angle) + (this.height/2) * Math.cos(this.angle);
    
    // this.x3 = this.x + (this.width/2) * Math.cos(this.angle) + (this.height/2) * Math.sin(this.angle); // bottom right
    // this.y3 = this.y + (this.width/2) * Math.sin(this.angle) - (this.height/2) * Math.cos(this.angle);

    // this.x4 = this.x - (this.width/2) * Math.cos(this.angle) + (this.height/2) * Math.sin(this.angle); // bottom left
    // this.y4 = this.y - (this.width/2) * Math.sin(this.angle) - (this.height/2) * Math.cos(this.angle);
    // console.log(this.x1);
    // console.log([this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4]);
    // console.log(this.angle);


    }

    drawTrack(){
        
        let line1X1 = 900;
        let line1Y1 = 400;
        let line1X2 = 900;
        let line1Y2 = 100;

        let innerTrackLines = [
            [900,400],
            [900,100],
            [1500,100],
            [1500,700],
            [1100,700],
            [1000,600],
            [910,700],
            [820,600],
            [730,700],
            [640,600],
            [450,600],
            [450,800],
            [200,800],
            [200,400],
            [400,400],
            [400,200],
            [650,200],
            [650,400],
            [900,400],
        ];
        let outerTrackLines = [
            [820,300],
            [820,25],
            [1600,25],
            [1600,800],
            [1100,800],
            [1000,700],
            [910,800],
            [820,700],
            [730,800],
            [640,700],
            [550,700],
            [550,900],
            [100,900],
            [100,300],
            [300,300],
            [300,100],
            [800,100],
            [800,300],
            [820,300],
        ];

        ctx.beginPath();
        ctx.moveTo(line1X1,line1Y1);
        drawLine(innerTrackLines);
     
        //outer line
        ctx.moveTo(820,300);
        drawLine(outerTrackLines);
        ctx.strokeStyle="black";
        ctx.stroke();
    }

    draw(ctx,drawSensor=false){
    
        let innerTrackLines = [
            [900,400],
            [900,100],
            [1500,100],
            [1500,700],
            [1100,700],
            [1000,600],
            [910,700],
            [820,600],
            [730,700],
            [640,600],
            [450,600],
            [450,800],
            [200,800],
            [200,400],
            [400,400],
            [400,200],
            [650,200],
            [650,400],
            [900,400],
        ];

        let outerTrackLines = [
            [820,300],
            [820,25],
            [1600,25],
            [1600,800],
            [1100,800],
            [1000,700],
            [910,800],
            [820,700],
            [730,800],
            [640,700],
            [550,700],
            [550,900],
            [100,900],
            [100,300],
            [300,300],
            [300,100],
            [800,100],
            [800,300],
            [820,300],
        ];

        let line1X1 = 900;
        let line1Y1 = 400;
        let line1X2 = 900;
        let line1Y2 = 100;

        
        
      

    
        // ctx.beginPath();
        // ctx.moveTo(this.x1,this.y1);
        // ctx.lineTo(this.x2,this.y2);
        // ctx.lineTo(this.x3,this.y3);
        // ctx.lineTo(this.x4,this.y4);
        // ctx.lineTo(this.x1,this.y1);
        // ctx.stroke();
        // ctx.closePath();
        
       

        ctx.save();
        ctx.translate(this.x,this.y)
        ctx.rotate(-this.angle);

        //draw car
        ctx.drawImage(this.sprite,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height);
        ctx.fillStyle = "blue";

        // console.log([this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4]);

        // checkAllCollision(innerTrackLines, this.x1, this.y1, this.width, this.height);
        // console.log(checkAllCollision(outerTrackLines, this.x1, this.y1, this.width, this.height));
        
        if(//inner track lines
        lineRect(innerTrackLines[0][0], innerTrackLines[0][1], innerTrackLines[1][0], innerTrackLines[1][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[1][0], innerTrackLines[1][1], innerTrackLines[2][0], innerTrackLines[2][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[2][0], innerTrackLines[2][1], innerTrackLines[3][0], innerTrackLines[3][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[3][0], innerTrackLines[3][1], innerTrackLines[4][0], innerTrackLines[4][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[4][0], innerTrackLines[4][1], innerTrackLines[5][0], innerTrackLines[5][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[5][0], innerTrackLines[5][1], innerTrackLines[6][0], innerTrackLines[6][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[6][0], innerTrackLines[6][1], innerTrackLines[7][0], innerTrackLines[7][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[7][0], innerTrackLines[7][1], innerTrackLines[8][0], innerTrackLines[8][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[8][0], innerTrackLines[8][1], innerTrackLines[9][0], innerTrackLines[9][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[9][0], innerTrackLines[9][1], innerTrackLines[10][0], innerTrackLines[10][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[10][0], innerTrackLines[10][1], innerTrackLines[11][0], innerTrackLines[11][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[11][0], innerTrackLines[11][1], innerTrackLines[12][0], innerTrackLines[12][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[12][0], innerTrackLines[12][1], innerTrackLines[13][0], innerTrackLines[13][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[13][0], innerTrackLines[13][1], innerTrackLines[14][0], innerTrackLines[14][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[14][0], innerTrackLines[14][1], innerTrackLines[15][0], innerTrackLines[15][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[15][0], innerTrackLines[15][1], innerTrackLines[16][0], innerTrackLines[16][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[16][0], innerTrackLines[16][1], innerTrackLines[17][0], innerTrackLines[17][1], this.x1, this.y1, this.width, this.height)||
        lineRect(innerTrackLines[17][0], innerTrackLines[17][1], innerTrackLines[18][0], innerTrackLines[18][1], this.x1, this.y1, this.width, this.height)||
        //outer track lines
        lineRect(outerTrackLines[0][0], outerTrackLines[0][1], outerTrackLines[1][0], outerTrackLines[1][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[1][0], outerTrackLines[1][1], outerTrackLines[2][0], outerTrackLines[2][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[2][0], outerTrackLines[2][1], outerTrackLines[3][0], outerTrackLines[3][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[3][0], outerTrackLines[3][1], outerTrackLines[4][0], outerTrackLines[4][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[4][0], outerTrackLines[4][1], outerTrackLines[5][0], outerTrackLines[5][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[5][0], outerTrackLines[5][1], outerTrackLines[6][0], outerTrackLines[6][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[6][0], outerTrackLines[6][1], outerTrackLines[7][0], outerTrackLines[7][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[7][0], outerTrackLines[7][1], outerTrackLines[8][0], outerTrackLines[8][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[8][0], outerTrackLines[8][1], outerTrackLines[9][0], outerTrackLines[9][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[9][0], outerTrackLines[9][1], outerTrackLines[10][0], outerTrackLines[10][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[10][0], outerTrackLines[10][1], outerTrackLines[11][0], outerTrackLines[11][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[11][0], outerTrackLines[11][1], outerTrackLines[12][0], outerTrackLines[12][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[12][0], outerTrackLines[12][1], outerTrackLines[13][0], outerTrackLines[13][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[13][0], outerTrackLines[13][1], outerTrackLines[14][0], outerTrackLines[14][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[14][0], outerTrackLines[14][1], outerTrackLines[15][0], outerTrackLines[15][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[15][0], outerTrackLines[15][1], outerTrackLines[16][0], outerTrackLines[16][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[16][0], outerTrackLines[16][1], outerTrackLines[17][0], outerTrackLines[17][1], this.x1, this.y1, this.width, this.height)||
        lineRect(outerTrackLines[17][0], outerTrackLines[17][1], outerTrackLines[18][0], outerTrackLines[18][1], this.x1, this.y1, this.width, this.height)
        ){
            // this.x=5000;
            // this.y=this.originalYValue;
      
            // this.x1=this.x - this.width/2;
            // this.y1=this.y - this.height/2;
    
    
            // this.x2=this.x + this.width/2;
            // this.y2=this.y - this.height/2;
    
            // this.x3=this.x + this.width/2;
            // this.y3=this.y + this.height/2;
    
            // this.x4=this.x - this.width/2;
            // this.y4=this.y + this.height/2;
            this.timer=0;
            this.speed=0;
            this.acceleration=0;
            this.angle = 1;
            // ctx.fillStyle = "red";
            
        }
        
        ctx.fill();
        ctx.restore();
        
        if(drawSensor){
        this.sensor.draw(ctx);
        // console.log(this.timer);
        }
    }
        

}







let checkAllCollision = function(arr, x1, y1, width, height){
            
    for(let i = 0; i < arr.length; i++){
        for(let j = 1; j < arr.length; j++){
            lineRect(arr[i][0],arr[i][1],arr[j][0],arr[j][1], x1, y1, width, height);
            if(lineRect(arr[i][0],arr[i][1],arr[j][0],arr[j][1], x1, y1, width, height)){
                // ctx.fillStyle ="red"; 
                return true;
            }
            
            return false;
            
        }
        
    }
}




let lineLine = function(x1,y1,x2,y2,x3,y3,x4,y4){
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}
let lineLine2 = function(x1,y1,x2,y2,x3,y3,x4,y4){
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        let intersectionX = x1 + (uA * (x2-x1));
        let intersectionY = y1 + (uA * (y2-y1));
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(intersectionX,intersectionY);
        ctx.stroke();
        ctx.closePath();
        return true;
    }
    return false;
}
let lineRect = function(x1, y1, x2, y2, rx, ry, rw, rh) {

    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    let left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    let right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    let top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  
    // if ANY of the above are true, the line
    // has hit the rectangle
    if (left || right || top || bottom) {
      return true;
    }
    return false;
  }
  
let drawLine = function(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            ctx.lineTo(arr[i][0],arr[i][1]);
            // console.log(arr[i+1][0],arr[i+1][1]);
        }
    }
}

