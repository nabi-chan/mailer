import { Imap } from "utils/imap";

export class InboxFetcher extends Imap {
  constructor() {
    super();
  }

  async getBoxMails(path: string, start: number, end: number | string) {
    try {
      await this.connect();
      // TODO: 이 뒤로 코드 실행이 안되는 이슈 고치기
      return [];
    } finally {
      await this.disconnect();
    }
  }

  async getBoxMeta() {
    try {
      await this.connect();
      const boxes = await this.imap.list();
      return boxes.filter((box) => !box.flags.has("\\Noselect"));
    } finally {
      await this.disconnect();
    }
  }
}
