import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@origo/api';
import { Post } from '@origo/interfaces';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail-item',
  templateUrl: './post-detail-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailItemComponent implements OnInit {
  post$: Observable<Post | null> | undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      filter((params) => !!params),
      map((params) => params.get('id')),
      mergeMap((id) => (id ? this.apiService.getPostById(id) : EMPTY)),
      catchError((err) => of(null))
    );
  }
}
