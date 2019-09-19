import {FormPage} from './formpage';
import {FormField} from './formfield';

export class PageResult {
  page: FormPage;
  fields: {
    field: FormField,
    additional: {}
  }[];
}
