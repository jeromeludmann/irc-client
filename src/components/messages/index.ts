import { connect, MapStateToProps } from "react-redux";
import MessageList from "@app/components/messages/MessageList";
import { MessagesState, selectMessages } from "@app/reducers/messages";
import { RootState } from "@app/reducers";

interface StateProps {
  messages: MessagesState;
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  messages: selectMessages(state),
});

export default connect(mapStateToProps)(MessageList);
