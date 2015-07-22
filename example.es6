import React from 'react';
import StoryTiles from './index.es6';
const data = require('./data.json');
data.tiles.forEach((tile) => StoryTiles.store.add(tile));
export default (
  <StoryTiles />
);
