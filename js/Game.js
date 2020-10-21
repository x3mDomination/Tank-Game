class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form();
        form.display();
      }
      
      //player sprites
      tank1 = createSprite(100,200);
      tank1.addImage("tank1",tankIMG);
      tank1.scale = 0.5;
      tank1.rotateToDirection = true;
      tank1.velocityY = 3;
      tank2 = createSprite(300,200);
      tank2.addImage("tank2",tankIMG);
      tank2.scale = 0.5;
      tank2.rotateToDirection=  true;
      tank2.velocityY = 3;
      tank3 = createSprite(500,200);
      tank3.addImage("tank3",tankIMG);
      tank3.scale = 0.5;
      tank3.rotateToDirection = true;
      tank3.velocityY = 3;
      tank4 = createSprite(700,200);
      tank4.addImage("tank4",tankIMG);
      tank4.scale = 0.5;
      tank4.rotateToDirection = true;
      tank4.velocityY = 3;
      players = [tank1,tank2,tank3,tank4];

      //borders
      leftWall = new Wall(5,height/2,10,height);
      rightWall = new Wall(width-5,height/2,10,height);
      topWall = new Wall(width/2,5,width,10);
      bottomWall = new Wall(width/2,height-5,width,10);

      //obstacles
      rock = createSprite(200,200);
      rock.addImage("rock",rockIMG);
      rock.scale = 0.05;
      rock.debug = true;

      createEdgeSprites();
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(0, 120, 2);
        //console.log(tank1.x);

        //var display_position = 100;
        var x;
        var y;
        var angle;
        var velocity = 0;
        //index of the array
        var index = 0;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;

          players[index-1].collide(leftWall.wall);
          players[index-1].collide(rightWall.wall);
          players[index-1].collide(topWall.wall);
          players[index-1].collide(bottomWall.wall);
          players[index-1].collide(rock);
  
          //position the cars a little away from each other in x direction
          angle = allPlayers[plr].angle;
          velocity = allPlayers[plr].velocity;
         
          //use data form the database to display the cars in y direction
          //y = displayHeight - allPlayers[plr].distance;
          /*
          if(player.collide(players[index-1],rock)){
            if(players[index-1].x < rock.x){
              players[index-1].x -= 5;
            }
            if(players[index-1].x > rock.x){
              players[index-1].x += 5;
            }
            if(players[index-1].y < rock.y){
              players[index-1].y -= 5;
            }
            if(players[index-1].y > rock.y){
              players[index-1].y += 5;
            }
          }
          */
          player.velocity = velocity;
          players[index-1].x = x;
          players[index-1].y = y;
          players[index-1].velocityY = player.velocity;
          player.x = x;
          player.y = y;
          //console.log(players[3].velocityY);
          push();
          players[index-1].rotation = angle;
          pop();
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            //players[index - 1].shapeColor = "red";
            //camera.position.x = displayWidth/2;
            //camera.position.y = players[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
        drawSprites();
      }
      
      /*
      if(keyCode === 119 && player.index !== null){
        player.y -= 5;
        player.update();
      }
      if(keyCode === 115 && player.index !== null){
        player.y += 5;
        player.update();
      }
      if(keyCode === 97 && player.index !== null){
        player.x -= 5;
        player.update();
      }
      if(keyCode === 100 && player.index !== null){
        player.x += 5;
        player.update();
      }
      */
      if(keyIsDown(32) && player.index !== null){
        player.velocity = 3;
        player.update();
      }
      if(!(keyIsDown(32)) && player.index !== null){
        player.velocity = 0;
        player.update();
      }
      if(keyDown(LEFT_ARROW) && player.index !== null){
        player.angle -= 5;
        player.update();
      }
      if(keyDown(RIGHT_ARROW) && player.index !== null){
        player.angle += 5;
        player.update();
      }
  
      player.getRank();
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank++;
        Player.updateRank(player.rank);
  
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }
  }
  
