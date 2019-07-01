import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexStatusComponent } from './index-status/index-status.component';
import { IndexMenuComponent } from './index-menu/index-menu.component';
import { IndexMessageComponent } from './index-message/index-message.component';
import { RouterModule } from '@angular/router';
import { LibsModule } from 'src/app/libs/libs.module';

@NgModule({
  declarations: [
    IndexComponent,
    IndexStatusComponent,
    IndexMenuComponent,
    IndexMessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LibsModule,
  ],
})
export class IndexModule { }
