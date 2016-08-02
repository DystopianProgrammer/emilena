import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zeroPad' })
export class ZeroPadPipe implements PipeTransform {
    transform(value: number): string {
        return (value < 10) ? `0${value}` : `${value}`;
    }
}