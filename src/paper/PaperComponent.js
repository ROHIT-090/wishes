import React, { Component } from 'react';
import './PaperComponent.css';

class PaperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdingPaper: false,
      mouseTouchX: 0,
      mouseTouchY: 0,
      mouseX: 0,
      mouseY: 0,
      prevMouseX: 0,
      prevMouseY: 0,
      velX: 0,
      velY: 0,
      rotation: Math.random() * 30 - 15,
      currentPaperX: 0,
      currentPaperY: 0,
      rotating: false,
      highestZ: 1
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove = (e) => {
    if (!this.state.rotating) {
      this.setState({
        mouseX: e.clientX,
        mouseY: e.clientY,
        velX: e.clientX - this.state.prevMouseX,
        velY: e.clientY - this.state.prevMouseY
      });
    }
    const dirX = e.clientX - this.state.mouseTouchX;
    const dirY = e.clientY - this.state.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;
    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    let degrees = 180 * angle / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
    if (this.state.rotating) {
      this.setState({ rotation: degrees });
    }
    if (this.state.holdingPaper) {
      if (!this.state.rotating) {
        this.setState(prevState => ({
          currentPaperX: prevState.currentPaperX + prevState.velX,
          currentPaperY: prevState.currentPaperY + prevState.velY
        }));
      }
      this.setState({
        prevMouseX: this.state.mouseX,
        prevMouseY: this.state.mouseY
      });
    }
  };

  handleMouseDown = (e) => {
    if (this.state.holdingPaper) return;
    const { highestZ } = this.state;
    this.setState({
      holdingPaper: true,
      mouseTouchX: this.state.mouseX,
      mouseTouchY: this.state.mouseY,
      prevMouseX: this.state.mouseX,
      prevMouseY: this.state.mouseY,
      highestZ: highestZ + 1
    });
    const paper = e.currentTarget;
    paper.style.zIndex = highestZ;
    if (e.button === 2) {
      this.setState({ rotating: true });
    }
  };

  handleMouseUp = () => {
    this.setState({ holdingPaper: false, rotating: false });
  };

  render() {
    const { currentPaperX, currentPaperY, rotation } = this.state;

    return (
     
      <div className={this.props.className} style={{ transform: `translate(${currentPaperX}px, ${currentPaperY}px) rotate(${rotation}deg)` }} onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </div>
    
    );
  }
}

export default PaperComponent;
