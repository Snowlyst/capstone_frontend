// axios posting

export const errorPosting = {
  title: "Error posting!",
  text: "Sorry, an error occured. Please resubmit your post.",
  icon: "error",
};

export const successPosting = {
  title: "Success!",
  text: "Your post has been successfully submitted!",
  icon: "success",
};

export const successPostingAwaitApproval = {
  title: "Success!",
  text: "Your post has been successfully submitted, but it needs approval before it can be listed. ",
  icon: "success",
};

export const successPostingAwaitApprovalWButtons = {
  title: "Success!",
  text: "Your post has been successfully submitted, but it needs approval before it can be listed. ",
  icon: "success",
  showDenyButton: true,
  confirmButtonColor: "LightSeaGreen",
  denyButtonText: "Return to Home",
  confirmButtonText: "Add New Post",
};

// form checks

export const missingFormInfo = {
  title: "Missing required job information!",
  text: "You still have missing information. Please check and resubmit.",
  icon: "error",
};

export const missingFormInfoGentle = {
  title: "Ooops!",
  text: "You need to fill up the required fields!",
  icon: "error",
};

export const numberRequiredOptionalField = (fieldName) => {
  return {
    title: "Error!",
    text: `${fieldName} must be a whole number. This is an optional field.`,
    icon: "error",
  };
};

export const numberRequired = (fieldName) => {
  return {
    title: "Error!",
    text: `${fieldName} must be a whole number.`,
    icon: "error",
  };
};

// form related misc

export const overwriteCurrentInfo = {
  title: "Hold On!",
  text: "There is already information in the form. Are you sure you wish to overwrite them? The information will be erased if you proceed.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "LightSeaGreen",
  cancelButtonColor: "Crimson",
  confirmButtonText: "Yes, delete it!",
};

export const deleteCurrentInfo = {
  title: "Hold On!",
  text: "Are you sure? The current information will be erased if you proceed.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "LightSeaGreen",
  cancelButtonColor: "Crimson",
  confirmButtonText: "Yes, delete it!",
};

export const importInfoSuccessful = (importField) => {
  return {
    title: "Imported!",
    text: `The ${importField} was successfully imported. Please add/edit the information if required, before you submit it for approval.`,
    icon: "success",
  };
};

export const importInfoFailed = (importField1, importField2) => {
  return {
    title: "Sorry!",
    text: `The ${importField1} could not be imported. Please check the ${importField2} if required, before you submit it for approval.`,
    icon: "error",
  };
};

// account related

export const awaitingAccountApproval = (pageReturningTo) => {
  return {
    title: "Account awaiting approval!",
    text: "Your account is still awaiting admin approval. We are sorry that new posts are disabled until approval. Please be patient with us.",
    icon: "error",
    confirmButtonText: `Return to ${pageReturningTo}`,
  };
};
