export class Publication {
  constructor(
    public _id: string,
    public text: string,
    public file: string,
    public audio: string,
    public created_at: string,
    public user: {
      _id: string;
      firstname: string;
      lastname: string;
      avatar: string;
    }
  ) {}
}
