// Rover Object Goes Here
// ======================
var rover ={
  direction:"N",
  picture:"./images/N.png",  //dafault direction is N with X=0 and Y=0 position. We can change  default position using (setPosition) function. 
  travelLog:[],              //we use this property to record every rover's move
  obstacles:[],              //obstacle's positions ([x,y]) form this 2D array. It has 5 elements( five 1D arrays).
  x:0,
  y:0
}
// ======================


// ======================

/*function to turn the Rover to the left. Rover direction can have 4 states (N-North, E-East, S-South, W-West). 
Every direction has image for visual presentation on the grid.*/

function turnLeft(rover){
  console.log("turnLeft was called!");

switch (rover.direction){
  case "N": rover.direction="W";
            rover.picture="./images/W.png";
            break;

  case "W": rover.direction="S";
            rover.picture="./images/S.png";
            break;

  case "S": rover.direction="E";
            rover.picture="./images/E.png";
  break;

  case "E": rover.direction="N";
            rover.picture="./images/N.png";
            break;
}

//this part updates <div id="info> with current rover's position and direction"
$("#"+rover.x+'-'+rover.y).html( '<img src="'+rover.picture+'" alt="">' );
$("#info").html( '<p>Rover position: (X,Y) = ('+ rover.x +',' + rover.y+')</p> Rover direction:'+rover.direction);
}

// ======================


// ======================
// Same as turnLeft function but it turns rover to the right.
function turnRight(rover){
  console.log("turnRight was called!");

  switch (rover.direction){
    case "N": rover.direction="E";
              rover.picture="./images/E.png";
              break;
  
    case "W": rover.direction="N";
              rover.picture="./images/N.png";
              break;
  
    case "S": rover.direction="W";
              rover.picture="./images/W.png";
              break;
  
    case "E": rover.direction="S";
              rover.picture="./images/S.png";
              break;
  }
  // $("#rover.x-rover.y").append( '<img src="'+rover.picture+'" alt="">' );
  $("#"+rover.x+'-'+rover.y).html( '<img src="'+rover.picture+'" alt="">' );
  $("#info").html( '<p>Rover position: (X,Y) = ('+ rover.x +',' + rover.y+')</p> Rover direction:'+rover.direction);
  
}

// ======================

// ======================
//moveForward function is used to move rover one step fw. Logic for movement is defined in switch statement. 
//function has if-else if-else statement to "catch" moment when rover goes out of the grid or "bumps" to obstacle.

function moveForward(rover){
  console.log("moveForward was called");
  var oldX=rover.x; //keeps current X position which will be changed in switch statement. We use oldX to update travelLog and keep rover position unchanged if it is neccesary.
  var oldY=rover.y; //keeps current Y position which will be changed in switch statement.  We use oldX to update travelLog and keep rover position unchanged if it is neccesary.
  
         
    switch (rover.direction){
      case "N": rover.y=rover.y+1;
      break;
      case "W": rover.x=rover.x-1;
      break;
      case "S": rover.y=rover.y-1;
      break;
      case "E": rover.x= rover.x+1;
      break;
    }


    if (rover.x<0 || rover.y<0 || rover.x>9 || rover.y>9){
      rover.x=oldX;  //No movement becouse x or y is out of scope. Position of the rover stays the same. 
      rover.y=oldY;
      console.log("Rover out of grid");
      $("#info-red").html( '<p>Rover out of grid!!!</p>');
      $("#info").html( '<p>Rover position: (X,Y) = ('+ rover.x +',' + rover.y+')</p> Rover direction:'+rover.direction);
      // $("#path").html( '<p>Rover path: '+ rover.travelLog);
    }

    else if(checkIfObstacle(rover.x, rover.y)){
      rover.x=oldX; //No movement because rover "bumps" in obstacle. Position of the rover stays the same. 
      rover.y=oldY;
      console.log("Upss, STOP!!!")
      $("#info-red").html( '<p>Upss, STOP!!!</p>');
      $("#info").html( '<p>Rover position: (X,Y) = ('+ rover.x +',' + rover.y+')</p> Rover direction:'+rover.direction);
      // $("#path").html( '<p>Rover path: '+ rover.travelLog);
  }
    else {  //Rover can go 1 step forward.
      $("#" + oldX + '-' + oldY).html('<img src="./images/rover-trace.png" alt="">'); //when rover is moved we 
      console.log(rover.picture);
      console.log("Rover position: (X,Y) = (" + rover.x + "," + rover.y + ")");
      
      $("#info").html('<p>Rover position: (X,Y) = (' + rover.x + ',' + rover.y + ')</p> Rover direction:' + rover.direction);
      $("#info-red").empty();
      // rover.travelLog = rover.travelLog.push([oldX, oldY]);
      rover.travelLog.push([oldX, oldY]);  // rover moved so we should update travelLog property and print it out on the screen
      console.log("Rover travel Log is:");
      console.log(rover.travelLog);
      // $("#path").html( '<p>Rover path: '+ rover.travelLog);
      
      $("#" + rover.x + '-' + rover.y).html('<img src="' + rover.picture + '" alt="">'); //it will update grid cell with rover.picture
    }
 
}


// ======================

// ======================
//moveBack function has the same logic as moveForward function. It moves rover one step back. 
function moveBack(rover){
  console.log("moveBack was called");
  var oldX=rover.x;
  var oldY=rover.y;
   
    switch (rover.direction){
      case "N": rover.y=rover.y-1;
      break;
      case "W": rover.x=rover.x+1;
      break;
      case "S": rover.y=rover.y+1;
      break;
      case "E": rover.x= rover.x-1;
      break;
    }
    if (rover.x<0 || rover.y<0 || rover.x>9 || rover.y>9){
      rover.x=oldX;
      rover.y=oldY;
      console.log("Rover out of grid")
      $("#info-red").html( '<p>Rover out of grid!!!</p>');
      $("#info").html( '<p>Rover position: (X,Y) = ('+ rover.x +',' + rover.y+')</p> Rover direction:'+rover.direction);
      // $("#path").html( '<p>Rover path: '+ rover.travelLog);
    }

    else if(checkIfObstacle(rover.x, rover.y)){
        rover.x=oldX;
        rover.y=oldY;
        console.log("Upss, STOP!!!")
        $("#info-red").html( '<p>Upss, STOP!!!</p>');
        $("#info").html( '<p>Rover position: (X,Y) = ('+ rover.x +',' + rover.y+')</p> Rover direction:'+rover.direction);
        // $("#path").html( '<p>Rover path: '+ rover.travelLog);
    }
    else {
        $("#" + oldX + '-' + oldY).html('<img src="./images/rover-trace.png" alt="">');
        console.log(rover.picture);
        console.log("Rover position: (X,Y) = (" + rover.x + "," + rover.y + ")")
        $("#info").html('<p>Rover position: (X,Y) = (' + rover.x + ',' + rover.y + ')</p> Rover direction:' + rover.direction);
        $("#info-red").empty();
        // rover.travelLog = rover.travelLog.push([oldX, oldY]);
        rover.travelLog.push([oldX, oldY]);
        console.log("Rover travel Log is:" + rover.travelLog);
        $("#" + rover.x + '-' + rover.y).html('<img src="' + rover.picture + '" alt="">');
        // $("#path").html( '<p>Rover path: '+ rover.travelLog);
    }
 
}
// ======================

// ======================
//setPosition function sets rover's initial position. X and Y can take values brtween 0 and 9.
function setPosition(valueX, valueY) {
  //x and y must be whole numbers between 0 and 9 including 0 and 9.
  if (valueX>9||valueX<0||valueX != Math.floor(valueX)||valueY>9||valueY<0||valueY != Math.floor(valueY)){
    $(".setUp").empty();  // whit this line we skip more than one info inside <div class="setUp">
    $(".setUp").append('<p> X and Y are whole numbers between 0 and 9. Set them again.</p>');
  }

  // rover can't take obstacle's position
  else if(checkIfObstacle(valueX,valueY)){
    $(".setUp").empty();
    $(".setUp").append('<p>X and Y are obstacles positions. Choose some other values! </p>');
  }

  // in any other case set initial position for rover and insert rover.picture in <div id="x-y"> (grid cell).
  else{
  rover.x=Number(valueX);
  rover.y=Number(valueY);

  console.log(rover.x);

  console.log(rover.y);
  $(".setUp").empty();
  $("#"+rover.x+'-'+rover.y).html( '<img src="'+rover.picture+'" alt="">' );
  $("#setButton").prop('disabled', true); //once you set position you can not do it again.
  $("#obstacles").prop('disabled', true); //if you set rover position you can not create obstacles. First step should be "create obstacles" than "set rover position"
  $("#info").html('<p>Rover position: (X,Y) = (' + rover.x + ',' + rover.y + ')</p> <p> Rover direction:' + rover.direction+ '</p>');
  }
}

// ======================

// ======================

//executeSteps function process string of commands. It takes every letter from string and based on it calls appropriate function

function executeSteps (commands){
  $("#commands").val(""); // first step is to empty input filed for future commands.
  var commandsArray=[];
  commandsArray=commands.split(""); //makes an array from string of commands
  console.log(commandsArray);
 // commands that you can write inside input field are : r -turn right, l-turn left, f- move forward, b - move back
  for (var i=0; i<commandsArray.length; i++){
    switch(commandsArray[i]){
      case "l": turnLeft(rover);
                break;
      case "r": turnRight(rover);
                break;
      case "f": moveForward(rover);
                break;
      case "b": moveBack(rover);
                break;
      default: break;  // any letter different than r,l,f,b wan't be taken into consideration.
    }
  }

}


// ======================

// ======================
//createObstacles function create obstacles on the grid. it should be called first when we load app. We can also work on app without obstacles.
//Once we set rover position we can not call createObstacles function again.
function createObstacles(){
  
  var randomArr1=[];
  var randomArr2=[];
  var obstaclesArr=[];
  while (randomArr1.length<5&&randomArr2.length<5){
    randomArr1.push(Math.floor(Math.random() * 10)); //random number between 0-9.
    randomArr2.push(Math.floor(Math.random() * 10)); //random number between 0-9.
    

  }
  console.log(randomArr1);
  console.log(randomArr2);
  for (var i=0; i<randomArr1.length; i++){
      obstaclesArr.push([randomArr1[i],randomArr2[i]]); //we make 2D array based on 1D arrays
      $("#"+randomArr1[i]+'-'+randomArr2[i]).html( '<img src="./images/obstacle.jpg" alt="">' ); //insert obstacle img in appropriate cell with id="randomArr1[i]-randomArr2[i]"
  }
  console.log(obstaclesArr);
  // $("#"+randomArr1+'-'+randomArr2).html( '<img src="'+rover.picture+'" alt="">' );
  $("#obstacles").prop('disabled', true);
  rover.obstacles=obstaclesArr; //it is needed for checkIfObstacle function. 
}

// ======================

// ======================

// every time before we move rover forward or back we need to check if desired position is already occupied with obstacle. If yes => dont't move it.

function checkIfObstacle(x,y){
  var compareArr=[x,y];
  var obstacles=rover.obstacles;
  console.log(obstacles);
  for (var i=0; i<obstacles.length; i++){
    if (obstacles[i].join()==compareArr.join()){
      return true;
    }
    
  }
  return false;
}