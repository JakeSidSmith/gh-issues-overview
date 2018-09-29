export type Repos = ReadonlyArray<Repo>;

export interface Repo {
  name: string;
  full_name: string;
  issues_url: string;
}
