/**
 * Created by mar on 18-2-16.
 */

var examples = [["VIVADAVIS", "QUEVIVALASVEGAS"], ["GATTACA", "GCATGCU"]];

function printSolution() {
    var seq1 = getInput("seq1");
    var seq2 = getInput("seq2");

    if (seq1.length === 0 || seq2.length === 0) {
        document.getElementById("solution").innerHTML = newRow("", "<span class='glyphicon glyphicon-fire' aria-hidden='true'></span> Eating empty sequences gives the algorithm a stomach ache.");
    }
    else {
        var table = initialize(seq1, seq2);
        document.getElementById("solution").innerHTML = newRow(table.toHTML("  " + seq2, " " + seq1), initExplanation());


        table = fill(table, seq1, seq2);
        document.getElementById("solution").innerHTML += newRow(table.toHTML("  " + seq2, " " + seq1), fillExplanation());

        var alignment = traceback(table, seq1, seq2);
        document.getElementById("solution").innerHTML += newRow(table.toHTML("  " + seq2, " " + seq1, alignment[3]), tracebackExplanation());

        document.getElementById("solution").innerHTML += newRow("<p class='sequencematch'>" + alignment[0] + "<br> " + alignment[2] + "<br>" + alignment[1] + "</p>", resultExplanation());
        findHighestScore(table);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}

function newRow(left, right) {
    return "<br><div class='row'><div class='col-md-5'>" + left + "</div><div class='col-md-4  bg-success'>" + right + "</div></div>";
}

function initExplanation() {
    return "Create a (n+1)x(m+1) table and fill entries (1, 1:m+1) and (1:n+1, 1) with zeros. " +
        "<br \>(Implementationwise: just create a (n+1)x(m+1) zero matrix)";
}

function fillExplanation() {
    return "Starting from the top left, we compute each entry using the recursive relation: <br>" +
        "$$M_{i,j}=  max\\begin{cases} \\hfill \\ M_{i-1,j-1}+\\sigma(x_i,y_j)  \\hfill  \\\\ \\hfill \\ M_{i-1,j}+\\sigma(x_i,-) \\hfill \\\\ \\hfill \\ M_{i,j-1}+\\sigma(-,y_j) \\\\ \\hfill \\ 0 \\hfill \\\\ \\end{cases}$$" +
        "with " +
        "$$\\sigma(-,a)=\\sigma(a,-)=\\sigma(a,b)=-1  \\   \\forall a \\neq b$$" +
        "$$\\sigma(a,b)=1 \\ \\forall a = b$$";
}

function tracebackExplanation() {
    return "Traceback (more than one solution might be possible here): <br />" +
        "Find the highest score in the table and trace back until you get to a 0.";
}

function resultExplanation() {
    return "The resulting sequence alignment.";
}

function getInput(id) {
    var input = document.getElementById(id).value.toUpperCase();
    input = input.replace(/\W/g, '');
    document.getElementById(id).value = input;
    return input;
}

function setExample(ex) {
    if (ex < 0) {
        document.getElementById("seq1").value = "";
        document.getElementById("seq2").value = "";
    }
    else {
        document.getElementById("seq1").value = examples[ex][0].toUpperCase();
        document.getElementById("seq2").value = examples[ex][1].toUpperCase();
    }
}

function getExample(ex) {
    return examples[ex];
}