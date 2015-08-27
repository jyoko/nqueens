// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var conflict = _.reduce(this.get(rowIndex), function(val, current){
        return current + val;
      }, 0);
      return conflict > 1; // (conflict>1)
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      return _.reduce(this.rows(), function(val, current){
        return val || (_.reduce(current, function(v, c){
          return c + v;
        }, 0) > 1);
      }, false)
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var conflict = _.reduce(this.rows(), function(val,current){
        return current[colIndex] + val;
      },0);
      return conflict>1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.rows();
      return _.reduce(this.get(0), function(val,current,iterator) {
        return val || (_.reduce(rows, function(v,c) {
          return c[iterator] + v;
        },0) > 1);
      },false);
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // loop over rows
      // move forward one row & one column per iteration
      // reduce to number ^^^ same as above
      
      var rows = this.rows(); 
      var conflict = _.reduce(rows, function(val, current, iterator){
        return val || (_.reduce(rows, function(v,c,j){
          var toAdd = c[majorDiagonalColumnIndexAtFirstRow + j] || 0;
          return v + toAdd;
        }, 0) > 1);
      }, false)
      return conflict; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // i fzkced this one up a bit
      // theoretically loop over first row as above
      // then each subsequent row starting from column0
      var rows = this.rows();
      var conflict = false;
      for(var i = 0; i < rows.length; i++){
        conflict = conflict || (_.reduce(rows, function(val, current, j){
          var toAdd = current[i + j] || 0;
          return val + toAdd;
        }, 0) > 1);
      }
      rows.shift();
      for(var i = 0; i < rows.length; i++){
        conflict = conflict || (_.reduce(rows, function(val, current, j){
          var toAdd = current[j] || 0;
          return val + toAdd;
        }, 0) > 1);
        rows.shift();
      }
      return conflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // easy once major is done, same thing but from the right
      var rows = this.rows(); 
      var conflict = _.reduce(rows, function(val, current, iterator){
        return val || (_.reduce(rows, function(v,c,j){
          var toAdd = c[minorDiagonalColumnIndexAtFirstRow - j] || 0;
          return v + toAdd;
        }, 0) > 1);
      }, false)
      return conflict;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var conflict = false;
      var end = rows.length-1;
      for(var i = end; i > 0; i--){
        conflict = conflict || (_.reduce(rows, function(val, current, j){
          var toAdd = current[i - j] || 0;
          return val + toAdd;
        }, 0) > 1);
      }
      rows.shift();
      for(var i = 0; i < rows.length; i++){
        conflict = conflict || (_.reduce(rows, function(val, current, j){
          var toAdd = current[end-j] || 0;
          return val + toAdd;
        }, 0) > 1);
        rows.shift();
      }
      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
