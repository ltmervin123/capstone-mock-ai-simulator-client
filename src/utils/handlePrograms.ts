import { PROGRAM_ACRONYMS } from '@/constants/program-option';

export function getProgramAcronym(program: string) {
  return PROGRAM_ACRONYMS[program as keyof typeof PROGRAM_ACRONYMS] || program;
}
