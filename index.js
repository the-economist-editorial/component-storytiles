'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _economistComponentTile = require('@economist/component-tile');

var _economistComponentTile2 = _interopRequireDefault(_economistComponentTile);

var StoryTiles = (function (_React$Component) {
  _inherits(StoryTiles, _React$Component);

  function StoryTiles(props) {
    _classCallCheck(this, StoryTiles);

    _React$Component.call(this, props);
  }

  StoryTiles.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'mnv-widget mnv-ec-storytilesreveal landing' },
      _react2['default'].createElement(
        'div',
        { className: 'main-container' },
        _react2['default'].createElement(
          'div',
          { className: 'article-reveal-container' },
          _react2['default'].createElement(
            'div',
            { className: 'article-list' },
            this.props.data.map(function (tile) {
              return _react2['default'].createElement(_economistComponentTile2['default'], { key: tile.id, data: tile });
            })
          )
        )
      )
    );
  };

  return StoryTiles;
})(_react2['default'].Component);

exports['default'] = StoryTiles;
module.exports = exports['default'];

