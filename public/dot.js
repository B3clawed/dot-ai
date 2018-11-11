var Vector = require('victor')

module.exports = Dot = class Dot {
    constructor(app){
        this.renderer = app.renderer
        this.stage = app.stage
        this.brain = new Brain(800)
        this.dead = false
        this.finish = false
        this.logged = false
        this.goal = new Vector(this.renderer.width/2, 10)
        this.acc = new Vector(0,0)
        this.vel = new Vector(0,0)
        this.pos = new Vector(this.renderer.width/2, this.renderer.height-10)
    }

    draw(){
        this.dotGraphics = new PIXI.Graphics()
        this.dotGraphics.lineStyle(2, 0xFFFFFF)
        this.dotGraphics.beginFill(0xFFFFFF)
        this.dotGraphics.drawCircle(this.pos.x, this.pos.y, 2)
        this.dotGraphics.endFill()
        this.stage.addChild(this.dotGraphics)
    }

    update(){
        if(!this.dead && !this.finish){
            if(this.brain.directions.length > this.brain.step){
                this.acc = this.brain.directions[this.brain.step]
                this.brain.step += 1
            }
            else
                this.dead = true
            this.vel.add(this.acc)
            this.vel.limitMag(3)
            this.pos.add(this.vel)
            
            this.stage.removeChild(this.dotGraphics)
            this.draw()
            if(this.goal.distance(this.pos) <= 5){
                this.finish = true
                this.dead = true;
            }
            if(this.pos.y <= 0 || this.pos.y >= this.renderer.height || this.pos.x <= 0 || this.pos.x >= this.renderer.width)
                this.dead = true

            this.calcFitness()
        }
    }

    calcFitness(){
        var dist = this.goal.distance(this.pos)
        if(dist>5){
            this.fitness = 1.0/(dist*dist)
        }
        else{
            this.fitness = (1.0/25.0) + (1.0/(this.brain.step*this.brain.step))
        }
    }
}

Vector.prototype.limitMag = function(maxMag){
    var origin = new Vector(0,0)
    var mag = origin.distance(this)
    if(mag > maxMag){
        var ratio = maxMag/mag
        this.x *= ratio
        this.y *= ratio
    } 
}