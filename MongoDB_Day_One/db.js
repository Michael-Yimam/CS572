var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
}

exports.connect = function(url, par, done){

    if(state.db) return done();

    MongoClient.connect(url, par,function(err, client){
        if(err) return done(err);
        state.db = client.db('homework01');
        done();
    });

}

exports.get = function(){
    return state.db;
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
};