import { Injectable } from '@angular/core';

/**
 * zero indexed
 */
export enum Days {
    sun, mon, tues, weds, thurs, fri, sat
}

/**
 * zero indexed
 */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Represents a snapshot in time with class fields for decoration
 */
export class Snapshot {
    day: number;
    date: number;
    month: number;
    year: number;
    timeFrom: string;
    timeTo: string;
    class: string;
    friendlyName: string;
}

@Injectable()
export class CalendarService {

    listSnapshots(year: number, month: number): Snapshot[] {

        let days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat'];
        let date = new Date(year, month - 1, 1);
        let snapshots: Snapshot[] = [];

        while (date.getMonth() === month - 1) {
            let snapshot = new Snapshot();
            snapshot.day = date.getDay();
            snapshot.date = date.getDate();
            snapshot.month = month;
            snapshot.year = year;
            snapshot.friendlyName = date.toLocaleDateString('en-GB');
            snapshots.push(snapshot);

            date.setDate(date.getDate() + 1);
        }
        return snapshots;
    }

    getMonthsOfYear(): string[] {
        return MONTHS;
    }

}