import { FormEvent, Dispatch, SetStateAction } from 'react';
type CutomObject = { [key: string]: string };

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_ABBREVIATION = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * It takes an event, a form data object, and a setter function, and deletes the targeted field data
 * from the form data object
 * @param event - FormEvent<HTMLFormElement> - The event object that is passed to the function.
 * @param {CutomObject} formDtat - CutomObject - this is the form data object that you want to delete
 * the field from
 * @param setter - Dispatch<SetStateAction<CutomObject>>
 */
export const deleteTargetedFieldData = (
  event: FormEvent<HTMLFormElement>,
  formDtat: CutomObject,
  setter: Dispatch<SetStateAction<CutomObject>>
): void => {
  const { id } = event.target as HTMLElement;
  if (id && Object.hasOwn(formDtat, id)) {
    const { [id]: tmp, ...rest } = formDtat;
    setter(rest);
  }
};

/**
 * It takes an element id and a boolean value and sets the element's disabled property to the boolean
 * value.
 * @param {string} id - The id of the element you want to disable.
 * @param {boolean} status - boolean
 */
export const elementDisability = (id: string, status: boolean) => {
  (document.getElementById(id) as HTMLInputElement).disabled = status
}

/**
 * It takes a timestamp and returns an object with the month, day, year, and month number
 * @param {string} dateStr - The timestamp you want to convert.
 * @param {'normal' | 'short'} [style=normal] - 'normal' | 'short' = 'normal'
 * @returns An object with the following properties:
 *   - months: the month in string format
 *   - day: the day in number format
 *   - year: the year in number format
 *   - monthsNumber: the month in number format
 */
 export const timestampToObject = (dateStr: string, style: 'normal' | 'short' = 'normal') => {
  const readable = new Date(dateStr);
  const mon = style === 'normal' ? MONTHS : MONTHS_ABBREVIATION;
  return {
    months: mon[readable.getMonth()],
    day: readable.getDay(),
    year: readable.getFullYear(),
    monthsNumber: readable.getMonth(),
  };
}