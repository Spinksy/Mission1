var input = "0000 00B57 00857 00062 03310 016IF 00DKF 004C0";

function encode(base21Array)
{
    var outputArray = [];

    for (var i = 0; i < base21Array.length; i++)
    {
        var current = base21Array[i];
        var result = 0;

        for (var j = 0; j < current.length; j++) {

            var decimalVal = parseInt(current[j], 21);
            result += decimalVal * Math.pow(21, current.length - (j + 1));

        }

        var binaryRow = (("000000000000000000" + result.toString(2)).slice(-18));
        outputArray[i] = []

        for (var el = 0; el < binaryRow.length; el++) {
            outputArray[i][el] = binaryRow[el];
        }
    }

    return outputArray;
}


(function(){

    var _ = self.Display = function (table, imageArray, width, height) {
        this.grid = table;
        this.width = width;
        this.height = height;
        this.imageArray = imageArray;
        this.createGrid();
    };

    _.prototype = {

        createGrid: function () {
            var me = this;

            var fragment = document.createDocumentFragment();
            this.grid.innerHTML = '';
            this.checkboxes = [];

            for (var y = 0; y < this.height; y++) {
                var row = document.createElement('tr');
                this.checkboxes[y] = [];

                for (var x = 0; x < this.width; x++) {
                    var cell = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    this.checkboxes[y][x] = checkbox;
                    checkbox.coords = [y, x];

                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                    this.checkboxes[y][x].checked = parseInt(this.imageArray[y][x]);
                }

                fragment.appendChild(row);
            }

            this.grid.appendChild(fragment);
        }
    }
})()

var display = new Display(document.getElementById('grid'), encode(input.split(" ")), 18, 8);



