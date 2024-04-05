import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', link: './list' },
    { label: 'Añadir', icon: 'add', link: './new-hero' },
    { label: 'Listado', icon: 'search', link: './search' },
  ]
}
