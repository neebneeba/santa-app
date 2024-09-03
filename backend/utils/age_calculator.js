function ageCalculator(birthdate) {
  // I think date format appears to be YYYY/DD/MM so I need to rearrange them into valid format.
  const [year, day, month] = birthdate.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Check if the birthday has occurred this year or not
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

module.exports = {
  ageCalculator,
};
