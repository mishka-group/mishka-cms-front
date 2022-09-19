import type { NextPage } from 'next';
import { FormEvent, RefObject, useContext, useState, Dispatch, SetStateAction } from 'react';
import RegisterTemplate from '../../apps/mishka_html/templates/client/auth/register';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { register } from '../../apps/mishka_user/userAuthentication';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
import { deleteTargetedFieldData, elementDisability } from '../../apps/extra/helper';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';

type RH = RefObject<HTMLInputElement>;
type CutomObject = { [key: string]: string };

const RegisterPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const [formError, setFormError]: [CutomObject, Dispatch<SetStateAction<CutomObject>>] = useState({});

  /**
   * It's a function that sends the data to the server and returns the result to the user
   * @param event - FormEvent<HTMLFormElement>
   * @param {RH} fullName - The full name of the user
   * @param {RH} username - RH, email: RH, password: RH
   * @param {RH} email - RH,
   * @param {RH} password - RH
  */
  const RegisterHandler = async (event: FormEvent<HTMLFormElement>, fullName: RH, username: RH, email: RH, password: RH) => {
    event.preventDefault();

    elementDisability('registerButton', true)

    // Review essential data
    if (fullName.current?.value && username.current?.value && email.current?.value) {
      const registerData = {
        full_name: fullName.current?.value.trim(),
        username: username.current?.value.trim(),
        email: email.current?.value.trim(),
      };
      const registerOutput = await register(password.current?.value ? { ...registerData, password: password.current?.value } : registerData);

      // After getting 200 status we can redirect the user to login page and show a success alert
      if (registerOutput.status === 200 && 'user_info' in registerOutput) {
        // reset form for unhandle situation
        fullName.current.value = '';
        username.current.value = '';
        email.current.value = '';

        setAlertState(
          true,
          "Your registration was accepted. To confirm the user account, please go to your email and send the email activation code. It's worth noting that the activation code is only good for 5 minutes.",
          'info'
        );
      } else {
        // TODO: return an error and let user all the fild essential except password
        // TODO: Template side should have validation ui to let user Which field should be filled
        // Show the error system got to user and show a warning alert to fix the problems
        // We need to pass errors for validation forms in template part
        setFormError(registerOutput.errors ? registerOutput.errors: []);

        // It is a global error to show user and let him/her focus on the error they get
        setAlertState(true, 'Unfortunately, there is an error in sending the data. Please try again after solving the problem.', 'warning');

        // Make a setTimeout to scroll, because before that we have no `.alert` class to scroll, it can be an animation
        setTimeout(() => {
          document.querySelector('.alert')?.scrollIntoView();
        }, 300);
      }
    } else {
      // It is an extra error showing, because in template part user should skip the validation and this file condition for essential parameters
      // It can't be shown in normal data sending
      setAlertState(true, 'All required fields must be submitted.', 'warning');
    }

    elementDisability('registerButton', false)
  };

  /**
   * This function can help us to delete a specific field error to let user write correct data and we
   * can keep the button disabled until when our user sends all the required fields
   * This function can help us to delete a specific field error to let user write correct data
   * Our resource:
   * - https://stackoverflow.com/questions/73687869/delete-an-object-prevents-react-component-working
   * @param event - FormEvent<HTMLFormElement>
   * @param {RH} fullName - RH, username: RH, email: RH
   * @param {RH} username - RH, email: RH, fullName: RH
   * @param {RH} email - RH,
  */
  const formHandler = (event: FormEvent<HTMLFormElement>, fullName: RH, username: RH, email: RH): void => {
    // TODO: this is the place we should check form validation
    deleteTargetedFieldData(event, formError, setFormError);
    if (fullName.current?.value && username.current?.value && email.current?.value) {
      elementDisability('registerButton', false)
    }
  };

  // It is an extra check to prevent user not to see this page
  // If a user wants to register in website, can use this Handler, but before Registering in the site he/her is checked for having session or not?
  if (session) {
    return <LoginLoading />;
  }

  return (
    <>
      <RegisterTemplate register={RegisterHandler} formError={formError} formChenge={formHandler} />
    </>
  );
};

export default RegisterPage;
