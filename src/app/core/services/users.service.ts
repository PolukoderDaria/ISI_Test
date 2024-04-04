import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserItem } from "../../feature/list-page/models/user.interface";
import { HttpClient } from "@angular/common/http";
import { MappingItem } from "../../feature/list-page/models/mapping.interface";
import { typeMapping } from "../../feature/list-page/mocks/type-mapping.mock";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _baseUrl = 'api/v2';

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService,
  ) {}

  public getUsers(): Observable<UserItem[]> {
    return of(JSON.parse(localStorage.getItem('users') as string));
  }

  public createUser(user: UserItem): void {
    const users = JSON.parse(localStorage.getItem('users') as string);
    const exisitingUser = users.find((exisitingUser: UserItem) => exisitingUser.username === user.username);

    if (!exisitingUser) {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this._toastrService.success('User was successfully created', undefined, {
        toastClass: 'custom-toast success',
      });
    } else {
      this._toastrService.error('User with such username already exist', undefined, {
        toastClass: 'custom-toast error',
      });
    }
  }

  public editUser(user: Partial<UserItem>): void {
    const users = JSON.parse(localStorage.getItem('users') as string);
    const userIndex = users.findIndex((existingUser: UserItem) => existingUser.id === user.id);
    const exisitingUser = users.find((exisitingUser: UserItem) => exisitingUser.username === user.username);

    if (!exisitingUser) {
      users[userIndex] = { ...users[userIndex], ...user };

      localStorage.setItem('users', JSON.stringify(users));
      this._toastrService.success('User was successfully updated', undefined, {
        toastClass: 'custom-toast success',
      });
    } else {
      this._toastrService.error('User with such username already exist', undefined, {
        toastClass: 'custom-toast error',
      });
    }
  }

  public deleteUser(id: number) {
    const users = JSON.parse(localStorage.getItem('users') as string);
    const userIndex = users.findIndex((existingUser: UserItem) => existingUser.id === id);
    users.splice(userIndex, 1);

    localStorage.setItem('users', JSON.stringify(users));

    this._toastrService.success('User was successfully deleted', undefined, {
      toastClass: 'custom-toast success',
    });
  }

  public getTypeMapping(): Observable<MappingItem[]> {
    return of(JSON.parse(localStorage.getItem('mapping') as string));
  }
}
