import {FullUser, ReducedUser, User} from './user';
import {ApplicationState} from './state';
import {FormField} from './formfield';
import {FormPage} from './formpage';
import {Comment} from './comment';

export class ApplicationListing {
  user: ReducedUser;
  state: ApplicationState;
  applicationId: number;
}

export class FilledPageField {
  field: FormField;
  value: string;
}

export class FilledPage {
  page: FormPage;
  fields: FilledPageField[];
}

export class ApplicationResult {
  user: FullUser;
  state: ApplicationState;
  content: FilledPage[];
}

export class CommentWithAuthor {
  author: ReducedUser;
  comment: Comment;
}
