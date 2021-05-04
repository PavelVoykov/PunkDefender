const Game = new Phaser.Game(1152, 608, Phaser.AUTO, 'game-canvas', { preload, create, update })

function preload() {
Game.load.spritesheet('player', 'WalkAnim-768x22 128x1.png', 384/8, 128)
Game.load.tilemap('map', "First_map.csv")
Game.load.image('set', 'Sprite-0003.png')
Game.load.spritesheet('tree', 'tree.png', 193/4, 64)
Game.load.spritesheet('bar', 'itembar.png', 128/2, 64)
Game.load.spritesheet('menu', 'CraftMenu.png', 128, 64/2)
Game.load.image('wood', 'wood.png')
Game.load.image('stone', 'Stone.png')
Game.load.spritesheet('rock', 'Rock.png', 192/4, 48)
Game.load.spritesheet('tool', 'Tools.png', 128/4, 32)

}
let stoneIndexCheck = 0
let treeIndexCheck = 0
let p
let a1
let a2
let a3
let map
let layer
let m = 2
let hitpertree = 0
let tree
let wood 
let itembar
let ix = 32*8
let text
let textS
let textD
let woodT = 0
let stone
let stoneCount = 0
let dropstone
let rock
let clickTwice = 0
let pickaxe = 0
let tool
let cbarcount = 0
let health = 10
function create() {
mapC()

trees()
Rocks()
Stones()

playerC()

Game.physics.startSystem(Phaser.Physics.ARCADE);
Game.physics.enable([p], Phaser.Physics.ARCADE);
p.body.collideWorldBounds = true
Game.camera.follow(p, Phaser.Camera.FOLLOW_PLATFORMER, 1, 1)

iBarCreate()

wood = Game.add.sprite(32*8+16, Game.height-48, 'wood')
stone = Game.add.sprite(32*8+16+64, Game.height-48, 'stone')
wood.fixedToCamera = true
stone.fixedToCamera = true
text = Game.add.text(wood.x+20, wood.y+20, woodT)
text.scale.setTo(0.5)
text.fixedToCamera = true
textS = Game.add.text(stone.x+22, stone.y+20, woodT)
textS.scale.setTo(0.5)
textS.fixedToCamera = true
CBar()
tools()

}



function mapC(){
    map = Game.add.tilemap('map', 32, 32)
    map.addTilesetImage('set')
    layer = map.createLayer(0)
    layer.resizeWorld()
}
function trees(){
    tree = Game.add.group()
    tree.enableBody = true
    
    for(i = 0; i < 80; i++){
        tree.create(Game.rnd.integerInRange(0, 80)*32, Game.rnd.integerInRange(m, m+1)*32, "tree")
        if(i%4 == 0 && m < 39){
            m++
        }
    }
    m=0
    tree.forEach(function(tree) {
        tree.anchor.setTo(1)  
        tree.body.immovable = true  
        tree.inputEnabled = true;
        tree.events.onInputDown.add(listener, Game);
    });
}
function playerC(){
    p = Game.add.sprite(100,100, "player")
    a1 = p.animations.add("a", [16,17,18,19,20,21,22,23], 10, true)
    a2 = p.animations.add("b", [0,1,2,3,4,5,6,7], 10, true)
    a3 = p.animations.add("c", [8,9,10,11,12,13,14,15], 10, true)
    p.scale.setTo(0.5)
    p.anchor.setTo(0.5)
    
    
}
function iBarCreate(){
    itembar = Game.add.group()

    for(i = 0; i < 10; i++){
        itembar.create(ix+i*64, Game.height-64, "bar")
    }
    itembar.forEach(function(item) {
        // item.scale.setTo(0.5)
        item.fixedToCamera = true
    });
}
function CBar(){
    crafting = Game.add.group()
for(i = 0; i < 5; i++){
   
    crafting.create(Game.width-128*2, (Game.height-5*80)/2+80*i, 'menu')
   

}

crafting.forEach(function(c){
    c.scale.setTo(2)
    c.inputEnabled = true;
    c.events.onInputDown.add(cbarche, Game);
    c.fixedToCamera = true
     
    
})

}
function tools(){

    tool = Game.add.group()
    for(i = 0; i < 2; i++){
        tool.create((Game.width-128*2)+32, ((Game.height-5*80)/2+80*i)+16, 'tool')
    }
    tool.forEach(function(t){
    t.animations.add('', [cbarcount], 1, false).play()
        cbarcount++
        t.fixedToCamera = true
    })

}
function Rocks(){
    rock = Game.add.group()
    rock.enableBody = true
    
    for(i = 0; i < 80; i++){
        rock.create(Game.rnd.integerInRange(0, 80)*32, Game.rnd.integerInRange(m, m+1)*32, "stone")
        if(i%4 == 0 && m < 39){
            m++
        }
    }
    m=0
    rock.forEach(function(rock) {
        rock.anchor.setTo(1)  
        rock.body.immovable = true  
        rock.inputEnabled = true;
        rock.scale.setTo(2/3)
        rock.events.onInputDown.add(Slistener, Game);
    });
}
function Stones(){
    dropstone = Game.add.group()
    dropstone.enableBody = true
    
    for(i = 0; i < 40; i++){
        dropstone.create(Game.rnd.integerInRange(0, 80)*32, Game.rnd.integerInRange(m, m+50)*32, "stone")
        if(i%4 == 0 && m < 39){
            m++
        }
    }
    m=0
    dropstone.forEach(function(dropstone) {
        dropstone.anchor.setTo(1)  
        dropstone.body.immovable = true  
        dropstone.inputEnabled = true;
        dropstone.events.onInputDown.add(Sslistener, Game);
    });
}

function update(){
     
    
     
    p.body.setSize(30,32)
    p.body.offset.y = 48*2
    tree.forEach(function(t){
        //Game.debug.body(t)
        t.body.setSize(28, 44)
        t.body.offset.x = 22
        t.body.offset.y = 10
    })
    rock.forEach(function(r){
       // Game.debug.body(r)
        r.body.setSize(48, 35)
        r.body.offset.y = 12
        r.body.offset.x = 2
    })
    dropstone.forEach(function(s){
        //Game.debug.body(s)
        s.body.setSize(26, 20)
        s.body.offset.x = 3
        s.body.offset.y = 5
    })
    //Game.debug.body(p)
    Game.physics.arcade.collide(p, tree)
    Game.physics.arcade.collide(p, rock)
    Game.physics.arcade.collide(tree, tree, treeColl)
    Game.physics.arcade.collide(tree, rock, treeColl)
    Game.physics.arcade.collide(rock, rock, treeColl)
    Game.physics.arcade.collide(dropstone, dropstone, treeColl)
    Game.physics.arcade.collide(dropstone, rock, treeColl)
    Game.physics.arcade.collide(dropstone, tree, treeColl)



    if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.A)){// Диагонал северозапад
        p.animations.play("b");
        p.body.velocity.y = -200
        p.body.velocity.x = -200
}
        else if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.D)){// Диагонал североизток
            p.animations.play("b");
            p.body.velocity.y = -200
            p.body.velocity.x = 200
}
            else if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.A)){// Диагонал югозапад
                p.animations.play("b");

                p.body.velocity.y = 200
                p.body.velocity.x = -200
}
                else if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.D)){// Диагонал югоизток
                     p.animations.play("b");
                     p.body.velocity.y = 200
                     p.body.velocity.x = 200

}


    else if(Game.input.keyboard.isDown(Phaser.Keyboard.W)){ //Нагоре
        p.animations.play("a");
        p.body.velocity.y = -200
        p.body.velocity.x = 0
        if(Game.input.keyboard.isDown(Phaser.Keyboard.W) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){// Тичане нагоре
            p.animations.play("a");
            p.body.velocity.y = -270
            p.body.velocity.x = 0
        }
           
        
            }else if(Game.input.keyboard.isDown(Phaser.Keyboard.S)){   //Надолу
                p.body.velocity.y = 200
                p.body.velocity.x = 0
                p.animations.play("c");
                    if(Game.input.keyboard.isDown(Phaser.Keyboard.S) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){ //Тичане надолу
                        p.animations.play("c");
                        p.body.velocity.y = 270
                        p.body.velocity.x = 0}
            
        
     }else if(Game.input.keyboard.isDown(Phaser.Keyboard.A)){ //Наляво
            p.body.offset.x = 8
            p.body.velocity.x = -200
            p.animations.play("b");
            p.scale.setTo(-0.5,0.5)
            p.body.velocity.y = 0
    
                if(Game.input.keyboard.isDown(Phaser.Keyboard.A) && Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){ //Тичане ляво
                    p.animations.play("b");
                    p.body.velocity.x = -270
           
            
        }
     }else if(Game.input.keyboard.isDown(Phaser.Keyboard.D)){ //Надясно
        p.body.offset.x = 8
        p.body.velocity.x = 200
        p.animations.play("b");
        p.scale.setTo(0.5)
        p.body.velocity.y = 0
           if(Game.input.keyboard.isDown(Phaser.Keyboard.D) && Game.input.keyboard.isDown(Phaser.Keyboard. SHIFT)){// Тичане дясно
            p.animations.play("b");
            p.body.velocity.x = 270
        }

       
    }else{
        p.body.velocity.y = 0
        p.body.velocity.x = 0
        p.animations.stop()
        }
        }
        if(Game.input.keyboard.isDown(Phaser.Keyboard.F)){
            health++
            console.log("health")
        }
        console.log(health)
function treeColl(_, Tree){
    Tree.destroy()
    console.log("COLLISION")
}
function listener(_tree){
    if(Phaser.Math.distance(_tree.x, _tree.y , p.x, p.y) < 70){
        console.log(Phaser.Math.distance(_tree.x, _tree.y , p.x, p.y))
       hitpertree ++
       
       
        if(treeIndexCheck != tree.getIndex(_tree)){
            hitpertree = 0
            treeIndexCheck = tree.getIndex(_tree)
        }else{
           if(hitpertree == 3){
                _tree.animations.add('', [1,2,3], 10, false).play()
                Game.time.events.add(Phaser.Timer.SECOND * 1, Del, Game);
                hitpertree = 0
                woodT ++
                text.text = woodT
            }
    }
}

}
function Del(){
    tree.getAt(treeIndexCheck).destroy()
}
tools
function cbarche(_cell){
    clickTwice++
    crafting.forEach(function(item){
        item.animations.add('', [0], 1, false).play()
    })
    _cell.animations.add('', [1], 1, false).play()
    if(clickTwice >= 2){
        clickTwice = 0
        if(crafting.getIndex(_cell) == 0 ){
            if(woodT >= 5 && stoneCount>=3){
                pickaxe++
                stoneCount -= 3
                woodT -= 5
                textS.text = stoneCount
                text.text = woodT
                tool.getAt(0).fixedToCamera = false
                tool.getAt(0).x = wood.x + 128
                tool.getAt(0).y = Game.height-48
                tool.getAt(0).fixedToCamera =true
            }
        }else if(crafting.getIndex(_cell) == 1){
            console.log("B2")
        }else if(crafting.getIndex(_cell) == 2 ){
            console.log("B3")
        }else if(crafting.getIndex(_cell) == 3 ){
            console.log("B4")
        }else if(crafting.getIndex(_cell) == 4 ){

        }
    }
}
function Slistener(_stone){
    if(Phaser.Math.distance(_stone.x, _stone.y , p.x, p.y) < 70){
    if(pickaxe>0){
    hitpertree ++
    if(hitpertree < 4){
        _stone.animations.add('', [hitpertree], 10, false).play()
    }
    if(stoneIndexCheck != rock.getIndex(_stone)){
        rock.getAt(stoneIndexCheck).animations.add('', [0], 10, false).play()
        stoneIndexCheck = rock.getIndex(_stone)
        hitpertree = 0
        _stone.animations.add('', [hitpertree], 10, false).play()
    }else{
        if(hitpertree == 4){
            _stone.destroy()
            hitpertree = 0
            stoneCount ++
            textS.text = stoneCount
        }
    }
    
}
    }
}
function Sslistener(_stone){
    if(Phaser.Math.distance(_stone.x, _stone.y , p.x, p.y) < 70){
        _stone.destroy()
        stoneCount ++
        textS.text = stoneCount
    }
}