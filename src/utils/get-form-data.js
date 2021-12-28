export function getFormData(form) {
  const formData = {};

  new FormData(form).forEach((value, key) => formData[key] = value);
  formData.price = +formData.price || '';
  formData.edition = +formData.edition || '';
  formData.maidIn = {_id: formData.maidIn};
  formData.category = {_id: formData.category};

  return formData;
}
