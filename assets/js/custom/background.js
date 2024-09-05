function loadBackground(){
    var url_image = getBackground();
    if(url_image == ''){
        url_image = 'assets/media/background/background.jpg';
    }
    
    $("#kt_body").css('background-image', 'url('+url_image+')');
}
loadBackground();

$("#background_btn").click(function(){
    $("#background_modal").modal('show');
})

$("#save_background").click(function(){
    var url_image = $("#url_image").val();
    
    if(url_image != ''){
        $("#save_background").attr('disabled', 'disabled');
        $("#save_background").html('Loading...');
        saveBackground(url_image, after_save);
    }
})

function after_save(){
    $("#save_background").removeAttr('disabled');
    $("#save_background").html('<i class="fa fa-save me-3 fs-3"></i>Save');

    $("#background_modal").modal('hide');
    $("#url_image").val('');
    loadBackground();
}

// Remove clock from localStorage and update the UI
function removeBackground() {
    localStorage.setItem('background', '');
}

// Get clocks from localStorage
function getBackground() {
    const Background = localStorage.getItem('background');
    return Background ? Background : '';
}

// Save clocks to localStorage
function saveBackground(url_image, funcName) {
    convertToBase64(url_image).then(base64Image => {
        // Ganti background dengan Base64 image
        localStorage.setItem('background', base64Image);
    
        if(funcName){
            funcName();
        }
    });
}

function convertToBase64(url) {
    return fetch(url)
        .then(response => response.blob())  // Mengubah response ke Blob
        .then(blob => new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onloadend = () => {
                img.src = reader.result;
                img.onload = function() {
                    // Buat canvas dan tentukan ukuran target 1440x1080
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const targetWidth = 1440;
                    const targetHeight = 1080;

                    // Set ukuran canvas
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;

                    // Gambar gambar ke canvas dengan ukuran yang telah ditentukan
                    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                    // Kompres gambar dengan kualitas 0.7
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    
                    // Kembalikan hasil Base64
                    resolve(compressedBase64);
                };
            };

            reader.onerror = reject;
            reader.readAsDataURL(blob);  // Membaca Blob sebagai DataURL (Base64)
        }))
        .catch(error => console.error('Error converting image to Base64:', error));
}