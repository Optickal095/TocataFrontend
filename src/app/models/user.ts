export class User {
  constructor(
    public _id: string,
    public firstname: string,
    public lastname: string,
    public nick: string,
    public email: string,
    public password: string,
    public role: string,
    public active: Boolean,
    public avatar: string
  ) {}
}
