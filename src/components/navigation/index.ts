import { connect, MapStateToProps } from "react-redux";
import { RouteState } from "@app/reducers/route";
import { Route } from "@app/Route";
import { AppState } from "@app/reducers";
import { selectRoute, selectServers } from "@app/reducers/_selectors";
import { switchWindow } from "@app/actions/ui";
import Navigation from "@app/components/navigation/Navigation";

interface StateProps {
  servers: {
    [serverKey: string]: {
      name: string;
      channels: { [channelKey: string]: { activity: boolean } };
    };
  };
  window: RouteState;
}

interface DispatchProps {
  onChannelButtonClick: (route: Route) => void;
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
  // TODO provide a better selector to Navigation
  servers: selectServers(state),
  window: selectRoute(state),
});

const mapDispatchToProps: DispatchProps = {
  onChannelButtonClick: switchWindow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
