import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimplePaginationModule, ToggleButtonModule } from '@origo/ui';
import { PostItemComponent } from './components/post-tem/post-item.component';
import { NewPostItemComponent } from './containers/new-post-item/new-post-item.component';
import { PostDetailItemComponent } from './containers/post-detail-item/post-detail-item.component';
import { PostListComponent } from './containers/post-list/post-list.component';
import { FilterByTitlePipe } from './filter-by-title.pipe';
import { FilterByUserIdPipe } from './filter-by-userid.pipe';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent,
    PostDetailItemComponent,
    NewPostItemComponent,
    FilterByUserIdPipe,
    FilterByTitlePipe,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SimplePaginationModule,
    ToggleButtonModule,
    ReactiveFormsModule,
  ],
})
export class PostsModule {}
