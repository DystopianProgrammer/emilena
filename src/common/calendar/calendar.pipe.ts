import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'paddedDate' })
export class PaddedDatePipe implements PipeTransform {

    transform(value: number): string {
        return (value < 10) ? `0${value}` : `${value}`;
    }
}