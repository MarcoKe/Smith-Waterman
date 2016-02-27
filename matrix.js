/**
 * Created by mar on 18-2-16.
 */

function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.createZeroMatrix = createZeroMatrix;
    this.matrix = this.createZeroMatrix();
    this.toHTML = toHTML;

}

function createZeroMatrix() {
    var matrix = [];

    for (var i = 0; i < this.rows; i++) {
        matrix[i] = [];
        for (var j = 0; j < this.cols; j++) {
            matrix[i][j] = 0;
        }

    }

    return matrix;
}

function toHTML(header, lheader, highlightedCells) {
    var headerString = "";
    for (var i = 0; i < header.length; i++) {
        headerString += "<th>" + header[i] + "</th>";
    }

    var result = "<table class='table table-bordered table-hover'><thead><tr>" + headerString + "</tr></thead><tbody>";

    for (var i = 0; i < this.matrix.length; i++) {
        result += "<th scope='row'>" + lheader[i] + "</th>";
        for (var j = 0; j < this.matrix[0].length; j++) {
            if (highlightedCells !== undefined && highlightedCells.length !== 0) {
                var last = highlightedCells.length - 1;
                if (highlightedCells[last][0] === i && highlightedCells[last][1] === j) {
                    result += "<td class='danger'>" + this.matrix[i][j] + "</td>";
                    highlightedCells.pop();
                }
                else
                    result += "<td>" + this.matrix[i][j] + "</td>";
            }
            else
                result += "<td>" + this.matrix[i][j] + "</td>";
        }
        result += "</tr><tr>";
    }

    result += "</tbody></table>";

    return result;

}