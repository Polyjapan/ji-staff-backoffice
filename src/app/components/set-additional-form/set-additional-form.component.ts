import {Component, Input, OnInit} from '@angular/core';
import {FormField} from '../../data/formfield';
import {BackendService} from '../../services/backend.service';
import {slugify} from '../../utils';
import {isUndefined} from 'util';

@Component({
  selector: 'app-set-additional-form',
  templateUrl: './set-additional-form.component.html',
  styleUrls: ['./set-additional-form.component.css']
})
export class SetAdditionalFormComponent implements OnInit {
  @Input() formId: number;
  @Input() pageId: number;
  @Input() field: { field: FormField, additional: {} };
  @Input() key?: string;
  @Input() value?: string;

  newKey: string;
  newValue: string;

  constructor(private back: BackendService) {
  }

  ngOnInit() {
    this.newKey = this.key;
    this.newValue = this.value;
  }

  submit(key: HTMLInputElement, value: HTMLInputElement) {
    if (this.key !== this.newKey && this.key) {
      this.deleteAdditional();
    }

    this.addAdditional();

    if (this.isNew()) {
      key.value = '';
      value.value = '';
      key.select();
    }
  }

  isNew(): boolean {
    return isUndefined(this.key);
  }

  addAdditional() {
    this.field.additional[this.newKey] = this.newValue;

    if (this.field.field.fieldId) {
      this.back.setAdditional(this.formId, this.pageId, this.field.field.fieldId, this.newKey, this.newValue).subscribe(_ => {});
    }
  }

  deleteAdditional() {
    this.field.additional[this.key] = undefined;
    if (this.field.field.fieldId) {
      this.back.deleteAdditional(this.formId, this.pageId, this.field.field.fieldId, this.key).subscribe(_ => {});;
    }
  }

  slugify(value: string) {
    return slugify(value);
  }
}
