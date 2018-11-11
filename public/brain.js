var Vector = require('victor')

module.exports = Brain = class Brain{

    constructor(size){
        this.directions = new Array(size)
        this.radius = 1
        this.step = 0
        this.randomize()
    }

    randomize(){
        for(var i=0; i<this.directions.length; i++){
            var randAngle = Math.random()*(2*Math.PI)
            this.directions[i] = new Vector(Math.cos(randAngle)*this.radius, Math.sin(randAngle)*this.radius)
        }
    }

}