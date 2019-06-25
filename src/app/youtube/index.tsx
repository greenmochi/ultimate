import React from "react";
import {
  connect,
} from "react-redux";
import {
  bindActionCreators,
  Dispatch,
  AnyAction
} from "redux";
import {
  StoreState,
} from "../../store";
import {
  setSearchTerm,
} from "../../store/youtube/action";
import {
  SYoutubeContainer,
  SForm,
  SInput,
  SSubmitButton,
} from "./style";
import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

const mapStateToProps = (state: StoreState) => ({
  youtube: state.youtube,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setSearchTerm,
  }, dispatch)
);

type YoutubeProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

class Youtube extends React.Component<YoutubeProps> {
  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;
    this.props.setSearchTerm(searchTerm);
  }

  render() {
    return (
      <SYoutubeContainer>
        <SForm
          onSubmit={this.handleOnSubmit}
        >
          <SInput
            autoFocus
            id="search"
            name="search"
            type="text"
            placeholder="Maroon 5 she will be loved"
            defaultValue={this.props.youtube.searchTerm}
          />
          <SSubmitButton
            type="submit"
          >
            <FontAwesomeIcon
              icon="search"
              size="xs"
              color="white"
            />
          </SSubmitButton>
        </SForm>
      </SYoutubeContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Youtube);