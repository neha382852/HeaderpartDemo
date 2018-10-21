import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule , MatInputModule,MatCardModule} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AgmCoreModule} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {MatSelectModule} from '@angular/material/select';

import 'hammerjs';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { ReminderComponent } from './reminder/reminder.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    MainContentComponent,
    MapComponent,
    ReminderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    AgmCoreModule.forRoot(
      {
        apiKey:'AIzaSyA9v-ByUMauD8TazXdViq_f7RF-EHru86A'
      }
    ), AgmDirectionModule,
    MatCardModule,
    AgmSnazzyInfoWindowModule,
    [BrowserAnimationsModule],

    RouterModule.forRoot([
      { path: '',redirectTo: '/Home', pathMatch: 'full' },
      { path: 'Home/:selected',component: MainContentComponent},
      { path: 'restaurant/:selected',component: MainContentComponent},
      { path: 'store/:selected',component: MainContentComponent},
      {path:'attractions/:selected',component:MainContentComponent},
      // {path:':selected',component:AppComponent},
      { path: '**',redirectTo: '/Home'},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
