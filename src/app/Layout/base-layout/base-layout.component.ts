import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent {
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  value = 'over';
  actSidebar(state: boolean) {
    if (this.drawer) {
      this.drawer.open();
    }
  }
  CloseSidebar(state: boolean) {
    if (this.drawer) {
      this.drawer.close();
    }
  }
}
