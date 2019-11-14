import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Form} from '../../../data/form';
import {BackendService} from '../../../services/backend.service';
import {Router} from '@angular/router';
import {InvalidationService} from '../../../services/invalidation.service';
import {FormPage} from '../../../data/formpage';

@Component({
  selector: 'app-form-page-create',
  templateUrl: './form-page-create.component.html',
  styleUrls: ['./form-page-create.component.css']
})
export class FormPageCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPageCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data: FormPage,
    private backend: BackendService,
    private router: Router,
    private invalidate: InvalidationService) {
    this.page = data;
  }

  page: FormPage;
  sending: boolean;

  public static emptyPage(form: number): FormPage {
    const page = new FormPage();
    page.formId = form;
    page.minAge = -1;
    page.maxAge = -1;

    return page;
  }

  ngOnInit() {
  }

  submit(event) {
    console.log(event);

    if (this.sending) {
      return;
    }
    this.sending = true;

    try {
      if (this.page.pageId) {
        this.backend.updatePage(this.page.formId, this.page)
          .subscribe(u => {
            this.invalidate.invalidate('pages-' + this.page.formId);
            this.dialogRef.close();
          });
      } else {
        this.backend
          .createPage(this.page.formId, this.page)
          .subscribe(targetId => {
            this.invalidate.invalidate('pages-' + this.page.formId);
            this.dialogRef.close();
          });
      }
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
    }
  }


}
