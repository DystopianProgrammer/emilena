const _MAX: number = 31;
const _AVG: number = 30;
const _MIN: number = 28;
const _LEP: number = 29;

export module EmCalendar {

    /**
     * Enum representing days of week. Zero indexed.
     */
    export enum EmDays {
        SUNDAY = 0,
        MONDAY = 1,
        TUESDAY = 2,
        WEDNESDAY = 3,
        THURSDAY = 4,
        FRIDAY = 5,
        SATURDAY = 6
    }

    /**
     * Enum representing months of the year. Each month is zero indexed for ease.
     */
    export enum EmMonths {
        JANUARY = 0,
        FEBRUARY = 1,
        MARCH = 2,
        APRIL = 3,
        MAY = 4,
        JUNE = 5,
        JULY = 6,
        AUGUST = 7,
        SEPTEMBER = 8,
        OCTOBER = 9,
        NOVEMBER = 10,
        DECEMBER = 11
    }

    /**
     * A value class for storing the months and days for a given year
     */
    export class EmDaysForYear {
        monthsWithDays: number[][];
        year: number;
    }

    /**
     * The main method for this module. This is what you're likely to call in order to return
     * a value object - EmDaysForYear - which stores a mapping of months & days for a given year
     */
    export function accumulateDaysForYear(year: number): EmDaysForYear {

        let days = (limit: number, collection: number[]): number[] => {
            for (let i = 1; i <= limit; i++) {
                collection.push(i);
            }
            return collection;
        }

        let january: number[] = days(_MAX, []);
        let february: number[] = (this.isLeapYear(year)) ? days(_LEP, []) : days(_MIN, []);
        let march: number[] = days(_MAX, []);
        let april: number[] = days(_AVG, []);
        let may: number[] = days(_MAX, []);
        let june: number[] = days(_AVG, []);
        let july: number[] = days(_MAX, []);
        let august: number[] = days(_MAX, []);
        let september: number[] = days(_AVG, []);
        let october: number[] = days(_MAX, []);
        let november: number[] = days(_AVG, []);
        let december: number[] = days(_MAX, []);

        let daysForYear = new EmDaysForYear();
        daysForYear.year = year;

        daysForYear.monthsWithDays = [];
        daysForYear.monthsWithDays.push(january);
        daysForYear.monthsWithDays.push(february);
        daysForYear.monthsWithDays.push(march);
        daysForYear.monthsWithDays.push(april);
        daysForYear.monthsWithDays.push(may);
        daysForYear.monthsWithDays.push(june);
        daysForYear.monthsWithDays.push(july);
        daysForYear.monthsWithDays.push(august);
        daysForYear.monthsWithDays.push(september);
        daysForYear.monthsWithDays.push(october);
        daysForYear.monthsWithDays.push(november);
        daysForYear.monthsWithDays.push(december);

        return daysForYear;
    }

    /**
     * Simple formula for determining if a leap year. True for leap year, otherwise false.
     */
    export function isLeapYear(year: number) {
        return (year % 100 === 0) || (year % 400 === 0) || (year % 4 === 0);
    }
}