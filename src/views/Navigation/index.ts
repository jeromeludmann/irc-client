import { connect, MapStateToProps } from 'react-redux'
import { RouteState } from '@app/state/route/reducer'
import { Route } from '@app/utils/Route'
import { RootState } from '@app/state/root/reducer'
import { switchWindow } from '@app/actions/ui'
import Navigation from '@app/views/navigation/Navigation'
import { selectServers } from '@app/state/root/selectors'
import { selectRoute } from '@app/state/route/selectors'

interface StateProps {
  servers: {
    [serverKey: string]: {
      name: string
      buffers: { [bufferKey: string]: { activity: boolean } }
    }
  }
  window: RouteState
}

interface DispatchProps {
  onWindowButtonClick: (route: Route) => void
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  // TODO provide a better selector to Navigation
  servers: selectServers(state),
  window: selectRoute(state),
})

const mapDispatchToProps: DispatchProps = {
  onWindowButtonClick: switchWindow,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)
