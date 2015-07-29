import React from 'react';

export default class Tile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className={`article-reveal-tile ${this.props.data.animate}`} data-id={this.props.data.id} id={`tile` + this.props.data.id}>
        <a href={this.props.data.url} className="Tile--inner">
          <div className="Tile--inner-content">
            <div className="text-part">
              <h2 className="section">{this.props.data.section}</h2>
              <h2 className="title">{this.props.data.title}</h2>
              <h2 className="rubrik">{this.props.data.rubric}</h2>
            </div>
          </div>
          <div className="Tile--inner-image">
            <div className="image-tint"></div>
            <div className="image-grad"></div>
            <img className="image" src={this.props.data.img} />
          </div>
        </a>
      </div>
    );
  }
}