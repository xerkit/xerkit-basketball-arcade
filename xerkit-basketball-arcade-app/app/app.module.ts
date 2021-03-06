import { TopScoreScreenComponent } from './pages/top-score-screen/top-score-screen.component';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { LandingScreenComponent } from "./pages/landing-screen/landing-screen.component";
import { PlayScreenComponent } from "./pages/play-screen/play-screen.component";
import { NavigationService } from "./services/navigation/navigation.service";
import { BluetoothService } from "./services/bluetooth/bluetooth.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LandingScreenComponent,
        PlayScreenComponent,
        TopScoreScreenComponent
    ],
    providers: [
        NavigationService,
        BluetoothService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
