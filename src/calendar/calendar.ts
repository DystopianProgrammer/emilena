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
    month: number[];
    year: number;
}

export class Calendar {

    accumulateDaysForYear(year: number): DaysForYear {

        let daysForYear = new DaysForYear();

        const _MAX: number = 31;
        const _AVG: number = 30;
        const _MIN: number = 28;
        const _LEP: number = 29;

        let days = (limit: number, collection: number[]): number[] => {
            for(let i = 1; i <= limit; i++) {
                collection.push(i);
            }
            return collection;
        };

        let january: number[] = days(_MAX, []);
        let february: number[] = (this.isLeapYear(year)) ? days(_LEP, []) : days(_MIN, []);
        // let march: number[] =


        return daysForYear;
    }

    isLeapYear(year: number) {
        return (year % 100 === 0) ||  (year % 400 === 0) || (year % 4 === 0);
    }
}