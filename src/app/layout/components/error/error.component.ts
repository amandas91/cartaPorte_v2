import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit, OnDestroy {
  pageTitle?: string;
  errorCode?: number;
  errorMessage?: string;
  errorMessageHidden?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      if (routeData.pageTitle) {
        this.pageTitle = routeData.pageTitle;
      }
      if (routeData.errorCode) {
        this.errorCode = routeData.errorCode;
      }
      if (routeData.errorMessage) {
        this.errorMessage = routeData.errorMessage;
      }
      if (routeData.errorMessageHidden) {
        this.errorMessageHidden = routeData.errorMessageHidden;
      }
    });
  }

  ngOnDestroy(): void {
  }

  previousState(): void {
    window.history.back();
  }
}
