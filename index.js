import React from 'react';
import Tile from '@economist/component-tile';

export default class StoryTiles extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mnv-widget mnv-ec-storytilesreveal landing">
        <div className="main-container">
          <div className="article-reveal-container">
            <div className="article-list">
              {this.props.data.map(function(tile) {
                  return <Tile key={tile.id} data={tile}/>;
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
