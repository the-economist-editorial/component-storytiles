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

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mnv-widget mnv-ec-storytilesreveal landing">
        <div className="main-container">
          <div className="article-reveal-container">
            <div className="article-list">
              {this.props.data.map((tile) => {
                return <Tile key={tile.id} data={tile}/>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
