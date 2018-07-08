import { connect, MapStateToProps } from "react-redux";
import { AppState } from "@app/reducers";
import { ServersState } from "@app/reducers/servers";
import { RouteState } from "@app/reducers/route";
import { selectRoute, selectServers } from "@app/reducers/_selectors";
import { MessagesState } from "@app/reducers/channel/messages";
import { selectMessages } from "@app/reducers/channel/_selectors";
import { selectValue } from "@app/reducers/input/_selectors";
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
  switchWindow,
} from "@app/actions/ui";
import { Route } from "@app/Route";
import { Layout } from "@app/components/layout/Layout";

interface StateProps {
  servers: ServersState;
  window: RouteState;
  messages: MessagesState;
  inputValue: string;
}

interface DispatchProps {
  onChannelSwitch: (route: Route) => void;
  onInputType: (value: string) => void;
  onInputEnter: (value: string) => void;
  onInputArrowUp: () => void;
  onInputArrowDown: () => void;
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
  messages: selectMessages(state),
  window: selectRoute(state),
  servers: selectServers(state),
  inputValue: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onChannelSwitch: switchWindow,
  onInputType: updateInputValue,
  onInputEnter: enterInputValue,
  onInputArrowUp: goBackInputHistory,
  onInputArrowDown: goForwardInputHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
