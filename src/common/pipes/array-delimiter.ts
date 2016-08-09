import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayDelimiter' })
export class ArrayDelimiter implements PipeTransform {
    transform(value: any[], separator?: string): string {
        if (separator && value) {
            return value.join(separator);
        } else if(value) {
            return value.join(', ');
        } else {
            return '';
        }
    }
}