$(".contact_btn").on('click', function () {
    $(".contact_btn i").removeClass('d-none');

    var post_data, output;
    var proceed = "true";

    $('#contact-form-data input, #contact-form-data textarea').each(function () {
        if (!$(this).val()) {
            proceed = "false";
        }
    });

    if (proceed === "true") {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[3];

        var accessURL;
        if (secondLevelLocation) {
            accessURL = "C:\Users\Dr Poonam Pandey\Desktop\personal_portfolio\js\contact-mailer.php";
        } else {
            accessURL = "C:\Users\Dr Poonam Pandey\Desktop\personal_portfolio\js\contact-mailer.php";
        }

        $.ajax({
            type: 'POST',
            url: accessURL,
            data: $('#contact-form-data').serialize(), 
            dataType: 'json',
            success: function (response) {
                handleResponse(response);
            },
            error: function () {
                handleResponse({ type: 'error', text: 'Yup this is the error.' });
            }
        });
        
    } else {
        handleResponse({ type: 'error', text: 'Please provide all the required fields.' });
    }
});

function handleResponse(response) {
    var output;
    if (response.type == 'error') {
        output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
    } else {
        output = '<div class="alert-success" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
        $('#contact-form-data input, #contact-form-data textarea').val('');
    }

    if ($("#result").length) {
        $("#result").hide().html(output).slideDown();
        $(".contact_btn i").addClass('d-none');
    } else {
        if (response.type == 'error') {
            showErrorAlert(response.text);
        } else {
            showSuccessAlert(response.text);
        }
        $(".contact_btn i").addClass('d-none');
    }
}

function showErrorAlert(message) {
    Swal.fire({
        type: 'error',
        icon: 'error',
        title: 'Oops...',
        html: '<div class="text-danger">' + message + '</div>',
    });
}

function showSuccessAlert(message) {
    Swal.fire({
        type: 'success',
        icon: 'success',
        title: 'Success!',
        html: '<div class="text-success">' + message + '</div>',
    });
}
