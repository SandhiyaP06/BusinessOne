export const Roles = {
  ENTREPRENEUR: 'ENTREPRENEUR',
  DEPARTMENT_OFFICER: 'DEPARTMENT_OFFICER',
  INSPECTOR: 'INSPECTOR',
  ADMIN: 'ADMIN'
} as const;

export type RoleName = (typeof Roles)[keyof typeof Roles];
