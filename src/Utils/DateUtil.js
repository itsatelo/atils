function DateUtil() {
    const d = new Date();
    let day = d.getDay();
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    
    let hours = d.getHours();
    let mins = d.getMinutes();
    let seconds = d.getSeconds();

    let ampm;

    if(day === 1) day = "Monday";
    if(day === 2) day = "Tuesday";
    if(day === 3) day = "Wednesday";
    if(day === 4) day = "Thursday";
    if(day === 5) day = "Friday";
    if(day === 6) day = "Saturday";
    if(day === 7) day = "Sunday";

    if(hours > 11) {
        ampm = "P.M.";
        if(hours > 12) hours = hours - 12;
    } else {
        ampm = "A.M.";
    }

    if(hours < 10) {
        if(hours === 1) hours = "01";
        if(hours === 2) hours = "02";
        if(hours === 3) hours = "03";
        if(hours === 4) hours = "04";
        if(hours === 5) hours = "05";
        if(hours === 6) hours = "06";
        if(hours === 7) hours = "07";
        if(hours === 8) hours = "08";
        if(hours === 9) hours = "09";
    }

    if(mins < 10) {
        if(mins === 1) mins = "01";
        if(mins === 2) mins = "02";
        if(mins === 3) mins = "03";
        if(mins === 4) mins = "04";
        if(mins === 5) mins = "05";
        if(mins === 6) mins = "06";
        if(mins === 7) mins = "07";
        if(mins === 8) mins = "08";
        if(mins === 9) mins = "09";
    }

    if(seconds < 10) {
        if(seconds === 1) seconds = "01";
        if(seconds === 2) seconds = "02";
        if(seconds === 3) seconds = "03";
        if(seconds === 4) seconds = "04";
        if(seconds === 5) seconds = "05";
        if(seconds === 6) seconds = "06";
        if(seconds === 7) seconds = "07";
        if(seconds === 8) seconds = "08";
        if(seconds === 9) seconds = "09";
    }

    if(date < 10) {
        if(date === 1) date = "01";
        if(date === 2) date = "02";
        if(date === 3) date = "03";
        if(date === 4) date = "04";
        if(date === 5) date = "05";
        if(date === 6) date = "06";
        if(date === 7) date = "07";
        if(date === 8) date = "08";
        if(date === 9) date = "09";
    }

    if(month < 10) {
        if(month === 1) month = "01";
        if(month === 2) month = "02";
        if(month === 3) month = "03";
        if(month === 4) month = "04";
        if(month === 5) month = "05";
        if(month === 6) month = "06";
        if(month === 7) month = "07";
        if(month === 8) month = "08";
        if(month === 9) month = "09";
    }

    return `${day}, ${month}/${date}/${year} at ${hours}:${mins}:${seconds} ${ampm}`;
}

module.exports = { DateUtil };