export interface Tag {
  name: string;
  color: string;
}

export interface Workflow {
  id: string | number;
  type: string;
  name: string;
  tags: Tag[];
  lastUpdated: number;
}
