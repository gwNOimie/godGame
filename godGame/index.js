import { Injectable, OnInit } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { $ } from 'protractor';


var config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

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
var columns = [Math.ceil(gridSizeX / 2), Math.floor(gridSizeX / 2)];
var moveIndex;
var sectorWidth = hexagonWidth;
var sectorHeight = hexagonHeight / 4 * 3;
var gradient = (hexagonHeight / 4) / (hexagonWidth / 2);
var marker;
var hexagonGroup;
var hexagonArray = [];

let hexMove = [];

let fullyLoaded = new BehaviorSubject(false);


function preload() {
    game.load.image('cat', 'assets/images/cat.png');
    game.load.image('wall', 'assets/images/wall.png');
    game.load.image('mouse', 'assets/images/mouse.jpg');
    game.load.image('tank', 'assets/images/tank.png');
    game.load.image('bullet', 'assets/images/bullet.png');
    game.load.image('turret', 'assets/images/turret.png');
    game.load.image('flame', 'assets/images/flame.png');
    game.load.image('hexagon', 'assets/images/hexagon.png');
    game.load.image('marker', 'assets/images/marker.png');
};

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#e6e6e6';

    hexagonGroup = game.add.group();
    game.stage.backgroundColor = "#ffffff"
    for (var i = 0; i < gridSizeY / 2; i++) {
        hexagonArray[i] = [];
        for (var j = 0; j < gridSizeX; j++) {
            if (gridSizeY % 2 == 0 || i + 1 < gridSizeY / 2 || j % 2 == 0) {
                var hexagonX = hexagonWidth * j / 2;
                var hexagonY = hexagonHeight * i * 1.5 + (hexagonHeight / 4 * 3) * (j % 2);
                var hexagon = game.add.sprite(hexagonX, hexagonY, "hexagon");
                hexagonGroup.add(hexagon);
                hexagonArray[i][j] = hexagon;
            }
        }
    }
    hexagonGroup.x = (game.width - hexagonWidth * Math.ceil(gridSizeX / 2)) / 2;
    if (gridSizeX % 2 == 0) {
        hexagonGroup.x -= hexagonWidth / 4;
    }
    hexagonGroup.y = (game.height - Math.ceil(gridSizeY / 2) * hexagonHeight - Math.floor(gridSizeY / 2) * hexagonHeight / 2) / 2;
    if (gridSizeY % 2 == 0) {
        hexagonGroup.y -= hexagonHeight / 8;
    }

    player = game.add.sprite(64, 64, 'cat');
    player.scale.setTo(0.10, 0.10);
    player.anchor.setTo(0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.visible = false;
    /*marker = game.add.sprite(0,0,"marker");
    marker.anchor.setTo(0.5);
    marker.visible=false;*/
    hexagonGroup.add(player);
    //moveIndex = game.input.addMoveCallback(checkHex, this); 

    moveIndex = game.input.onDown.add(checkHex, this);

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //bullet = game.input.onDown.add(fire, this);
    bullet = game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
};

function update() {
    //let hitPlatform = game.physics.arcade.collide(player, walls);
    let cursors = game.input.keyboard.createCursorKeys();

    bullets.forEach(function (item) {

        if (this.spaceKey.isDown) {
            item.x += 5;
        }
    })

    //game.physics.arcade.overlap(bullets, mice, killMouseWithFire, null, this);

    this.fullyLoaded.next(true);

};

function checkHex() {
    var candidateX = Math.floor((game.input.worldX - hexagonGroup.x) / sectorWidth);
    var candidateY = Math.floor((game.input.worldY - hexagonGroup.y) / sectorHeight);
    var deltaX = (game.input.worldX - hexagonGroup.x) % sectorWidth;
    var deltaY = (game.input.worldY - hexagonGroup.y) % sectorHeight;
    if (candidateY % 2 == 0) {
        if (deltaY < ((hexagonHeight / 4) - deltaX * gradient)) {
            candidateX--;
            candidateY--;
        }
        if (deltaY < ((-hexagonHeight / 4) + deltaX * gradient)) {
            candidateY--;
        }
    }
    else {
        if (deltaX >= hexagonWidth / 2) {
            if (deltaY < (hexagonHeight / 2 - deltaX * gradient)) {
                candidateY--;
            }
        }
        else {
            if (deltaY < deltaX * gradient) {
                candidateY--;
            }
            else {
                candidateX--;
            }
        }
    }
    placeMarker(candidateX, candidateY);
}

function placeMarker(posX, posY) {
    for (var i = 0; i < gridSizeY / 2; i++) {
        for (var j = 0; j < gridSizeX; j++) {
            if (gridSizeY % 2 == 0 || i + 1 < gridSizeY / 2 || j % 2 == 0) {
                hexagonArray[i][j].tint = 0xffffff;
            }
        }
    }
    if (posX < 0 || posY < 0 || posY >= gridSizeY || posX > columns[posY % 2] - 1) {
        player.visible = false;
    }
    else {
        player.visible = true;
        player.x = hexagonWidth * posX;
        player.y = hexagonHeight / 4 * 3 * posY + hexagonHeight / 2;
        if (posY % 2 == 0) {
            player.x += hexagonWidth / 2;
        }
        else {
            player.x += hexagonWidth;
        }
        var playerX = posX * 2 + posY % 2;
        var playerY = Math.floor(posY / 2);


        // TEST VARIABLES

        let speed = 2;
        let i;

        hexagonArray[playerY][playerX].tint = 0xff8800;


        /* var newPlayerX = playerX-2;
        var newPlayerY = playerY;
        hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000 ;
        newPlayerX=playerX;
        newPlayerY=playerY-1;
        hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        newPlayerX=playerX+1;
        newPlayerY=playerY;
        hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        newPlayerX=playerX;
        newPlayerY=playerY+1;
        hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        
        if(playerX%2==0){
            newPlayerX=playerX-1;
            newPlayerY=playerY-1;
            hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
            newPlayerX=playerX+1;
            hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        }else{
            newPlayerX=playerX-1;
            newPlayerY=playerY+1;
            hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
            newPlayerX=playerX+1;
            hexagonArray[newPlayerY][newPlayerX].tint = 0xff0000;
        }  */

        hexagonArray = getNeighbors(playerX, playerY);

        //hexMove = [];
        //console.log 
        //hexMove = setNeighbors(playerX, playerY);
        //console.log 
        //hexagonArray = getNeighbors(hexMove[0], hexMove[1]);

    }
}

function setNeighbors(playerX, playerY) {

    if (playerX - 2 >= 0) {
        hexMove.push(playerY);
        hexMove.push(playerX - 2);
    }
    if (playerX + 2 < gridSizeX) {
        hexMove.push(playerY);
        hexMove.push(playerX + 2);
    }
    if (playerY - 1 + playerX % 2 >= 0) {
        if (playerX - 1 >= 0) {
            hexMove.push(playerY - 1 + playerX % 2);
            hexMove.push(playerX - 1);
        }
        if (playerX + 1 < gridSizeX) {
            hexMove.push(playerY - 1 + playerX % 2);
            hexMove.push(playerX + 1);
        }
    }
    if (playerY + playerX % 2 < gridSizeY / 2 && (gridSizeY % 2 == 0 || playerY < Math.floor(gridSizeY / 2))) {
        if (playerX - 1 >= 0) {
            hexMove.push(playerY + playerX % 2);
            hexMove.push(playerX - 1);
        }
        if (playerX + 1 < gridSizeX) {
            hexMove.push(playerY + playerX % 2);
            hexMove.push(playerX + 1);
        }
    }

    console.log('Array ' + hexMove);
    return hexMove;
}

function getNeighbors(playerX, playerY) {
    if (playerX - 2 >= 0) {
        hexagonArray[playerY][playerX - 2].tint = 0xff0000;
    }
    if (playerX + 2 < gridSizeX) {
        hexagonArray[playerY][playerX + 2].tint = 0xff0000;
    }
    if (playerY - 1 + playerX % 2 >= 0) {
        if (playerX - 1 >= 0) {
            hexagonArray[playerY - 1 + playerX % 2][playerX - 1].tint = 0xff0000;
        }
        if (playerX + 1 < gridSizeX) {
            hexagonArray[playerY - 1 + playerX % 2][playerX + 1].tint = 0xff0000;
        }
    }
    if (playerY + playerX % 2 < gridSizeY / 2 && (gridSizeY % 2 == 0 || playerY < Math.floor(gridSizeY / 2))) {
        if (playerX - 1 >= 0) {
            hexagonArray[playerY + playerX % 2][playerX - 1].tint = 0xff0000;
        }
        if (playerX + 1 < gridSizeX) {
            hexagonArray[playerY + playerX % 2][playerX + 1].tint = 0xff0000;
        }
    }
    return hexagonArray;
}

function killMouse(player, mouse) {
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

//game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'app-root', { preload: preload, create: create, update: update });
