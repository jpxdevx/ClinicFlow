let reviews = [['../static/Users/User1.jpeg', "Jovito Noronha", "Margao, Goa", '★★★★☆', '"Dr. Ryan D’Souza is one of the most patient and attentive doctors I’ve visited. He took time to explain everything clearly and made me feel comfortable throughout the consultation."'],

['../static/Users/User2.jpg', "Sharon D'Cunha", "Loutolim, Goa", '★★★★★', '"The clinic is clean and well-managed. Appointments run on time, and the staff is polite and helpful. I’d definitely recommend this doctor to friends and family."'],

['../static/Users/User3.jpg', "Melina Pinto", "Panjim, Goa", '★★★★☆', '"Very professional and friendly. The treatment worked well, and I appreciated the follow-up care. Booking an appointment was also very easy through the website."']];

let i = 0, j = 0;




document.addEventListener('DOMContentLoaded', () => 
{
    let img = document.getElementById('u_logo');

    let holder = document.getElementById('review1');
    holder.classList.add('fade-out');
    

    setInterval(() =>
    {
        let review = reviews[i];
        j = 0;

        img.src = reviews[i][j++];
        document.getElementById('u_name').textContent = review[j++];
        document.getElementById('u_location').textContent = review[j++];
        document.getElementById('u_stars').textContent = review[j++];
        document.getElementById('u_comment').textContent = review[j];

        i++;

        if(i >= reviews.length)
            i = 0;

        holder.classList.remove('fade-out');
    }, 5000);
});