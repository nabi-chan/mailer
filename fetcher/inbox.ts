import { Imap } from "utils/imap";

export class InboxFetcher extends Imap {
  constructor() {
    super();
  }

  public async inboxesResolver() {
    // TODO
    return Promise.all([
      await this.inboxResolver("inbox"),
      await this.inboxResolver("sent"),
      await this.inboxResolver("trash"),
    ]);
  }

  public async inboxResolver(id: string) {
    // TODO
    return {
      id,
      name: id,
      mail: [],
      count: {
        unread: 0,
        total: 0,
      },
    };
  }

  private async getBoxMeta() {
    // TODO : getBoxes
    // TODO : format box as { path, attribs }
    // TODO : filter inbox, sent, trash
    // TODO : return
  }
}
