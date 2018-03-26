import { Injectable, OnInit } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { $ } from 'protractor';



@Injectable()
export class PhaserService implements Phaser {
  public game: Phaser.Game;
  public fullyLoaded = new BehaviorSubject(false);
  private hexagonArray = [];

  constructor() {
    let cats;
    let walls;
    let player;
    let mice;
    let mouse;
    let bullets;
    let bullet;
    let spaceKey;


    var hexagonWidth = 70;
    var hexagonHeight = 80;
    var gridSizeX = 36;
    var gridSizeY = 12;
    var columns = [Math.ceil(gridSizeX/2),Math.floor(gridSizeX/2)];
    var moveIndex;
    var sectorWidth = hexagonWidth;
    var sectorHeight = hexagonHeight/4*3;
    var gradient = (hexagonHeight/4)/(hexagonWidth/2);
    var marker;
    var hexagonGroup;
    //var hexagonArray = [];

    let hexMove = [];


    const preload = () => {
      this.game.load.image('cat', 'assets/images/cat.png');
      this.game.load.image('wall', 'assets/images/wall.png');
      this.game.load.image('mouse', 'assets/images/mouse.jpg');
      this.game.load.image('tank', 'assets/images/tank.png');
      this.game.load.image('bullet', 'assets/images/bullet.png');
      this.game.load.image('turret', 'assets/images/turret.png');
      this.game.load.image('flame', 'assets/images/flame.png');
      this.game.load.image('hexagon', 'assets/images/hexagon.png');
      this.game.load.image('marker', 'assets/images/marker.png');
    };

    const create = () => {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.stage.backgroundColor = '#e6e6e6';

      /*walls = this.game.add.group();
      walls.enableBody = true;

      let wall = walls.create(0, 0, 'wall');
      wall.scale.setTo(this.game.world.width,0.10);
      wall.body.immovable = true;
        
      wall = walls.create(0, this.game.world.height - 64, 'wall');
      wall.scale.setTo(this.game.world.width,0.10);
      wall.body.immovable = true;

      wall = walls.create(0, 0, 'wall');
      wall.scale.setTo(0.10,this.game.world.height);
      wall.body.immovable = true;

      wall = walls.create(this.game.world.width - 64, 0, 'wall');
      wall.scale.setTo(0.10,this.game.world.height);
      wall.body.immovable = true;

      let obstacle = walls.create(256, 256, 'wall');
      obstacle.scale.setTo(0.10,0.10);
      obstacle.body.immovable = true;


      player = this.game.add.sprite(64, 64, 'cat');
      player.scale.setTo(0.10,0.10);
      player.anchor.setOt(0.5);
      this.game.physics.arcade.enable(player);
      player.body.collideWorldBounds = true;


      mice = this.game.add.group();

      mice.enableBody = true;
      
  
      for (var i = 10; i < 120; i+=20)
      {
          mouse = mice.create(i * 7, 128 , 'mouse');
          mouse.scale.setTo(0.10,0.10);
      }*/
      

      /*this.game.add.sprite(
        this.game.world.centerX - (this.game.cache.getImage('cat').width / 2),
        this.game.world.centerY - (this.game.cache.getImage('cat').height / 2),
        'cat'
      );*/

      hexagonGroup = this.game.add.group();
      this.game.stage.backgroundColor = "#ffffff"
        for(var i = 0; i < gridSizeY/2; i ++){
          this.hexagonArray[i] = [];
          for(var j = 0; j < gridSizeX; j ++){
            if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
              var hexagonX = hexagonWidth*j/2;
              var hexagonY = hexagonHeight*i*1.5+(hexagonHeight/4*3)*(j%2);	
              var hexagon = this.game.add.sprite(hexagonX,hexagonY,"hexagon");
              hexagonGroup.add(hexagon);
              this.hexagonArray[i][j]=hexagon;
            }
          }
        }
      hexagonGroup.x = (this.game.width-hexagonWidth*Math.ceil(gridSizeX/2))/2;
            if(gridSizeX%2==0){
                 hexagonGroup.x-=hexagonWidth/4;
            }
      hexagonGroup.y = (this.game.height-Math.ceil(gridSizeY/2)*hexagonHeight-Math.floor(gridSizeY/2)*hexagonHeight/2)/2;
            if(gridSizeY%2==0){
                 hexagonGroup.y-=hexagonHeight/8;
            }

      player = this.game.add.sprite(64, 64, 'cat');
      player.scale.setTo(0.10,0.10);
      player.anchor.setTo(0.5);
      this.game.physics.arcade.enable(player);
      player.body.collideWorldBounds = true;
      player.visible = false; 
      /*marker = this.game.add.sprite(0,0,"marker");
      marker.anchor.setTo(0.5);
      marker.visible=false;*/
      hexagonGroup.add(player);
      //moveIndex = this.game.input.addMoveCallback(checkHex, this); 
      
      moveIndex = this.game.input.onDown.add(checkHex, this); 

      spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      bullets = this.game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      //bullet = this.game.input.onDown.add(fire, this);
      bullet = this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    };

    const update = () => {
      //let hitPlatform = this.game.physics.arcade.collide(player, walls);
      let cursors = this.game.input.keyboard.createCursorKeys();
      
      /*player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if (cursors.left.isDown)
      {
          player.body.velocity.x = -150;
      }
      else if (cursors.right.isDown)
      {
          player.body.velocity.x = 150;
      }
      else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
      }
      else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
      }*/

     //this.game.physics.arcade.overlap(player, mice, killMouse, null, this);

      bullets.forEach(function(item) {
        //if (item.x > player.x + 500 || item.x < player.x - 500 || item.y > player.y + 500 || item.y < player.y - 500) {
        //  item.destroy();
        //}

        if (this.spaceKey.isDown) {
          item.x += 5;
        }
      })

      //this.game.physics.arcade.overlap(bullets, mice, killMouseWithFire, null, this);

      this.fullyLoaded.next(true);

    };


    function checkHex(){
      var candidateX = Math.floor((this.game.input.worldX-hexagonGroup.x)/sectorWidth);
      var candidateY = Math.floor((this.game.input.worldY-hexagonGroup.y)/sectorHeight);
      var deltaX = (this.game.input.worldX-hexagonGroup.x)%sectorWidth;
      var deltaY = (this.game.input.worldY-hexagonGroup.y)%sectorHeight; 
      if(candidateY%2==0){
           if(deltaY<((hexagonHeight/4)-deltaX*gradient)){
                candidateX--;
                candidateY--;
           }
           if(deltaY<((-hexagonHeight/4)+deltaX*gradient)){
                candidateY--;
           }
      }    
      else{
           if(deltaX>=hexagonWidth/2){
                if(deltaY<(hexagonHeight/2-deltaX*gradient)){
                     candidateY--;
                }
           }
           else{
                if(deltaY<deltaX*gradient){
                     candidateY--;
                }
                else{
                     candidateX--;
                }
           }
      }
      placeMarker(candidateX,candidateY);
 }

 function placeMarker(posX,posY){
  for(var i = 0; i < gridSizeY/2; i ++){
    for(var j = 0; j < gridSizeX; j ++){
      if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
        this.hexagonArray[i][j].tint = 0xffffff;
      }
    }
  }
    if(posX<0 || posY<0 || posY>=gridSizeY || posX>columns[posY%2]-1){
      player.visible=false;
    }
    else{
      player.visible=true;
      player.x = hexagonWidth*posX;
      player.y = hexagonHeight/4*3*posY+hexagonHeight/2;
    if(posY%2==0){
      player.x += hexagonWidth/2;
    }
    else{
      player.x += hexagonWidth;
    }
    var playerX = posX*2+posY%2;
    var playerY = Math.floor(posY/2);


    // TEST VARIABLES

    let speed = 2;
    let i;

    this.hexagonArray[playerY][playerX].tint = 0xff8800;

    
    /* var newPlayerX = playerX-2;
    var newPlayerY = playerY;
    this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000 ;
    newPlayerX=playerX;
    newPlayerY=playerY-1;
    this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
    newPlayerX=playerX+1;
    newPlayerY=playerY;
    this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
    newPlayerX=playerX;
    newPlayerY=playerY+1;
    this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
    
    if(playerX%2==0){
        newPlayerX=playerX-1;
        newPlayerY=playerY-1;
        this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        newPlayerX=playerX+1;
        this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
    }else{
        newPlayerX=playerX-1;
        newPlayerY=playerY+1;
        this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        newPlayerX=playerX+1;
        this.hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
    }  */

      //this.hexagonArray = getNeighbors(playerX, playerY);

      hexMove = [];
      console.log(hexMove)
      hexMove = setNeighbors(playerX, playerY);
      console.log(hexMove)
      this.hexagonArray = getNeighbors(hexMove[0], hexMove[1]);

  }
}

function setNeighbors(playerX, playerY) {

    if(playerX-2>=0){
      hexMove.push(playerY);
      hexMove.push(playerX-2);
    }
    if(playerX+2<gridSizeX){
        hexMove.push(playerY);
        hexMove.push(playerX+2);
    }
    if(playerY-1+playerX%2>=0){
      if(playerX-1>=0){
          hexMove.push(playerY-1+playerX%2);
          hexMove.push(playerX-1);
      }
      if(playerX+1<gridSizeX){
          hexMove.push(playerY-1+playerX%2);
          hexMove.push(playerX+1);
      }
    }
    if(playerY+playerX%2<gridSizeY/2 && (gridSizeY%2==0 || playerY<Math.floor(gridSizeY/2))){
      if(playerX-1>=0){
          hexMove.push(playerY+playerX%2);
          hexMove.push(playerX-1);
      }
      if(playerX+1<gridSizeX){
          hexMove.push(playerY+playerX%2);
          hexMove.push(playerX+1);
      } 
    }

    console.log('Array ' + hexMove);
  return hexMove; 
}

function getNeighbors(playerX, playerY) {
    if(playerX-2>=0){
      this.hexagonArray[playerY][playerX-2].tint = 0xff0000;
    }
    if(playerX+2<gridSizeX){
        this.hexagonArray[playerY][playerX+2].tint = 0xff0000;
    }
    if(playerY-1+playerX%2>=0){
      if(playerX-1>=0){
          this.hexagonArray[playerY-1+playerX%2][playerX-1].tint = 0xff0000;
      }
      if(playerX+1<gridSizeX){
          this.hexagonArray[playerY-1+playerX%2][playerX+1].tint = 0xff0000;
      }
    }
    if(playerY+playerX%2<gridSizeY/2 && (gridSizeY%2==0 || playerY<Math.floor(gridSizeY/2))){
      if(playerX-1>=0){
          this.hexagonArray[playerY+playerX%2][playerX-1].tint = 0xff0000;
      }
      if(playerX+1<gridSizeX){
          this.hexagonArray[playerY+playerX%2][playerX+1].tint = 0xff0000;
      } 
    }
  return this.hexagonArray; 
}

    function killMouse (player, mouse) {
      mouse.kill();
    }

    function killMouseWithFire(bullet, mouse) {
      bullet.kill();
      mouse.kill();
    }

    function fire() {
      if (bullets.length > 1) {
        return;
      }
      bullet = bullets.create(player.x, player.y, 'flame');
    }

    this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'app-root', { preload: preload, create: create, update: update });
  }
}
