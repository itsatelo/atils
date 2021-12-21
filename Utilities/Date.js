const { ErrorUtility } = require('./Error.js');

/**
 * @class
 * @description The simplistic date reformatter.
 */
class DateUtility {
    /**
     * @constructor
     * @param {Object} [options] - Specifies options. 
     * @returns a function containing the built date.
     */
    constructor({ display = { displayInNumbers = true, militaryTime = false } = {}, format = undefined } = {}) {
        this.options = {
            display: {
                displayInNumbers: display.displayInNumbers,
                militaryTime: display.militaryTime,
            },
            format: format,
        };

        this.i = this.#build();
        console.log(this.i);
        return () => this.i;

    }

    /**
     * @private
     * @description Builds a new Date message.
     * @returns {string} a new Date message.
     */
    #build() {

        if (this.options.display.militaryTime !== true) this.options.display.militaryTime = false;
        if (this.options.display.displayInNumbers !== false) this.options.display.displayInNumbers = true;
        if (this.options.format === undefined) {
            if (this.options.display.displayInNumbers === true) {
                this.options.format = "day, month/date/year at hours:minutes:seconds meridiem";
            } else if (this.options.display.displayInNumbers === false) {
                this.options.format = "day, month date, year at hours:minutes:seconds meridiem";
            }
        }

        const d = new Date();
        let day = d.getDay();
        let date = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        let hours = d.getHours();
        let mins = d.getMinutes();
        let seconds = d.getSeconds();

        let ampm;

        if (day === 1) day = "Monday";
        if (day === 2) day = "Tuesday";
        if (day === 3) day = "Wednesday";
        if (day === 4) day = "Thursday";
        if (day === 5) day = "Friday";
        if (day === 6) day = "Saturday";
        if (day === 7) day = "Sunday";

        if (hours > 11) {
            ampm = "P.M.";
            if (hours > 12) hours = hours - 12;
        } else {
            ampm = "A.M.";
        }

        if (hours < 10) {
            if (hours === 1) hours = "01";
            if (hours === 2) hours = "02";
            if (hours === 3) hours = "03";
            if (hours === 4) hours = "04";
            if (hours === 5) hours = "05";
            if (hours === 6) hours = "06";
            if (hours === 7) hours = "07";
            if (hours === 8) hours = "08";
            if (hours === 9) hours = "09";
        }

        if (mins < 10) {
            if (mins === 1) mins = "01";
            if (mins === 2) mins = "02";
            if (mins === 3) mins = "03";
            if (mins === 4) mins = "04";
            if (mins === 5) mins = "05";
            if (mins === 6) mins = "06";
            if (mins === 7) mins = "07";
            if (mins === 8) mins = "08";
            if (mins === 9) mins = "09";
        }

        if (seconds < 10) {
            if (seconds === 1) seconds = "01";
            if (seconds === 2) seconds = "02";
            if (seconds === 3) seconds = "03";
            if (seconds === 4) seconds = "04";
            if (seconds === 5) seconds = "05";
            if (seconds === 6) seconds = "06";
            if (seconds === 7) seconds = "07";
            if (seconds === 8) seconds = "08";
            if (seconds === 9) seconds = "09";
        }

        if (date < 10) {
            if (date === 1) date = "01";
            if (date === 2) date = "02";
            if (date === 3) date = "03";
            if (date === 4) date = "04";
            if (date === 5) date = "05";
            if (date === 6) date = "06";
            if (date === 7) date = "07";
            if (date === 8) date = "08";
            if (date === 9) date = "09";
        }
        if (month < 10) {
            if (month === 0) month = "01";
            if (month === 1) month = "02";
            if (month === 2) month = "03";
            if (month === 3) month = "04";
            if (month === 4) month = "05";
            if (month === 5) month = "06";
            if (month === 6) month = "07";
            if (month === 7) month = "08";
            if (month === 8) month = "09";
            if (month === 9) month = "10";
        } else {
            if (month === 10) month = "11";
            if (month === 11) month = "12";
        }

        let monthlabels = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const datelabels = [
            "st",
            "nd",
            "rd",
            "th"
        ];

        let mhours = d.getHours();
        if (mhours < 10) {
            if (mhours === 1) mhours = "01";
            if (mhours === 2) mhours = "02";
            if (mhours === 3) mhours = "03";
            if (mhours === 4) mhours = "04";
            if (mhours === 5) mhours = "05";
            if (mhours === 6) mhours = "06";
            if (mhours === 7) mhours = "07";
            if (mhours === 8) mhours = "08";
            if (mhours === 9) mhours = "09";
        } else {
            mhours = d.getHours();
        }


        let message = this.options.format;
        let i = d.getDate().toString().split('');
        i = i[i.length - 1];

        if (i === "1") {
            i = datelabels[0];
        } else if (i === "2") {
            i = datelabels[1];
        } else if (i === "3") {
            i = datelabels[2];
        } else {
            i = datelabels[3];
        }

        if (this.options.display.displayInNumbers === true) {
            message = message.replace(`day`, day);
            message = message.replace(`month`, month);
            message = message.replace(`date`, date);
            message = message.replace(`year`, year);
            message = message.replace(`minutes`, mins);
            message = message.replace(`seconds`, seconds);
            message = message.replace(`meridiem`, ampm);
        } else if (this.options.display.displayInNumbers === false) {
            message = message.replace(`day`, day);
            message = message.replace(`month`, monthlabels[month - 1]);
            message = message.replace(`date`, `${date}${i}`);
            message = message.replace(`year`, year);
            message = message.replace(`minutes`, mins);
            message = message.replace(`seconds`, seconds);
            message = message.replace(`meridiem`, ampm);
        }

        if (this.options.display.militaryTime === false) {
            message = message.replace(`hours`, hours);
        } else if (this.options.display.militaryTime === true) {

            message = message.replace(`hours`, mhours);
        }


        return message;
    }
}

module.exports = { DateUtility };