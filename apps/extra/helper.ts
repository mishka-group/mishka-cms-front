import { FormEvent, Dispatch, SetStateAction } from 'react';
type CutomObject = { [key: string]: string };

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