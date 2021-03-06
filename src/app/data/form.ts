
export class Form {
  formId?: number;
  eventId: number;
  isMain: boolean;
  internalName: string;
  name: string;
  shortDescription: string;
  description: string;
  maxAge: number;
  minAge: number;
  requiresStaff: boolean;
  hidden: boolean;
  closeDate?: number; // long -- timestamp
}
