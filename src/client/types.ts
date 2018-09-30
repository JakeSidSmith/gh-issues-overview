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

export interface Issue {
  title: string;
  number: number;
  labels: ReadonlyArray<string>;
  id: number;
  html_url: string;
  pull_request?: {};
}

export interface Issues {
  [i: string]: ReadonlyArray<Issue> | undefined;
}
