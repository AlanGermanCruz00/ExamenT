 
import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsapiService } from 'src/services/weather.service';
import { firstValueFrom } from 'rxjs';
import dictionaryUtils from 'src/utils/dictionary.utils';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
 
})
export class WeatherComponent implements OnInit {

  dictionaryUtils = dictionaryUtils
  climaList: any[] = [];
  loading: boolean = false;
  offset: number = 1;
  limit: number = 10;

  selectedClima: any = null;


  constructor(
    private newsapiService: NewsapiService,
    private ngbModal: NgbModal
  ) { }

  ngOnInit(): void { this.listweather(); }

  listweather() {
    if (this.loading) return;
    this.loading = true;

    firstValueFrom(this.newsapiService.getweather('weather', this.offset, this.limit)).then(data => {
      this.climaList.push(...data.articles);
      this.offset++;
      this.loading = false;
    }).catch(err => console.error(err));
  }

  openModels(news: any, content: any) {
    this.selectedClima = news;
    const modalRef = this.ngbModal.open(content, { centered: true, size: 'ms' });

    modalRef.result.finally(() => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    });
  }


  onScrollContainer(event: any): void {
    const div = event.target;
    const scrollPosition = div.scrollTop + div.clientHeight;
    const threshold = div.scrollHeight - 100;

    if (scrollPosition >= threshold && !this.loading) {
      this.listweather();
    }
  }

}