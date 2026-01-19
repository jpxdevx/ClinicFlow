// JS for success.pug

window.addEventListener('pageshow', function(event)
{
    if(event.persisted)
        window.location.reload();
})