import { MapStateToProps, connect } from "react-redux";
import { AppState } from "@app/reducers";
import { selectValue } from "@app/reducers/input/_selectors";
import Input from "@app/components/input/Input";
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui";

interface StateProps {
  value: string;
}

interface DispatchProps {
  onType: (value: string) => void;
  onEnter: (value: string) => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
}

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
  value: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onType: updateInputValue,
  onEnter: enterInputValue,
  onArrowUp: goBackInputHistory,
  onArrowDown: goForwardInputHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
