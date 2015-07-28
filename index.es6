import React from 'react';
import Tile from '@economist/component-tile';
import ArticleStore from '@economist/component-articlestore';

const articleStore = new ArticleStore('/content');
export default class StoryTiles extends React.Component {

  constructor() {
    super();
    this.state = { open: false };
  }

  static get store() {
    return articleStore;
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

  getSrcSet(image) {
    return Object.keys(image).map((key) => `${image[key]} ${key}`).join(',');
  }

  render() {
    const articles = articleStore.getAll();
    let image;
    if ((((articleStore.main || {}).attributes) || {}).mainimage) {
      image = (
        <div className="cover-image">
          <img
            src={articleStore.main.attributes.mainimage['1x']}
            srcSet={this.getSrcSet(articleStore.main.attributes.mainimage)}
          />
        </div>
      );
    }
    return (
      <div className="mnv-ec-storytilesreveal" data-open={this.state.open}>
        <div className="main-container">
          <div className="article-reveal-container">
            {image}
            <div className="article-list">
              {articles.map((article, key) => {
                return <Tile key={key} wide={key % 5 + 2} id={article.id} ref="animatedTile"/>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
