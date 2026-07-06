import { z } from 'zod';
import { isValidCnpj } from '../utils/cnpj';

function isValidEmail(value: string): boolean {
  return z.string().email().safeParse(value).success;
}

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'CNPJ ou e-mail é obrigatório')
    .refine(
      (value) => isValidEmail(value) || isValidCnpj(value),
      'Introduza um CNPJ ou e-mail válido',
    ),
  password: z
    .string()
    .min(1, 'A palavra-passe é obrigatória')
    .min(6, 'A palavra-passe deve ter no mínimo 6 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;
