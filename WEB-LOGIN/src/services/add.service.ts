import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SigninService } from './singin.service';

@Injectable({
  providedIn: 'root'
})

export class AddService {

  constructor(private https: HttpClient, private singinService: SigninService) { }

  private basePath = environment.hostApi + '/animals';

  AddAnimals(name: string, race: string, size: string, color: string, yearborn: string, year: string): Promise<any> {
    const body = { name, race, size, color, yearborn, year };
    return firstValueFrom(
      this.https.post(`${this.basePath}/create`, body, this.singinService.getAuthHeader())
    );
  }

  showAnimals(): Promise<any> {
    return firstValueFrom(
      this.https.get(`${this.basePath}/getAll`, this.singinService.getAuthHeader())).then((response: any) => {
      console.log("Tabla De Mascotas: ", response);
      return response;
    });
  }

  deleteAnimal(id: number): Promise<any> {
    console.log("Mascota Eliminada: ", id);
    return firstValueFrom(
      this.https.delete(`${this.basePath}/delete/${id}`, this.singinService.getAuthHeader())
    );
  }

  updateAnimals(id: number, animalData: any): Promise<any> {
    console.log("Datos de Mascota Actualizados: ", animalData);
    return firstValueFrom(
      this.https.put(`${this.basePath}/update/${id}`, animalData, this.singinService.getAuthHeader())
    );
  }
}
