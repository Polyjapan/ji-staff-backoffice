import {Component, OnInit} from '@angular/core';
import {FieldAndAdditional, PageResult} from '../../data/pageresult';
import {BackendService} from '../../services/backend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FormPageCreateComponent} from '../form-page-create/form-page-create.component';
import {FieldTypes, FormField, hasAdditionals, humanReadableFieldType} from '../../data/formfield';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


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
  sending: FieldAndAdditional[] = [];

  constructor(private back: BackendService, private ar: ActivatedRoute, private dialog: MatDialog, private router: Router) {
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

  updateField(field: FieldAndAdditional) {
    this.sending.push(field);

    if (field.field.fieldId) {
      this.back.updateField(this.formId, this.pageId, field.field).subscribe(fieldId => {
        this.sending.splice(this.sending.indexOf(field));
      });
    } else {
      this.back.createField(this.formId, this.pageId, field.field).subscribe(fieldId => {
        for (const k in field.additional) {
          if (typeof k === 'string') {
            // todo
            this.back.setAdditional(this.formId, this.pageId, fieldId, 0, field.additional[k]);
          }
        }
        field.field.fieldId = fieldId;
        this.sending.splice(this.sending.indexOf(field));
      });
    }
  }

  createField() {
    const field = new FormField();
    field.pageId = this.pageId;
    field.required = false;
    this.fields.fields.push({field, additional: []});
  }

  delete() {
    if (confirm('Voulez vous vraiment supprimer cette page ?')) {
      this.back.deletePage(this.formId, this.pageId).subscribe(res => {
        this.router.navigate(['/', 'event', this.eventId]);
      });
    }
  }

  deleteField(field: number) {
    if (confirm('Voulez vous vraiment supprimer ce champ de formulaire ?')) {
      this.fields.fields.splice(this.fields.fields.findIndex(v => v.field.fieldId === field), 1);
      this.back.deleteField(this.formId, this.pageId, field).subscribe(_ => {
      });
    }
  }

  drop(field: FieldAndAdditional, event: CdkDragDrop<string[]>) {
    // Need to move all the items
    // If item moved upwards, we need to shift all the items +1
    // If item moved downwards, we need to shift all the items -1

    const factor = (event.previousIndex > event.currentIndex) ? 1 : -1;
    const min = event.previousIndex > event.currentIndex ? event.currentIndex : event.previousIndex;
    const max = event.previousIndex > event.currentIndex ? event.previousIndex : event.currentIndex;

    for (let i = min; i <= max; ++i) {
      this.back.setAdditional(this.formId, this.pageId, field.field.fieldId, i + factor, field.additional[i]).subscribe(_ => {
      });
    }

    this.back.setAdditional(this.formId, this.pageId, field.field.fieldId, event.currentIndex,
      field.additional[event.previousIndex]).subscribe(_ => {
    });
    moveItemInArray(field.additional, event.previousIndex, event.currentIndex);
  }
}
