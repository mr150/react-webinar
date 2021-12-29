export function convertFormData(form) {
  form.price = +form.price || '';
  form.edition = +form.edition || '';

  return form;
}
