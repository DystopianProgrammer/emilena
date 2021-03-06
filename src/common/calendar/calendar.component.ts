import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CalendarService, Snapshot, Days } from './calendar.service';
import { PaddedDatePipe } from './calendar.pipe';

@Component({
    selector: 'em-calendar',
    templateUrl: './calendar.component.html',
    providers: [CalendarService],
    pipes: [PaddedDatePipe]
})
export class CalendarComponent implements OnInit {

    selectYear: number[] = [];
    selectedYear: number;
    currentMonth: number;
    displayMonth: string;

    // chunking snapshots
    snapshotRow1: Snapshot[] = [];
    snapshotRow2: Snapshot[] = [];
    snapshotRow3: Snapshot[] = [];
    snapshotRow4: Snapshot[] = [];
    snapshotRow5: Snapshot[] = [];
    snapshotRow6: Snapshot[] = [];

    @Output() dateSelection = new EventEmitter<Snapshot>();

    constructor(private calendarService: CalendarService) { }

    ngOnInit() {
        let date = new Date();
        this.populateYearSelect(date.getFullYear());
        this.selectedYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.setSnapshots(date.getFullYear(), this.currentMonth);
    }

    next() {
        if (this.currentMonth < 12) {
            this.setSnapshots(this.selectedYear, ++this.currentMonth);
        }
    }

    previous() {
        if (this.currentMonth > 1) {
            this.setSnapshots(this.selectedYear, --this.currentMonth);
        }
    }

    selectDate(snapshot: Snapshot) {
        this.dateSelection.emit(snapshot);
    }

    selectYearChange(event: any) {
        this.setSnapshots(event, this.currentMonth);
    }

    private setSnapshots(year: number, month: number) {

        this.resetRows();

        let monthsOfYear = this.calendarService.getMonthsOfYear();
        this.displayMonth = monthsOfYear[month - 1];

        let previous = this.calendarService.listSnapshots(year, month - 1);
        let current = this.calendarService.listSnapshots(year, month);
        let future = this.calendarService.listSnapshots(year, month + 1);

        this.addClassToSnapshots(previous);
        this.addClassToSnapshots(future);

        this.calculateFillFromPreviousMonth(current, previous);
        this.calculateFillFromNextMonth(current, future);
    }

    // give us the last subset of the previous month, and fill the current month
    private calculateFillFromPreviousMonth(current: Snapshot[], previous: Snapshot[]) {
        previous = previous.slice(previous.length - 7, previous.length);
        let index = previous.findIndex(s => s.day === 0);
        previous = previous.slice(index, previous.length);
        this.snapshotRow1 = this.snapshotRow1.concat(previous);
        let trackingIndex = 0;

        let updateSnapshotRow = (snapshotRow: Snapshot[]) => {
            while (snapshotRow.length < 7) {
                if (!current[trackingIndex]) {
                    break;
                }
                snapshotRow.push(current[trackingIndex]);
                trackingIndex++;
            }
        }
        updateSnapshotRow(this.snapshotRow1);
        updateSnapshotRow(this.snapshotRow2);
        updateSnapshotRow(this.snapshotRow3);
        updateSnapshotRow(this.snapshotRow4);
        updateSnapshotRow(this.snapshotRow5);
        updateSnapshotRow(this.snapshotRow6);
    }

    // give us the last subset of the future month, and fill the current month
    private calculateFillFromNextMonth(current: Snapshot[], future: Snapshot[]) {
        let futureTrackingIndex = 0;
        let updateFutureSnapshotRow = (snapshotRow: Snapshot[]) => {
            while (snapshotRow.length < 7) {
                if (!future[futureTrackingIndex]) {
                    break;
                }
                snapshotRow.push(future[futureTrackingIndex]);
                futureTrackingIndex++;
            }
        }
        updateFutureSnapshotRow(this.snapshotRow4);
        updateFutureSnapshotRow(this.snapshotRow5);
        updateFutureSnapshotRow(this.snapshotRow6);
    }


    private resetRows() {
        this.snapshotRow1 = [];
        this.snapshotRow2 = [];
        this.snapshotRow3 = [];
        this.snapshotRow4 = [];
        this.snapshotRow5 = [];
        this.snapshotRow6 = [];
    }

    private addClassToSnapshots(snapshot: Snapshot[]): void {
        snapshot.forEach(s => {
            s.class = "em-cal-day-disabled";
        });
    }

    private populateYearSelect(year: number): void {
        for (let i = 0; i < 10; i++) {
            this.selectYear.push(year);
            year++;
        }
    }
}
