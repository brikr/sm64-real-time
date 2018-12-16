import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatInputModule,
  ],
  exports: [
    MatCheckboxModule,
    MatInputModule,
  ]
})
export class MaterialModule {
}