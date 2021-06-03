import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@origo/api';
import { User } from '@origo/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'new-post-item',
  templateUrl: './new-post-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostItemComponent implements OnInit {
  users$!: Observable<Pick<User, 'id' | 'name'>[]>;
  newPostFromGroup: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newPostFromGroup = this.fb.group({
      title: this.fb.control('', Validators.required),
      body: this.fb.control('', Validators.required),
      userId: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.users$ = this.apiService
      .getUsers()
      .pipe(
        map((users) => users.map((user) => ({ id: user.id, name: user.name })))
      );
  }

  createNewPost(): void {
    this.apiService
      .createPost(this.newPostFromGroup.value)
      .subscribe(() => this.router.navigate(['posts']));
  }
}
