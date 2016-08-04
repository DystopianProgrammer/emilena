import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'unspecified' })
export class Unspecified implements PipeTransform {
    transform(value: string): string {
        return (!value) ? 'Unspecified' : value;
    }
}