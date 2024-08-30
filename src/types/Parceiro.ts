export type Parceiro = {
  createdAt: string;
  name: string;
  description: string;
  repositoryGit: string;
  urlDoc: string;
  clients: Array<string | number>;
  projects: Array<string | number>;
  id?: string;
};
