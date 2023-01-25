export function urlify(str){
    // to lower case + remove diacritics + spaces to hyphens
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s/g,'-');
  }