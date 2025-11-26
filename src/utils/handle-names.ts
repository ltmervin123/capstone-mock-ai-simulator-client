type NameHandler = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nameExtension?: string;
};

export function handleNameExtension(nameExtension: string | undefined) {
  if (!nameExtension || nameExtension.trim() === '') {
    return '';
  }

  if (nameExtension.includes('.')) {
    return nameExtension.trim();
  }

  return `${nameExtension.trim()}.`;
}

export function handleNames({ firstName, middleName, lastName, nameExtension }: NameHandler) {
  const NO_MIDDLE_NAME_OPTIONS = ['N/A', 'NA', 'NONE', 'NO MIDDLE NAME', 'NO-MIDDLE-NAME', '', '.'];

  if (NO_MIDDLE_NAME_OPTIONS.includes(middleName!.toUpperCase().trim())) {
    if (!nameExtension || nameExtension.trim() === '') {
      return `${firstName} ${lastName}`;
    }
    return `${firstName} ${lastName}, ${handleNameExtension(nameExtension)}`;
  }

  const middleInitial = middleName!.charAt(0).toUpperCase() + '.';

  if (!nameExtension || nameExtension.trim() === '') {
    return `${firstName} ${middleInitial} ${lastName}`;
  }
  return `${firstName} ${middleInitial} ${lastName}, ${handleNameExtension(nameExtension)}`;
}

export function handleNameInitials({ firstName, lastName }: NameHandler) {
  return `${firstName!.charAt(0).toUpperCase()}${lastName!.charAt(0).toUpperCase()}`;
}
