import { TopScoreScreenComponent } from './pages/top-score-screen/top-score-screen.component';
import { NgModule } from "@angular/core";
import { PlayScreenComponent } from "./pages/play-screen/play-screen.component";
import { LandingScreenComponent } from "./pages/landing-screen/landing-screen.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


const routes: Routes = [
  { path: "", redirectTo: "/landing-screen", pathMatch: "full" },
    { path: "top-score-screen-component", component:  TopScoreScreenComponent},
    { path: "landing-screen", component: LandingScreenComponent},
    { path: "play-screen", component: PlayScreenComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }