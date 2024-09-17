function renderMenu(){
    const menus = getMenus();
    var rangkai = '';
    menus.map(function(item, i){
        rangkai += '<div class="menu-item">' +
                        '<a href="'+item.link+'" class="menu-link nav-link py-3 px-4 px-xxl-6 text-dark">'+item.menuName+'</a>' +
                    '</div>';
    });

    if(rangkai != ''){
        $("#kt_landing_menu").html(rangkai);
    }
}
renderMenu();


$("#header_menu_btn").click(function(){
    load_tabel_menu();
    $("#header_menu_modal").modal('show');
})
function load_tabel_menu(){
    var rangkai = '';
    
    const menus = getMenus();
    menus.map(function(item, i){
        rangkai += '<tr>' +
            '<td>'+item.menuName+'</td>' +
            '<td><a href="'+item.link+'" target="_blank" class="d-inline-block text-truncate" style="max-width: 250px;">'+item.link+'</a></td>' +
            '<td class="text-end"><button class="btn btn-icon btn-light-danger btn-sm removeMenus" data-index="'+i+'"><i class="fa fa-trash"></i></button>';
    });

    if(rangkai){
        $("#menu_table tbody").html(rangkai);
        $("#menu_data_zone").show();
    }
    else{
        $("#menu_data_zone").hide();
    }
}
$("#save_menu").click(function(){
    var menu_name = $("#menu_name").val();
    var link = $("#link").val();
    
    if(menu_name != '' && link != ''){
        //cek apakah link sudah ada sebelumnya...
        if(getMenus().some(item => item.link === link)){
            alert("Menu already exists");
            return;
        }
        
        addMenus(menu_name, link);

        // clear input fields
        $("#menu_name").val('');
        $("#link").val('');
        load_tabel_menu();
    }
})
        
// Add menu to localStorage and update the UI
function addMenus(menuName, link) {
    const menus = getMenus();
    menus.push({ menuName, link });
    saveMenus(menus);
    renderMenu();
}

$(document).on('click', '.removeMenus', function() {
    var index = $(this).data('index');
    removeMenus(index);
});
// Remove menu from localStorage and update the UI
function removeMenus(index) {
    const menus = getMenus();
    menus.splice(index, 1);
    saveMenus(menus);
    load_tabel_menu();
    renderMenu();
}

// Get menus from localStorage
function getMenus() {
    const menus = localStorage.getItem('menus');
    return menus ? JSON.parse(menus) : [];
}

// Save menus to localStorage
function saveMenus(menus) {
    localStorage.setItem('menus', JSON.stringify(menus));
}