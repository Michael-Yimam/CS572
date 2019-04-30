'strict mode';

(function(){

    /**
     * Filter words using prototype
     */

    String.prototype.filterWords = function(bannedWords){
        let result = this;
        for(let word of bannedWords){
            result = result.replace(new RegExp(word, 'g'), "***");
        }
        return result;
    }

    "what a stupid idea.".filterWords(['shit', 'damn', 'stupid']);
    // outPut:  what a *** idea





    /**
     *  Filter words using promises
     */

    String.prototype.filterWords = function(bannedWords){

        const promise = Promise((resolve, reject) => {

            let result = this;
            for(let word of bannedWords){
                result = result.replace(new RegExp(word, 'g'), '***');
            }

            if(result != this)
                resolve(result);
            else
                reject(result);

        });

        promise.then(result => {
            console.log(result);
        }).catch(result => {
            console.log(result);
        })

    }

    "what a stupid idea.".filterWords(['shit', 'damn', 'stupid']);
    // outPut:  what a *** idea





    /**
     *  Filter words using async and await
     */
    String.prototype.filterWords = async function(bannedWords){

        const promise = new Promise((resolve, reject) => {

            let result = this;
            for(let word of bannedWords){
                result = result.replace(new RegExp(word, 'g'), '***');
            }

            if(result != this)
                resolve(result);
            else
                reject(result);

        });

        const result = await promise; // wait till the promise resolve
        console.log(result);

    }

    "what a stupid idea".filterWords(['shit','danm','stupid']);
    // outPut:  what a *** idea

})();