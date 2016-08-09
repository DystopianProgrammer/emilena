export class Utils {

    static abbrevDay(day: string) {
        switch(day) {
            case 'MONDAY': return 'Mo';
            case 'TUESDAY': return 'Tu';
            case 'WEDNESDAY': return 'We';
            case 'THURSDAY': return 'Th';
            case 'FRIDAY': return 'Fr';
            default: return '';
        }
    }

    static abbrevDays(days: string[]) {
        return days.map(day => Utils.abbrevDay(day));
    }
}