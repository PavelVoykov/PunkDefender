
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
const Disco = {
preload: function(){
    Game.load.tilemap('disco', 'DISCO.json', null, Phaser.Tilemap.TILED_JSON)
    Game.load.image('tiledisco', 'tiledisco.png')
    Game.load.image('neshto', 'tiledisco.png')
    Game.load.spritesheet('igra4', 'WalkAnim-768x22 128x1.png', 384/8, 128)

},
Dmap:0,
Layer1:0,
Layer2:0,
p:0,
create: function(){

    this.Dmap = Game.add.tilemap('disco')
    this.Dmap.addTilesetImage('tiledisco')
    this.Layer1 = this.Dmap.createLayer(0)
    this.Layer2 = this.Dmap.createLayer(1)


    this.p = Game.add.sprite(100, 100, 'igra4')
}
}
