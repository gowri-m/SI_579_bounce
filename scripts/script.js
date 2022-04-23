// import { Engine, World, Body, Bodies, Constraint,Render, Runner,Events } from 'matter-js';

 let World = Matter.World;
 let Engine = Matter.Engine;
 let Render = Matter.Render;
 let Bodies = Matter.Bodies;
 let Body = Matter.Body;
 let Events = Matter.Events;
 
 let engine;
 let render;
 let element;
 let width;
 let height;
      
 function setUpWorld() {
     element = document.getElementById('main');
     width = window.innerWidth;
     height = window.innerHeight;
 
     engine = Engine.create();
 
     render = Render.create({
         element:element,
         engine: engine,
         options: {
             width: width,
             height: height,
             wireframes:false,
             
         }
     });
 }

let ball;
function createBall()
{
    ball = Bodies.circle(200, 200 , 50, { friction: 0, restitution: .2 });
    World.add(engine.world, ball);
}

let obsctacles_list = [];
 function addObstacles() {
 
     let w = 60;
     let x = width + 5 / 2;
     min_h = 80
     max_h = 250

     let h = Math.floor(Math.random() * (max_h - min_h + 1)) + min_h;
 
     let y = height - h / 2 - 60; 

     const obstacle = Bodies.rectangle(x, y, w, h, { isStatic: true, })
     obsctacles_list.push(obstacle);
 
     World.add(engine.world, [obstacle]);
 }
 
 function deleteObstacle(obstacle) {
     World.remove(engine.world, [obstacle]);
     obsctacles_list.shift();
 }
 

 function translateObstacle() {
     if ((collision ) || !isStart ) return;
 
     obsctacles_list.map(function(obstacle, i) {
         if (obstacle.position.x < -30) {
             deleteObstacle(obstacle);
             score += 1;
             scoreLabel.innerText = score;
             addObstacles();
         }
         let t = { x: -5, y: 0 }
         Body.translate(obstacle, t);
     });
 }
 

 let isStart = false;
 let collision = false;

 
 function createFrame() {
     let h = 60;
     let x = width / 2;
     let y = height - h / 2;
     let w = width;
 
    let ceil = Bodies.rectangle(x, y - height, w, h, { isStatic: true});
    let floor = Bodies.rectangle(x, y, w, h, { isStatic: true });
    
    World.add(engine.world, [ceil, floor]);
 }
 
 
 function jump() {
     
    //  if (collision || !isStart ) return;

     let force = {
         x: 0.02, 
         y: -0.3,
     };
    
    Body.applyForce(ball, ball.position, force);
         
 }
 

 function startGame() {
    
     Engine.run(engine);
     Render.run(render);

     Events.on(engine, 'tick', translateObstacle);
 
     // Collision Event
     Events.on(engine, 'collisionStart', stopGame);
 }

 
 function stopGame() {
    // if (collision || !isStart ) return;
    //  alert("hey")
    if (Matter.Collision.collides(floor.body , ball,body) != null) {
        // collision happened
        alert("collision");
    }
    else
    {
        alert("")
        collision = true;
        
    }
     
 }

 
 window.onload = init();

 let score = 0;
 const scoreLabel = document.getElementById('score');
 const startButton = document.getElementById('start');
 const restartButton = document.getElementById('restart');
 const instructionLabel = document.getElementById('instruction');

 scoreLabel.innerText = score;

 document.addEventListener('keydown', handleKeydown);
 startButton.addEventListener('click', Onclick);
 restartButton.addEventListener('click', OnclickRestart);


 function Onclick() {
    isStart = true;
    engine.world.gravity.y = 1;
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    instructionLabel.innerText = "";
}

function OnclickRestart() {

    location.reload();  
}


function handleKeydown(event) {
   if (event.keyCode === 32) {
       jump();
   }
}

 // Initializes the game
 function init() {
 
     
    setUpWorld();

    createBall();
   
    addObstacles();
    createFrame();
 
    startGame();
 }
 