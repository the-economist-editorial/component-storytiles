import React from 'react';
import Tile from '@economist/component-tile';
import ArticleStore from '@economist/component-articlestore';
import Omniture from '@economist/component-omniture';
import Authenticated from '@economist/component-authenticated';

const authenticated = new Authenticated();
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
    const loggedin = (authenticated.getCookie('mm-logged-in-state')) ? 'logged_in' : 'not_logged_in';
    let image;
    if ((((articleStore.main || {}).attributes) || {}).mainimage) {
      image = (
        <div className="StoryTiles--cover-image">
          <img
            src={articleStore.main.attributes.mainimage['1.0x']}
            srcSet={this.getSrcSet(articleStore.main.attributes.mainimage)}
          />
        </div>
      );
    }
    return (
      <div className="StoryTiles" data-open={this.state.open}>
        <div className="StoryTiles--container">
          <div className="StoryTiles--container-inner">
            {image}
            <div className="StoryTiles--container-article-list">
              {articles.map((article, key) => {
                return <Tile key={key} wide={key % 5 + 2} id={article.id} ref="animatedTile" />;
              })}
            </div>
          </div>
        </div>
         <Omniture
          pageName="the_world_if|homepage"
          server="economist.com"
          channel="home"
          prop1="the_world_if"
          prop3="web"
          prop4="homepage"
          prop5="home"
          prop11={loggedin}
          prop13="anonymous"
          prop31={new Date()}
        />
      </div>
    );
  }
}
