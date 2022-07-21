import React from "react";
import ReactDOM from "react-dom";

import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Transition, animated } from "react-spring";

const TestScreen = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
`;

function TestScreen1(props) {
  return <TestScreen bgColor="tomato">Im number 1</TestScreen>;
}

function TestScreen2(props) {
  return <TestScreen bgColor="aqua">Im number 2</TestScreen>;
}

function TestScreen3(props) {
  return <TestScreen bgColor="navy">Im number 3</TestScreen>;
}

const testScreens = [TestScreen1, TestScreen2, TestScreen3];

const Container = styled("div")`
  height: 400px;
  position: relative;
  width: 100%;
  cursor: pointer;
  & > div {
    will-change: transform, opacity;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

class App extends React.Component {
  state = {
    index: 0
  };

  toggle = e =>
    this.setState(state => ({
      index: state.index === 2 ? 0 : state.index + 1
    }));
  render() {
    const { index } = this.state;
    return (
      <div>
        <h1>React Spring Transition Tutorial</h1>
        <Container onClick={this.toggle}>
          <Transition
            native
            reset
            unique
            items={index}
            from={{ opacity: 0, transform: "translate3d(100%, 0 ,0)" }}
            enter={{ opacity: 1, transform: "translate3d(0%, 0, 0)" }}
            leave={{ opacity: 0, transform: "translate3d(-50%, 0, 0)" }}
          >
            {index => style => (
              <animated.div style={{ ...style }}>
                {React.createElement(testScreens[index])}
              </animated.div>
            )}
          </Transition>
        </Container>
        <h3>Hit The clap if you enjoyed!</h3>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
