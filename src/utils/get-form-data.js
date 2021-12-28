export function getFormData(form) {
  const formData = {};

  new FormData(form).forEach((value, key) => formData[key] = value);
  formData.price = +formData.price || -1;
  formData.edition = +formData.edition || -1;
  formData.maidIn = {_id: formData.maidIn};
  formData.category = {_id: formData.category};

  return formData;
}
