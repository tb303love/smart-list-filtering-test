import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Comment, Post } from '@origo/interfaces';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class PostItemComponent implements OnChanges {
  @Input() postWithComments: (Post & { comments?: Comment[] }) | undefined;
  @Output() onClickToggleComments = new EventEmitter();
  loadingComments = false;
  collapsed = true;

  onClickComment() {
    if (!this.postWithComments?.comments?.length) {
      this.loadingComments = true;
      this.onClickToggleComments.emit();
    } else {
      this.toggleCollapsed();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes.postWithComments.firstChange &&
      changes.postWithComments.currentValue.comments
    ) {
      this.loadingComments = false;
      this.toggleCollapsed();
    }
  }

  private toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
