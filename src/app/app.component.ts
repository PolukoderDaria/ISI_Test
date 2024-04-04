import { Component, OnInit } from '@angular/core';
import { usersMock } from './feature/list-page/mocks/users.mock';
import { typeMapping } from './feature/list-page/mocks/type-mapping.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'isi-test';

  public ngOnInit(): void {
    localStorage.setItem('users', JSON.stringify(usersMock));
    localStorage.setItem('mapping', JSON.stringify(typeMapping));
  }
}
