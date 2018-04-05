angular.module("tictactoe", [])
.controller("mainController", function($scope){
    $scope.model = new TicTacToeBoard();
    
    $scope.restart= function() {
        $scope.model = new TicTacToeBoard();    
    }
});

var TicTacToeBoard = function() {
    this.board = new Array(this.boardSize);
    this.boardCellsWin = new Array(this.boardSize);
    this.turn = true;
    this.estate = 'Start game';
    this.player = '';
    this.cellsWinning = false;
    for (var i = 0; i < this.boardSize; i++) {
        this.board[i] = new Array(this.boardSize);
        this.boardCellsWin[i] = new Array(this.boardSize);
        this.boardCellsWin[i].fill(false);
    }
};

TicTacToeBoard.prototype.fill = function (i, j) {
    if (this.board[i][j] || this.gameFinish) return;
    
    if (this.turn) {
        this.board[i][j] = 'X'
        this.estate = 'Playing: ';
        this.player = 'X';
    } else {
        this.board[i][j] = 'O'
        this.estate = 'Playing: ';
        this.player = 'O';
    }
    
    var winningCells = this.hasPlayerWon();
    if (winningCells) {
        this.turn? this.estate = 'has won!' : this.estate = 'has won!';
        this.gameFinish = true;
        this.fillWinningCells(winningCells);
        return; 
    } else if (this.draw()) {
        this.estate = 'draw!!!';
        this.player = '';
        this.gameFinish = true;
        return;
    }
    this.turn = !this.turn;
};
    
TicTacToeBoard.prototype.hasPlayerWon = function() {
    var i, j;

    // COLUMNS
    for(j = 0; j < this.boardSize; j++) {
        var column = [];
        for (i = 0; i < this.boardSize; i++)    
            column.push({ index: [i, j], value: this.board[i][j] });
        
        if ( column.every(function(e) { return e.value === 'X' }))
            return column;
        else if ( column.every(function(e) { return e.value === 'O' }))
            return column;
    }
    
    // ROWS
    for(i = 0; i < this.boardSize; i++) {
        var row = [];
        for (j = 0; j < this.boardSize; j++)
            row.push({ index: [i,j], value: this.board[i][j] });
        
        if (row.every(function(e) { return e.value === 'X' }))
            return row;
        else if (row.every(function(e) { return e.value === 'O' }))
            return row;
    }
    
    // DIAGONAL1
    var diag1 = [];
    for(i = 0; i < this.boardSize; i++) {
        diag1.push({ index: [i,i], value: this.board[i][i] });
    }
    if (diag1.every(function(e) { return e.value === 'X' }))
        return diag1;
    else if (diag1.every(function(e) { return e.value === 'O' }))
        return diag1;
    
    // DIAGONAL2
    var diag2 = [];
    for(i = 0, j = this.boardSize - 1; i < this.boardSize; i++, j--) {
        diag2.push({ index: [i,j], value: this.board[i][j] });
    }
    if (diag2.every(function(e) { return e.value === 'X' }))
        return diag2;
    else if (diag2.every(function(e) { return e.value === 'O' }))
        return diag2;
    
    return undefined;
};

TicTacToeBoard.prototype.cellsWin = function(i, j) {  
    return this.boardCellsWin[i][j];
};
                        
TicTacToeBoard.prototype.draw = function() {
    var empty = this.boardSize*this.boardSize;
    for (var i = 0; i < this.boardSize; i++) {
        for (var j = 0; j < this.boardSize; j++) {
            if (this.board[i][j])
                empty--;
        }
    }
    return empty === 0;
};

TicTacToeBoard.prototype.fillWinningCells = function(winningCells) {
    for (var i = 0; i < winningCells.length; i++) {
        var index = winningCells[i].index;
        this.boardCellsWin[index[0]][index[1]] = true;   
    }
};

TicTacToeBoard.prototype.boardSize = 3;