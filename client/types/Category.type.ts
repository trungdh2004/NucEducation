export type CateForm = {
  name: string;
  image: string;
  description: string;
};

export type CateResponse = {
  _id: string;
  name: string;
  image: string;
  description: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
