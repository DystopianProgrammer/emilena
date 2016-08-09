import { DayOfWeek } from '../../model/model';

export class DayOfWeekSerializer {

    private static dayOfWeekSerializer: DayOfWeekSerializer;
    private _dayOfWeek: DayOfWeek;
    private _daysOfWeek: DayOfWeek[];

    private DayOfWeekSerializer() { }

    static getInstance() {
        if(!DayOfWeekSerializer.dayOfWeekSerializer) {
            DayOfWeekSerializer.dayOfWeekSerializer = new DayOfWeekSerializer();
        }
        return DayOfWeekSerializer.dayOfWeekSerializer;
    }

    fromObject(dayOfWeek: DayOfWeek): string {
        this._dayOfWeek = dayOfWeek;
        switch(dayOfWeek) {
            case 0: return 'MONDAY';
            case 1: return 'TUESDAY';
            case 2: return 'WEDNESDAY';
            case 3: return 'THURSDAY';
            case 4: return 'FRIDAY';
            case 5: return 'SATURDAY';
            case 6: return 'SUNDAY';
            default: throw Error('Unknown value');
        }
    }

    fromCollection(daysOfWeek: DayOfWeek[]): string[] {
        this._daysOfWeek = daysOfWeek;
        return this._daysOfWeek.map(dayOfWeek => this.fromObject(dayOfWeek));
    }
}