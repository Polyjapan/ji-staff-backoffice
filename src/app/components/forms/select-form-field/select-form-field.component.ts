import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {ActivatedRoute} from '@angular/router';
import {Form} from '../../../data/form';
import {FormField} from '../../../data/formfield';
import {FormPage} from '../../../data/formpage';

@Component({
  selector: 'app-select-form-field',
  templateUrl: './select-form-field.component.html',
  styleUrls: ['./select-form-field.component.css']
})
export class SelectFormFieldComponent implements OnInit {
  @Output() selectedFieldChange = new EventEmitter<number>();

  eventId: number;
  forms: Form[];
  pages: FormPage[];
  fields: FormField[];

  constructor(private backend: BackendService, private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.ar.data.subscribe(data => {
      this.eventId = data.eventId;
      this.backend.getForms(this.eventId).subscribe(forms => this.forms = forms);
    });
  }

  onSelectForm(form: Form) {
    this.pages = undefined;
    this.fields = undefined;
    this.backend.getPages(form.formId).subscribe(pages => this.pages = pages);
  }

  onSelectPage(page: FormPage) {
    this.fields = undefined;
    this.backend.getPage(page.formId, page.pageId).subscribe(page => this.fields = page.fields.map(v => v.field));
  }

  onSelectField(field: FormField) {
    this.selectedFieldChange.emit(field.fieldId);
  }
}
