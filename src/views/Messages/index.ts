import { connect, MapStateToProps } from 'react-redux'
import Messages from '@app/views/Messages/Messages'
import { MessagesState } from '@app/state/messages/reducer'
import { RootState } from '@app/state/root/reducer'
import { getMessages } from '@app/state/messages/selectors'

interface StateProps {
  messages: MessagesState
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  messages: getMessages()(state),
})

export default connect(mapStateToProps)(Messages)
