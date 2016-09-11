import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '../../model/model';

@Pipe({ name: 'dayOfWeek' })
export class DayOfWeekPipe implements PipeTransform {
    transform(value: number): string {
        return DayOfWeek[value];
    }
}