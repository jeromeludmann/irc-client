import { connect, MapStateToProps } from "react-redux";
import MessageList from "@app/components/messages/MessageList";
import { MessagesState } from "@app/reducers/channel/messages";
import { AppState } from "@app/reducers";
import { selectMessages } from "@app/reducers/channel/_selectors";

interface StateProps {
  messages: MessagesState;
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
  messages: selectMessages(state),
});

export default connect(mapStateToProps)(MessageList);
