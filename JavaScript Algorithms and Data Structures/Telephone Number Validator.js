function telephoneCheck(str) {
  const regex =
    /^[1]?[\s]?(([(][0-9]{3}[)])|([0-9]{3}))[\s|-]?[0-9]{3}[\s|-]?[0-9]{4}$/g;

  return regex.test(str);
}
