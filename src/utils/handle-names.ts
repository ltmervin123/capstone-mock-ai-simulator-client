type NameHandler = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export function handleNames({ firstName, middleName, lastName }: NameHandler) {
  const NO_MIDDLE_NAME_OPTIONS = ['N/A', 'NA', 'NONE', 'NO MIDDLE NAME', 'NO-MIDDLE-NAME', ''];

  if (NO_MIDDLE_NAME_OPTIONS.includes(middleName.toUpperCase().trim())) {
    return `${firstName} ${lastName}`;
  }

  const middleInitial = middleName.charAt(0).toUpperCase() + '.';

  return `${firstName} ${middleInitial} ${lastName}`;
}

export function handleNameInitials({ firstName, lastName }: NameHandler) {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}
