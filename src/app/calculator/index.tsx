import React from "react";
import { connect } from "react-redux";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorButton } from "./CalculatorButton";
import { AppState } from "../../store";
import { CalculatorState } from "../../store/calculator/type";
import {
  updateCalculatorDisplay,
  updateCalculatorInput,
  updateCalculatorValue,
} from "../../store/calculator/action";

interface CalculatorProps {
  calculator: CalculatorState;
  updateCalculatorDisplay: typeof updateCalculatorDisplay;
  updateCalculatorInput: typeof updateCalculatorInput;
  updateCalculatorValue: typeof updateCalculatorValue;
}

class Calculator extends React.Component<CalculatorProps> {

  updateCalculatorDisplay = (value: number) => {
    this.props.updateCalculatorDisplay(value);
  }

  updateCalculatorInput = (value: number) => {
    this.props.updateCalculatorInput(value);
  }

  updateCalculatorValue= (value: number) => {
    this.props.updateCalculatorValue(value);
  }

  render() {
    return (
      <div>
        <CalculatorDisplay>{this.props.calculator.display}</CalculatorDisplay>
        <CalculatorButton 
          operation="+"
          calcInput={this.props.calculator.input}
          calcValue={this.props.calculator.value}
          updateCalculatorDisplay ={this.props.updateCalculatorDisplay}
          updateCalculatorInput={this.props.updateCalculatorInput}
          updateCalculatorValue={this.props.updateCalculatorValue}
        />
        <CalculatorButton 
          operation="1"
          calcInput={this.props.calculator.input}
          calcValue={this.props.calculator.value}
          updateCalculatorDisplay ={this.props.updateCalculatorDisplay}
          updateCalculatorInput={this.props.updateCalculatorInput}
          updateCalculatorValue={this.props.updateCalculatorValue}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  calculator: state.calculator,
});

export default connect(
  mapStateToProps, {
    updateCalculatorDisplay,
    updateCalculatorInput,
    updateCalculatorValue,
  },
)(Calculator);