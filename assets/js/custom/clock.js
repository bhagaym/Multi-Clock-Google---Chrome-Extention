function loadTimezone(){
    var timezone = moment.tz.names();
    var rangkai = '';
    timezone.map(function(item){
        rangkai += '<option value="'+item+'">'+item+'</option>';
    });

    $("#timezone").html(rangkai);
}
loadTimezone();


function renderTime(){
    $("#current_time").html(moment().format('HH:mm'));

    const clocks = getClocks();
    var rangkai = '';
    clocks.map(function(item, i){
        rangkai += '<div class="col-md-4 col-lg-3 col-xl-2">' +
            '<div class="card card-custom card-stretch" style="background: unset">' +
                '<div class="card-body d-flex flex-column align-items-center justify-content-center">' +
                    '<p class="fs-3 mb-0">'+item.clockName+'</p>' +
                    '<h3 class="fw-bold" style="font-size: 40px;">'+moment().tz(item.timezone).format('HH:mm')+'</h3>' +
                '</div>' +
            '</div>' +
        '</div>';
    });

    if(rangkai != ''){
        $("#additional_time").html(rangkai);
    }
}
renderTime();

setInterval(function(){
    renderTime();
}, 1000)

$("#add_clock_btn").click(function(){
    load_tabel_clock();
    $("#add_clock_modal").modal('show');
})
function load_tabel_clock(){
    var rangkai = '';
    
    const clocks = getClocks();
    clocks.map(function(item, i){
        rangkai += '<tr>' +
            '<td>'+item.clockName+'</td>' +
            '<td>'+item.timezone+'</td>' +
            '<td class="text-end"><button class="btn btn-icon btn-light-danger btn-sm removeClock" data-index="'+i+'"><i class="fa fa-trash"></i></button>';
    });

    if(rangkai){
        $("#clock_table tbody").html(rangkai);
        $("#clock_data_zone").show();
    }
    else{
        $("#clock_data_zone").hide();
    }
}
$("#save_clock").click(function(){
    var clock_name = $("#clock_name").val();
    var timezone = $("#timezone").val();
    
    if(clock_name != '' && timezone != ''){
        //cek apakah timezone sudah ada sebelumnya...
        if(getClocks().some(item => item.timezone === timezone)){
            alert("Timezone already exists");
            return;
        }
        
        addClock(clock_name, timezone);

        $("#add_clock_modal").modal('hide');
        // clear input fields
        $("#clock_name").val('');
        $("#timezone").val('');
    }
})
        
// Add clock to localStorage and update the UI
function addClock(clockName, timezone) {
    const clocks = getClocks();
    clocks.push({ clockName, timezone });
    saveClocks(clocks);
    renderTime();
}

$(document).on('click', '.removeClock', function() {
    var index = $(this).data('index');
    removeClock(index);
});
// Remove clock from localStorage and update the UI
function removeClock(index) {
    const clocks = getClocks();
    clocks.splice(index, 1);
    saveClocks(clocks);
    load_tabel_clock();
    renderTime();
}

// Get clocks from localStorage
function getClocks() {
    const clocks = localStorage.getItem('clocks');
    return clocks ? JSON.parse(clocks) : [];
}

// Save clocks to localStorage
function saveClocks(clocks) {
    localStorage.setItem('clocks', JSON.stringify(clocks));
}