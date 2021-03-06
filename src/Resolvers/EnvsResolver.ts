import RolesStore from '../RolesStore';

import { Grants } from '../types';

import uniq from 'lodash.uniq';

export default function EnvsResolver(
  rolesStore: RolesStore,
  roles: string[],
  permissions: string[],
  ...envs: string[]
): string[] {
  if (envs.length === 1 && envs[0] === '*') {
    envs = [];

    roles.forEach((role: string) => {
      Object.keys(rolesStore.getPermissions(role)!).forEach((key: string) => {
        envs.concat(Object.keys(rolesStore.getPermissions(role)![key]));
      });
    });
  }

  return uniq(envs);
}
