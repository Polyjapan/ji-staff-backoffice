import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import {Form} from '../../../data/form';
import {MatDialog} from '@angular/material/dialog';
import {FormCreateComponent} from '../../forms/form-create/form-create.component';
import {InvalidationService, SubscribedListener} from '../../../services/invalidation.service';
import {Event} from '../../../data/event';
import {FormPage} from '../../../data/formpage';
import {FormPageCreateComponent} from '../../forms/form-page-create/form-page-create.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-event-forms',
  templateUrl: './event-forms.component.html',
  styleUrls: ['./event-forms.component.css']
})
export class EventFormsComponent implements OnInit {
  forms: Form[];
  pages: Map<number, FormPage[]> = new Map();
  private evId: number;
  private invalidators: SubscribedListener[] = [];
  event: Event;
  settingDefault: boolean;

  constructor(private ar: ActivatedRoute, private back: BackendService,
              private dialog: MatDialog, private inval: InvalidationService) {
  }

  ngOnInit() {
    this.ar.data
      .subscribe(ev => {
        this.evId = ev.eventId;
        this.event = ev.event;
        this.refreshForms();

        this.inval.listen('forms-' + this.evId, (tag) => this.refreshForms());
      });
  }

  private refreshForms() {
    this.forms = undefined;
    this.back.getForms(this.evId).subscribe(forms => {
      for (const inv of this.invalidators) {
        inv.cancel();
      }
      this.invalidators.splice(0, this.invalidators.length);
      this.forms = forms;

      for (const form of this.forms) {
        this.invalidators.push(this.inval.listen('pages-' + form.formId, (tag) => this.getPages(form.formId)));
        this.inval.invalidate('pages-' + form.formId);
      }
    });
  }

  getPages(form: number) {
    this.back.getPages(form).subscribe(pages => {
      this.pages.set(form, pages);
    });
  }

  create() {
    this.dialog.open(FormCreateComponent, {data: FormCreateComponent.emptyForm(this.evId)});
  }

  update(form: Form) {
    this.dialog.open(FormCreateComponent, {data: form});
  }

  delete(form: Form) {
    if (form.isMain)
      return;

    if (confirm('Voulez vous vraiment supprimer ce formulaire ? Cette action est irréversible.')) {
      this.forms.splice(this.forms.indexOf(form), 1);
      this.back.deleteForm(form.formId).subscribe(res => this.refreshForms());
    }
  }

  setDefault(form: Form) {
    this.settingDefault = true;
    this.back.setDefaultForm(form.eventId, form.formId)
      .subscribe(a => {
        this.inval.invalidate(`event-${form.eventId}`);
        this.settingDefault = false;
        this.forms.filter(f => f.isMain = true).forEach(f => f.isMain = false);
        form.isMain = true;
      });
  }

  date(form: Form) {
    return new Date(form.closeDate);
  }

  createPage(form: Form) {
    this.dialog.open(FormPageCreateComponent, {data: FormPageCreateComponent.emptyPage(form.formId)});
  }
}
