import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BoardgamesComponent } from './boardgames/boardgames.component';
import { BoardgameComponent } from './boardgames/boardgame/boardgame.component';
import { BoardgameListComponent } from './boardgames/boardgame-list/boardgame-list.component';
import { BoardgameService } from './shared/boardgame.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    BoardgamesComponent,
    BoardgameComponent,
    BoardgameListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [BoardgameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
