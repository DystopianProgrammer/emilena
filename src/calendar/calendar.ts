export enum Months {
    JANUARY = 1,
    FEBRUARY = 2,
    MARCH = 3,
    APRIL = 4,
    MAY = 5,
    JUNE = 6,
    JULY = 7,
    AUGUST = 8,
    SEPTEMBER = 9,
    OCTOBER = 10,
    NOVEMBER = 11,
    DECEMBER = 12
}

export class DaysForYear {
    monthsWithDays: number[][];
    year: number;
}

const _MAX: number = 31;
const _AVG: number = 30;
const _MIN: number = 28;
const _LEP: number = 29;

export class Calendar {

    accumulateDaysForYear(year: number): DaysForYear {

        let days = (limit: number, collection: number[]): number[] => {
            for (let i = 1; i <= limit; i++) {
                collection.push(i);
            }
            return collection;
        };

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

        let daysForYear = new DaysForYear();
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

    isLeapYear(year: number) {
        return (year % 100 === 0) || (year % 400 === 0) || (year % 4 === 0);
    }
}