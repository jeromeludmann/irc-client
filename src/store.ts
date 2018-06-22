import { createStore, applyMiddleware } from "redux";
import rootReducer from "@app/reducers";
import { STATUS_BUFFER } from "@app/Route";
import { createLogger } from "@app/middlewares/logger";
import { UPDATE_INPUT_VALUE } from "@app/actions/input";
import { parser } from "@app/middlewares/parser";
import { autoReply } from "@app/middlewares/auto-reply";
import { command } from "@app/middlewares/command";
import { network } from "@app/middlewares/network";

const logger = createLogger({ exclude: [UPDATE_INPUT_VALUE] });

export const store = createStore(
  rootReducer,
  {
    user: { nick: "nick", user: "user", real: "IRC Client" },
    active: { serverKey: "serverKey", bufferKey: STATUS_BUFFER },
  },
  // be careful with the order of the middlewares
  applyMiddleware(
    parser, // keep first
    autoReply,
    command,
    network, // keep just before logger
    logger, // keep last
  ),
);
