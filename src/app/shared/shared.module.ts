import { NgModule } from "@angular/core";

import { RequiredDirective } from "./directives/required.directive";

@NgModule({
  declarations: [
    RequiredDirective
  ],
  exports: [
    RequiredDirective,
  ]
})
export class SharedModule {}
