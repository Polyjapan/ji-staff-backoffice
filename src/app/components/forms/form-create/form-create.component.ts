import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BackendService} from '../../../services/backend.service';
import {Router} from '@angular/router';
import {InvalidationService} from '../../../services/invalidation.service';
import {Event} from '../../../data/event';
import {EventCreateData} from '../../events/event-create/event-create.component';
import {Form} from '../../../data/form';
import {slugify} from '../../../utils';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data: Form,
    private backend: BackendService,
    private router: Router,
    private invalidate: InvalidationService) {
    this.form = data;
  }

  form: Form;
  sending: boolean;

  public static emptyForm(event: number): Form {
    const form = new Form();
    form.eventId = event;
    form.minAge = -1;
    form.maxAge = -1;
    form.requiresStaff = false;
    form.hidden = false;

    return form;
  }

  ngOnInit() {
  }

  submit(event) {
    console.log(event);

    if (this.sending) {
      return;
    }
    this.sending = true;

    // Update form short name
    this.form.internalName = slugify(this.form.name);
    if (this.form.closeDate && typeof this.form.closeDate !== 'number') {
      this.form.closeDate = Date.parse(this.form.closeDate as string);
    }


    try {
      if (this.form.formId) {
        this.backend.updateForm(this.form)
          .subscribe(u => {
            this.invalidate.invalidate('forms-' + this.form.eventId);
            this.invalidate.invalidate('form-' + this.form.formId);
            this.dialogRef.close();
          });
      } else {
        this.backend
          .createForm(this.form)
          .subscribe(targetId => {
            this.invalidate.invalidate('forms-' + this.form.eventId);
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
