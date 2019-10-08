
export enum ApplicationState {
  Draft = 'draft', Sent = 'sent', Accepted = 'accepted', Refused = 'refused', RequestedChanges = 'requested_changes'
}

export const ApplicationStates = [
  ApplicationState.Draft, ApplicationState.Sent, ApplicationState.Accepted, ApplicationState.Refused, ApplicationState.RequestedChanges
];

export function readableState(state: ApplicationState) {
  switch (state) {
    case ApplicationState.Draft:
      return 'Brouillon';
    case ApplicationState.Sent:
      return 'Envoyé';
    case ApplicationState.Accepted:
      return 'Accepté';
    case ApplicationState.Refused:
      return 'Refusé';
    case ApplicationState.RequestedChanges:
      return 'Changements demandés';
  }
}
