import React from "react";
import { connect } from "react-redux";
import { Display } from "./Display";
import { Button } from "./Button";
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
        <Display>{this.props.calculator.display}</Display>
        <Button 
          operation="+"
          calcInput={this.props.calculator.input}
          calcValue={this.props.calculator.value}
          updateCalculatorDisplay ={this.props.updateCalculatorDisplay}
          updateCalculatorInput={this.props.updateCalculatorInput}
          updateCalculatorValue={this.props.updateCalculatorValue}
        />
        <Button 
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