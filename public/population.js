module.exports = Population = class Population{
    constructor(app, size){
        this.app = app
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

    update(){
        this.dots.forEach(dot => {
            if(dot.dead && !dot.logged){
                console.log(dot.fitness)
                dot.logged = true
            }
            dot.update()
        })
    }
}