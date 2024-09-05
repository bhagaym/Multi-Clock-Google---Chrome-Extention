function loadWeather() {
    var weather_location = getWeather();
    if(weather_location) {
        
        $("#cuaca_box").html('Loading...');
        var url = 'https://api.weatherapi.com/v1/current.json?key=22aa601fda3b4edea7080739240509&q='+weather_location+'&aqi=no';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            var cuaca = data.current;
            var lokasi = data.location;
            
            var rangkai = '<div class="d-flex align-items-center">' +
                            '<div class="symbol symbol-50px me-3">' +                                                   
                                '<img src="https:'+cuaca.condition.icon+'" class="" alt="">' +
                            '</div>' +
                            '<div class="d-flex justify-content-start flex-column">' +
                                '<span class="fw-bold fs-1">'+cuaca.temp_c+'&deg;C</span>' +
                                '<span class="fw-semibold d-block fs-5">'+lokasi.name+'</span>' +
                            '</div>' +
                        '</div>';
            $("#cuaca_box").html(rangkai);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
}
loadWeather();

$(".weather_btn").click(function(){
    var weather_location = getWeather();
    $("#weather_location").val(weather_location);
    $("#weather_modal").modal('show');
})

$("#save_weather_location").click(function(){
    var weather_location = $("#weather_location").val();
    saveWeather(weather_location);
    $("#weather_modal").modal('hide');
    loadWeather();
})

// Get clocks from localStorage
function getWeather() {
    const weather_location = localStorage.getItem('weather_location');
    return weather_location ? weather_location : '';
}

// Save clocks to localStorage
function saveWeather(weather_location) {
    localStorage.setItem('weather_location', weather_location);
}