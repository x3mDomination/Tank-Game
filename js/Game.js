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
      tank1.velocityY = 0;
      tank2 = createSprite(300,200);
      tank2.addImage("tank2",tankIMG);
      tank2.scale = 0.5;
      tank2.rotateToDirection=  true;
      tank2.velocityY = 0;
      tank3 = createSprite(500,200);
      tank3.addImage("tank3",tankIMG);
      tank3.scale = 0.5;
      tank3.rotateToDirection = true;
      tank3.velocityY = 0;
      tank4 = createSprite(700,200);
      tank4.addImage("tank4",tankIMG);
      tank4.scale = 0.5;
      tank4.rotateToDirection = true;
      tank4.velocityY = 0;
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
      //rock.debug = true;

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
          
          x = allPlayers[plr].x;
          y = allPlayers[plr].y;
          angle = allPlayers[plr].angle;
          velocity = allPlayers[plr].velocity;
      
          players[index-1].x = x;
          players[index-1].y = y;
          players[index-1].velocityY = player.velocity;
          //player.x = x;
          //player.y = y;
          //player.velocity = velocity;

          push();
          //translate(players[index-1].x,players[index-1].y);
          //players[index-1].x = x;
         // players[index-1].y = y;
          players[index-1].rotation = angle;
          pop();
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
          }

          if(keyIsDown(32) && player.index !== null){
            player.velocity = 3;
            player.update();
          }
          if(!(keyIsDown(32)) && player.index !== null){
            player.velocity = 0;
            player.update();
          }
          if(keyDown(LEFT_ARROW) && player.index !== null){
            player.angle -= 5/4;
            player.update();
          }
          if(keyDown(RIGHT_ARROW) && player.index !== null){
            player.angle += 5/4;
            player.update();
          }
         
          player.update();
        }
      }

  
      player.getRank();
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }
  }
  
