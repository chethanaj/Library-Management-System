export interface Bookapi {
  id: number;
  isbn:string;
  title:string;
  subject:string;
  publisher:string;
  language:string;
  noOfPages:string;
  status:string;
  authors:Authors[];
}

export interface Authors {
 
  authorName: string;

}
