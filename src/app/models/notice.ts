export class Notice {
  constructor(
    public _id: string,
    public title: string,
    public text: string,
    public created_at: string,
    public date: Date,
    public region: string,
    public city: string,
    public user: {
      _id: string;
      firstname: string;
      lastname: string;
      avatar: string;
    },
    public phone: string,
    public email: string
  ) {}
}
