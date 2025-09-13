import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsService } from 'src/services/documents.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dictionaryUtils from 'src/utils/dictionary.utils';
import { SinginService } from '../../services/singin.service';


@Component({
  selector: 'app-stranger',
  templateUrl: './stranger.component.html',
})
export class StrangerComponent implements OnInit {
  tableData: any[] = [];
  loading: boolean = false;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';
  dictionaryUtils = dictionaryUtils

  private showDocumentToastOnce = true;

  deleteId = new FormControl('', [Validators.required]);
  selectedFile: File | null = null;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private ngbModal: NgbModal,
    private singinService: SinginService

  ) { }

  ngOnInit(): void { this.onSubmitConsultar() }

  private handleAuthError(err: any) {
    if (err.status === 401) {
      this.singinService.logout();
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }


  onSubmitConsultar(): void {
    this.documentsService.showDocuments().then((res) => {
      let documents: any[] = [];

      if (Array.isArray(res.response)) {
        documents = res.response;
      } else if (res.response && typeof res.response === 'object') {
        if (Array.isArray(res.response.documents)) {
          documents = res.response.documents;
        } else {
          documents = [res.response];
        }
      }
      this.tableData = documents.map((doc: any) => ({ ...doc, name: doc.name?.replace(/\.[^/.]+$/, "") || '', path_: doc.path_ }));

      if (this.showDocumentToastOnce) {
        this.showBootstrapToast(dictionaryUtils.messages.documentShow, 'success');
        this.showDocumentToastOnce = false;
      }
    }).catch((err) => {
      if (!this.handleAuthError(err)) { this.showBootstrapToast(dictionaryUtils.messages.invalidDoumentShow, 'danger'); }
    });
  }


  onSubmitDelete(id: number): void {
    this.documentsService.deleteDocumenst(id).then((res) => {
      this.tableData = this.tableData.filter((row) => row.id_doc !== id);
      this.showBootstrapToast(dictionaryUtils.messages.documentDelete, 'success');

    }).catch((err) => {
      if (!this.handleAuthError(err)) {
        this.showBootstrapToast(dictionaryUtils.messages.invalidDocumentDelete, 'danger');
      }
    });
  }



  onFileSelected(event: any): void { this.selectedFile = event.target.files[0]; }

 onSubmitSubir(event: any) {
  event.preventDefault();

  const fileInput = event.target.querySelector('input[type="file"]');
  if (!fileInput || !fileInput.files.length) return;

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  this.documentsService.uploadDocument(formData).then(res => {
      this.showBootstrapToast(dictionaryUtils.messages.documentoUpdate, 'success');
      this.onSubmitConsultar();
    }).catch(err => {
   
      if (err.status === 400) {
        this.showBootstrapToast(dictionaryUtils.messages.invalidDocumentAdd, 'danger'); 
      } else if (!this.handleAuthError(err)) {
        this.showBootstrapToast(dictionaryUtils.messages.invalidAnimalsUpdate, 'danger');
      }
    });
}



  onScrollContainer(event: any): void {
    const div = event.target;
    const scrollPosition = div.scrollTop + div.clientHeight;
    const threshold = div.scrollHeight - 100;

    if (scrollPosition >= threshold && !this.loading) {
      this.onSubmitConsultar();
    }
  }

  showBootstrapToast(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}