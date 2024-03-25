import { useState } from 'react';

export function useRegisterAddressInfo(): any {
  const [addressInfo, setAddressInfo] = useState<IAdressInfo>({
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    zipCode: ''
  });
  const handleChangeAddressInfo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  const checkValidString = (input: string): boolean => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  };
  const checkObjectEmpty = (): boolean => {
    for (const key in addressInfo) {
      if (Object.prototype.hasOwnProperty.call(addressInfo, key)) {
        if (addressInfo[key as keyof IAdressInfo] === '') {
          return false;
        }
      }
    }
    return true;
  };

  const checkAddressInfo = (): boolean => {
    if (!checkObjectEmpty()) {
      return false;
    } else if (
      checkValidString(addressInfo.streetNumber) ||
      checkValidString(addressInfo.zipCode)
    ) {
      return false;
    } else {
      return true;
    }
  };
  return {
    addressInfo,
    handleChangeAddressInfo,
    checkAddressInfo
  };
}
