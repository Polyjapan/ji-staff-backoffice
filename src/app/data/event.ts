export enum Visibility {
  DRAFT = 'Draft', INTERNAL = 'Internal', PUBLIC = 'Public', ARCHIVED = 'Archived'
}

export class Event {
  id?: number;
  start: Date;
  name: string;
  visibility: Visibility;
}
