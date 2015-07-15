import React from 'react';
import Tile from '@economist/component-tile';

export default class StoryTiles extends React.Component {

  static get propTypes() {
    return {
      data: React.PropTypes.object,
      tile: React.PropTypes.object,
      id: React.PropTypes.string,
    };
  }

  constructor() {
    super();
    this.state = { open: false };
  }

  toggleAnimated() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    this.setState({ open: false });
    const targetContainerElement = React.findDOMNode(this);
    targetContainerElement.style.display = 'block';
  }

  open() {
    this.setState({ open: true });
    const targetContainerElement = React.findDOMNode(this);
    const transitionTarget = React.findDOMNode(this.refs.animatedTile);
    function func() {
      targetContainerElement.style.display = 'none';
      transitionTarget.removeEventListener('transitionend', func);
    }
    transitionTarget.addEventListener('transitionend', func, false);
  }

  render() {
    return (
      <div className="mnv-ec-storytilesreveal" onClick={this.toggleAnimated.bind(this)} data-open={this.state.open}>
        <div className="main-container">
          <div className="article-reveal-container">
            <div className="article-list">
              {this.props.data.map((tile) => {
                return <Tile key={tile.id} data={tile} ref="animatedTile"/>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


