import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddService } from 'src/services/add.service';
import { AddAnimalsComponent } from '../add-animals/add-animals.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dictionaryUtils from 'src/utils/dictionary.utils';
import { SinginService } from '../../services/singin.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})

export class TableComponent implements OnInit {
  tableData: any[] = [];

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';
  dictionaryUtils = dictionaryUtils

 

  deleteId = new FormControl('', [Validators.required]);

  constructor(
    private addService: AddService,
    private router: Router,
    private ngbModal: NgbModal,
    private singinService: SinginService

  ) { }

  ngOnInit(): void {}

  private handleAuthError(err: any) {
    if (err.status === 401) {
      this.singinService.logout();
      console.log('ERROR DE TOKEN')
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }



  onSubmitConsultar(): void {
    this.addService.showAnimals().then((res) => {
      this.tableData = Array.isArray(res.response) ? res.response : [res.response];
      this.showBootstrapToast(dictionaryUtils.messages.animalsShow, 'success');
    }).catch(err => {
      if (!this.handleAuthError(err)) {
        this.showBootstrapToast(dictionaryUtils.messages.invalidAnimalsShow, 'danger');
      }
    });
  }

  onSubmitDelete(id: number): void {
    this.addService.deleteAnimal(id).then((res) => {
      this.tableData = this.tableData.filter(row => row.id_animal !== id);
      this.showBootstrapToast(dictionaryUtils.messages.animalsDelete || 'Mascota eliminada', 'success');
    }).catch(err => {
      if (!this.handleAuthError(err)) {
        this.showBootstrapToast(dictionaryUtils.messages.invalidAnimalsDelete || 'Error al eliminar mascota', 'danger');
      }
    });
  }

  onSubmitModels(actionFrom: 'create' | 'update', row?: any) {
    this.onSubmitConsultar();
    const animalsForm = this.ngbModal.open(AddAnimalsComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false

    });

    if (actionFrom === 'create') {
      animalsForm.componentInstance.actionType = 'create';
    } else {
      animalsForm.componentInstance.actionType = 'update';
      animalsForm.componentInstance.animalId = row.id_animal;
      animalsForm.componentInstance.AnimalsForm.patchValue(row);
    }

    animalsForm.result.then((res) => {
      if (res?.success) {
        this.onSubmitConsultar();
        this.showBootstrapToast(dictionaryUtils.messages.animalsAdd || 'Mascota agregada', 'success');
      } else if (res?.updated) {
        this.onSubmitConsultar();
        this.showBootstrapToast(dictionaryUtils.messages.animalsUpdate || 'Mascota actualizada', 'success');
      }
    }).catch(() => { });
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



