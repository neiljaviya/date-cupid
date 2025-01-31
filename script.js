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
    const confirmAvailability = document.getElementById('confirm-availability');
    const confirmActivities = document.getElementById('confirm-activities');
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

    // Function to generate dynamic dropdown options
    function generateDropdownOptions() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        const endYear = currentYear + 40;

        const weeks = [
            'Sometime this week',
            'Sometime next week',
            'Sometime next to next week',
            'Next month'
        ];

        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        // Add options for the next few weeks
        weeks.forEach(week => {
            const option = document.createElement('option');
            option.value = week.toLowerCase().replace(/ /g, '-');
            option.textContent = week;
            availabilitySelect.appendChild(option);
        });

        // Add options for the next few months
        for (let i = currentMonth + 2; i < currentMonth + 6; i++) {
            const monthIndex = i % 12;
            const option = document.createElement('option');
            option.value = months[monthIndex];
            option.textContent = months[monthIndex];
            availabilitySelect.appendChild(option);
        }

        // Add options for the next 10 years
        for (let i = currentYear+1; i < currentYear + 6; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i.toString();
            availabilitySelect.appendChild(option);
        }

        for (let i = Math.ceil(currentYear / 10) * 10; i < endYear; i += 10) {
            const option = document.createElement('option');
            option.value = `${i}-${i + 9}`;
            option.textContent = `${i}-${i + 9}`;
            availabilitySelect.appendChild(option);
        }
    }
    
    // Call the function to generate dynamic dropdown options
    generateDropdownOptions();
    
     // Availability next button functionality
    availabilityNextBtn.addEventListener('click', () => {
        availability = availabilitySelect.value;

        // Show appropriate gif based on availability
        if (['sometime-this-week', 'sometime-next-week', 'sometime-next-to-next-week', 'next-month'].includes(availability)) {
            showGif('excited');
            secondQuestion.style.display = 'none';
            thirdQuestion.style.display = 'block';
        } else if (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].includes(availability)) {
            showGif('questioning');
            alert(getRandomAlertMessage());
        } else if (['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'].includes(availability)) {
            showGif('angry');
            alert(getRandomAlertMessage());
        } else {
            showGif('dead');
            alert(getRandomAlertMessage());
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
        
        confirmAvailability.textContent = availability;
        confirmActivities.textContent = selectedActivities.join(', ');
        
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

        // Function to get random alert message
    function getRandomAlertMessage() {
        const messages = [
            'Seriously?',
            'Come on, don\'t be ruthless!',
            'Have some mercy!',
            'Are you kidding me?',
            'Be realistic!',
            'Think again!',
            'You must be joking!'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || "Dear"; // Default fallback
    }

    const yourName = getQueryParam("yourname");
    const crushName = getQueryParam("crushname");

    // Update the final message dynamically
    document.querySelector(".first-question p:first-child").innerHTML = `${crushName}, Would you go out with me on a date someday??`;
    document.querySelector(".final-message .content p:first-child").innerHTML = `Hello ${crushName},`;
    document.querySelector(".regards p").innerHTML = `Regards,<br>${yourName} 💖`;
});
