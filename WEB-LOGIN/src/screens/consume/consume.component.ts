import { Component, HostListener, OnInit } from '@angular/core';
import { PokeapiService } from 'src/services/pokeapi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import dictionaryUtils from 'src/utils/dictionary.utils';


@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',

})
export class ConsumeComponent implements OnInit {
 dictionaryUtils = dictionaryUtils
  pokemonList: any[] = [];
  loading: boolean = false;
  offset: number = 0;
  limit: number = 10;

  selectedPokemon: any = null;
  loadingPokemon: boolean = false;

  constructor(
    private pokeapiService: PokeapiService,
    private ngbModal: NgbModal
  ) { }

  ngOnInit(): void { this.listPokemon(); }

listPokemon() {
  if (this.loading) return;
  this.loading = true;

  firstValueFrom(this.pokeapiService.getPokemonList(this.limit, this.offset)).then(data => {
      this.pokemonList.push(...data.results); // agrega los nuevos
      this.offset += this.limit;
      this.loading = false;
    }).catch(err =>  console.error(err));
}

  openModels(pokemonName: string, content: any) {
    this.loadingPokemon = true;
    firstValueFrom(this.pokeapiService.getPokemonDetail(pokemonName)).then(data => {
      this.selectedPokemon = data;
      this.loadingPokemon = false;

      this.ngbModal.open(content, { centered: true, size: 'sm' });
    })
      .catch(err => console.error(err));
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;
    if (scrollPosition >= threshold && !this.loading) {
      this.listPokemon();
    }
  }

  onScrollContainer(event: any): void {
    const div = event.target;
    const scrollPosition = div.scrollTop + div.clientHeight;
    const threshold = div.scrollHeight - 100;

    if (scrollPosition >= threshold && !this.loading) {
      this.listPokemon();
    }
  }

}