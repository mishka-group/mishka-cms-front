import { FormEvent, Dispatch, SetStateAction } from 'react';
type CutomObject = { [key: string]: string };

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
