import { InboxList } from "gql/enum";
import { Imap } from "utils/imap";

export class InboxFetcher extends Imap {
  constructor() {
    super();
  }

  public async inboxesResolver() {
    // TODO
    return Promise.all([
      await this.inboxResolver(InboxList.INBOX),
      await this.inboxResolver(InboxList.SENT),
      await this.inboxResolver(InboxList.TRASH),
    ]);
  }

  public async inboxResolver(id: InboxList) {
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
