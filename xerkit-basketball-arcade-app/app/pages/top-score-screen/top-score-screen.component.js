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
    Object.defineProperty(TopScoreScreenComponent.prototype, "timerCount", {
        get: function () {
            return this.minutes + ":" + this.seconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "nameOne", {
        get: function () {
            return "Xerkit";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "nameTwo", {
        get: function () {
            return "Raven";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "nameThree", {
        get: function () {
            return "Francis";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "nameFour", {
        get: function () {
            return "Mikee";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopScoreScreenComponent.prototype, "nameFive", {
        get: function () {
            return "Mike";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXNjb3JlLXNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFDLHNDQUEwRDtBQUMxRCxnQ0FBK0I7QUFDL0IsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFFdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9ELG1GQUE0RjtBQUM1Riw2QkFBZ0M7QUFRaEM7SUFNSSxpQ0FBb0IsS0FBVyxFQUFVLE9BQWU7UUFBcEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFMeEQsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUN0QixZQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ2pCLFlBQU8sR0FBUSxDQUFDLENBQUM7UUFJYixLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNwQix1REFBcUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixvREFBa0IsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFBLENBQUM7SUFFRiwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCw2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QkFBK0IsQ0FBQztTQUMvQyxDQUFDO3lDQU82QixXQUFJLEVBQW1CLGFBQU07T0FOL0MsdUJBQXVCLENBdUZuQztJQUFELDhCQUFDO0NBQUEsQUF2RkQsSUF1RkM7QUF2RlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RyZXRjaExhc3RDaGlsZFByb3BlcnR5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2RvY2stbGF5b3V0JztcbmxldCBzb3VuZCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zb3VuZCcpO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbnJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XG5cbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdBbm90aGVyIFBsdWdpbicsICdCeSBNYXN0ZXIgVGVjaG5vbG9neScpO1xuXG5pbXBvcnQgeyBzZXRDdXJyZW50T3JpZW50YXRpb24sIG9yaWVudGF0aW9uQ2xlYW51cCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zY3JlZW4tb3JpZW50YXRpb24nO1xuaW1wb3J0IHRpbWVyID0gcmVxdWlyZSgndGltZXInKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG9wLXNjb3JlLXNjcmVlbi1jb21wb25lbnRcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdG9wLXNjb3JlLXNjcmVlbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi90b3Atc2NvcmUtc2NyZWVuLWNvbW1vbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVG9wU2NvcmVTY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHRpbWU6IG51bWJlciA9IDE1MDAwMDtcbiAgICBzZWNvbmRzOiBhbnkgPSAwO1xuICAgIG1pbnV0ZXM6IGFueSA9IDA7XG4gICAgaW50ZXJ2YWw6IGFueTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5V2hpc3RsZSgpLCAyMDAwKTtcbiAgICB9XG5cbiAgICBwbGF5V2hpc3RsZSgpIHtcbiAgICAgICAgbGV0IHdoaXN0bGUgPSBzb3VuZC5jcmVhdGUoXCJ+L3NvdW5kcy93aGlzdGxlLm1wM1wiKS5wbGF5KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSB0aW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7dGhpcy5kZWNyZW1lbnRUaW1lcigpfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50VGltZXIoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZSAtIDEwMDA7XG4gICAgICAgIHRoaXMubXNUb1RpbWUodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICBnZXQgdGltZXJDb3VudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5taW51dGVzICsgXCI6XCIgKyB0aGlzLnNlY29uZHM7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWVPbmUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiWGVya2l0XCI7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWVUd28oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiUmF2ZW5cIjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZVRocmVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIkZyYW5jaXNcIjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZUZvdXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiTWlrZWVcIjtcbiAgICB9XG5cbiAgICBnZXQgbmFtZUZpdmUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiTWlrZVwiO1xuICAgIH1cblxuICAgIGdldCBzY29yZU9uZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCIyNVwiO1xuICAgIH1cbiAgICBnZXQgc2NvcmVUd28oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiMjRcIjtcbiAgICB9XG4gICAgZ2V0IHNjb3JlVGhyZWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiMjNcIjtcbiAgICB9XG4gICAgZ2V0IHNjb3JlRm91cigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCIyMlwiO1xuICAgIH1cbiAgICBnZXQgc2NvcmVGaXZlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIjIxXCI7XG4gICAgfVxuXG5cblxuXG5cbiAgICBtc1RvVGltZShkdXJhdGlvbikge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG51bGwsIG51bGwsIG51bGwsIDAsIDAsIDAsIGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gKGRhdGUuZ2V0TWludXRlcygpIDwgMTApID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB0aGlzLnNlY29uZHMgPSAoZGF0ZS5nZXRTZWNvbmRzKCkgPCAxMCkgPyBcIjBcIiArIGRhdGUuZ2V0U2Vjb25kcygpIDogZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgaWYodGhpcy5taW51dGVzID09IDAgJiYgdGhpcy5zZWNvbmRzID09IDApIHtcbiAgICAgICAgICAgIHRpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAvL3Nob3cgc2NvcmUgb3IgaWYgYW1vbmcgdG9wIHNjb3JlIHNob3cgaW5wdXQgZGlhbG9nIGZvciBsZWFkZXJib2FyZFxuICAgICAgICB9XG4gICAgfVxufSJdfQ==