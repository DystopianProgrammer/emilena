import { Calendar } from './calendar';

describe('the calendar functions', () => {

    it('should evaluate true for all leap years', () => {
        let leapYears = [1904, 1908, 1912, 1916, 1920,
            1924, 1928, 1932, 1936, 1940, 1944, 1948,
            1952, 1956, 1960, 1964, 1968, 1972, 1976,
            1980, 1984, 1988, 1992, 1996, 2000, 2004,
            2008, 2012, 2016, 2020];

        leapYears.forEach(leapYear => {

            let calendar = new Calendar();
            let isLeapYear = calendar.isLeapYear(leapYear);

            expect(isLeapYear).toBe(true);
        });
    });

    it('should evaluate false for all non leap years', () => {
        let leapYears = [1902, 1910, 1914, 1918, 1922,
            1926, 1927, 1930, 1938, 1942, 1945, 1949,
            1951, 1957, 1962, 1966, 1969, 1973, 1977,
            1982, 1986, 1989, 1990, 1994, 2002, 2006,
            2011, 2013, 2018, 2022];

        leapYears.forEach(leapYear => {

            let calendar = new Calendar();
            let isLeapYear = calendar.isLeapYear(leapYear);

            expect(isLeapYear).toBe(false);
        });
    });

    it('should accumulate correct number of months for leap year', () => {
        let calendar = new Calendar();
        let daysForYear = calendar.accumulateDaysForYear(2020);

        expect(daysForYear.year).toBe(2020);
        expect(daysForYear.monthsWithDays.length).toBe(12);
        expect(daysForYear.monthsWithDays[0].length).toBe(31);
        expect(daysForYear.monthsWithDays[1].length).toBe(29);
        expect(daysForYear.monthsWithDays[2].length).toBe(31);
        expect(daysForYear.monthsWithDays[3].length).toBe(30);
        expect(daysForYear.monthsWithDays[4].length).toBe(31);
        expect(daysForYear.monthsWithDays[5].length).toBe(30);
        expect(daysForYear.monthsWithDays[6].length).toBe(31);
        expect(daysForYear.monthsWithDays[7].length).toBe(31);
        expect(daysForYear.monthsWithDays[8].length).toBe(30);
        expect(daysForYear.monthsWithDays[9].length).toBe(31);
        expect(daysForYear.monthsWithDays[10].length).toBe(30);
        expect(daysForYear.monthsWithDays[11].length).toBe(31);
    });

    it('should accumulate correct number of months for non leap year', () => {
        let calendar = new Calendar();
        let daysForYear = calendar.accumulateDaysForYear(2017);

        expect(daysForYear.year).toBe(2017);
        expect(daysForYear.monthsWithDays.length).toBe(12);
        expect(daysForYear.monthsWithDays[0].length).toBe(31);
        expect(daysForYear.monthsWithDays[1].length).toBe(28);
        expect(daysForYear.monthsWithDays[2].length).toBe(31);
        expect(daysForYear.monthsWithDays[3].length).toBe(30);
        expect(daysForYear.monthsWithDays[4].length).toBe(31);
        expect(daysForYear.monthsWithDays[5].length).toBe(30);
        expect(daysForYear.monthsWithDays[6].length).toBe(31);
        expect(daysForYear.monthsWithDays[7].length).toBe(31);
        expect(daysForYear.monthsWithDays[8].length).toBe(30);
        expect(daysForYear.monthsWithDays[9].length).toBe(31);
        expect(daysForYear.monthsWithDays[10].length).toBe(30);
        expect(daysForYear.monthsWithDays[11].length).toBe(31);
    });
});