import { Middleware } from "redux";
import { parser } from "@app/middlewares/parser";
import { repliers } from "@app/middlewares/repliers";
import { input } from "@app/middlewares/input";
import { socket } from "@app/middlewares/socket";
import { createLogger } from "@app/middlewares/logger";
import { CHANGE_INPUT_VALUE } from "@app/actions/ui/input";

const logger = createLogger({ exclude: [CHANGE_INPUT_VALUE] });

// be careful with the order of the middlewares
export const sideEffects: Middleware[] = [
  parser, // keep parser first
  repliers,
  input,
  socket, // keep socket last (but before logger)
  logger, // keep logger last
];
