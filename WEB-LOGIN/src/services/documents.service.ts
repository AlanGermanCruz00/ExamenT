import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SinginService } from './singin.service';

@Injectable({
    providedIn: 'root'
})

export class DocumentsService {

    constructor(private https: HttpClient, private singinService: SinginService) { }

    private basePath = environment.host + '/api/documents';


    showDocuments(): Promise<any> {
    return firstValueFrom(
      this.https.get(`${this.basePath}/getdocuments`, this.singinService.getAuthHeader())).then((response: any) => {
      return response;
    });
  }

  deleteDocumenst(id: number): Promise<any> {
    return firstValueFrom(
      this.https.delete(`${this.basePath}/deletedocuments/${id}`, this.singinService.getAuthHeader())
    );
  }

  uploadDocument(formData: FormData): Promise<any> {
    return firstValueFrom(
      this.https.post(`${this.basePath}/updatedocuments`, formData, {
        headers: this.singinService.getAuthHeader().headers, 
      })
    );
  }

 
}