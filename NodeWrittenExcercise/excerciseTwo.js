Array.prototype.even = function(){
    let even = [];

    for(const x of this){
        if(x % 2 == 0)
            even.push(x);
    }
    return even;
}

Array.prototype.odd = function(){
    let odd = [];

    for(const x of this){
        if(x % 2 != 0)
            odd.push(x);
    }
    return odd;
}