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

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //console.log(emailAddress);

  console.log("validation", userdata);
  if (!validRegex.test(emailAddress)) {
    return "Enter a valid email address";
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
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //console.log(emailAddress);

  console.log("validation", userdata);
  if (!validRegex.test(emailAddress)) {
    return "Enter a valid email address";
  }
  return null;
};

exports.userUpdateValidation = async (userdata) => {
  const emailAddress = userdata;

  if (!emailAddress || emailAddress === null || emailAddress === undefined) {
    return "Enter Correct Email ";
  }
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //console.log(emailAddress);

  console.log("validation", userdata);
  if (!validRegex.test(emailAddress)) {
    return "Enter a valid email address";
  }

  return null;
};

exports.validatePassword = async (userpass) => {
  const { oldPassword, newPassword, confirmPassword } = userpass;
  if (!oldPassword || !newPassword || !confirmPassword) {
    console.log(oldPassword, newPassword, confirmPassword);
    return res.status(400).json({ message: "All fields are required" });
  }

  return true;
};
