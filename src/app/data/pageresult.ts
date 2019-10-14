import {FormPage} from './formpage';
import {FormField} from './formfield';

export class FieldAndAdditional {

  field: FormField;
  additional: string[];
}

export class PageResult {
  page: FormPage;
  fields: FieldAndAdditional[];
}
