import {ReducedUser, UserProfile} from './user';

export class StaffListEntry {
  staffNumber: number;
  applicationId: number;
  user: UserProfile;
  level?: number;
  capabilities?: string[];
}

export class MissingStaffs {
  time: string;
  missing: ReducedUser[];
}
