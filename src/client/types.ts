export type Repos = ReadonlyArray<Repo>;

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  issues_url: string;
}
