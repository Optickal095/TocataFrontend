export class Publication {
  constructor(
    public _id: string,
    public text: string,
    public file: string,
    public created_at: string,
    public user: { firstname: string; lastname: string; avatar: string }
  ) {}
}
