function isWeekend(){

    const todayDate = new Date();
    const day = todayDate.getDay();	// 0 - 6 (0 is sunday)
    const days = ['weekend','weekday', 'weekday', 'weekday'];

    console.log( days[ 7 % (day+1) ] );

}

isWeekend();