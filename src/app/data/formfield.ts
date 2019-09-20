
export enum FieldType {
  Text = 'text', LongText = 'long_text', Email = 'email',
  Date = 'date', Checkbox = 'checkbox', Select = 'select',
  File = 'file', Image = 'email', Url = 'url'
}

export const FieldTypes = [FieldType.Text, FieldType.LongText, FieldType.Email,
  FieldType.Date, FieldType.Checkbox, FieldType.Select, FieldType.File,
  FieldType.Image, FieldType.Url];

export function hasAdditionals(ft: FieldType) {
  switch (ft) {
    case FieldType.Select:
    case FieldType.Checkbox:
      return true;

    default:
      return false;
  }
}

export function humanReadableFieldType(ft: FieldType) {
  switch (ft) {
    case FieldType.Text:
      return 'Texte';
    case FieldType.LongText:
      return 'Texte multiligne';
    case FieldType.Email:
      return 'E-Mail';
    case FieldType.Checkbox:
      return 'Cases à cocher';
    case FieldType.Date:
      return 'Date';
    case FieldType.Select:
      return 'Option à sélectionner';
    case FieldType.File:
      return 'Fichier à envoyer';
    case FieldType.Image:
      return 'Image à envoyer';
    case FieldType.Url:
      return 'Adresse URL';
    default:
      return '<unknown>';
  }
}

export class FormField {
  fieldId?: number;
  pageId: number;
  name: string;
  placeholder: string;
  helpText?: string;
  required: boolean;
  type: FieldType;
  ordering?: number;
}
