export const ComparePassword = (password: string, confirmPassword: string) => {
  let errorCode = null;
  if (confirmPassword === '') {
    errorCode = 1;
  }
  if (password !== confirmPassword) {
    errorCode = 2;
  }
  return errorCode;
};

export const CheckPassword = (password: string) => {
  // const regex1 =(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/);
  let errorCode = null;
  const regex1 = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (password === '') {
    errorCode = 1;
  } else if (!regex1.test(password)) {
    errorCode = 2;
  }
  return errorCode;
};

// Email validation
export const CheckEmail = (email: string) => {
  // const regex = /^([\w-]+(?:\.[\w-]+))@((?:[\w-]+\.)\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let errorCode = null;
  if (email === '' || typeof email === 'undefined') {
    errorCode = 1;
  } else if (!regex.test(email)) {
    errorCode = 2;
  }
  return errorCode;
};

export const CheckName = (name: string) => {
  const regex = /^[a-zA-Z ]{1,30}$/;

  let errorCode = null;

  if (name === '' || typeof name === 'undefined') {
    errorCode = 1;
  } else if (!regex.test(name)) {
    errorCode = 2;
  }

  return errorCode;
};

// Phone validation
export const CheckPhone = (phone: string) => {
  const regex = /^[0-9]{10}$/;
  let errorCode = null;
  if (phone === '' || typeof phone === 'undefined') {
    errorCode = 1;
  } else if (!regex.test(phone)) {
    errorCode = 2;
  }
  return errorCode;
};
