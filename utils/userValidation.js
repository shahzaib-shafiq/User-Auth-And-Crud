exports.userInputValidation = async (userdata) => {
  const { Name, emailAddress, password } = userdata;
  console.log("user Data for Validation", userdata);

  if (
    !Name ||
    !emailAddress ||
    !password ||
    Name === null ||
    emailAddress === null ||
    password === null ||
    Name === undefined ||
    emailAddress === undefined ||
    password === undefined
  ) {
    return "Enter All Details";
  }
  return null;
};

exports.userLoginValidation = async (userdata) => {
  const { emailAddress, password } = userdata;

  console.log("validation", userdata);

  if (
    !emailAddress ||
    !password ||
    emailAddress === null ||
    password === null ||
    emailAddress === undefined ||
    password === undefined
  ) {
    return "Enter All Details";
  }
  return null;
};

exports.userUpdateValidation = async (userdata) => {
  const emailAddress = userdata;
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  console.log(emailAddress);
  if (!emailAddress || emailAddress === null || emailAddress === undefined) {
    return "Enter Email Correctly";
  }
  console.log("validation", userdata);
  if (!validRegex.test(emailAddress)) {
    return "Enter a valid email address";
  }

  // if (emailAddress.match(validRegex)) {
  //   console.log("email valid");
  //   return null;
  // } else {
  //   return "Email is Not Valid";
  // }
  return null;
};
