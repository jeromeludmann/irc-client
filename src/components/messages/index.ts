import { connect, MapStateToProps } from "react-redux";
import MessageList from "@app/components/messages/MessageList";
import { MessagesState } from "@app/reducers/messages";
import { RootState } from "@app/reducers";
import { selectMessages } from "@app/reducers/selectors";

interface StateProps {
  messages: MessagesState;
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  messages: selectMessages(state),
});

export default connect(mapStateToProps)(MessageList);
