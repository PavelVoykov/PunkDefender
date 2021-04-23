const Game = new Phaser.Game(1152, 608, Phaser.AUTO, 'game-canvas', { preload, create, update })

function preload() {
Game.load.spritesheet('player', 'WalkAnim-768x22 128x1.png', 384/8, 128)
Game.load.tilemap('map', "BigMap.json", null, Phaser.Tilemap.TILED_JSON)
Game.load.image('Sprite-0003', 'Sprite-0003.png')
Game.load.spritesheet('tree', 'tree.png', 192/4, 64)
Game.load.spritesheet('bar', 'itembar.png', 128/2, 64)
Game.load.spritesheet('menu', 'CraftMenu.png', 128, 64/2)
Game.load.image('wood', 'wood.png')
Game.load.image('stone', 'Stone.png')
Game.load.spritesheet('rock', 'Rock.png', 192/4, 48)
Game.load.spritesheet('tool', 'Tools.png', 128*4/4, 128)
Game.load.image('iron', 'iron.png')
Game.load.audio('Music1', 'ESD.mp3')
Game.load.image('Options', 'Options.png')
Game.load.image('OptionsX', 'OptionsX.png')
Game.load.spritesheet('slime', 'unnamed (2).png', 384/6, 64)
}
let music 
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
let woodT = 0
let stone
let stoneCount = 0
let dropstone
let rock
let clickTwice = 0
let pickaxe = 0
let tool
let cbarcount = 0
let axe = 0
let iron
let ironCount = 0
let IronText
let options
let enemy

let faceTo = 'right'

function create() {
    
    
    
    
    music = Game.add.audio('Music1')
    music.loop = true
    music.play()
    
    
    
    
    Game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    
mapC()

trees()
Rocks()
Stones()

playerC()
enemy = Game.add.sprite(10*32, 10*32, 'slime')
    enemy.animations.add('', [], 15, true).play()
Game.physics.startSystem(Phaser.Physics.ARCADE);
Game.physics.enable([p, enemy], Phaser.Physics.ARCADE);
p.body.collideWorldBounds = true
Game.camera.follow(p, Phaser.Camera.FOLLOW_PLATFORMER, 1, 1)

iBarCreate()

wood = Game.add.sprite(32*8+16, Game.height-48, 'wood')
stone = Game.add.sprite(32*8+16+64, Game.height-48, 'stone')
stone.anchor.y = 0.3
stone.scale.setTo(2)
iron = Game.add.sprite(32*8+16+128, Game.height-48, 'iron')

wood.fixedToCamera = true
stone.fixedToCamera = true
iron.fixedToCamera = true

text = Game.add.text(wood.x+20, wood.y+20, woodT)
text.scale.setTo(0.5)
text.fixedToCamera = true
textS = Game.add.text(stone.x+22, stone.y+20, woodT)
textS.scale.setTo(0.5)
textS.fixedToCamera = true
IronText = Game.add.text(iron.x+22, iron.y+20, woodT)
IronText.scale.setTo(0.5)
IronText.fixedToCamera = true
CBar()
tools()

options = Game.add.button(0, 0, 'Options', PauseGame)
options.fixedToCamera = true



}

let fance
let flag = true

function mapC(){
    map = Game.add.tilemap('map')
    map.addTilesetImage('Sprite-0003')
    map.setCollisionByExclusion([])
    layer = map.createLayer(1)
    fance = map.createLayer(0)
    fance.resizeWorld()

    
}
function trees(){
    tree = Game.add.group()
    tree.enableBody = true
    
    for(i = 0; i < 200; i++){
        tree.create(Game.rnd.integerInRange(3, 197)*32, Game.rnd.integerInRange(m, m+1)*32, "tree")
        if(i%2 == 0 && m < 99){
            m++
        }
    
    }
    m=2
    tree.forEach(function(tree) {
        tree.anchor.setTo(0.5)  
        tree.scale.setTo(3)
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
    p.scale.setTo(2/3)
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
    for(i = 0; i < 4; i++){
        tool.create((Game.width-128*2)+32, ((Game.height-5*80)/2+80*i)+16, 'tool')
    }
    tool.forEach(function(t){
    t.animations.add('', [cbarcount], 1, false).play()
        cbarcount++
        t.fixedToCamera = true
        t.scale.setTo(0.25)
    })

}
function Rocks(){
    rock = Game.add.group()
    rock.enableBody = true
    m = 100
    for(i = 0; i < 200; i++){
        rock.create(Game.rnd.integerInRange(4, 197)*32, Game.rnd.integerInRange(m, m+1)*32, "rock")
        if(i%2 == 0 && m < 200){
            m++
        }
    }
    m=2
    rock.forEach(function(rock) {
        rock.anchor.setTo(1)  
        rock.scale.setTo(2)
        rock.body.immovable = true  
        rock.inputEnabled = true;
        rock.events.onInputDown.add(Slistener, Game);
    });
}
function Stones(){
    dropstone = Game.add.group()
    dropstone.enableBody = true
    
    for(i = 0; i < 200; i++){
        dropstone.create(Game.rnd.integerInRange(2, 199)*32, Game.rnd.integerInRange(m, m+47)*32, "stone")
        if(m < 147){
            m++
        }
    }
    m=2
    dropstone.forEach(function(dropstone) {
        dropstone.anchor.setTo(1)  
        dropstone.scale.setTo(2)
        dropstone.body.immovable = true  
        dropstone.inputEnabled = true;
        dropstone.events.onInputDown.add(Sslistener, Game);
    });
}

function update(){
    p.body.setSize(30,32)
    p.body.offset.y = 48*2
    tree.forEach(function(t){
       // Game.debug.body(t)
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
    Game.physics.arcade.collide(p, fance)
    Game.physics.arcade.collide(p, rock)
    Game.physics.arcade.collide(tree, tree, treeColl)
    Game.physics.arcade.collide(tree, rock, treeColl)
    Game.physics.arcade.collide(rock, rock, treeColl)
    Game.physics.arcade.collide(dropstone, dropstone, treeColl)
    Game.physics.arcade.collide(dropstone, rock, treeColl)
    Game.physics.arcade.collide(dropstone, tree, treeColl)


    MoveP()
    Game.input.onDown.add(gofull, Game)
    if(!flag && Game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        music.volume += 0.01
    }
    if(!flag && Game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        music.volume -= 0.01
    }
    if(music.volume < 0){
        music.volume = 0
    }



    AttackPlayer()
}

function PauseGame(){
    Game.physics.arcade.isPaused = (Game.physics.arcade.isPaused) ? false : true;
    flag = flag ? false : true
    options.key = 'OptionsX'
    if(p.animations.paused){
        p.animations.paused = false
        enemy.animations.paused = false
    }else{
        p.animations.paused = true
        enemy.animations.paused = true
    }
    
    
}
function AttackPlayer(){
    if(Phaser.Math.distance(enemy.x, enemy.y, p.x, p.y) < 300){
        Game.physics.arcade.moveToObject(enemy, p, 120)
        console.log(1)
    }else{
        enemy.body.velocity.x = 0
        enemy.body.velocity.y = 0
    }
}
function gofull() {
        Game.scale.startFullScreen();
}
function MoveP(){
    if(flag){
        if(Game.input.keyboard.isDown(Phaser.Keyboard.W)){
            p.animations.play("a");
            p.body.velocity.y = -300
            p.body.velocity.x = 0
        }else if(Game.input.keyboard.isDown(Phaser.Keyboard.S)){
            p.body.velocity.y = 300
            p.body.velocity.x = 0
            p.animations.play("c");
        }else if(Game.input.keyboard.isDown(Phaser.Keyboard.A)){
            p.body.offset.x = 8
            p.body.velocity.x = -250
            p.animations.play("b");
            p.scale.setTo(-2/3, 2/3)
            p.body.velocity.y = 0
        }else if(Game.input.keyboard.isDown(Phaser.Keyboard.D)){
            p.body.offset.x = 8
            p.body.velocity.x = 250
            p.animations.play("b");
            p.scale.setTo(2/3)
            p.body.velocity.y = 0
        }else{
            p.body.velocity.y = 0
            p.body.velocity.x = 0
            p.animations.stop()
        }
    }
}
function treeColl(_, Tree){
    Tree.destroy()
}
function listener(_tree){
    if(Phaser.Math.distance(_tree.x, _tree.y , p.x, p.y) < 80){
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
                tool.getAt(0).x = 272 + 192
                tool.getAt(0).y = Game.height-48
                tool.getAt(0).fixedToCamera =true
            }
        }else if(crafting.getIndex(_cell) == 1){
            if(woodT >= 10 && ironCount>=3){
                axe++
                stoneCount -= 3
                woodT -= 5
                textS.text = stoneCount
                text.text = woodT
            tool.getAt(1).fixedToCamera = false
                tool.getAt(1).x = 272 + 256
                tool.getAt(1).y = Game.height-48
                tool.getAt(1).fixedToCamera =true
            }
        }else if(crafting.getIndex(_cell) == 2 ){
            console.log("B3")
        }else if(crafting.getIndex(_cell) == 3 ){
            console.log("B4")
        }else if(crafting.getIndex(_cell) == 4 ){

        }
    }
}
function Slistener(_stone){
    if(Phaser.Math.distance(_stone.x, _stone.y , p.x, p.y) < 80){
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
            if(Game.rnd.integerInRange(1, 2)%2 == 0){
                ironCount++
                IronText.text = ironCount
            }
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
