import { Component, OnInit } from "@angular/core";
import { UserItem } from "./models/user.interface";
import { Observable } from "rxjs";
import { UsersService } from "../../core/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  public dataSource$: Observable<UserItem[]> | null = null;
  public displayedColumns = [
    'username', 'firstName', 'lastName', 'email', 'type',
  ]

  constructor(
    private _userService: UsersService,
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this.dataSource$ = this._userService.getUsers();
  }
  
  public openUserPage(): void {
    this._router.navigate(['/', 'user', 'new']);
  }

  public redirectOnUserPage(id: number) {
    this._router.navigateByUrl(`/user/:${id}`);
  }
}