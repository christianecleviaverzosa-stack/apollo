const MILLISECONDS = 1000;
const SECONDS = 60;

const toSeconds = (second: number) => MILLISECONDS * second;
const toMinutes = (minute: number) => MILLISECONDS * SECONDS * minute;

export enum TimeInMilliseconds {
  FiveSeconds = toSeconds(5),
  ThirtySeconds = toSeconds(30),
  FiveMinutes = toMinutes(5),
  OneDay = 86_400_000,
}
