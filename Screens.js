
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



const Disco = {
preload: function(){
    Game.load.tilemap('disco', 'disco1.json', null, Phaser.Tilemap.TILED_JSON)
    Game.load.image('tiledisco', 'tiledisco.png')
    Game.load.image('neshto', 'tiledisco.png')
    Game.load.spritesheet('igra4', 'WalkAnim-768x22 128x1.png', 384/8, 128)
    Game.load.spritesheet('slime', 'Baba.png', 224/7, 32)
    Game.load.image('h', 'health.png')
    Game.load.image('s', 'Stamina.png')
    Game.load.image('hem', 'enmhb.png')

},
Dmap:0,
Layer1:0,
Layer2:0,
p:0,
a1:0,
a2:0,
a3:0,
a6:0,
a:0,
b:0,
ehealth:100,
playerStats:{
    health:100,
    stamina:100,
    flagD: true
},
enemy:0,
create: function(){

    this.Dmap = Game.add.tilemap('disco')
    this.Dmap.addTilesetImage('tiledisco')
    this.Layer1 = this.Dmap.createLayer(0)


    this.enemy = Game.add.sprite(500, 500, 'slime')
    this.p = Game.add.sprite(100, 100, 'igra4')
    this.a1 = this.p.animations.add("a", [16,17,18,19,20,21,22,23], 10, true)
    this.a2 = this.p.animations.add("b", [0,1,2,3,4,5,6,7], 10, true)
    this.a3 = this.p.animations.add("c", [8,9,10,11,12,13,14,15], 10, true)
    this.a6 = this.p.animations.add("g", [40,41,42,43,44], 15, false)
    
    this.p.scale.setTo(2/3)
    
    this.enemy.scale.setTo(5)
    Game.physics.enable([this.p, this.enemy], Phaser.Physics.ARCADE);
    this.p.body.collideWorldBounds = true
    Game.camera.follow(this.p, Phaser.Camera.FOLLOW_PLATFORMER, 1, 1)

    this.a = Game.add.image(this.p.x - 45, this.p.y - 60, 'h') 
    this.a.scale.setTo(5, 1)
    this.b = Game.add.image(this.p.x - 45, this.p.y - 60, 's') 
    this.b.scale.setTo(5, 1)



},
update: function(){
    this.Move()
    if(Phaser.Math.distance(this.enemy.x, this.enemy.y, this.p.x, this.p.y) > 30){
        Game.physics.arcade.moveToObject(this.enemy, this.p, 120)
    }
    if(Phaser.Math.distance(this.enemy.x, this.enemy.y, this.p.x, this.p.y) < 100 && this.playerStats.flagD){
        this.playerStats.health -= 10
        console.log(this.playerStats.health)
        this.playerStats.flagD = false
        Game.time.events.add(Phaser.Timer.SECOND * 1, TakeDamage, Game);
    }
    this.p.body.setSize(30,32)
    this.p.body.offset.y = 48*2
    this.a.x = this.p.x - 32
    this.a.y = this.p.y - 32  
    this.a.scale.setTo(this.playerStats.health/20, 1)
    this.b.x = this.p.x - 32
    this.b.y = this.p.y - 12   
    this.b.scale.setTo(this.playerStats.stamina/20, 1)

    this.regen()
},

Move: function(){
    if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.A)){// Диагонал северозапад
        this.p.animations.play("b");
        this.p.scale.setTo(-2/3,2/3)
        this.p.body.velocity.y = -200
        this.p.body.velocity.x = -200
}
        else if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.D)){// Диагонал североизток
            this.p.animations.play("b");
            this.p.scale.setTo(2/3)
            this.p.body.velocity.y = -200
            this.p.body.velocity.x = 200
}
            else if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.A)){// Диагонал югозапад
                this.p.animations.play("b");
                this.p.scale.setTo(-2/3,2/3)
                this.p.body.velocity.y = 200
                this.p.body.velocity.x = -200
}
                else if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.D)){// Диагонал югоизток
                    this.p.animations.play("b");
                    this.p.scale.setTo(2/3)
                    this.p.body.velocity.y = 200
                    this.p.body.velocity.x = 200

}


    else if(Game.input.keyboard.isDown(Phaser.Keyboard.W)){ //Нагоре
        this.p.animations.play("a");
        this.p.body.velocity.y = -200
        this.p.body.velocity.x = 0
        if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && playerStats.stamina > 0){// Тичане нагоре
            this. p.animations.play("a");
            this.p.body.velocity.y = -270
            this.p.body.velocity.x = 0
            this.playerStats.stamina -= 2
        }
           
        
            }else if(Game.input.keyboard.isDown(Phaser.Keyboard.S)){   //Надолу
                this.p.body.velocity.y = 200
                this.p.body.velocity.x = 0
                this.p.animations.play("c");
                    if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && playerStats.stamina > 0){ //Тичане надолу
                        this.p.animations.play("c");
                        this.p.body.velocity.y = 270
                        this.p.body.velocity.x = 0
                        this.playerStats.stamina -= 2
                    }
            
        
     }else if(Game.input.keyboard.isDown(Phaser.Keyboard.A)){ //Наляво
        this.p.body.offset.x = 8
        this.p.body.velocity.x = -200
        this.p.animations.play("b");
        this.p.scale.setTo(-2/3,2/3)
        this.p.body.velocity.y = 0
    
                if(Game.input.keyboard.isDown(Phaser.Keyboard.A) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)   && playerStats.stamina > 0){ //Тичане ляво
                    this.p.animations.play("b");
                    this.p.scale.setTo(-2/3,2/3)
                    this.p.body.velocity.x = -270
                    this.playerStats.stamina -= 2
            
        }
     }else if(Game.input.keyboard.isDown(Phaser.Keyboard.D)){ //Надясно
        this.p.body.offset.x = 8
        this.p.body.velocity.x = 200
        this.p.animations.play("b");
        this.p.scale.setTo(2/3)
        this.p.body.velocity.y = 0
           if(Game.input.keyboard.isDown(Phaser.Keyboard.D) && Game.input.keyboard.isDown(Phaser.Keyboard. SHIFT)   && playerStats.stamina > 0){// Тичане дясно
            this.p.animations.play("b");
            this.p.scale.setTo(2/3)
            this.p.body.velocity.x = 270
            this.playerStats.stamina -= 2
        }

       
    }else{
        this.p.body.velocity.y = 0
        this.p.body.velocity.x = 0
        this.a1.stop()
        this.a2.stop()
        this.a3.stop()
        }
},
 regen: function(){
    if(this.playerStats.stamina < 100){
       this.playerStats.stamina++ 
    }
},
alt:function(){
    playerStats.health++
},
 TakeDamage: function(){
    this.playerStats.flagD = true
}

}

