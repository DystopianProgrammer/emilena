import { Training } from './training';

declare abstract class Absence {
    holiday: Date[];
    sickness: Date[];
    reason: string;
}

export class ClientAbsence extends Absence {
    respite: boolean;
}

export class StaffAbsence extends Absence {
    training: Training[];
}