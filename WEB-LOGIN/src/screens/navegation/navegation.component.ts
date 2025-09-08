import { Component } from '@angular/core';
import { Router } from '@angular/router';
import dictionaryUtils from 'src/utils/dictionary.utils';
declare var bootstrap: any;

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html'
})
export class NavegationComponent {
  dictionaryUtils = dictionaryUtils
  
  constructor(private router: Router) { }

  closeOffcanvas() {
    const offcanvasEl = document.getElementById('offcanvasMenu');
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
  }

  navigate(route: string) { // const currentRoute = this.router.url;

    if (route === route) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([route]);
      });
    } else {
      this.router.navigate([route]);
    }
    this.closeOffcanvas();
  }

  logout() {
  
  localStorage.clear();  
  this.router.navigate(['/login']);   
}

}
