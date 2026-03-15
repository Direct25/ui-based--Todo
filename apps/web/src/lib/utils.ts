import clsx from 'clsx';

export function cn(...values: Array<string | false | null | undefined>) {
  return clsx(values);
}

export function toDateInputValue(value: string | null) {
  if (!value) {
    return '';
  }

  return new Date(value).toISOString().slice(0, 10);
}

export function fromDateInputValue(value: string) {
  if (!value) {
    return null;
  }

  return new Date(`${value}T12:00:00`).toISOString();
}
