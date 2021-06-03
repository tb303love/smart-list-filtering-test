import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface PageChangeEvent {
  length: number;
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
}

const DEFAULT_PAGE_SIZE = 5;

@Component({
  selector: 'ui-simple-pagination',
  templateUrl: './simple-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePaginationComponent {
  @Input() disabled = false;
  @Input()
  get pageIndex(): number {
    return this._pageIndex;
  }
  set pageIndex(value: number) {
    this._pageIndex = value;
    this.cdr.markForCheck();
  }
  private _pageIndex = 0;

  @Input()
  get length(): number {
    return this._length;
  }
  set length(value: number) {
    this._length = value;
    this.cdr.markForCheck();
  }
  private _length = 0;

  @Input()
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: number) {
    this._pageSize = value;
    this._updateDisplayedPageSizeOptions();
  }
  private _pageSize!: number;

  @Input()
  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = value;
    this._updateDisplayedPageSizeOptions();
  }
  private _pageSizeOptions: number[] = [];

  _displayedPageSizeOptions!: number[];

  @Output() onItemsPerPageChange = new EventEmitter<PageChangeEvent>();

  constructor(private cdr: ChangeDetectorRef) {}

  onChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;

    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }

  nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex++;
    this._emitPageEvent(previousPageIndex);
  }

  previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this.pageIndex;
    this.pageIndex--;
    this._emitPageEvent(previousPageIndex);
  }

  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }

  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }

  private getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }

  private _emitPageEvent(previousPageIndex: number) {
    this.onItemsPerPageChange.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }

  private _updateDisplayedPageSizeOptions() {
    if (!this.pageSize) {
      this._pageSize =
        this.pageSizeOptions.length != 0
          ? this.pageSizeOptions[0]
          : DEFAULT_PAGE_SIZE;
    }

    this._displayedPageSizeOptions = this.pageSizeOptions.slice();

    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }

    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this.cdr.markForCheck();
  }
}
