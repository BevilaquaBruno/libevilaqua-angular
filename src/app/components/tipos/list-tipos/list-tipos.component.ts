import { Component, ViewChild } from '@angular/core';
import { TipoInterface } from '../tipo.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { TipoService } from '../tipo.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tipos',
  templateUrl: './list-tipos.component.html',
})
export class ListTiposComponent {
  listTypes: TipoInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0 };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;

  constructor(
    private service: TipoService,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.isValid().subscribe(
      () => { },
      (error) => {
        if (error.status === 401) this.router.navigate(['/login']);
      }
    );
    const storageItensPerPage = localStorage.getItem('itensPerPage');
    if (storageItensPerPage != null) {
      this.itensPerPage = parseInt(storageItensPerPage);
    }
  }

  openNewType() {
    this.router.navigate(['/tipos/cadastrar']);
  }

  openConfirmDeleteType(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeleteType() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updateTypeList();
  }

  confirmDeleteType() {
    if (this.deleteData.id != 0) {
      this.service.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeleteType();
          }
        }, (error) => {
          console.log('Erro ao deletar usuário');
        });
    }
  }

  updateTypeList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((types) => {
        this.maxRegisters = types.count;
        this.listTypes = types.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  ngOnInit(): void {
    this.updateTypeList();
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updateTypeList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updateTypeList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updateTypeList();
  }

}
