import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizeFirst' })
export class CapitalizeFirst implements PipeTransform {
    transform(value: string): string {
        return (value) ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
    }
}