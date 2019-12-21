
export class Period {
  day: string;
  start: string;
  end: string;
}

export function displayPeriod(period: Period): string {
  return 'le ' + period.day + ' de ' + period.start + ' à ' + period.end;
}
