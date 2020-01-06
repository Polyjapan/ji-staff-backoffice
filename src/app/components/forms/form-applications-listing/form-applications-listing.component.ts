import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../../services/backend.service';
import {Form} from '../../../data/form';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-form-applications-listing',
  templateUrl: './form-applications-listing.component.html',
  styleUrls: ['./form-applications-listing.component.css']
})
export class FormApplicationsListingComponent implements OnInit {
  formId: number;
  form: Form;

  constructor(private route: ActivatedRoute, private back: BackendService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.formId = Number.parseInt(params.get('formId'), 10);
      this.back.getForm(this.formId).subscribe(form => this.form = form);
    });
  }

  downloadList() {
    this.back.exportForm(this.formId).subscribe(blob => {
      if (blob) {
        FileSaver.saveAs(blob, 'form-' + this.formId + '.csv');
      }
    });
  }

}
