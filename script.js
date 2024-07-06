document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const buttonContainer = document.querySelector('.button-container');
    const firstQuestion = document.getElementById('first-question');
    const secondQuestion = document.getElementById('second-question');
    const availabilitySelect = document.getElementById('availability-select');
    const availabilityNextBtn = document.getElementById('availability-next-btn');
    const thirdQuestion = document.getElementById('third-question');
    const activityOptions = document.getElementById('activity-options');
    const activityNextBtn = document.getElementById('activity-next-btn');
    const finalMessage = document.getElementById('final-message');
    const gifs = {
        cute: document.getElementById('cute-gif'),
        excited: document.getElementById('excited-gif'),
        questioning: document.getElementById('questioning-gif'),
        angry: document.getElementById('angry-gif'),
        dead: document.getElementById('dead-gif'),
        final: document.getElementById('final-gif')
    };

    let availability = '';

    function showGif(gif) {
        for (let key in gifs) {
            gifs[key].style.display = 'none';
        }
        gifs[gif].style.display = 'block';
    }

    // Initially show the cute gif
    showGif('cute');
    
    // No button hover, click and touch functionality
    noBtn.addEventListener('mouseover', switchButtons);
    noBtn.addEventListener('click', switchButtons);
    noBtn.addEventListener('touchend', switchButtons);

    function switchButtons() {
        const yesIndex = Array.prototype.indexOf.call(buttonContainer.children, yesBtn);
        const noIndex = Array.prototype.indexOf.call(buttonContainer.children, noBtn);

        if (yesIndex < noIndex) {
            buttonContainer.insertBefore(noBtn, yesBtn);
        } else {
            buttonContainer.insertBefore(yesBtn, noBtn);
        }
    }

    // Yes button functionality
    yesBtn.addEventListener('click', () => {
        showGif('excited');
        firstQuestion.style.display = 'none';
        secondQuestion.style.display = 'block';
    });

    // Availability next button functionality
    availabilityNextBtn.addEventListener('click', () => {
        availability = availabilitySelect.value;
    
        // Show appropriate gif based on availability
        if (['this-week', 'next-week', 'next-to-next-week', 'next-month'].includes(availability)) {
            showGif('excited');
            secondQuestion.style.display = 'none';
            thirdQuestion.style.display = 'block';
        } else if (['September', 'October', 'November', 'December'].includes(availability)) {
            showGif('questioning');
            alert('Seriously?');
        } else if (['2025', '2026', '2027', '2028', '2029', '2030'].includes(availability)) {
            showGif('angry');
            alert('Seriously?');
        } else {
            showGif('dead');
            alert('Seriously?');
        }
        return;
    });

    // Activity next button functionality
    activityNextBtn.addEventListener('click', () => {
        const selectedActivities = Array.from(document.querySelectorAll('input[name="activity"]:checked'))
                                        .map(cb => cb.value);
        if (selectedActivities.length === 0 || selectedActivities.length > 2) {
            alert('Please select up to 2 activities.');
            return;
        }
        thirdQuestion.style.display = 'none';
        finalMessage.style.display = 'block';
        showGif('final');

        // Send email (pseudo implementation)
        sendEmail(availability, selectedActivities);
    });

    
    function sendEmail(availability, activities) {
    const templateParams = {
        to_name: 'RECEIPIENT NAME', // replace with recipient's name
        to_email: 'RECEIPIENT@GMAIL.COM', // replace with the recipient's email
        availability: availability,
        activities: activities.join(', '),
    };

    emailjs.send('EMAIL JS SERVICE ID', 'EMAIL JS TEMPLATE ID', templateParams) // replace service ID & Template ID here
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}
});
