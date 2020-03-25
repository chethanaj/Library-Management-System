import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
 
  opened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(public _authService: AuthService) {}

  ngOnInit() {
    // if (window.innerWidth < 768) {
    //   this.sidenav.fixedTopGap = 100;
    //   this.opened = false;
    // } else {
    //   this.sidenav.fixedTopGap = 100;
    //   this.opened = true;
    // }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth < 768) {
  //     this.sidenav.fixedTopGap = 60;
  //     this.opened = false;
  //   } else {
  //     this.sidenav.fixedTopGap = 60
  //     this.opened = true;
  //   }
  // }

  // isBiggerScreen() {
  //   const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //   if (width < 768) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
