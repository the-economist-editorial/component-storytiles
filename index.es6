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
            <aside className="credits">
              <h3>Photo credits in order of appearance:</h3>
              <p>Getty Images, Alamy, Alamy, AP, Reuters, Getty Images,
              Getty Images, Alamy, Alamy, Barcroft, Alamy, Alamy, Alamy, Alamy,
              Alamy, Alamy, Reuters, Bloomberg, University of Surrey, Reuters,
              Alamy, Alamy, Reuters, Majority World, Majority World, Alamy, EPA,
               AP, AFP, Reuters, Reuters, Eyevine, Eyevine, Getty Images,
               Bill & Melinda Gates Foundation/Frederic Courbet, Alamy,
               Getty Images, Getty Images, Eyevine, Alamy.</p>
              <h3>Illustration credits in order of appearance
              from the cover:</h3>
              <p>Matt Herring, Florian Schommer, Alex Williamson, KAL,
               Gary Neill, Otto Steininger, Florian Schommer.</p>
            </aside>
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
