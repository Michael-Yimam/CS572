var Emitter = require('events');
class Gym extends Emitter{

    constructor(){
        super();
        this.message = 'Athlete is working out';
        setInterval(()=> {this.boom();}, 1000);
    }

    boom(){
        this.emit('boom', this.message);
    }
}

const gym = new Gym();
gym.on('boom', (arg)=>{console.log(arg)});