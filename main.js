const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext('2d');

let generation=1;

var N=1000;




// var N = document.getElementById("output").value;
while(true){
    console.log(this.value);
    break;
}
const cars  = generateCars(N);
const car = new Car(1000,1000,15,25,"AI")
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}
function discard(){
    localStorage.removeItem("bestBrain");
}

function animate(){
    for(let i = 0;i < cars.length;i++){
        cars[i].update(borders);
    }
    bestCar=cars.find(
        c=>c.x==Math.min(
            ...cars.map(c=>c.x)
        ));
    ctx.globalAlpha=0.2;
    canvas.height = window.innerHeight;
    canvas.width = 1800;
    for(let i = 0;i < cars.length;i++){
    cars[i].draw(ctx);
    }
    bestCar.draw(ctx,true);
    car.drawTrack();
    requestAnimationFrame(animate);
    

}
function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(1300,750,15,25,"AI"));
    }
    return cars;
}
function nextGeneration(){
    location.reload();
}
