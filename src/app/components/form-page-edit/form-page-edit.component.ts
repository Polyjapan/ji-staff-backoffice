import {Component, OnInit} from '@angular/core';
import {PageResult} from '../../data/pageresult';
import {BackendService} from '../../services/backend.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FormPageCreateComponent} from '../form-page-create/form-page-create.component';
import {slugify} from '../../utils';
import {FieldType, FormField, humanReadableFieldType, FieldTypes, hasAdditionals} from '../../data/formfield';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-page-edit',
  templateUrl: './form-page-edit.component.html',
  styleUrls: ['./form-page-edit.component.css']
})
export class FormPageEditComponent implements OnInit {
  formId: number;
  pageId: number;
  eventId: number;
  fields: PageResult;
  FieldTypes = FieldTypes;
  humanReadableFieldType = humanReadableFieldType;
  hasAdditionals = hasAdditionals;

  constructor(private back: BackendService, private ar: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(params => {
        this.formId = Number.parseInt(params.get('formId'), 10);
        this.pageId = Number.parseInt(params.get('pageId'), 10);
        this.reload();
      }
    );

    this.ar.data.subscribe(data => this.eventId = data.eventId);
  }

  reload() {
    this.back.getPage(this.formId, this.pageId).subscribe(res => this.fields = res);
  }

  update() {
    this.dialog.open(FormPageCreateComponent, {data: this.fields.page});
  }

  slugify(name: string) {
    return slugify(name);
  }

  updateField(field: {field: FormField, additional: {}}) {
    field.sending = true;

    if (field.field.fieldId) {
      this.back.updateField(this.formId, this.pageId, field.field).subscribe(fieldId => {
        field.sending = false;
      });
    } else {
      this.back.createField(this.formId, this.pageId, field.field).subscribe(fieldId => {
        for (const k of field.additional.keys()) {
          this.back.setAdditional(this.formId, this.pageId, this.fieldId, k, field.additional.get(k));
        }
        field.field.fieldId = fieldId;
        field.sending = false;
      });
    }
  }

  createField() {
    const field = new FormField();
    field.pageId = this.pageId;
    field.required = false;
    this.fields.fields.push({field, additional: new Map()});
  }
}
