const item = {
    "name": "Avocado",
    "type": "Fruit",
    "category": "Food",
    "price": 200
}

function applyCoupon(i){
    return (x) => {
        i.price = i.price - (i.price * x/100);
        return i;
    }
}

console.log(applyCoupon(item)(10));

