const PIXI = require('pixi.js')
require('./brain.js')
require('./dot.js')
require('./population.js')

let stage, app, dots, 
    reset = false,
    gen = 0

initApp()
drawGraphics()

function initApp() {
    app = new PIXI.Application(window.innerWidth, window.innerHeight, {antialias: true})
    app.renderer.view.style.position = "absolute"
    app.renderer.view.style.display = "block"
    stage = app.stage
    document.body.appendChild(app.view)
}

function drawGraphics(){
    var pixiCircle = new PIXI.Graphics()
    pixiCircle.lineStyle(2, 0xFF00FF)
    pixiCircle.drawCircle(app.renderer.width/2, 10, 5)
    pixiCircle.endFill()
    stage.addChild(pixiCircle)
    dots = new Population(app, 100)
    dots.draw()
    app.ticker.add(delta => gameLoop(delta))
}

function gameLoop(delta){
    dots.update(value => {
        if(value!==0){
            gen++
            console.log(`GENERATION: ${gen}, ${value.finished} dots finished and ${value.died} dots died`)
            dots.newGen()
            dots.draw()
        }
    })
    

}
