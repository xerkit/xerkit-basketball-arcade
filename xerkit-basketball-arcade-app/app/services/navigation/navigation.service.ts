import { RouterExtensions } from 'nativescript-angular';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Subject }    from 'rxjs/Subject';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class NavigationService {
  constructor(private _router: RouterExtensions) {}
  
  public backToPreviousPage() {
    if (this._router.canGoBack()) {
      this._router.back();
    } else {
      this.navigateToLandingScreen(true);
    }
  }

  public navigateToPlayScreen(clearHistory: boolean = false){
    this._router.navigate(["/play-screen"], { clearHistory: clearHistory });
  }

  public navigateToLandingScreen(clearHistory: boolean = false){
    this._router.navigate(["/landing-screen"], { clearHistory: clearHistory });
  }

  private handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}