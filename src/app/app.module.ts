import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { AppComponent } from './app.component';
import { ContractGeneratorComponent } from './pages/contract-generator/contract-generator.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './pages/collection/collection.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { OptionsDialogComponent } from './components/options-dialog/options-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PromptComponent } from './components/prompt/prompt.component';
import {MatMenuModule} from '@angular/material/menu';


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
    ContractGeneratorComponent,
    CollectionComponent,
    ClientsComponent,
    OptionsDialogComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    CdkAccordionModule,
    MatTableModule,
    DragDropModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
