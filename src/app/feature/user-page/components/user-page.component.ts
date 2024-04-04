import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, take, takeUntil, withLatestFrom } from "rxjs";
import { MappingItem } from "../../list-page/models/mapping.interface";
import { UsersService } from "../../../core/services/users.service";
import { EmailValidator } from "../../../shared/validators/email.validator";
import { UserItem } from "../../list-page/models/user.interface";
import { passwordValidator } from "../../../shared/validators/password.validator";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  public isNewUserPage: boolean = true;
  public formGroup!: FormGroup;
  public types$: Observable<MappingItem[]> = this._usersService.getTypeMapping();
  public isPasswordsMatch: boolean = false;
  public user: UserItem | null = null;
  public users: UserItem[] = [];
  public types: MappingItem[] = [];

  private _users$: Observable<UserItem[]> = this._usersService.getUsers();
  private _destroyed$ = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    private _usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        withLatestFrom(this._users$, this.types$),
        takeUntil(this._destroyed$)
      )
      .subscribe(([params, users, types]) => {
        this._initForm();
        this.types = types;
        this.isNewUserPage = !params['id'];
        this.users = users;

        if (params['id']) {
          this.user = users.find(user => user.id === +(params['id'] as string).replace(':', ''))!;
          this.formGroup.patchValue({
            ...this.user,
            type: this.types.find(type => type.label === this.user?.type)?.key,
          });

          this.isPasswordsMatch = this.formGroup.value.password === this.formGroup.value.repeatPass;
        }

      });

    this.formGroup.valueChanges.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(() => {
      this.isPasswordsMatch = this.formGroup.value.password === this.formGroup.value.repeatPass;
    });
  }

  public createUser() {
    this.isNewUserPage ? this._usersService.createUser({
      ...this.formGroup.value,
      id: this.users.length + 1,
      type: this.types.find(type => type.key === +this.formGroup.value.type)?.label,
    }) : this._usersService.editUser({
      ...this.user,
      ...this.formGroup.value,
      type: this.types.find(type => type.key === +this.formGroup.value.type)?.label,
    });

    this.close();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public close() {
    this._router.navigateByUrl('/users-list');
  }

  public deleteUser() {
    this._usersService.deleteUser(this.user!.id);
    this.close();
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, EmailValidator]],
      type: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator()]],
      repeatPass: ['', [Validators.required, passwordValidator()]],
    });
  }
}
 