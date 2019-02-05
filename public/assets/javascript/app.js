$('.contact-submit').on('click', (e) => {
    const newContact = {
        firstName: ($('#contactFirstName').val() || '').trim(),
        lastName: ($('#contactLastName').val() || '').trim(),
        email: ($('#contactEmail').val() || '').trim(),
        phone: ($('#contactPhone').val() || '').trim(),
        message: ($('#contactMessage').val() || '').trim(),
    }
    $.post("/contact", newContact).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
})