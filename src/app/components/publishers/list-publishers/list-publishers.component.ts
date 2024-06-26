import { Component, ViewChild } from '@angular/core';
import { PublisherInterface } from '../publisher.interface';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { PublisherService } from '../publisher.service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../../general/popup/popup.component';

@Component({
  selector: 'app-list-publishers',
  templateUrl: './list-publishers.component.html'
})
export class ListPublishersComponent {
  listPublishers: PublisherInterface[] = [];
  currentPage: number = 1;
  itensPerPage: number = 10;
  maxPages: number = 0;
  maxRegisters: number = 0;
  deleteData = { id: 0, message: '' };

  @ViewChild(ConfirmDialogComponent) confirmationDialog!: ConfirmDialogComponent;
  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor(
    private service: PublisherService,
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

  openNewPublisher() {
    this.router.navigate(['/editoras/cadastrar']);
  }

  openConfirmDeletePublisher(id: number) {
    this.deleteData.id = id;
    this.confirmationDialog.openModal();
  }

  finishDeletePublisher() {
    this.deleteData.id = 0;
    this.confirmationDialog.closeModal();
    this.updatePublisherList();
  }

  confirmDeletePublisher() {
    if (this.deleteData.id != 0) {
      this.service.delete(this.deleteData.id).subscribe(
        (success) => {
          if (success.affected != 0) {
            this.finishDeletePublisher();
          }
        }, (e) => {
          this.deleteData.message = e.error.message;
          this.popup.initPopup();
          this.popup.showPopup();
        });
    }
  }

  updatePublisherList() {
    this.service
      .list(this.currentPage, this.itensPerPage)
      .subscribe((publishers) => {
        this.maxRegisters = publishers.count;
        this.listPublishers = publishers.data;
        let calcMaxPage = Math.ceil(this.maxRegisters / this.itensPerPage);
        this.maxPages = calcMaxPage;
      });
  }

  ngOnInit(): void {
    this.updatePublisherList();
  }

  nextPage() {
    if (this.maxPages > this.currentPage) {
      this.currentPage++;
      this.updatePublisherList();
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.updatePublisherList();
    }
  }

  itensPerPageChanged() {
    localStorage.setItem('itensPerPage', this.itensPerPage.toString());
    this.currentPage = 1;
    this.updatePublisherList();
  }

}
