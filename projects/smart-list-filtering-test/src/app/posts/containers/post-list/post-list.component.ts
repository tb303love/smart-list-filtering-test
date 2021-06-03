import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ApiService, PostFilter } from '@origo/api';
import { Comment, Post } from '@origo/interfaces';
import { PageChangeEvent } from '@origo/ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

type PostsWithComments = Post & { comments?: Comment[] };

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  isLoading!: boolean;
  pageSizeOptions = [5, 10, 15, 25];

  readonly INITIAL_PAGE_SIZE_OPTIONS = {
    length: 100,
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
  };
  postsWithComments!: PostsWithComments[];
  toggle = new FormControl({ value: '1', checked: true });
  search = new FormControl();

  PostFilters = PostFilter;

  localListFilter!: FormGroup;

  private pageChange$ = new BehaviorSubject<PageChangeEvent>(
    this.INITIAL_PAGE_SIZE_OPTIONS
  );
  private afterDeleteTrigger$ = new BehaviorSubject<boolean>(false);

  trackById = (index: number, post: Post) => post.id;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.localListFilter = this.fb.group({
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    combineLatest([this.pageChange$, this.afterDeleteTrigger$])
      .pipe(
        map(([pageChangeEvent, isReloaded]) => ({
          pageChangeEvent,
          isReloaded,
        })),
        tap(() => (this.isLoading = true)),
        mergeMap(({ pageChangeEvent }) =>
          this.apiService.getPosts(
            this.transformPageChangeEventToFilter(pageChangeEvent)
          )
        )
      )
      .subscribe((posts) => {
        this.isLoading = false;
        this.postsWithComments = posts;

        this.getLocalFilterItems().clear();
        this.extractUserIds(posts).forEach((userId) =>
          this.getLocalFilterItems().push(
            this.fb.control({ value: userId, checked: true })
          )
        );

        this.cdr.markForCheck();
      });
  }

  onPageChange(page: PageChangeEvent): void {
    this.pageChange$.next({ ...page });
  }

  onClickDeletePost(postId: number) {
    this.apiService.deletePost(String(postId)).subscribe(() => {
      this.afterDeleteTrigger$.next(true);
    });
  }

  onClickReload(): void {
    this.pageChange$.next(this.INITIAL_PAGE_SIZE_OPTIONS);
  }

  onClickLoadComment(postId: number) {
    this.apiService
      .getCommentsByPostId(
        new HttpParams({
          fromObject: {
            postId,
          },
        })
      )
      .subscribe((comments) => {
        this.postsWithComments = this.postsWithComments.map((post) =>
          post.id === postId ? { ...post, comments } : post
        );
        this.cdr.markForCheck();
      });
  }

  get listControls(): AbstractControl[] {
    return this.getLocalFilterItems().controls;
  }

  private getLocalFilterItems(): FormArray {
    return this.localListFilter.get('items') as FormArray;
  }

  private extractUserIds(posts: Post[]): number[] {
    return posts.reduce((userIds, next) => {
      return userIds.length === 0 ||
        !userIds.find((value) => value === next.userId)
        ? [...userIds, next.userId]
        : [...userIds];
    }, [] as number[]);
  }

  private transformPageChangeEventToFilter(page: PageChangeEvent): HttpParams {
    return new HttpParams({
      fromObject: {
        [PostFilter.PAGE]: (page.pageIndex += 1),
        [PostFilter.LIMIT]: page.pageSize,
      },
    });
  }
}
