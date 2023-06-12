export class User {
  constructor(
    public _id: String,
    public firstname: String,
    public lastname: String,
    public nick: String,
    public email: String,
    public password: String,
    public role: String,
    public active: Boolean,
    public avatar: String
  ) {}
}
