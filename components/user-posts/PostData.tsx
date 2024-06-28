interface Tag {
  id: number;
  primary: string;
  secondary?: string;
}

interface FormFields {
  id: string;
  title: string;
  dateNeeded: Date;
  description: string;
  prioritydata: number;
  tags: Tag[];
}

interface Post {
  client: string;
  title: string;
  timeCreated: string;
  priority: string;
  imgSrc: string;
  id: string;
  posts: FormFields[];
}

export { type Tag, type FormFields, type Post };
