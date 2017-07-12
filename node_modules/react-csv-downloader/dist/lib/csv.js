'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = csv;
var newLine = '\r\n';

function csv(columns, datas) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var noHeader = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var columnOrder = void 0;
  var content = [];
  var column = [];

  if (columns) {
    columnOrder = columns.map(function (v) {
      if (typeof v === 'string') {
        return v;
      }
      if (!noHeader) {
        column.push(typeof v.displayName !== 'undefined' ? v.displayName : v.id);
      }
      return v.id;
    });
    if (column.length > 0) {
      content.push(column.join(separator));
    }
  } else {
    columnOrder = [];
    datas.forEach(function (v) {
      if (!Array.isArray(v)) {
        columnOrder = columnOrder.concat(Object.keys(v));
      }
    });
    if (columnOrder.length > 0) {
      columnOrder = columnOrder.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });

      if (!noHeader) {
        content.push(columnOrder.join(separator));
      }
    }
  }

  if (Array.isArray(datas)) {
    datas.map(function (v) {
      if (Array.isArray(v)) {
        return v;
      }
      return columnOrder.map(function (k) {
        if (typeof v[k] !== 'undefined') {
          return v[k];
        }
        return '';
      });
    }).forEach(function (v) {
      content.push(v.join(separator));
    });
  }
  return content.join(newLine);
}