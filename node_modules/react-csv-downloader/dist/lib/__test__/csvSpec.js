'use strict';

/* eslint-disable */
var newLine = '\r\n';
var csv = require('../csv.js').default;

var columnSet1 = [{ id: 'cell1' }];
var columnSet2 = [{ id: 'cell1' }, { id: 'cell2' }];
var columnSet3 = [{ id: 'cell1', displayName: 'Cell name' }];
var columnSet4 = [{ id: 'cell2' }, { id: 'cell1' }];

var dataSet1 = [{ cell1: 'row1' }];
var dataSet2 = [{ cell1: 'row1', cell2: 'row1' }];
var dataSet3 = [['cell1', 'cell2']];
var dataSet4 = [['cell1', 'cell2'], ['cell1', 'cell2']];

describe('CSV Creator', function () {
  describe('Default separator', function () {
    var separator = ',';

    it('Single cell', function () {
      var result = csv(columnSet1, dataSet1);
      expect(result).to.equal('cell1' + newLine + 'row1');
    });

    it('Multiple cell', function () {
      var result = csv(columnSet2, dataSet2);
      expect(result).to.equal('cell1' + separator + 'cell2' + newLine + 'row1' + separator + 'row1');
    });

    it('Header display name', function () {
      var result = csv(columnSet3, dataSet1);
      expect(result).to.equal('Cell name' + newLine + 'row1');
    });

    it('Ordered cell', function () {
      var result = csv(columnSet4, dataSet2);
      expect(result).to.equal('cell2' + separator + 'cell1' + newLine + 'row1' + separator + 'row1');
    });

    it('No header', function () {
      var result = csv(columnSet1, dataSet1, separator, true);
      expect(result).to.equal('row1');
    });

    it('Auto header', function () {
      var result = csv(false, dataSet2);
      expect(result).to.equal('cell1' + separator + 'cell2' + newLine + 'row1' + separator + 'row1');
    });

    it('array of array datas - single row', function () {
      var result = csv(false, dataSet3);
      expect(result).to.equal('cell1' + separator + 'cell2');
    });

    it('array of array datas - multiple row', function () {
      var result = csv(false, dataSet4);
      expect(result).to.equal('cell1' + separator + 'cell2' + newLine + 'cell1' + separator + 'cell2');
    });

    it('array of array datas - with header', function () {
      var result = csv(columnSet4, dataSet4);
      expect(result).to.equal('cell2' + separator + 'cell1' + newLine + 'cell1' + separator + 'cell2' + newLine + 'cell1' + separator + 'cell2');
    });
  });

  describe('Semicolon separator', function () {
    var separator = ';';

    it('Single cell', function () {
      var result = csv(columnSet1, dataSet1, separator);
      expect(result).to.equal('cell1' + newLine + 'row1');
    });

    it('Multiple cell', function () {
      var result = csv(columnSet2, dataSet2, separator);
      expect(result).to.equal('cell1' + separator + 'cell2' + newLine + 'row1' + separator + 'row1');
    });

    it('Header display name', function () {
      var result = csv(columnSet3, dataSet1, separator);
      expect(result).to.equal('Cell name' + newLine + 'row1');
    });

    it('Ordered cell', function () {
      var result = csv(columnSet4, dataSet2, separator);
      expect(result).to.equal('cell2' + separator + 'cell1' + newLine + 'row1' + separator + 'row1');
    });

    it('No header', function () {
      var result = csv(columnSet1, dataSet1, separator, true);
      expect(result).to.equal('row1');
    });

    it('Auto header', function () {
      var result = csv(false, dataSet2, separator);
      expect(result).to.equal('cell1' + separator + 'cell2' + newLine + 'row1' + separator + 'row1');
    });

    it('array of array datas - single row', function () {
      var result = csv(false, dataSet3, separator);
      expect(result).to.equal('cell1' + separator + 'cell2');
    });

    it('array of array datas - multiple row', function () {
      var result = csv(false, dataSet4, separator);
      expect(result).to.equal('cell1' + separator + 'cell2' + newLine + 'cell1' + separator + 'cell2');
    });

    it('array of array datas - with header', function () {
      var result = csv(columnSet4, dataSet4, separator);
      expect(result).to.equal('cell2' + separator + 'cell1' + newLine + 'cell1' + separator + 'cell2' + newLine + 'cell1' + separator + 'cell2');
    });
  });
});