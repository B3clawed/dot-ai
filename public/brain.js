var Vector = require('victor')

module.exports = Brain = class Brain{

    constructor(size, directions = null){
        this.size = size
        this.radius = 1
        this.step = 0
        if(directions!=null){
            this.directions = directions
        }
        else{
            this.directions = new Array(size)
            this.randomize()
        }
    }

    randomize(){
        for(var i=0; i<this.directions.length; i++){
            var randAngle = Math.random()*(2*Math.PI)
            this.directions[i] = new Vector(Math.cos(randAngle)*this.radius, Math.sin(randAngle)*this.radius)
        }
    }

    mutatedDirections(constant){
        var newDirections = new Array(this.directions.size)
        var mutationConstant = constant
        for(var i=0; i<this.directions.length; i++){
            var rnd = Math.random()
            if(rnd<=mutationConstant){
                var randAngle = Math.random()*(2*Math.PI)
                newDirections[i] = new Vector(Math.cos(randAngle)*this.radius, Math.sin(randAngle)*this.radius)
            }
            else{
                newDirections[i] = this.directions[i]
            }
            if(i==this.directions.length-1)
                return newDirections
        }
    }

}