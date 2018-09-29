export type Repos = ReadonlyArray<Repo>;

export interface Permissions {
  admin: boolean;
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  issues_url: string;
  homepage: string;
  svn_url: string;
  fork: boolean;
  permissions: Permissions;
}
