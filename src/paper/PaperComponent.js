import React, { Component } from 'react';
import './PaperComponent.css';

class PaperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdingPaper: false,
      mouseX: 0,
      mouseY: 0,
      touchX: 0,
      touchY: 0,
      prevX: 0,
      prevY: 0,
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
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('touchend', this.handleTouchEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleMouseMove = (e) => {
    if (!this.state.rotating && this.state.holdingPaper) {
      const { prevX, prevY } = this.state;
      const velX = e.clientX - prevX;
      const velY = e.clientY - prevY;
      this.setState(prevState => ({
        mouseX: e.clientX,
        mouseY: e.clientY,
        velX,
        velY,
        prevX: e.clientX,
        prevY: e.clientY,
        currentPaperX: prevState.currentPaperX + velX,
        currentPaperY: prevState.currentPaperY + velY
      }));
    }
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    if (!this.state.rotating && this.state.holdingPaper) {
      const touch = e.touches[0];
      const { prevX, prevY } = this.state;
      const velX = touch.clientX - prevX;
      const velY = touch.clientY - prevY;
      this.setState(prevState => ({
        touchX: touch.clientX,
        touchY: touch.clientY,
        velX,
        velY,
        prevX: touch.clientX,
        prevY: touch.clientY,
        currentPaperX: prevState.currentPaperX + velX,
        currentPaperY: prevState.currentPaperY + velY
      }));
    }
  };

  handleMouseDown = (e) => {
    if (this.state.holdingPaper) return;
    const { highestZ } = this.state;
    this.setState({
      holdingPaper: true,
      mouseX: e.clientX,
      mouseY: e.clientY,
      prevX: e.clientX,
      prevY: e.clientY,
      highestZ: highestZ + 1
    });
    const paper = e.currentTarget;
    paper.style.zIndex = highestZ;
    if (e.button === 2) {
      this.setState({ rotating: true });
    }
  };

  handleTouchStart = (e) => {
    if (this.state.holdingPaper) return;
    const { highestZ } = this.state;
    const touch = e.touches[0];
    this.setState({
      holdingPaper: true,
      touchX: touch.clientX,
      touchY: touch.clientY,
      prevX: touch.clientX,
      prevY: touch.clientY,
      highestZ: highestZ + 1
    });
    const paper = e.currentTarget;
    paper.style.zIndex = highestZ;
    if (e.touches.length === 2) {
      this.setState({ rotating: true });
    }
  };

  handleMouseUp = () => {
    this.setState({ holdingPaper: false, rotating: false });
  };

  handleTouchEnd = () => {
    this.setState({ holdingPaper: false, rotating: false });
  };

  render() {
    const { currentPaperX, currentPaperY, rotation } = this.state;

    return (
      <div className={this.props.className} style={{ transform: `translate(${currentPaperX}px, ${currentPaperY}px) rotate(${rotation}deg)` }} onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart}>
        {this.props.children}
      </div>
    );
  }
}

export default PaperComponent;
