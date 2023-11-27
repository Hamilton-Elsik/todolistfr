import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<boolean>();
  CloseSidebar() {
    this.closeSidebar.emit(true);
  }
}
