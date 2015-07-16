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

  render() {
    const articles = articleStore.getAll();
    if (!articles || !articles.length) {
      if (this.state && this.state.requested) {
        throw new Error('Already requested articles, but failed');
      }
      this.state = this.state || {};
      this.state.requesting = true;
      articleStore.fetch(this.articleid).then(() => this.setState({ requesting: false, requested: true }));
      return (
        <div className="StoryTiles--loading">
          Loading
        </div>
      );
    }
    return (
      <div className="mnv-ec-storytilesreveal" onClick={this.toggleAnimated.bind(this)} data-open={this.state.open}>
        <div className="main-container">
          <div className="article-reveal-container">
            <div className="article-list">
              {articles.map((article, key) => {
                return <Tile key={key} id={article.id} ref="animatedTile"/>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
