
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
