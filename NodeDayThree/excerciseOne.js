var {Observable}  = require('rxjs');
var os = require('os');

function checkSystem(){

    console.log('Checking your system...');
    const obs = Observable.create(function(observer) {
        if(os.totalmem()/1073741824 < 4){
            observer.next("This app needs at least 4GB of RAM");
            return;
        }else if(os.cpus().length < 2){
            observer.next("Processor is not supported");
            return;
        }else{
            observer.next("System is checked successfully.");
        }

    });
    return obs;

}

let obs;
obs = checkSystem();
obs.subscribe((x) => {console.log(x);});
//console.log(os.cpus().length);
