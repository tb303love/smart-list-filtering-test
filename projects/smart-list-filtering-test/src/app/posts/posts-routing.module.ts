import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostItemComponent } from './containers/new-post-item/new-post-item.component';
import { PostDetailItemComponent } from './containers/post-detail-item/post-detail-item.component';
import { PostListComponent } from './containers/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'new',
    component: NewPostItemComponent,
  },
  {
    path: ':id',
    component: PostDetailItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
