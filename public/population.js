module.exports = Population = class Population{
    constructor(app, size){
        this.app = app
        this.deadCount = 0
        this.minStep = 800
        this.finishCount = 0
        this.dots = new Array(size)
        this.initDots()
    }

    initDots(){
        for(var i=0; i<this.dots.length; i++){
            this.dots[i] = new Dot(this.app)
        }
    }

    draw(){
        this.dots.forEach(dot => {
            dot.draw()
        })
    }

    update(callback){
        if(this.deadCount+this.finishCount<this.dots.length){
            this.dots.forEach(dot => {
                if(!dot.dead){
                    dot.update()
                    if(dot.brain.step > this.minStep)
                        dot.dead = true
                    
                    if(dot.dead){
                        if(dot.finish)
                            this.finishCount++
                        else
                            this.deadCount++
                    }
                }
            })
            callback(0)
        }
        else{
            callback({finished: this.finishCount, died: this.deadCount})
            this.deadCount=0
            this.finishCount=0
        }
    }

    newGen(){
        this.clearDots()
        this.calcAllFitness()
        this.getHighestFitness(highestFitness => {
            if(highestFitness.dot.finish){
                console.log(`The fittest dot got to the point in ${highestFitness.dot.brain.step} steps`)
                this.minStep = highestFitness.dot.brain.step
            }
            var newDots = new Array(this.dots.length)
            newDots[this.dots.length-1] = new Dot(this.app, highestFitness.dot.brain.directions, true)
            for(var i=0; i<this.dots.length-1; i++){
                newDots[i] = this.getNewDot()
            }
            this.dots = newDots
        })
    }

    getNewDot(){
        var fitnessSum = 0
        this.dots.forEach(dot => {
            fitnessSum += dot.fitness
        })

        var rnd = Math.random(),
            min = 0
        for(var i=0; i<this.dots.length; i++){
            var dot = this.dots[i]
            var portion = dot.fitness/fitnessSum
            if(rnd>=min&&rnd<=min+portion){
                return new Dot(this.app, dot.brain.mutatedDirections(0.02))
            }
            min+=portion
        }
    }

    getHighestFitness(callback){
        var highestFitness = {dot: null, fitness: 0}
        this.dots.forEach((dot, index)=>{
            if(dot.fitness>highestFitness.fitness)
                highestFitness = {dot: dot, fitness: dot.fitness}
            if(index===this.dots.length-1)
                callback(highestFitness)
        })
    }

    calcAllFitness(){
        this.dots.forEach(dot => {
            dot.calcFitness()
        })
    }

    clearDots(){
        this.dots.forEach(dot => {
            dot.clearDot()
        })
    }
}