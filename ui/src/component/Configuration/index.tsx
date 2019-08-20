import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import lodash from "lodash";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { StoreState } from "../../store";
import { setDefaultTheme } from "../../store/theme/action";

export const Container = styled.div`
  background-color: #1D1D1D;
  text-align: center;
  overflow-y: auto;
`;

export const Form = styled.form`
  margin: 10px;
`;

export const Input = styled.input`
  font-size: 1.3em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  outline: none;
`;

export const SubmitButton = styled.button`
  font-size: 1.3em;
  margin-left: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  background-color: #F7941D;
  border: none;
  outline: none;
  cursor: pointer;
`;

const mapStateToProps = (state: StoreState) => ({
  theme: state.theme,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    setDefaultTheme,
  }, dispatch)
);

type ConfigurationProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
  };

class Configuration extends React.Component<ConfigurationProps> {
  handleOnSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let searchTerm: string = data.get("search") as string;

    const theme = this.props.theme;
    let copy = lodash.cloneDeep(theme.defaultTheme);
    copy.colors.main = "green";
    this.props.setDefaultTheme(copy);
    // theme.defaultTheme.colors.main = "black";
  }

  render() {
    return (
      <Container>
        <Form
          onSubmit={this.handleOnSubmit}
        >
          <Input
            autoFocus
            id="search"
            name="search"
            type="text"
            placeholder="Maroon 5 she will be loved"
          />
          <SubmitButton
            type="submit"
          >
            <FontAwesomeIcon
              icon="search"
              size="xs"
              color="white"
            />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configuration);