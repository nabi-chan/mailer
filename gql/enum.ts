import { builder } from "./builder";

export enum InboxList {
  INBOX = "inbox",
  SENT = "sent",
  TRASH = "trash",
}

builder.enumType(InboxList, {
  name: "InboxList",
});
