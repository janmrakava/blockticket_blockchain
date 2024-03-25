interface IStepIndicatorProps {
  active: number;
}
interface IResultRegistrationProps {
  result: boolean;
  handleResetRegistration: () => void;
}
interface IPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
}
interface IPasswordInfo {
  password: string;
  passwordAgain: string;
  phoneNumber: string;
}
interface IAdressInfo {
  country: string;
  city: string;
  street: string;
  zipCode: string;
  streetNumber: string;
}
interface IPersonalInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  handleChange: (event: ChangeEvent<HTMLInputElement | { value: string; name?: string }>) => void;
  handleDateChange: (value) => void;
  handleNext: () => void;
}
interface IPasswordFormProps {
  password: string;
  passwordAgain: string;
  phoneNumber: string;
  isPasswordLengthValid: boolean;
  isPasswordContainSpecial: boolean;
  isPasswordContainCapital: boolean;
  isPasswordContainNumber: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}
interface IAddressFormProps {
  country: string;
  city: string;
  street: string;
  zipCode: string;
  streetNumber: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}
