function isWeekend(){

    const todayDate = new Date();
    const day = 6;//todayDate.getDay();	// 0 - 6 (0 is sunday)
    const days = ['weekend','weekday'];

    console.log( days[ Math.floor(Math.sqrt(7 % (day+1))) ] );

}

isWeekend();