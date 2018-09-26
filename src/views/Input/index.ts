import { MapStateToProps, connect } from 'react-redux'
import { RootState } from '@app/state/root/reducer'
import Input from '@app/views/input/Input'
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from '@app/actions/ui'
import { selectInputValue } from '@app/state/input/selectors'

interface StateProps {
  value: string
}

interface DispatchProps {
  onType: (value: string) => void
  onEnter: (value: string) => void
  onArrowUp: () => void
  onArrowDown: () => void
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  value: selectInputValue(state),
})

const mapDispatchToProps: DispatchProps = {
  onType: updateInputValue,
  onEnter: enterInputValue,
  onArrowUp: goBackInputHistory,
  onArrowDown: goForwardInputHistory,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input)
