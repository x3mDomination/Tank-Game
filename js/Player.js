class Player {
    constructor(){
      this.index = null;
      this.x = width/2;
      this.y = height/2;
      this.name = null;
      this.rank = null;
      this.angle = 0;
      this.velocity = 0;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        x:this.x,
        y:this.y,
        angle:this.angle,
        velocity:this.velocity
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  
    getRank(){
      var rankRef = database.ref('Rank');
      rankRef.on("value", (data)=>{
        this.rank = data.val();
      })
    }
  
    static updateRank(rank){
      database.ref('/').update({
        Rank : rank
      })
    }

    collide(object1,object2){
      if(object1.x-object2.x < object1.width/2+object2.width/2
        &&object2.x-object1.x < object1.width/2+object2.width/2
        &&object1.y-object2.y < object1.height/2+object2.height/2
        &&object2.y-object1.y < object1.height/2+object2.height/2) {
        
        return true;
        }
      else{
        return false;
      }
    }
  }
 
  
