'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _csv = require('./lib/csv.js');

var _csv2 = _interopRequireDefault(_csv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrefixSuffixType = _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number]);

var CsvDownload = function (_Component) {
  _inherits(CsvDownload, _Component);

  function CsvDownload(props) {
    _classCallCheck(this, CsvDownload);

    var _this = _possibleConstructorReturn(this, (CsvDownload.__proto__ || Object.getPrototypeOf(CsvDownload)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      csv: (0, _csv2.default)(props.columns, props.datas, props.separator, props.noHeader)
    };
    return _this;
  }

  _createClass(CsvDownload, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState(_extends({}, this.state, {
        csv: (0, _csv2.default)(props.columns, props.datas, props.separator, props.noHeader)
      }));
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var _props = this.props,
          suffix = _props.suffix,
          prefix = _props.prefix,
          bom = _props.bom;


      var bomCode = '';
      var filename = this.props.filename;

      if (filename.indexOf('.csv') === -1) {
        filename += '.csv';
      }

      if (bom) {
        bomCode = '%EF%BB%BF';
      }

      if (suffix) {
        if (typeof suffix === 'string' || typeof suffix === 'number') {
          filename = filename.replace('.csv', '_' + suffix + '.csv');
        } else {
          filename = filename.replace('.csv', '_' + new Date().getTime() + '.csv');
        }
      }

      if (prefix) {
        if (typeof prefix === 'string' || typeof prefix === 'number') {
          filename = prefix + '_' + filename;
        } else {
          filename = new Date().getTime() + '_' + filename;
        }
      }

      var a = document.createElement('a');
      a.textContent = 'download';
      a.download = filename;
      a.href = 'data:text/csv;charset=utf-8,' + bomCode + encodeURIComponent(this.state.csv);
      a.click();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          text = _props2.text;


      if (typeof children === 'undefined') {
        return _react2.default.createElement(
          'button',
          { onClick: this.handleClick },
          function () {
            if (text) {
              return text;
            }
            return 'Download';
          }()
        );
      }

      return _react2.default.createElement(
        'div',
        { onClick: this.handleClick },
        children
      );
    }
  }]);

  return CsvDownload;
}(_react.Component);

CsvDownload.propTypes = {
  bom: _react.PropTypes.bool,
  children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.string, _react.PropTypes.element]),
  columns: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array, _react.PropTypes.arrayOf(_react.PropTypes.object)]),
  datas: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])).isRequired,
  filename: _react.PropTypes.string.isRequired,
  noHeader: _react.PropTypes.bool,
  prefix: PrefixSuffixType,
  separator: _react.PropTypes.string,
  text: _react.PropTypes.string,
  suffix: PrefixSuffixType
};
CsvDownload.defaultProps = {
  separator: ',',
  columns: false,
  bom: true,
  noHeader: false
};
exports.default = CsvDownload;