export class AuthError extends Error {
  constructor(
    message: string,
    readonly code: 'INVALID_CREDENTIALS' | 'CNPJ_NOT_SUPPORTED' | 'UNKNOWN',
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function resolveAuthEmail(identifier: string): string {
  if (identifier.includes('@')) {
    return identifier.trim().toLowerCase();
  }

  throw new AuthError(
    'Autenticação por CNPJ será activada em breve. Utilize o seu e-mail corporativo.',
    'CNPJ_NOT_SUPPORTED',
  );
}
