interface ICategory {
    id: number;
    name: string;
    parentName: string | null;
    status: number;
    deleted: number;
    slug: string;
    createdAt: string;
  }

export default ICategory