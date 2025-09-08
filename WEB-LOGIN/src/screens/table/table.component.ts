import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddService } from 'src/services/add.service';
import { AddAnimalsComponent } from '../add-animals/add-animals.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dictionaryUtils from 'src/utils/dictionary.utils';

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

  constructor(private addService: AddService,
    private router: Router,
    private ngbModal: NgbModal
  ) { }

  ngOnInit(): void { }

  onSubmitConsultar(): void {
      this.showBootstrapToast(dictionaryUtils.messages.animalsShow, 'success');
    this.addService.showAnimals().then((res) => {
      this.tableData = Array.isArray(res.response) ? res.response : [res.response];
    }).catch(err => {
       this.showBootstrapToast(dictionaryUtils.messages.invalidAnimalsShow, 'danger')
    });
  }


  onSubmitDelete(id: number): void {
    console.log(id)
   this.showBootstrapToast(dictionaryUtils.messages.animalsDelete, 'success');

    this.addService.deleteAnimal(id).then((res) => {
      this.tableData = this.tableData.filter(row => row.id_animal !== id);
    }).catch(err => {
       this.showBootstrapToast(dictionaryUtils.messages.invalidAnimalsDelete , 'danger');
    });
  }

  onSubmitModels(actionFrom: 'create' | 'update', row?: any) {
    const animlsFrom = this.ngbModal.open(AddAnimalsComponent, { size: 'lg', centered: true, backdrop: 'static', keyboard: false });
    if (actionFrom === 'create') {
      animlsFrom.componentInstance.actionType = 'create';

    } else {
      animlsFrom.componentInstance.actionType = 'update'; // console.log("Id A Actualizar: ", row?.id_animal);
      animlsFrom.componentInstance.animalId = row.id_animal;
      animlsFrom.componentInstance.AnimalsForm.patchValue(row);
    }

    animlsFrom.result.then((res) => {
      if (res?.success) {
        this.onSubmitConsultar();
         this.showBootstrapToast(dictionaryUtils.messages.animalsAdd , 'success');
      } else if (res?.updated) {
        this.onSubmitConsultar();
        this.showBootstrapToast(dictionaryUtils.messages.animalsUpdate, 'success')
      }
    });

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



