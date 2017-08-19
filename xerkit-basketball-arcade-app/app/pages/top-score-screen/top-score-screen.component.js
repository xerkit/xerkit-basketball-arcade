"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sound = require('nativescript-sound');
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
require("nativescript-localstorage");
localStorage.setItem('Another Plugin', 'By Master Technology');
var nativescript_screen_orientation_1 = require("nativescript-screen-orientation");
var timer = require("timer");
var TopScoreScreenComponent = (function () {
    function TopScoreScreenComponent(_page, _ngZone) {
        this._page = _page;
        this._ngZone = _ngZone;
        this.time = 150000;
        this.seconds = 0;
        this.minutes = 0;
        this.playerRow = 0;
        this.playersName = ["Mark", "Mikee", "Raven", "Francis", "Edsil"];
        _page.on("navigatedTo", function () {
            nativescript_screen_orientation_1.setCurrentOrientation("landscape", function () {
                console.log("landscape orientation");
            });
        });
        _page.on("navigatingFrom", function () {
            nativescript_screen_orientation_1.orientationCleanup();
        });
    }
    ;
    TopScoreScreenComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        var self = this;
        setTimeout(this.playWhistle(), 2000);
    };
    TopScoreScreenComponent.prototype.playWhistle = function () {
        var _this = this;
        var whistle = sound.create("~/sounds/whistle.mp3").play();
        this.interval = timer.setInterval(function () { _this.decrementTimer(); }, 1000);
    };
    TopScoreScreenComponent.prototype.decrementTimer = function () {
        this.time = this.time - 1000;
        this.msToTime(this.time);
    };
    TopScoreScreenComponent.prototype.playersRow = function (index) {
        return this.playerRow = index + 1;
    };
    Object.defineProperty(TopScoreScreenComponent.prototype, "timerCount", {
        get: function () {
            return this.minutes + ":" + this.seconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "scoreOne", {
        get: function () {
            return "25";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "scoreTwo", {
        get: function () {
            return "24";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "scoreThree", {
        get: function () {
            return "23";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "scoreFour", {
        get: function () {
            return "22";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "scoreFive", {
        get: function () {
            return "21";
        },
        enumerable: true,
        configurable: true
    });
    TopScoreScreenComponent.prototype.msToTime = function (duration) {
        var date = new Date(null, null, null, 0, 0, 0, duration);
        this.minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        this.seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
        if (this.minutes == 0 && this.seconds == 0) {
            timer.clearInterval(this.interval);
            //show score or if among top score show input dialog for leaderboard
        }
    };
    TopScoreScreenComponent = __decorate([
        core_1.Component({
            selector: "top-score-screen-component",
            moduleId: module.id,
            templateUrl: "./top-score-screen.component.html",
            styleUrls: ["./top-score-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, core_1.NgZone])
    ], TopScoreScreenComponent);
    return TopScoreScreenComponent;
}());
exports.TopScoreScreenComponent = TopScoreScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXNjb3JlLXNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFDLHNDQUEwRDtBQUMxRCxnQ0FBK0I7QUFDL0IsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFFdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9ELG1GQUE0RjtBQUM1Riw2QkFBZ0M7QUFRaEM7SUFRSSxpQ0FBb0IsS0FBVyxFQUFVLE9BQWU7UUFBcEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFQeEQsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUN0QixZQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ2pCLFlBQU8sR0FBUSxDQUFDLENBQUM7UUFFakIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixnQkFBVyxHQUFrQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUdyRSxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNwQix1REFBcUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixvREFBa0IsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFBLENBQUM7SUFFRiwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFD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cG9ydCB7IHN0cmV0Y2hMYXN0Q2hpbGRQcm9wZXJ0eSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9kb2NrLWxheW91dCc7XG5sZXQgc291bmQgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtc291bmQnKTtcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5yZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIiApO1xuXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnQW5vdGhlciBQbHVnaW4nLCAnQnkgTWFzdGVyIFRlY2hub2xvZ3knKTtcblxuaW1wb3J0IHsgc2V0Q3VycmVudE9yaWVudGF0aW9uLCBvcmllbnRhdGlvbkNsZWFudXAgfSBmcm9tICduYXRpdmVzY3JpcHQtc2NyZWVuLW9yaWVudGF0aW9uJztcbmltcG9ydCB0aW1lciA9IHJlcXVpcmUoJ3RpbWVyJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRvcC1zY29yZS1zY3JlZW4tY29tcG9uZW50XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RvcC1zY29yZS1zY3JlZW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vdG9wLXNjb3JlLXNjcmVlbi1jb21tb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRvcFNjb3JlU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB0aW1lOiBudW1iZXIgPSAxNTAwMDA7XG4gICAgc2Vjb25kczogYW55ID0gMDtcbiAgICBtaW51dGVzOiBhbnkgPSAwO1xuICAgIGludGVydmFsOiBhbnk7XG4gICAgcGxheWVyUm93OiBOdW1iZXIgPSAwO1xuICAgIHBsYXllcnNOYW1lOiBBcnJheTxTdHJpbmc+ID0gW1wiTWFya1wiICxcIk1pa2VlXCIsXCJSYXZlblwiLFwiRnJhbmNpc1wiLFwiRWRzaWxcIl07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5V2hpc3RsZSgpLCAyMDAwKTtcbiAgICB9XG5cbiAgICBwbGF5V2hpc3RsZSgpIHtcbiAgICAgICAgbGV0IHdoaXN0bGUgPSBzb3VuZC5jcmVhdGUoXCJ+L3NvdW5kcy93aGlzdGxlLm1wM1wiKS5wbGF5KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSB0aW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7dGhpcy5kZWNyZW1lbnRUaW1lcigpfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50VGltZXIoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZSAtIDEwMDA7XG4gICAgICAgIHRoaXMubXNUb1RpbWUodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICBwbGF5ZXJzUm93KCBpbmRleCApOiBOdW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJSb3cgPSBpbmRleCArIDE7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVyQ291bnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWludXRlcyArIFwiOlwiICsgdGhpcy5zZWNvbmRzO1xuICAgIH1cblxuICAgIGdldCBzY29yZU9uZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCIyNVwiO1xuICAgIH1cbiAgICBnZXQgc2NvcmVUd28oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiMjRcIjtcbiAgICB9XG4gICAgZ2V0IHNjb3JlVGhyZWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiMjNcIjtcbiAgICB9XG4gICAgZ2V0IHNjb3JlRm91cigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCIyMlwiO1xuICAgIH1cbiAgICBnZXQgc2NvcmVGaXZlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIjIxXCI7XG4gICAgfVxuXG5cblxuXG5cbiAgICBtc1RvVGltZShkdXJhdGlvbikge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG51bGwsIG51bGwsIG51bGwsIDAsIDAsIDAsIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gKGRhdGUuZ2V0TWludXRlcygpIDwgMTApID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB0aGlzLnNlY29uZHMgPSAoZGF0ZS5nZXRTZWNvbmRzKCkgPCAxMCkgPyBcIjBcIiArIGRhdGUuZ2V0U2Vjb25kcygpIDogZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgaWYodGhpcy5taW51dGVzID09IDAgJiYgdGhpcy5zZWNvbmRzID09IDApIHtcbiAgICAgICAgICAgIHRpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAvL3Nob3cgc2NvcmUgb3IgaWYgYW1vbmcgdG9wIHNjb3JlIHNob3cgaW5wdXQgZGlhbG9nIGZvciBsZWFkZXJib2FyZFxuICAgICAgICB9XG4gICAgfVxufVxuIl19