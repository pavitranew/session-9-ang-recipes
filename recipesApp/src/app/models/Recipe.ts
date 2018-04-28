// export interface Recipe {
//   name: string;
//   title: string;
//   date: string;
//   description: string;
//   image: string;
// }

export class Recipe {
  name: string;
    title: string;
    date: string;
    description: string;
    image: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}