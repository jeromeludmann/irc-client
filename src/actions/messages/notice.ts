import {
  Prefix,
  MessageAction,
  MessageActionCreator,
} from "@app/actions/messages/raw";

interface Notice {
  from: Prefix;
  target: string;
  text: string;
}

export const MESSAGE_NOTICE = "MESSAGE/NOTICE";

export type NoticeAction = MessageAction<typeof MESSAGE_NOTICE, Notice>;

export const noticeReceived: MessageActionCreator<NoticeAction> = (
  prefix,
  params,
) => {
  // TODO MESSAGE_NOTICE_SERVER
  // TODO MESSAGE_NOTICE_USER

  return {
    type: MESSAGE_NOTICE,
    payload: { from: prefix, target: params[0], text: params[1] },
    route: { channel: params[0] },
  };
};
