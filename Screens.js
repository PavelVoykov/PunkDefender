
const GOver = {

    preload: function (){
        Game.load.image('bg', 'hsbg.png')
    },

    create: function(){
        bg = Game.add.image(0, 0, 'bg')
        bg.scale.setTo(Game.width/610, Game.height/525)
        go = Game.add.text(Game.width/2, Game.height/2, 'Game over')
        go.scale.setTo(2)
        go.anchor.setTo(0.5)
    }

}

const WinScreen = {

    preload: function (){
        Game.load.image('bg', 'hsbg.png')
        Game.load.audio('M', 'Vov.wav')
    },
    bg:0,
    go:0,
    music:0,
    create: function(){
        bg = Game.add.image(0, 0, 'bg')
        bg.scale.setTo(Game.width/610, Game.height/525)
        go = Game.add.text(Game.width/2, Game.height/2, 'You Win!!!')
        go.scale.setTo(2)
        go.anchor.setTo(0.5)
        music = Game.add.audio('M')
        music.loop = true
        music.volume = 0.65
        music.play()

    }

}



// const Disco = {
// preload: function(){
//     Game.load.tilemap('disco', 'disco1.json', null, Phaser.Tilemap.TILED_JSON)
//     Game.load.image('tiledisco', 'tiledisco.png')
//     Game.load.image('neshto', 'tiledisco.png')
//     Game.load.spritesheet('igra4', 'WalkAnim-768x22 128x1.png', 384/8, 128)
//     Game.load.spritesheet('slime', 'Baba.png', 224/7, 32)

// },
// Dmap:0,
// Layer1:0,
// Layer2:0,
// p:0,
// playerStats:{
//     stamina:100
// },
// enemy:0,
// create: function(){

//     this.Dmap = Game.add.tilemap('disco')
//     this.Dmap.addTilesetImage('tiledisco')
//     this.Layer1 = this.Dmap.createLayer(0)


//     this.enemy = Game.add.sprite(500, 500, 'slime')
//     this.p = Game.add.sprite(100, 100, 'igra4')
//     Game.physics.enable([this.p, this.enemy], Phaser.Physics.ARCADE);
// },
// update: function(){
//     MoveP()
// },
// Move: function(){
//     if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.A)){// Диагонал северозапад
//         this.p.animations.play("b");
//         this.p.scale.setTo(-2/3,2/3)
//         this.p.body.velocity.y = -200
//         this.p.body.velocity.x = -200
// }
//         else if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.D)){// Диагонал североизток
//             this.p.animations.play("b");
//             this.p.scale.setTo(2/3)
//             this.p.body.velocity.y = -200
//             this.p.body.velocity.x = 200
// }
//             else if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.A)){// Диагонал югозапад
//                 this.p.animations.play("b");
//                 this.p.scale.setTo(-2/3,2/3)
//                 this.p.body.velocity.y = 200
//                 this.p.body.velocity.x = -200
// }
//                 else if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.D)){// Диагонал югоизток
//                     this.p.animations.play("b");
//                     this.p.scale.setTo(2/3)
//                     this.p.body.velocity.y = 200
//                     this.p.body.velocity.x = 200

// }


//     else if(Game.input.keyboard.isDown(Phaser.Keyboard.W)){ //Нагоре
//         this.p.animations.play("a");
//         this.p.body.velocity.y = -200
//         this.p.body.velocity.x = 0
//         if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && playerStats.stamina > 0){// Тичане нагоре
//             this. p.animations.play("a");
//             this.p.body.velocity.y = -270
//             this.p.body.velocity.x = 0
//             this.playerStats.stamina -= 2
//         }
           
        
//             }else if(Game.input.keyboard.isDown(Phaser.Keyboard.S)){   //Надолу
//                 this.p.body.velocity.y = 200
//                 this.p.body.velocity.x = 0
//                 this.p.animations.play("c");
//                     if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && playerStats.stamina > 0){ //Тичане надолу
//                         this.p.animations.play("c");
//                         this.p.body.velocity.y = 270
//                         this.p.body.velocity.x = 0
//                         this.playerStats.stamina -= 2
//                     }
            
        
//      }else if(Game.input.keyboard.isDown(Phaser.Keyboard.A)){ //Наляво
//         this.p.body.offset.x = 8
//         this.p.body.velocity.x = -200
//         this.p.animations.play("b");
//         this.p.scale.setTo(-2/3,2/3)
//         this.p.body.velocity.y = 0
    
//                 if(Game.input.keyboard.isDown(Phaser.Keyboard.A) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)   && playerStats.stamina > 0){ //Тичане ляво
//                     this.p.animations.play("b");
//                     this.p.scale.setTo(-2/3,2/3)
//                     this.p.body.velocity.x = -270
//                     this.playerStats.stamina -= 2
            
//         }
//      }else if(Game.input.keyboard.isDown(Phaser.Keyboard.D)){ //Надясно
//         this.p.body.offset.x = 8
//         this.p.body.velocity.x = 200
//         this.p.animations.play("b");
//         this.p.scale.setTo(2/3)
//         this.p.body.velocity.y = 0
//            if(Game.input.keyboard.isDown(Phaser.Keyboard.D) && Game.input.keyboard.isDown(Phaser.Keyboard. SHIFT)   && playerStats.stamina > 0){// Тичане дясно
//             this.p.animations.play("b");
//             this.p.scale.setTo(2/3)
//             this.p.body.velocity.x = 270
//             this.playerStats.stamina -= 2
//         }

       
//     }else{
//         this.p.body.velocity.y = 0
//         this.p.body.velocity.x = 0
        
//         }
// }

// }

