
var dog, happyDog, database, foodS, foodStock
var dogImg, happyDogImg, milkImg;
var foodObj, feedPetButton, lastFedButton
var fedTime,lastFed;



function preload()
{
  
  
  dogImg=loadImage("happyDog.png");
  happyDogImg=loadImage("dog.png");
  milkImg=loadImage("Milk.png");
}

function setup() {
  createCanvas(1200, 500);
  database=firebase.database();
 dbref=database.ref('Food');
  dbref.on("value",readStock);
  dog = createSprite(250,250,50,50);
  foodObj= createSprite();
  foodObj.visible=false;

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  
 
  dog.addImage("dog",dogImg);
  
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addfood=createButton("add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFood);
  
}
function readStock(data){
  foodStock=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  
  }else{
    x=x-1;
  }

  
console.log(x);

  database.ref('/').update({
    Food:x
  })
}



function draw() {  
background(46, 139, 87);

foodObj.display();

if(keyWentDown(UP_ARROW)){
  writeStock(foodStock);
  dog.addImage("dog", happyDogImg);
}

  
  drawSprites();
  //add styles here
  dog.scale=0.5;
  fill("black");
  text("Food remaining:"+ foodStock,220,425);
  



  fill("white");
  textSize=1.5;
  text("Note: press UP arrow to feed jack milk",165,25);


  if(lastFed>=12){
    text("last fed :" + lastFed%12+ "PM", 450,20);
  }else if(lastFed==0){
    text("last fed: 12 AM",450,20);
  }else{
    text("last fed:" + lastFed + "AM",450,20);
  }
  
getTime();
  
}

function feedDog(){
  dog.addImage("dog", happyDogImg);
  writeStock(foodStock);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })



}
  

function addFood(){
   foodStock++; 
   console.log(foodStock) 
   database.ref('/').update({ Food:foodStock++ }); 
  }


  async function getTime(){
    var response= await fetch("http://worldtimeapi.org/api/timezone/America/Chicago");
    var responseJson = await response.json();
    console.log(responseJson);
    var dateTime= responseJson.datetime;
    var hovr= dateTime.slice(11,13);
    console.log(hovr);
  }