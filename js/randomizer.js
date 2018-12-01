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
        $('#submitButton').attr("disabled", "disabled");
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

        out += '<td class="item" style="width:10%">' + randomized + '</td>';
        if (number % 10 == 0) {
            out += "</tr>";
            finalTable = out;
        } else {
            var i = number;
            finalTable = out;
            while(i % 10 != 0) {
                i++;
                finalTable+='<td style="width:10%">&nbsp;</td>';
            }
            finalTable+= "</tr>";
        }
        $('#result').html(finalTable);
        if (list.length == 0 && initNumber < lastNumber && lastNumber > 0 ) {
            $('#submitButton').attr("disabled", "disabled");
        }else {
            $('#submitButton').attr("disabled", null);
        } 
    }

    $('#listContainer').hide();
    //$('#randomContainer').hide();

    // Handler for .ready() called.
    $("#initForm").submit(function(e) 
    {
        e.preventDefault();
        initNumber = 1;//$('#initNumber').val();
        lastNumber = 250;//$('#lastNumber').val();
        //excludeNumbers = $('#excludeNumbers').val();
        excludeNumbers = "11,12,13,14,15,16,17,18,19,25,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,139,140,141,142,143,144,145,146,147,148,149,150,155,156,161,197,211,212,213,219,220";

        if(initNumber < lastNumber) {
            if (!initialized) {
                if (excludeNumbers) {
                    excludeList = excludeNumbers.trim().split(',');
                }
                createList(initNumber,lastNumber);
                initialized = true;
                //$('#setupContainer').hide();
                //$('#excludeContainer').hide();
                $('#listContainer').show();
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