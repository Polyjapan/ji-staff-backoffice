import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../services/backend.service';
import {Form} from '../../data/form';
import {MatDialog} from '@angular/material';
import {EventCreateComponent} from '../event-create/event-create.component';
import {FormCreateComponent} from '../form-create/form-create.component';
import {InvalidationService} from '../../services/invalidation.service';

@Component({
  selector: 'app-event-forms',
  templateUrl: './event-forms.component.html',
  styleUrls: ['./event-forms.component.css']
})
export class EventFormsComponent implements OnInit {
  forms: Form[];
  private evId: number;

  constructor(private ar: ActivatedRoute, private back: BackendService,
              private dialog: MatDialog, private inval: InvalidationService) {
  }

  ngOnInit() {
    this.ar.data
      .map(ev => ev.eventId)
      .subscribe(id => {
        this.evId = id;
        this.refreshForms();

        this.inval.listen('forms-' + id, (tag) => this.refreshForms());
      });
  }

  private refreshForms() {
    this.forms = undefined;
    this.back.getForms(this.evId).subscribe(forms => this.forms = forms);
  }

  create() {
    this.dialog.open(FormCreateComponent, { data: FormCreateComponent.emptyForm(this.evId) });
  }
}
