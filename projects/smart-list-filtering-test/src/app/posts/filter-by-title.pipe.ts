import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '@origo/interfaces';

@Pipe({ name: 'filterByTitle' })
export class FilterByTitlePipe implements PipeTransform {
  transform(value: Post[], search: any): Post[] {
    if (!search) {
      return value;
    }

    return value.filter((item) => item.title.trim().match(new RegExp(search, 'gi')));
  }
}
