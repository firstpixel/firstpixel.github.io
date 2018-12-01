$(document).ready(function(){
    var out = "", number = 0, randomized,
    list = [], initialized = false,
    initNumber,lastNumber, finalTable, 
    excludeList = [], excludeNumbers;


    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (parseInt(this[i]) == obj) {
                return true;
            }
        }
        return false;
    }

    function createList(init,final) {



        for(var i=parseInt(init,10); i<=parseInt(final,10); i++) {
            if (excludeList.length) {
                if(!excludeList.contains(i)){
                    list.push(i);
                }
            } else {
                list.push(i);
            }
        }

    }

    function addRandom() {
        number++;
        
        if (number == 1 || (number-1) % 10 == 0) {
            out += "<tr>";
        }
        var rand = Math.random() * list.length;
        var index = Math.floor(rand);
        randomized = list.splice(index, 1);
        $('#randomized').css("font-size", "0"); 
        $("#counter").html(number);
        $('#randomized').html(randomized);
        $('#randomized').animate({
            fontSize: "130px"
          }, 600 );

        out += '<td class="item">' + randomized + '</td>';
        if (number % 10 == 0) {
            out += "</tr>";
            finalTable = out;
        } else {
            var i = number;
            finalTable = out;
            while(i % 10 != 0) {
                i++;
                finalTable+="<td>&nbsp;</td>";
            }
            finalTable+= "</tr>";
        }
        $('#result').html(finalTable);
        if (list.length == 0 && initNumber < lastNumber && lastNumber > 0 ) {
            $('#submitButton').attr("disabled", "disabled");
        }
    }

    $('#listContainer').hide();
    $('#randomContainer').hide();

    // Handler for .ready() called.
    $("#initForm").submit(function(e) 
    {
        e.preventDefault();
        initNumber = $('#initNumber').val();
        lastNumber = $('#lastNumber').val();
        excludeNumbers = $('#excludeNumbers').val();

        if(initNumber < lastNumber) {
            if (!initialized) {
                if (excludeNumbers) {
                    excludeList = excludeNumbers.trim().split(',');
                }
                createList(initNumber,lastNumber);
                initialized = true;
                $('#setupContainer').hide();
                $('#excludeContainer').hide();
                $('#listContainer').show(400);
                $('#randomContainer').show();
                addRandom();
            } else {
                addRandom();
            }
        } else {
            initNumber = "";
            lastNumber = "";
        }
    });
});