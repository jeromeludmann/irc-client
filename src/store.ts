import { createStore, applyMiddleware } from "redux";
import { reduce } from "@app/reducers";
import { createLogger } from "@app/middlewares/logger";
import { UPDATE_INPUT_VALUE } from "@app/actions/input";
import { parser } from "@app/middlewares/parser";
import { autoReply } from "@app/middlewares/auto-reply";
import { command } from "@app/middlewares/command";
import { network, generateServerKey } from "@app/middlewares/network";
import { STATUS } from "@app/Route";
import { serverInitialState } from "@app/reducers/server";
import { autoRouter } from "@app/middlewares/autoRouter";

const serverKey = generateServerKey();
const logger = createLogger({ exclude: [UPDATE_INPUT_VALUE] });

export const store = createStore(
  reduce,
  {
    servers: { [serverKey]: serverInitialState },
    route: { serverKey, channelKey: STATUS },
  },
  // be careful with the order of the middlewares
  applyMiddleware(
    parser, // keep first
    autoRouter,
    autoReply,
    command,
    network, // keep just before logger
    logger, // keep last
  ),
);
