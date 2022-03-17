import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { fuseAnimations } from '../../../@fuse/animations/index';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.page.html',
  animations: fuseAnimations
})
export class HeaderPagePage implements OnInit {

  @Input()
  title: any;

  @Input()
  subTitle: any;

  @Input()
  icon: any;

  @Input()
  hasBack: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  back(): void {
    this.router.navigate(['/generar-carta']);
}

}
