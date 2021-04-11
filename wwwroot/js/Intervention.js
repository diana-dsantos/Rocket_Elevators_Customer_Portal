function GetDataCustomer(customer) {

    $(document).ready(function () {
        var id = "";
        // Calls the function to hide the fields
        hideAll();

        // When there is a change in the customer field, execute the function  
        let buildings = customer.buildings;
        let select = [new Option("--- Select ---", "")]; // Instantiates a new Option type object, first line shown in the dropdown
        buildings.forEach((element) => {  // A forEach to add the new Options object, with the data returned in ajax.
            select.push(new Option(`Building #${element.id}`, element.id));
        });
        $("#building-select").html(select);

        

        $("#building-select").on('change', function () {

            id = $(this).val();

            if (id === "") {

                hideAll(); // Ensures that other fields are hidden if you change the customer field back to the initial position.

            } else {
                $("#battery").show();

                let batteries = customer.buildings.find(building => building.id == (this.value)).batteries;
                console.log(batteries);

                let select = [new Option("--- Select ---", "")]; // Instantiates a new Option type object, first line shown in the dropdown
                batteries.forEach((element) => {  // A forEach to add the new Options object, with the data returned in ajax.
                    select.push(new Option(`Battery #${element.id}`, element.id));
                });
                $("#battery-select").html(select);
            }
        });


        $("#battery-select").on('change', function () {

            id = $(this).val();

            if (id === "") {

                hideAll(); // Ensures that other fields are hidden if you change the customer field back to the initial position.

            } else {
                $("#column").show();

                let building_id = $('#building-select option:selected').val();

                var battery = customer
                    .buildings.find(building => building.id == building_id)
                    .batteries.find(battery => battery.id == this.value);

                let columns = battery.columns;

                let select = [new Option("--- Select ---", "")]; // Instantiates a new Option type object, first line shown in the dropdown
                columns.forEach((element) => {  // A forEach to add the new Options object, with the data returned in ajax.
                    select.push(new Option(`Column #${element.id}`, element.id));
                });
                $("#column-select").html(select);
            }
        });

        $("#column-select").on('change', function () {

            id = $(this).val();

            if (id === "") {

                hideAll(); // Ensures that other fields are hidden if you change the customer field back to the initial position.

            } else {
                $("#elevator").show();

                let building_id = $('#building-select option:selected').val();
                let battery_id = $('#battery-select option:selected').val();

                column = customer
                    .buildings.find(building => building.id == building_id)
                    .batteries.find(battery => battery.id == battery_id)
                    .columns.find(column => column.id == this.value);

                let elevators = column.elevators;

                let select = [new Option("--- Select ---", "")]; // Instantiates a new Option type object, first line shown in the dropdown
                elevators.forEach((element) => {  // A forEach to add the new Options object, with the data returned in ajax.
                    select.push(new Option(`Elevator #${element.id}`, element.id));
                });
                $("#elevator-select").html(select);
            }
        });

        // functions hiding    
        function hideAll() {
            $("#battery").hide();
            hideColumn();
        }

        function hideColumn() {
            $("#column").hide();
            hideElevator();
        }

        function hideElevator() {
            $("#elevator").hide();
        }
    });
}