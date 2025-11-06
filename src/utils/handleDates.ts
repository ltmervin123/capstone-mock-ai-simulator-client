export const handleDateFormat = (date: Date) => {
  if(date === null) {
    return "N/A";
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
