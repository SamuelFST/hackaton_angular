export default class User {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public dateBirth: Date,
    public createdAt: Date,
    public updatedAt: Date,
  ) {

  }
}
