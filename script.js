cross = true;
score = 0;
highScore = 0;
canMove = true;
gameover = false;


// random
arr = [1, 2, 3, 4, 5];
ran = Math.ceil(Math.random() * 5); //0 to 4
random1 = Math.random();
// console.log(ran)

// bg, runner & enemy setup

switch (ran) {
  case 1:
    document.getElementById("container").style.backgroundImage =
      "url(images/bg/bg1.jpg)";

    break;
  case 2:
    document.getElementById("container").style.backgroundImage =
      "url(images/bg/bg2.jpg)";
    break;
  case 3:
    document.getElementById("container").style.backgroundImage =
      "url(images/bg/bg3.jpg)";
    break;
  case 4:
    document.getElementById("container").style.backgroundImage =
      "url(images/bg/bg4.jpg)";
    break;
  case 5:
    document.getElementById("container").style.backgroundImage =
      "url(images/bg/bg5.jpg)";
    break;
  default:
    break;
}

document.onkeydown = function (e) {
  console.log("key down is : ", e.keyCode);

  if (canMove) {
    if (e.keyCode == 38) {  //jump
      runner = document.querySelector(".runner");
      runner.classList.add("animateRunner");
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner1.gif");
      setTimeout(() => {
        document
          .getElementById("runnerImg")
          .setAttribute("src", "images/runner/runner-001.png");
      }, 500);
      setTimeout(() => {
        runner.classList.remove("animateRunner");
      }, 600);
    }
    if (e.keyCode == 37) {   //move left
      runner = document.querySelector(".runner");
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner1.gif");
      setTimeout(() => {
        document
          .getElementById("runnerImg")
          .setAttribute("src", "images/runner/runner-001.png");
      }, 500);
      rx = parseInt(
        window.getComputedStyle(runner, null).getPropertyValue("left")
      );
      if (rx > 0) {
        runner.style.left = rx - 112 + "px";
        runner.style.transform = "rotateY(180deg)";
      }
    }
    if (e.keyCode == 39) {   //move right
      runner = document.querySelector(".runner");
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner1.gif");
      setTimeout(() => {
        document
          .getElementById("runnerImg")
          .setAttribute("src", "images/runner/runner-001.png");
      }, 500);
      rx = parseInt(
        window.getComputedStyle(runner, null).getPropertyValue("left")
      );

      innerWidth = parseInt(window.innerWidth);
      
      if (rx < innerWidth) {
        runner.style.left = rx + 112 + "px";

        runner.style.transform = "rotateY(0deg)";
      }
    }
    if (e.keyCode == 40) {   //move down
      runner = document.querySelector(".runner");
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner1.gif");
      setTimeout(() => {
        document
          .getElementById("runnerImg")
          .setAttribute("src", "images/runner/runner-001.png");
      }, 500);
     

      runner.style.top ="80vh";
      
      setTimeout(() => {
        
        runner.style.top = "55vh";
      }, 500);
    }
  }

  // retry button event listener

  if (e.keyCode == 13 && gameover==true) {
    // Reset the game state
// Hide the game over message
document.getElementById("game-over").style.visibility = "hidden";
// Reset score and high score
document.getElementById("score").innerText = 0;
// document.getElementById("high-score").innerText = 0;

random1 = Math.random();


score = 0;
gameover = false;
enemy = document.querySelector("#enemy");
runner = document.querySelector("#runner");
enemy.classList.add("animateEnemy");
document
  .getElementById("enemyImg")
  .setAttribute("src", "images/enemy/enemy1.gif");
enemy.style.animationDuration = 5 + "s";
runner.style.left = 12 + "px";
runner.style.transform = "rotateY(0deg)";

canMove = true;
  }

  //pause btn using 'p' or 'P'key
  if (e.keyCode==80 && !gameover) {
    container.classList.toggle("paused");
    pauseButton.innerText = container.classList.contains("paused")
      ? "Resume"
      : "Pause";
    document
      .getElementById("enemyImg")
      .setAttribute(
        "src",
        container.classList.contains("paused")
          ? "images/enemy/enemy-001.png"
          : "images/enemy/enemy1.gif"
      );
    canMove = container.classList.contains("paused") ? false : true;
    pauseButton.style.backgroundColor = container.classList.contains("paused") ? "#d9001b" : "#007bff";
  }

};
// check gameover or not
setInterval(() => {
  runner = document.querySelector(".runner");
  enemy = document.querySelector(".enemy");

  rx = parseInt(window.getComputedStyle(runner, null).getPropertyValue("left"));
  ry = parseInt(window.getComputedStyle(runner, null).getPropertyValue("top"));
  ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"));
  ey = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("top"));

  offsetX = Math.abs(ex - rx);
  offsetY = Math.abs(ey - ry);




// console.log(offsetX, " ", offsetY);

  if (offsetX < 100 && offsetY < 100) {
    // Gameover
    document.getElementById("game-over").style.visibility = "visible";
    gameover = true;
    enemy.classList.remove("animateEnemy");
    document
      .getElementById("runnerImg")
      .setAttribute("src", "images/runner/runner-001.png");
    document
      .getElementById("enemyImg")
      .setAttribute("src", "images/enemy/enemy-001.png");

    canMove = false;
  } else if (offsetX < 145 && cross) {
    // Not over  > win
    score += 1;
    document.getElementById("score").innerHTML = score;
    if (score > highScore) {
      highScore = score;
      document.getElementById("high-score").innerHTML = highScore;
    }
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    aniDur = parseFloat(
      window
        .getComputedStyle(enemy, null)
        .getPropertyValue("animation-duration")
    );
    if (aniDur > 3.0) {
      newDur = aniDur - 0.1;
      setTimeout(() => {
        enemy.style.animationDuration = newDur + "s";
      }, 500);
    }
  }
}, 10);



// welcome screen
setTimeout(() => {
  welcome = document.getElementsByClassName("welcome");
  welcome[0].style.display = "none";
}, 3000);

// a = ["a", "b", "c", "d", "e"];
// ran =  Math.floor(Math.random() * 5);

// retry button

const retryButton = document.getElementById("retry-button");
retryButton.addEventListener("click", () => {
  // Reset the game state
  // Hide the game over message
  document.getElementById("game-over").style.visibility = "hidden";
  // Reset score and high score
  document.getElementById("score").innerText = 0;
  // document.getElementById("high-score").innerText = 0;

  random1 = Math.random();

  score = 0;
  gameover = false;
  enemy = document.querySelector("#enemy");
  runner = document.querySelector("#runner");
  enemy.classList.add("animateEnemy");
  document
    .getElementById("enemyImg")
    .setAttribute("src", "images/enemy/enemy1.gif");
  enemy.style.animationDuration = 5 + "s";
  runner.style.left = 12 + "px";
  runner.style.transform = "rotateY(0deg)";
  canMove = true;
});






// pause button
const pauseButton = document.getElementById("pause-button");
const container = document.getElementById("container");

pauseButton.addEventListener("click", () => {
  if (!gameover) {
    container.classList.toggle("paused");
    pauseButton.innerText = container.classList.contains("paused")
      ? "Resume"
      : "Pause";
    document
      .getElementById("enemyImg")
      .setAttribute(
        "src",
        container.classList.contains("paused")
          ? "images/enemy/enemy-001.png"
          : "images/enemy/enemy1.gif"
      );
    canMove = container.classList.contains("paused") ? false : true;
    pauseButton.style.backgroundColor = container.classList.contains("paused") ? "#d9001b" : "#007bff";
  }
});

// stop left right
// pixel adjustments
// on gameover change bg


// error when there is a gameover the score increases


// animate enemy up 

setInterval(() => {
  rx = parseInt(window.getComputedStyle(runner, null).getPropertyValue("left"));
ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"));
offsetX = Math.abs(ex - rx);

setInterval(() => {
  
  if (ex==(parseInt(window.innerWidth)-100)) {
    random1 = Math.random();
    console.log("true");
  }
}, 100);

if (offsetX < 200 && random1<0.2){
  enemy = document.getElementById("enemy");
  enemy.style.bottom = "200px";
    
  setTimeout(() => {
    enemy.style.bottom = "0px";
      
  }, 600);
}

// to make enemy move down

// if (offsetX < 200 && random1>0.8){
//   enemy = document.getElementById("enemy");
//   enemy.style.bottom = "-200px";
    
//   setTimeout(() => {
//     enemy.style.bottom = "0px";
      
//   }, 600);
// }
}, 100);


// arrow button functions

function arrowUp(){
  if (canMove) {
      //jump
      runner = document.querySelector(".runner");
      runner.classList.add("animateRunner");
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner1.gif");
      setTimeout(() => {
        document
          .getElementById("runnerImg")
          .setAttribute("src", "images/runner/runner-001.png");
      }, 500);
      setTimeout(() => {
        runner.classList.remove("animateRunner");
      }, 600);
    
}
}



function arrowRight(){
     //move right
    runner = document.querySelector(".runner");
    document
      .getElementById("runnerImg")
      .setAttribute("src", "images/runner/runner1.gif");
    setTimeout(() => {
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner-001.png");
    }, 500);
    rx = parseInt(
      window.getComputedStyle(runner, null).getPropertyValue("left")
    );

    innerWidth = parseInt(window.innerWidth);
    
    if (rx < innerWidth) {
      runner.style.left = rx + 112 + "px";

      runner.style.transform = "rotateY(0deg)";
    
  }
}
function arrowLeft(){
     //move left
    runner = document.querySelector(".runner");
    document
      .getElementById("runnerImg")
      .setAttribute("src", "images/runner/runner1.gif");
    setTimeout(() => {
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner-001.png");
    }, 500);
    rx = parseInt(
      window.getComputedStyle(runner, null).getPropertyValue("left")
    );
    if (rx > 0) {
      runner.style.left = rx - 112 + "px";
      runner.style.transform = "rotateY(180deg)";
    }
  
}
function arrowDown(){
     //move down
    runner = document.querySelector(".runner");
    document
      .getElementById("runnerImg")
      .setAttribute("src", "images/runner/runner1.gif");
    setTimeout(() => {
      document
        .getElementById("runnerImg")
        .setAttribute("src", "images/runner/runner-001.png");
    }, 500);
   

    runner.style.top ="80vh";
    
    setTimeout(() => {
      
      runner.style.top = "55vh";
    }, 500);
  }
