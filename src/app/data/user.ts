import {ApplicationState} from './state';
import {Form} from './form';
import {Event} from './event';

export class User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  address: string;
}

export class ReducedUser {
  firstName: string;
  lastName: string;
  email: string;
}

export class UserDetails {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export class UserAddress {
  address: string;
  addressComplement: string;
  postCode: string;
  city: string;
  country: string;
}

export class UserProfile {
  id: number;
  email: string;
  details: UserDetails;
  address: UserAddress;
}

export class FullUser {
  profile: UserProfile;
  birthDate: Date;
}

export class ApplicationHistory {
  application: number;
  state: ApplicationState;
  form: Form;
  event: Event;
}

export class StaffHistory {
  staffNumber: number;
  application: number;
  event: Event;
}

export class UserHistory {
  profile: UserProfile;
  staffings: StaffHistory[];
  applications: ApplicationHistory[];
}
