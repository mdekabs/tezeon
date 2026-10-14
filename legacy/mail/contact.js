// Contact form handler — uses Formspree (free tier, no server needed)
// SETUP: Replace YOUR_FORM_ID below with your Formspree form ID.
// 1. Sign up at https://formspree.io (free)
// 2. Create a new form and copy the form ID (e.g. "xpwzgkqr")
// 3. Replace YOUR_FORM_ID with that ID
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

$(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var name    = $('#name').val().trim();
        var email   = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        var $btn    = $('#sendMessageButton');
        var $status = $('#success');

        // Basic client-side validation
        if (!name || !email || !subject || !message) {
            $status.html('<div class="alert alert-warning">Please fill in all fields.</div>');
            return;
        }

        $btn.prop('disabled', true).text('Sending…');
        $status.html('');

        $.ajax({
            url: FORMSPREE_ENDPOINT,
            method: 'POST',
            data: { name: name, email: email, subject: subject, message: message },
            dataType: 'json',
            success: function () {
                $status.html(
                    '<div class="alert alert-success">' +
                    '<strong>Message sent!</strong> We will get back to you within 24 hours.' +
                    '</div>'
                );
                $('#contactForm')[0].reset();
            },
            error: function () {
                $status.html(
                    '<div class="alert alert-danger">' +
                    '<strong>Sending failed.</strong> Please try again or call us at <a href="tel:+2348030967886">+234 803 096 7886</a>.' +
                    '</div>'
                );
            },
            complete: function () {
                $btn.prop('disabled', false).text('Send Message');
            }
        });
    });

    // Clear status when user starts typing again
    $('#name').on('focus', function () {
        $('#success').html('');
    });
});
