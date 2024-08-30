export type Parceiro = {
  createdAt: string;
  name: string;
  description: string;
  repositoryGit: string;
  urlDoc: string;
  clients: Array<string>;
  projects: Array<string>;
  id?: string;
};
