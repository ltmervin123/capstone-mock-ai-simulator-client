import { PROGRAM_ACRONYMS, PROGRAM_FULL_NAMES } from '@/constants/program-option';

export function getProgramAcronym(program: string) {
  return PROGRAM_ACRONYMS[program as keyof typeof PROGRAM_ACRONYMS] || program;
}

export function getFullProgramName(acronym: string) {
  return PROGRAM_FULL_NAMES[acronym as keyof typeof PROGRAM_FULL_NAMES] || acronym;
}
