import React from 'react';
import StoryTiles from './index.es6';
import WorldIfContent from '@economist/world-if-assets';

for (const article of WorldIfContent.data[0].relationships.posts.data) {
  StoryTiles.store.add(article);
}
export default (
  <StoryTiles />
);
