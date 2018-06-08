import { RootState } from "@app/state";
import { InputState } from "@app/state/input/input";
import { ActiveState } from "@app/state/active";

export const selectInput = ({
  servers,
  active: { server, channel },
}: RootState): InputState => servers[server].channels[channel].input;

export const selectActiveRoute = ({ active }: RootState): ActiveState =>
  active;
