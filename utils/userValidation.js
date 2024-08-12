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
