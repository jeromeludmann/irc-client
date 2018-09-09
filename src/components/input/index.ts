import { MapStateToProps, connect } from 'react-redux'
import { RootState } from '@app/reducers'
import Input from '@app/components/input/Input'
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from '@app/actions/ui'
import { selectValue } from '@app/reducers/_selectors'

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
  value: selectValue(state),
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
