import { useState } from 'react';
import { type UniqueEmailResult } from '../pages/Register';
import { checkEmail } from '../api/users/user';
enum Role {
  Admin = 'Admin',
  User = 'User'
}
export function useRegisterPersonalInfo(): any {
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    gender: '',
    role: Role.User
  });
  const handleDateChange = (value: Date): void => {
    const dateWithoutTime = new Date(value);
    dateWithoutTime.setHours(0, 0, 0, 0);
    setPersonalInfo({ ...personalInfo, dateOfBirth: dateWithoutTime });
  };

  const isAgeAbove18 = (dateOfBirth: Date): boolean => {
    const today = new Date();
    const diff = today.getTime() - dateOfBirth.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return age >= 18;
  };

  const isEmailCorrect = async (email: string): Promise<UniqueEmailResult> => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      const isUniqueEmail = await checkEmail(email);
      return isUniqueEmail;
    } else {
      return { canUse: false };
    }
  };

  const handleChangePersonalInfo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };
  const checkPersonalInfo = async (): Promise<boolean> => {
    const validEmail = await isEmailCorrect(personalInfo.email);
    if (!isAgeAbove18(personalInfo.dateOfBirth)) {
      setWarningMessage('invalidage');
      return false;
    } else if (!validEmail.canUse) {
      setWarningMessage('invalidemail');
      return false;
    } else {
      return true;
    }
  };

  return {
    warningMessage,
    setWarningMessage,
    checkPersonalInfo,
    handleDateChange,
    handleChangePersonalInfo,
    personalInfo
  };
}
