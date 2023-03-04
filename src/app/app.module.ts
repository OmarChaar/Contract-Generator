import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

const firebaseConfig = {
  apiKey: "AIzaSyCq44TtfAq6DE1Alp4qojB6z5WwWHCvpbc",
  authDomain: "contractgenerator-14c7d.firebaseapp.com",
  projectId: "contractgenerator-14c7d",
  storageBucket: "contractgenerator-14c7d.appspot.com",
  messagingSenderId: "351431592795",
  appId: "1:351431592795:web:c7598a2d2917169b8a687e",
  measurementId: "G-C1N8CW9088"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
