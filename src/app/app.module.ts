import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IndexPageComponent } from './index-page/index-page.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent  // Declar el componente aquí
  ],
  imports: [
    IndexPageComponent,
    BrowserModule
    
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    IndexPageComponent // Export if used in another module
  ]
})
export class AppModule { }
