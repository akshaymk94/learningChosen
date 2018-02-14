$(document).ready(function() {
    
   var myCars=[]
   var preselectedIds = []
   
   //retrieving data from JSON file and pushing it into myCars[]
   $.getJSON('json/cars.json', function(data) {
       preselectedIds = data["preselectedId"];
       var listOfCars = data["myCars"];
       for(var index = 0; index < listOfCars.length; index++) {
           var obj = {}
           obj["id"] = listOfCars[index]["id"]
           obj["name"] = listOfCars[index]["name"]
           myCars.push(obj);
       }
       carsDropDown(); //i had misplaced this function call. and thats what took time.
       selectedCars();
      
   });
    
    
    //creating options dynamically and appending them to select #carsList
    function carsDropDown() {
        var emptyOption= '<option></option>';
        $('#carsList').append(emptyOption);
        $.each(myCars, function(index, value) {
            var newOption = '<option id="'+value["id"]+'">'+value["name"]+'</option>';
            
            $('#carsList').append(newOption);
        });
        $('#carsList').trigger("chosen:updated");
    }
    
    function selectedCars() {
        $('#carsList option').each(function() {
            for(var i = 0; i < preselectedIds.length; i ++) {
                var individualId = $(this).attr('id');
                if(individualId == preselectedIds[i]) {
                    $(this).attr('selected', 'selected');
                    $('#carsList').trigger("chosen:updated");
                }
            }
        });
    }
     selectedCars();
    
    //converting a select element into chosen dropdownlist 
    $('#carsList').chosen({
        width: "20%",
        no_results_text: "oops! search failed!",
        /*max_selected_options: 2,*/
        allow_single_deselect: true
    });
    
    //notify when the user has selected maximum number of options
    $('#carsList').bind('chosen:maxselected', function() {
        $('#carsList').notify("you've already selected maximum number of options!", {position: "bottom"});
    });
    
    //click this button to display id and value of selected options
    $('body').on('click','.btnSubmit', function() {
        $('#carsList option:selected').each(function(index, value) {
            var selectedId = $(this).attr('id');
            var selectedValue = $(this).val();
            if($(this).length) {
                console.log("selected Id : " + selectedId);
                console.log("selected option : " + selectedValue);
            }
        });
    });
});