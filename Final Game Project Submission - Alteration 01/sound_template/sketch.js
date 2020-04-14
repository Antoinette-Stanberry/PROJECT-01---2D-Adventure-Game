/*
TIME FOR AN ADVENTURE ~ by: Antoinette Stanberry

EXTENSION 1.
The first extension I implemented into my code was sound effects. Adding in some sound allowed the game to have some special effects when certain events occurred ie. the game character died, a collectible was collected, the user lost the game, and ambient noises. 

The use of sound helped to add in more dynamic and depth to the game, creating a better user interface. 
When first attempting to add in sound effects, it was quite difficult to figure out at which segments of the code to properly implement it, because an action from the game character has to occur before the sound is prompted to play. Finding the appropriate sounds that fit the dynamic of the game was a bit difficult as well.

Overall, this extension helped me with debugging as a whole, as well as understanding how a simple sound can make a game more user-friendly. 

//---

EXTENSION 2.
The second extension I implemented into my code was the addition of enemies. With the addition of enemies, the game gained some action, and another way to die, as well as anticipation of what could pop up next. 

The parts that I found a bit difficult was traversing through the constructor function to properly understand how it worked. Another part was modifying the 'abs' to get an accurate collision detection once I changed the shape of my enemies.

By implementing this extension I learned more about constructor functions and I now have a better understanding of them. I was also able to implement the keyword 'this' when working with the aforementioned function. 

Overall, this extension was a good review of past lessons, and covered new coding techniques.

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var collectables;
var snow;
var bird;
var snow_trees;

var collectable_score;
var game_score;
var flagpole;

var lives;

var jumpSound;
var birdSound;
var windSound;
var gameOverSound;
var deathSound;
var collectedSound;

var skyx;
var s1 = 520;
var s2 = 920;
var s3 = 1320;

var isSnowing;
var isFlying;

var enemies;



function preload()
{
    soundFormats('mp3','wav'); //initialize sound formats
   /*   
    //load sounds & set volume
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    birdSound = loadSound('assets/birdSound.wav');
    birdSound.setVolume(0.1);
    
    windSound = loadSound('assets/windSound.wav');
    windSound.setVolume(0.1);
    
    gameOverSound = loadSound('assets/gameOverSound.wav');
    gameOverSound.setVolume(0.2);
    
    deathSound = loadSound('assets/deathSound.wav');
    deathSound.setVolume(1);
    
    collectedSound = loadSound('assets/collectedSound.wav');
    collectedSound.setVolume(0.5);
    */
}


function setup()
{    
	createCanvas(1024, 576); //create game canvas

	floorPos_y = height * 3/4; //set the height of the floor
 
    lives = 3; //set lives at 3
     
    startGame(); //call start game function
}


function draw()
{
	background(100, 155, 255); // fill the sky blue
    
    //create green flooring 
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); 
    
    //create a game bar at the top of the canvas
    fill(0, 0, 0, 50);
    rect(0, 0, width, height/20);

    push(); //
    
    translate(scrollPos, 0); //implement a 'scrolling' animation
    
    //call upon functions to draw the background sceneery
    drawClouds();
    drawMountains();
    drawTrees();
    drawSnowTrees();
    drawSnow();
    drawBird();
    
    drawBackground(); //calls the function that darkens the background
    
    
    if(gameChar_world_x < 900)
        {
            fill(0);
            noStroke();
            textSize(15);
            textStyle(ITALIC);
            text("PRESS SPACEBAR TO JUMP.", 440, 100);
            text("PRESS THE RIGHT KEY TO MOVE RIGHT.", 400, 120);
            text("PRESS THE LEFT KEY TO MOVE LEFT.", 410, 140);
        }
    
    
    //create snow flooring
    fill(248,248,255);
    rect(1652, floorPos_y, width + 2000, height/4);
    
    
    /*implement bird sound
        *occurs at the beginning of start_game
        *when the object bird is at right the edge of the screen
    */ 
    if(bird[0].x_pos > 57);
    {
        //birdSound.play();
    }
    
    
    /*stop bird sound
        *occurs when the bird obj is at the left edge of the screen
    */
    if(bird[0].x_pos < 100)
        {
            //birdSound.stop();
        }
    
    
    /* implement creepy wind sound
        *occurs when gc's position is by the clump of trees (x: 2450)
    */
    if(gameChar_world_x > 2450)
        {
            //windSound.play();
        }
    
    
    /*calls upon the drawCanyon function & draws the canyons
        *iteration depends on how long canyon array is
    */
    for(var i =0; i < canyons.length; i++)
        {
            drawCanyon(canyons[i]);
        }
     
    
    /*checks function isPlummeting
        *if true, gc's y position increases, causing it to "fall" into the canvas
    */
    if(isPlummeting == true)
        {
            //deathSound.play();
            gameChar_y += 5;
        }

    
    /*iterates over the collectables array to check if a collectable is found
        *if returned false, the drawCollectables function is called
    */
    for(var i = 0; i < collectables.length; i++)
        {
            if(collectables[i].isFound == false)
                {
                    drawCollectable(collectables[i]);
                }
        }
    
    
    
    
    checkPlayerDie(); //calls function to check if gc has died
    
    renderFlagpole(); //calls function to create flagpole
    
    
    /* iterates over the enemies array
        *draws the enemy/enemies depeding on number of iterations
        *create  a varaible called isContact to check for cantact betweeen each enemy and gc
        *if isContact returns true, & lives are less than 0, creepy wind sound is played, startGame is called
        *breaks out of for loop
    */
    for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
            
            if(isContact)
                {
                    if(lives > 0)
                        {
                            //windSound.stop();
                            startGame();
                            break;
                        }
                }
        }
    
    
    pop(); //

	drawGameChar(); // calls function to draw gc
    
    drawSun(); // calls function to draw the sun
    
    
    //creates text at top of the canvas for the amount of collected items and the game score 
    fill(255);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text("COLLECTED: " + collectable_score + "/8", 20,20);
    text("GAME SCORE: " + game_score, 490, 20);

    
    /*iterates over the length of lives
        *craetes a text at the top of the canvas displaying how many lives are left
    */     
    for(i = 0; i < lives; i ++)
        {
        fill(255);
        noStroke(); 
        textSize(10);
        textStyle(BOLD);
        text("LIVES: "+ lives, 950, 20);
        }
    
    
    /*checks if flagpole.isReached returns true
        *creates a text in the middle of the canvas dsiplaying the game has been completed
        *prompts user to press the spacebar
        *if the spacebar is pressed creepy wind sound is stopped and startGame function is called (restarts the game)
        * returns
    */
    if(flagpole.isReached == true)
        {
            fill(255);
            textSize(30);
            text("GAME COMPLETE!", 100, 250);
            text("YOU COLLECTED " + collectable_score + " /8 COLLECTABLE ITEMS", 100, 290);
            text("PRESS SPACE TO CONTINUE", 100, 330);
            
            if(keyCode == 32)
                {
                    //windSound.stop();
                    startGame();
                }
            
            return;
        }
    
   
    /*if isLeft is returned true
        *game score is increased by 1
        *the sun's (y) position starts to increase (moves the sun upwards)
        *if the gc's (x) position is greater than the twice of the width of the game, gc will move to the left 
        *if the gc's (x) positions is less, the screen will move to the right
    */
	if(isLeft)
	{
        game_score ++;
        
        sun[0].y_pos -= 1;
        
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

    
    /*if isRight is returned true
        *game score is increased by 1
        *the sun's (y) position starts to decrease (moves the sun downwards)
        *if the gc's (x) position is less than the twice of the width of the game, gc will move to the right 
        *if the gc's (x) positions is greater, the screen will move to the left
    */
	if(isRight)
	{       
        game_score ++;
        
        sun[0].y_pos +=0.5;
        
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
            
		}
		else
		{
			scrollPos -= 5;
		}
	}
    
    
    /*if the gc's (y) position is less than floorPos_y(ground)
        *gc's (y) position increases (moves gc downwards)
        *isFalling is set to true
    */
    if(gameChar_y < floorPos_y)
        {
            gameChar_y += 2;
            isFalling = true;
        }
    
    
    //if none of the above, isFalling is set to false
    else 
    {
		isFalling = false;
	}


    /*checks if flagpole.isReached returns true
        *calls function checkFlagpole
    */
    if(flagpole.isReached == false)
        {
            checkFlagpole();
        }
     
    
    /*checks if isFlying returns true
        *iterates over bird array
        *decreases bird obj's (x) position by 3 (moves to the left)
    */
    if(isFlying == true)
        {
            for(var i = 0; i < bird.length; i++)
                {
                    bird[i].x_pos -= 3;
                }
        }
    
    /*checks if isSnowing returns true
        *iterates over snow array
        *decreases the snow's (y) position at a random speed betweeen 0.2 & 0.9
    */
        if(isSnowing == true)
        {
            for(var i = 0; i < snow.length; i++)
                {
                    snow[i].y_pos +=random(0.2,0.5);
                }
        }
        
    
	gameChar_world_x = gameChar_x - scrollPos; //value of gameChar_world_x is set to gc's (x) position subtracted by scrollPos
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
    
	if(keyCode == 37) //when the left key is pressed isLeft returns true
    {
		isLeft = true;
	} 
    
    
    else if(keyCode == 39) //when the right key is pressed isRight returns true
    {
		isRight = true;
	} 
    
    
    /*if none of the above 
        * if the spacebar is pressed while gc's (y) position is above teh ground
        * play the jumping sound
    */
    else if(keyCode == 32 && gameChar_y >= floorPos_y) 
    {
		gameChar_y -= 100;
        //jumpSound.play();
	}
}

function keyReleased()
{
	if(keyCode == 37) //when the left key is released isLeft returns false
    {
		isLeft = false;
	} 
    
    else if (keyCode == 39) //when the right key is released isRight returns false
    {
		isRight = false;
	}
}


// ------------------------------
// Game character render function
// ------------------------------


function drawGameChar() //fcuntion to draw the gc
{
    noStroke(); //disables a border around drawings
    
    if(isLeft && isFalling) //if both isLeft & isFalling returns true, draw the following;
    {
        //draw feet   
        fill(102, 51, 0);
        rect(gameChar_x - 7, gameChar_y, 15,-23);
    
        //draw head
        rect(gameChar_x-14, gameChar_y - 70, +25, +22);
    
        //draw legs
        fill(51, 102,155); 
        rect(gameChar_x + 8, gameChar_y - 10, -15,
        -22);
    
        //draw torso
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20, +20, +-30);
    
        //draw arms
        fill(102,51,0)
        rect(gameChar_x - 5, gameChar_y - 35, -20, - 10);
	} 
    
    
    else if (isRight && isFalling) //if not the above, but if both isRight & isFalling returns true, draw the following;
    {
        //draw feet   
        fill(102, 51, 0);
        rect(gameChar_x + 8, gameChar_y, -15,-23);
    
        //draw head
        rect(gameChar_x-11, gameChar_y - 70, 25, 23);
     
        //draw legs
        fill(51, 102,155);
        rect(gameChar_x + 8, gameChar_y - 10, -15, -15);
        
        //draw torso
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20, 20 , -28);
    
        //draw arms
        fill(102,51,0)
        rect(gameChar_x - 5, gameChar_y - 35, 20, -10);
	} 
    
    
    else if (isLeft) //if none of the above, but isLeft returns true, draw the following;
    {
        //draw feet   
        fill(102, 51, 0);
        rect(gameChar_x - 7, gameChar_y, 15,-23);
    
        // draw head
        rect(gameChar_x-14, gameChar_y - 70, +25, +22);
    
        //draw legs
        fill(51, 102,155);
        rect(gameChar_x + 8, gameChar_y - 10, -15,
        -22);
    
        //draw torso
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20, +20, +-30);
    
        //draw arms
        fill(102,51,0)
        rect(gameChar_x - 5, gameChar_y - 25, +10, - 18);
	}
    
    
    else if (isRight) //if none of the above, but isRight returns true, draw the following;
    {
        //draw feet   
        fill(102, 51, 0);
        rect(gameChar_x + 8, gameChar_y, -15,-23);
    
        //draw head
        rect(gameChar_x-11, gameChar_y - 70, 25, 23);
    
        //draw legs
        fill(51, 102,155);
        rect(gameChar_x + 8, gameChar_y - 10, -15, -15);
        
        //draw torso
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20, 20 , -28);
    
        //draw arms
        fill(102,51,0)
        rect(gameChar_x - 5, gameChar_y - 25, 10, -18);
	} 
    
    
    else if (isFalling || isPlummeting) //if none of the above, but isFalling & isPlummeting returns true, draw the following;
    {
        //draw feet
        fill(102, 51, 0);
        rect(gameChar_x + 1, gameChar_y, 15, - 10);
        rect(gameChar_x - 1, gameChar_y, -15, - 10);
        
        //draw head
        rect(gameChar_x-12, gameChar_y - 75, 25, 22);
        
        //draw legs
        fill(51, 102,155);
        rect(gameChar_x + 1, gameChar_y - 10, 15, - 18);
        rect(gameChar_x - 1, gameChar_y - 10, -15, -18);
        
        //draw torso
        fill(0);
        rect(gameChar_x - 18, gameChar_y - 25, 36 , -28);
        
        //draw arms
        fill(102,51,0)
        rect(gameChar_x + 5, gameChar_y - 35, 20, -10);
        rect(gameChar_x - 5, gameChar_y - 35, -20, - 10);
	}
    
    
    else //if none of the above, draw the following
    {
        //draw feet
        fill(102, 51, 0);
        rect(gameChar_x + 1, gameChar_y, 15, - 10);
        rect(gameChar_x - 1, gameChar_y, -15, - 10);
        
        //draw head
        rect(gameChar_x-12, gameChar_y - 75, 25, 22);
        
        //draw legs
        fill(51, 102,155);
        rect(gameChar_x + 1, gameChar_y - 10, 15, - 18);
        rect(gameChar_x - 1, gameChar_y - 10, -15, -18);
        
        //draw torso
        fill(0);
        rect(gameChar_x - 18, gameChar_y - 25, 36 , -28);
        
        //draw arms
        fill(102,51,0)
        rect(gameChar_x +13, gameChar_y - 30, 10, - 18);
        rect(gameChar_x -23, gameChar_y - 30, 10, - 18);
	}
}

// ---------------------------
// Background render functions
// ---------------------------


/*function to draw the clouds
    *iterates over cloud array & draws the clouds
*/
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        fill(105, 105, 105);
        ellipse(clouds[i].x_pos + 100, clouds[i].y_pos + 105, 80, 80);
            
        ellipse(clouds[i].x_pos + 140,clouds[i].y_pos + 115, 60, 60);
            
        ellipse(clouds[i].x_pos +170, clouds[i].y_pos +125, 40,40);
            
        fill(255);
        ellipse(clouds[i].x_pos + 100, clouds[i].y_pos +100, 80,80);
            
        ellipse(clouds[i].x_pos + 140, clouds[i].y_pos +110, 60, 60);
            
        ellipse(clouds[i].x_pos +170, clouds[i].y_pos +120, 40,40);
        }
}


/*function to draw the mountains
    *iterates over mountain array & draws the mountains
*/
function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
        fill(128, 128, 128);
        triangle(mountains[i].x_pos + 50, 432, 
                 mountains[i].x_pos + 160, 100, 
                 mountains[i].x_pos + 289, 432);
            
        fill(255, 255, 255);
        triangle(mountains[i].x_pos + 118, mountains[i].y_pos + 130, 
                 mountains[i].x_pos + 160, mountains[i].y_pos + 5, 
                 mountains[i].x_pos + 209, mountains[i].y_pos + 130);
                 
            
        triangle(mountains[i].x_pos + 118, mountains[i].y_pos + 130, 
                 mountains[i].x_pos + 145, mountains[i].y_pos + 245, 
                 mountains[i].x_pos + 165, mountains[i].y_pos + 130);
                 
            
        triangle(mountains[i].x_pos + 165, mountains[i].y_pos + 130, 
                 mountains[i].x_pos + 190, mountains[i].y_pos + 245, 
                 mountains[i].x_pos + 209, mountains[i].y_pos + 130);     
        }
}


/*function to draw the trees
    *iterates over trees array & draws the trees
*/
function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {
        fill(139, 69, 19);
        rect(trees_x[i] - 100, floorPos_y - 160, 50, 160);
    
        fill(0, 80, 0);
        ellipse(trees_x[i] - 80, floorPos_y - 140, 150, 150);
    
        fill(0, 100, 0);
        ellipse(trees_x[i] - 80, floorPos_y - 130, 135, 135);
        }
}


/*function to draw the snow covered trees
    *iterates over snow trees array & draws the trees
*/
function drawSnowTrees()
{
    for(var i = 0; i < snow_trees.length; i++)
        {
            fill(139, 69, 19)
            rect(snow_trees[i] - 100, floorPos_y - 160, 50, 160);
            
            fill(255);
            ellipse(snow_trees[i] - 80, floorPos_y - 140, 150, 150);
            
            fill(238, 238, 255);
            ellipse(snow_trees[i] - 80, floorPos_y - 130, 135, 135);
        }
}


/*function to draw the birds
    *iterates over bird array & draws the bird
*/
function drawBird()
{
    for(var i = 0; i < bird.length; i++)
        {
            fill(255, 200, 200);
            ellipse(bird[i].x_pos - 10, bird[i].y_pos - 5, 15, 15);
            arc(bird[i].x_pos, bird[i].y_pos, 20, 20, 0, PI + QUARTER_PI, OPEN);
            fill(0);
            ellipse(bird[i].x_pos - 13, bird[i].y_pos - 7, 3, 3);        
        } 
}


/*function to draw the sun
    *iterates over sun array & draws the sun
*/
function drawSun()
{
    for(var i = 0; i < sun.length; i++)
        {
            fill(252, 212, 34,100);
            ellipse(sun[i].x_pos, sun[i].y_pos, 60, 60);
            fill(252, 212,64, 200);
            ellipse(sun[i].x_pos, sun[i].y_pos, 50, 50);

    
    if(gameChar_world_x > s1 && gameChar_world_x < s2)
    {
        fill(253, 94, 83,200);
        ellipse(sun[i].x_pos, sun[i].y_pos, 60, 60);
        fill(252, 212,64, 100);
        ellipse(sun[i].x_pos, sun[i].y_pos, 50, 50);
    }
    
            
    else if(gameChar_world_x > s2 && gameChar_world_x < s3)
    {
            fill(253, 94, 83,300);
            ellipse(sun[i].x_pos, sun[i].y_pos, 60, 60);
            fill(252, 212,64, 50);
            ellipse(sun[i].x_pos, sun[i].y_pos, 50, 50);
    }
    
            
    else if(gameChar_world_x > s3)
    {
            fill(255, 0, 0,100);
            ellipse(sun[i].x_pos, sun[i].y_pos, 60, 60);
            fill(255, 0,0, 10);
            ellipse(sun[i].x_pos, sun[i].y_pos, 50, 50);
    }
        }
}


/*function to draw the snow
    *iterates over snow array & draws the snow flakes
*/
function drawSnow()
{
    for(var i = 0; i < snow.length; i++)
        {
            fill(248, 248, 255)
            ellipse(snow[i].x_pos, snow[i].y_pos, 10, 10);
        }
}


function drawBackground() //fucntion to draw the background
{
    if(gameChar_world_x < 800) //if the gc's (x) position is less than 800, set isFlying to true
        {
            isFlying = true;
        }
    
    
    /*if the gc's (x) position is greater than s1 (x: 520)
        *set skyx tp 20
        *set bg to 0, with alpha skyx (20)
    */
    if(gameChar_world_x > s1 && gameChar_world_x < s2) 
    {
        skyx = 20;
        background(0,0,0,skyx) ;
    }
    
    
     /*if the gc's (x) position is greater than s1 (x: 920)
        *set skyx to 80
        *set bg to 0, with alpha skyx (80)
    */
    if(gameChar_world_x > s2 && gameChar_world_x < s3)
    {
         skyx = 80;
         background(0,0,0, skyx);
    }
    
    
     /*if the gc's (x) position is greater than s1 (x: 1320)
        *set skyx to 100
        *set bg to 0, with alpha skyx (100)
    */
    if(gameChar_world_x > s3)
    {
        skyx = 100;
        background(0,0,0, skyx);
        isSnowing = true;
    }
    
    
    /*if the gc's (x) position is greater than x: 2450
        *set bg to 0, with alpha 100
    */
    if(gameChar_world_x > 2450)
        {
            background(0,0,0, 100);
        }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------


/*function to draw the canyons
    *iterates over canyon array & draws the canyons
    *calls the function checkCanyon
*/
function drawCanyon(t_canyon)
{
    for(var i = 0; i < canyons.length; i++)
    {
        fill(139, 69, 19);
        triangle(t_canyon.x_pos+150, t_canyon.y_pos+332, 
                 t_canyon.x_pos+150, t_canyon.y_pos +500, 
                 t_canyon.x_pos+190, t_canyon.y_pos +500);
        
        triangle(t_canyon.x_pos+250, t_canyon.y_pos+332, 
                 t_canyon.x_pos+250, t_canyon.y_pos+500, 
                 t_canyon.x_pos+210, t_canyon.y_pos+500);
       
        fill(100,155,255);
        triangle(t_canyon.x_pos+150, t_canyon.y_pos+332, 
                 t_canyon.x_pos+250, t_canyon.y_pos+332, 
                 t_canyon.x_pos+200, t_canyon.y_pos+500);
        
        checkCanyon(t_canyon);
        }
}


//fucntion that checks if the gc is over the canyon
function checkCanyon(t_canyon)
{
    /*if the gc's (x) position is greater than the dimensions of the canyon
        *set isPlummeting to true
    */
    if(gameChar_world_x > t_canyon.x_pos+150 &&
    gameChar_world_x < t_canyon.x_pos+250 && gameChar_y >= t_canyon.y_pos+332)
        {
            isPlummeting = true;
        }  
}


//function that draws the flagpole
function renderFlagpole()
{
    push(); //
    
    strokeWeight(5);
    stroke(0);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    
    
    if(flagpole.isReached) // if flagpole.isReached draw the flagpole's triangle at a lower level
        {
            fill(255,130,0);
            strokeWeight(3);
            triangle(flagpole.x_pos, floorPos_y - 250, 
                     flagpole.x_pos, floorPos_y-200, 
                     flagpole.x_pos + 50, floorPos_y - 225);
        }
    
    
    else //is not the above, draw triangle in regular position
    {
        fill(255,130,0);
        strokeWeight(3)
        triangle(flagpole.x_pos, floorPos_y - 50, 
                 flagpole.x_pos, floorPos_y, 
                 flagpole.x_pos + 50, floorPos_y - 25);
    }   
    pop(); //
}


function checkFlagpole() //function to check the flagpole & gc's proximity
{
    //creates a varaible that is equal to the absolute value of gc's (x) postion from the flagpole's (x) position
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    //if the absolute value is less than 15, flagple.isReached returns true
    if(d < 15)
        {
            flagpole.isReached = true;
        }
}


function checkPlayerDie() //function to check if the player has died
{
    /*if the gc's (y) position is less than the height
        *play the death sound, decrement lives by 1, & call function startGame
    */
    if(gameChar_y > height)
        {
            //deathSound.play();
            lives -= 1;
            startGame();
        }
    
    
    /* if lives is less than 1
        *create text that prompts user to exit game
        *stop all game sounds
    */
    if(lives < 1)
        {
            fill(0);
            noStroke();
            textSize(30);
            textStyle(NORMAL);
            textStyle(BOLD);
            text("GAME OVER :(.", 100, 250);
            text("PRESS SPACE TO EXIT.", 100, 290);
                 

            //birdSound.stop();
            //windSound.stop();
            //gameOverSound.play();
            
            
            //if the user presses the spacebar, stop the game over sound & remove canvas
            if(keyCode == 32)
                {
                    //gameOverSound.stop();
                    remove();
                }        
        }
}


/*function to start the game
    *holds the positions for ALL scenic objects, as well as true or false booleans
*/
function startGame()
{
    //sets the (x) & (y) position for gc
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	scrollPos = 0; //sets scrollPos to 0

	gameChar_world_x = gameChar_x - scrollPos; //value of gameChar_world_x is set to gc's (x) position subtracted by scrollPos

    //sets conditionals to false
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

    
    trees_x = [
        100, 500, 1000          
    ];
    
    
    snow_trees = [
        1720, 2100, 2500, 2580, 2600, 26400, 2700   
    ];
    
    
    clouds = [
        {x_pos: 150, y_pos: 40},
        {x_pos: 350, y_pos: 20},
        {x_pos: 650, y_pos: 50},
        
        {x_pos: 1000, y_pos: 40},
    ];
    
    
    mountains = [
        {x_pos: -400, y_pos: 100},
        {x_pos: 200, y_pos: 100},
        {x_pos: 400, y_pos: 100},
        {x_pos: 500, y_pos: 100},
        {x_pos: 900, y_pos: 100},
        {x_pos: 1300, y_pos: 100},
        {x_pos: 1400, y_pos: 100},
        {x_pos: 2000, y_pos: 100},   
        {x_pos: 2300, y_pos: 100},
        {x_pos: 3000, y_pos: 100},
        {x_pos: 3100, y_pos: 100},
        {x_pos: 3300, y_pos: 100}
    ];
    
    collectables = [
        {x_pos: 700, y_pos: 10, isFound: false},   
        {x_pos: 1100, y_pos: 50, isFound: false},
        {x_pos: 1600, y_pos: 10, isFound: false},
        {x_pos: 1850, y_pos: 50, isFound: false},
        {x_pos: 2000, y_pos: 30, isFound: false},
        {x_pos: 2400, y_pos: 5, isFound: false},
        {x_pos: 3000, y_pos: 50, isFound: false},
        {x_pos: 3250, y_pos: 10, isFound: false},
    ];
    

    canyons = [
        {x_pos: 0, y_pos: 100},
        {x_pos: 400, y_pos: 100},   
        {x_pos: 800, y_pos: 100},
        {x_pos: 1400, y_pos: 100},
        {x_pos: 1900, y_pos: 100},
    ];
    
    
    snow = [
        {x_pos: 1800, y_pos: 40},
        {x_pos: 1930, y_pos: 80},
        {x_pos: 1970, y_pos: 160},
        {x_pos: 2150, y_pos: 90},
        {x_pos: 2220, y_pos: 100},
        {x_pos: 2290, y_pos: 50},
        {x_pos: 2340, y_pos: 80},
        {x_pos: 2380, y_pos: 120},
        {x_pos: 2390, y_pos: 200},
        {x_pos: 2380, y_pos: 150},
        {x_pos: 2400, y_pos: 120},
        {x_pos: 2320, y_pos: 120},
        {x_pos: 1940, y_pos: 160},
        {x_pos: 2380, y_pos: 120},
        {x_pos: 1920, y_pos: 90},
        {x_pos: 1800, y_pos: 10},
        {x_pos: 1930, y_pos: 120},
        {x_pos: 1970, y_pos: 130},
        {x_pos: 2150, y_pos: 100},
        {x_pos: 2220, y_pos: 10},
        {x_pos: 2290, y_pos: 130},
        {x_pos: 2340, y_pos: 40},
        {x_pos: 2000, y_pos: 20},
        {x_pos: 2390, y_pos: 20},
        {x_pos: 2380, y_pos: 50},
        {x_pos: 2400, y_pos: 20},
        {x_pos: 2320, y_pos: 20},
        {x_pos: 1900, y_pos: 60},
        {x_pos: 2380, y_pos: 20},
        {x_pos: 1920, y_pos: 1400},
    ];
            
    
    bird = [
        {x_pos: 950, y_pos: 40},
        {x_pos: 1100, y_pos: 60},
        {x_pos: 1200, y_pos: 100},
        {x_pos: 1400, y_pos: 120},
    ];
    
    
    sun = [
        {x_pos: 950, y_pos: 50},
        ];
    
    
    flagpole = {isReached: false, x_pos: 3800};
    
    
    enemies = [];
    enemies.push(new Enemy(2700, floorPos_y - 10, 100));
    enemies.push(new Enemy(3050, floorPos_y - 10, 100));
    enemies.push(new Enemy(3400, floorPos_y - 10, 100)); 
    
    
    collectable_score = 0; //set collectable_score to 0
    game_score = 0; //set game_score to 0   
}


// ----------------------------------
// Collectable items render and check functions
// ----------------------------------


function drawCollectable(t_collectable) //function to draw the collectable items
{
    stroke(0);
    strokeWeight(1);
            
    fill(255,0,0);
    
    ellipse()
    triangle(t_collectable.x_pos+20, t_collectable.y_pos+280, 
             t_collectable.x_pos+30, t_collectable.y_pos+265, 
             t_collectable.x_pos+40, t_collectable.y_pos+280);
            
    triangle(t_collectable.x_pos+40, t_collectable.y_pos+280, 
             t_collectable.x_pos+50, t_collectable.y_pos+265, 
             t_collectable.x_pos+60, t_collectable.y_pos+280);
            
    triangle(t_collectable.x_pos+20, t_collectable.y_pos+280, 
             t_collectable.x_pos+40, t_collectable.y_pos+300, 
             t_collectable.x_pos+60, t_collectable.y_pos+280);
            
    stroke(255,0,0);
    strokeWeight(3);
    line(t_collectable.x_pos+25, t_collectable.y_pos+280, 
         t_collectable.x_pos+55, t_collectable.y_pos+280);
    
    checkCollectable(t_collectable);    
}


function checkCollectable(t_collectable)
{
    let d = dist(gameChar_world_x, gameChar_y, t_collectable.x_pos + 50, t_collectable.y_pos + 300);
    
    
    if(d < 100)
        {
            t_collectable.isFound = true;
            //collectedSound.play();
            collectable_score += 1;
            game_score += 100;
        }
}

function Enemy(x, y, range) //function to create enemies
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.currentY = y;
    
    
    this.update = function() //update enemies' position function
    {
        this.currentX += this.inc;
        
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc -= 1;
            }
        
        
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    }
    
    
    this.draw = function() //draw enemies function 
    {
        this.update(); //updates  the enemies' position
        
        //draw emeny body
        fill(255, 250, 250, 100);
        noStroke();
        rect(this.currentX, this.y - 50, 60, 60);
        
        //draw enemy eyes
        fill(0);
        ellipse(this.currentX + 20, this.y - 30, 15, 15);
        ellipse(this.currentX + 40, this.y - 30, 15, 15);
        
        //draw enemy pupil
        fill(255, 0, 0);
        noStroke();
        ellipse(this.currentX + 20, this.y - 30, 3, 3);
        ellipse(this.currentX + 40, this.y - 30, 3, 3);
    }
    
    
    this.checkContact = function(gc_x, gc_y) //check contact from enemies function
    {
        //create a varaible that is equal to the distance b/w gc's (x & y) postion from this.currentX & y
        var d = dist(gc_x, gc_y, this.currentX, this.y);
        
        //if the distance is less than 20, play the death sound, decrement lives by 1 =, & return true
        if(d < 20)
            {
                //deathSound.play();
                lives -= 1;
                return true;   
            }
       
        //if not the above, return false
        return false;
    }
}



