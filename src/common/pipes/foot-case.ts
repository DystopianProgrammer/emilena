import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'footCase' })
export class FootCasePipe implements PipeTransform {
    transform(value: string): string {
        return (value) ? value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase() : value;
    }
}