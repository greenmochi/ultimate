import React from "react";
import { connect } from "react-redux";
import { Display } from "./Display";
import { Button } from "./Button";
import { AppState } from "../../store";
import { updateCalculator } from "../../store/calculator/action";
import { CalculatorState } from "../../store/calculator/type";

interface CalculatorProps {
  calculator: CalculatorState;
  updateCalculator: typeof updateCalculator;
}

class Calculator extends React.Component<CalculatorProps> {
  constructor(props: any) {
    super(props);
  }

  updateCalculator = (value: number) => {
    this.props.updateCalculator(value);
  }

  render() {
    return (
      <div>
        <Display>Hello</Display>
        <Button 
          value="+"
          input={this.props.calculator.input}
          updateCalculator={this.props.updateCalculator}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  calculator: state.calculator,
});

export default connect(
  mapStateToProps, 
  { updateCalculator },
)(Calculator);