declare module 'moment' {
  interface Moment {
    format(format?: string): string;
    add(amount: number, unit: string): Moment;
    subtract(amount: number, unit: string): Moment;
    startOf(unit: string): Moment;
    endOf(unit: string): Moment;
    isBefore(moment: Moment): boolean;
    isAfter(moment: Moment): boolean;
    isSame(moment: Moment): boolean;
    valueOf(): number;
    toDate(): Date;
    toISOString(): string;
  }

  interface MomentStatic {
    (): Moment;
    (date?: string | Date | number): Moment;
    format(date: string | Date, format: string): string;
    now(): Moment;
    utc(): Moment;
    unix(timestamp: number): Moment;
  }

  const moment: MomentStatic;
  export = moment;
}
