// JavaScript for appointment

function printErrorMsg()
{
    const errorDiv = document.getElementById('error-message');
    
    errorDiv.innerHTML = "Error occured! Please check your inputs";
    errorDiv.scrollIntoView({behavior: 'smooth', block: 'center'});
}

// Function to validate the user input
const form = document.getElementById('appointment_form');

form.addEventListener('submit', function(event)
{
    let error = false;
    const phoneRegEx = /^[7-9]\d{9}$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nameRegEx = /^[a-zA-Z\s'-]+$/;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = parseInt(document.getElementById('age').value);
    const date = document.getElementById('date').value;
    const timing = document.getElementById('timing').value;

    const readDate = new Date(date);
    readDate.setHours(0, 0, 0, 0);

    if(name.length < 3 || !nameRegEx.test(name))
        error = true;

    if(email.length < 4 || (!email.endsWith('.com') && !email.endsWith('.in')))
        error = true;

    if(!phoneRegEx.test(phone))
        error = true;

    if(age < 1)
        error = true;

    if(readDate < today)
        error = true;

    // Print the error message if any condition is violated
    if(error)
    {
        printErrorMsg();
        event.preventDefault();
    }
});

window.addEventListener('pageshow', function(event)
{
    if(event.persisted)
        window.location.reload();
})