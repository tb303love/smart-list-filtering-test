import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '@origo/interfaces';

@Pipe({ name: 'filterByUserId' })
export class FilterByUserIdPipe implements PipeTransform {
  transform(
    value: Post[],
    filter: { value: number; checked: boolean }[]
  ): Post[] {
    const filtered = filter.filter((item) => item.checked);
    const filteredPosts = value.filter((post) =>
      filtered.find(({ value }) => value === post.userId)
    );
    return filteredPosts
  }
}
