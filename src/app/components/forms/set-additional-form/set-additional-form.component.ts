import {Component, Input, OnInit} from '@angular/core';
import {FormField} from '../../../data/formfield';
import {BackendService} from '../../../services/backend.service';
import {slugify} from '../../../utils';
import {isUndefined} from 'util';

@Component({
  selector: 'app-set-additional-form',
  templateUrl: './set-additional-form.component.html',
  styleUrls: ['./set-additional-form.component.css']
})
export class SetAdditionalFormComponent implements OnInit {
  @Input() formId: number;
  @Input() pageId: number;
  @Input() field: { field: FormField, additional: string[] };
  @Input() ordering: number;
  @Input() value?: string;

  newValue: string;

  constructor(private back: BackendService) {
  }

  ngOnInit() {
    this.newValue = this.value;
  }

  submit(value: HTMLInputElement) {
    if (this.value !== this.newValue && this.value) {
      this.deleteAdditional();
    }

    this.addAdditional();

    if (this.isNew()) {
      value.value = '';
    }
  }

  isNew(): boolean {
    return isUndefined(this.value);
  }

  addAdditional() {
    if (this.ordering < this.field.additional.length) {
      this.field.additional.push(this.field.additional[this.ordering]);
      this.field.additional[this.ordering] = this.newValue;
    } else {
      this.field.additional.push(this.newValue);
    }

    if (this.field.field.fieldId) {
      this.back.setAdditional(this.formId, this.pageId, this.field.field.fieldId, this.ordering, this.newValue).subscribe(_ => {});
    }
  }

  deleteAdditional() {
    this.field.additional.splice(this.ordering, 1);
    if (this.field.field.fieldId) {
      this.back.deleteAdditional(this.formId, this.pageId, this.field.field.fieldId, this.value).subscribe(_ => {});;
    }
  }

  slugify(value: string) {
    return slugify(value);
  }
}
