import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'secondsToDays' })
export class SecondsToDays implements PipeTransform {
  transform(seconds: number): string {
    try {
      const days = Math.round(seconds / 60 / 60 / 24);
      if (days > 0) {
        return `${days} days`;
      }
    } catch (e) {}
    return `Less than 1 day`;
  }
}
