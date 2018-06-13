import { Middleware } from "redux";
import { parser } from "@app/se/parser";
import { commands } from "@app/se/commands";
import { repliers } from "@app/se/repliers";
import { socket } from "@app/se/socket";
import { createLogger } from "@app/se/logger";
import { CHANGE_INPUT_VALUE } from "@app/actions/ui/input";

const logger = createLogger({ exclude: [CHANGE_INPUT_VALUE] });

// be careful with the order of the middlewares
export const sideEffects: Middleware[] = [
  parser, // keep parser first
  commands,
  repliers,
  socket, // keep socket last (but before logger)
  logger, // keep logger last
];
