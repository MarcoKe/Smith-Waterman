/**
 * Created by mar on 18-2-16.
 */



function initialize(seq1, seq2) {
    seq1 = seq1.toUpperCase();
    seq2 = seq2.toUpperCase();

    var table = makeTable(seq1, seq2);

    //fillOuterTable(table, seq1, seq2);

    return table;
}

function fill(table, seq1, seq2) {
    fillInnerTable(table, seq1, seq2);

    return table;
}

function findHighestScore(table) {
    var highestScore = 0;
    var position = [0, 0];
    for (var i = 0; i < table.rows; i++) {
        for (var j = 0; j < table.cols; j++) {
            if (table.matrix[i][j] > highestScore) {
                highestScore = table.matrix[i][j];
                position = [i, j];
            }
        }
    }

    return position;
}

function traceback(table, seq1, seq2) {
    var alignment1 = "";
    var alignment2 = "";
    var matches = "";

    var start = findHighestScore(table);

    var i = start[0];
    var j = start[1];

    var selectedCells = [[i,j]];

    while (i > 0 || j > 0) {
        if (table.matrix[i][j] === 0)
            break;
        var bestNeighbor = maximumNeighbor(table, i, j);
        selectedCells.push(bestNeighbor);
        if (bestNeighbor[0] === i-1 && bestNeighbor[1] === j-1) {
            alignment1 = seq1[i-1] + alignment1;
            alignment2 = seq2[j-1] + alignment2;
            i--;
            j--;
        }
        else if (bestNeighbor[0] === i-1 && bestNeighbor[1] === j) {
            alignment1 = seq1[i-1] + alignment1;
            alignment2 = "-" + alignment2;
            i--;
        }
        else {
            alignment1 = "-" + alignment1;
            alignment2 = seq2[j-1] + alignment2;
            j--;
        }

        if (alignment1[0] === alignment2[0])
            matches = "|" + matches;
        else
            matches = "&nbsp;" + matches;
    }

    return [alignment1, alignment2, matches, selectedCells];
}

function sequenceCharacter(seq, i) {
    if (seq[i] === undefined)
        return "_";
    else
        return seq[i];
}

function maximumNeighbor(table, i, j) {
    var values = [];
    var cells = [];
    if (i > 0 && j > 0) {
        cells.push([i-1, j-1]);
        values.push(table.matrix[i-1][j-1]);
    }
    if (i > 0) {
        cells.push([i-1, j]);
        values.push(table.matrix[i-1][j]);
    }
    if (j > 0) {
        cells.push([i, j-1]);
        values.push(table.matrix[i][j-1]);
    }

    var max = values[0];
    var best = cells[0];

    for (var n = 0; n < values.length; n++) {
        if (values[n] > max) {
            max = values[n];
            best = cells[n];
        }
    }

    return best;


}

function scoringFunction(a, b) {
    if (a === undefined || b === undefined) {
        console.log("a or b undefined");
        return -1;
    }
    else if (a.length === 0 || b.length === 0)
        return -1;
    else if (a !== b)
        return -1;
    else
        return 1;
}

// stating from the top left, compute each entry using the recursive relation
function fillInnerTable(table, seq1, seq2) {
    for (var i = 1; i < table.rows; i++) {
        for (var j = 1; j < table.cols; j++) {
            table.matrix[i][j] = recursiveRelation(table, seq1, seq2, i, j);
        }
    }
}

function recursiveRelation(table, seq1, seq2, i, j) {
    return Math.max(0, table.matrix[i-1][j-1] + scoringFunction(seq1[i-1], seq2[j-1]), table.matrix[i-1][j] + scoringFunction(seq1[i-1], ""), table.matrix[i][j-1] + scoringFunction("", seq2[j-1]));
}

// fill table entries (m:1) and (1:n)
function fillOuterTable(table, seq1, seq2) {
    for (var i = 0; i < table.rows; i++) {
        for (var k = 0; k < i; k++) {
            table.matrix[i][0] += scoringFunction(seq1[k], "");
        }

    }

    for (var j = 0; j < table.cols; j++) {
        for (var k = 0; k < j; k++) {
            table.matrix[0][j] += scoringFunction("", seq2[k]);
        }
    }

}

function makeTable(seq1, seq2) {
    return new Matrix(seq1.length+1, seq2.length+1);
}




