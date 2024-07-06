# date-cupid

## Introduction
<p> Welcome to the Date Invitation Web App repository! I made this project to ask out my crush on a date in a fun and interactive way. It uses HTML, CSS, and JavaScript to create a dynamic user experience with animated GIFs and interactive questions. </p>
<p>Web App Demo Link: https://neiljaviya.github.io/date-cupid/</p>

## Features
<ul> 
  <li>Animated GIFs: Engaging animated GIFs that change based on user interaction.</li>
  <li>Interactive Questions: Step-by-step questions that guide the user through asking for a date.</li>
  <li>Dynamic UI: Changes in UI elements based on user responses.</li>
  <li>Email Integration: Integration with EmailJS to send date requests via email.</li>
</ul>

## Installation
1. Fork the Repository
<p>Fork the date-cupid Web App repository to your GitHub account by clicking on the "Fork" button at the top right of the repository page.</p>

2. Configure EmailJS
<ul><li>Update EmailJS Public Code: Open index.html and replace #PASTE YOUR EMAIL JS PUBLIC CODE HERE# with your EmailJS public code. You can find your EmailJS public code in your EmailJS dashboard under Integration > Email Services.</li></ul>

Example:
```
<script type="text/javascript">
    (function() {
        emailjs.init('your_emailjs_public_code_here');
    })();
</script>
```

<ul><li> Update sendEmail() Function: Open script.js and update the sendEmail() function with your EmailJS service ID and template ID. You can find these details in your EmailJS dashboard under Email Services and Email Templates. </li></ul>

Example:

```
function sendEmail(availability, activities) {
    const templateParams = {
        to_name: 'RECIPIENT NAME',
        to_email: 'RECIPIENT@EMAIL.COM',
        availability: availability,
        activities: activities.join(', '),
    };

    emailjs.send('your_emailjs_service_id_here', 'your_emailjs_template_id_here', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}
```
3. Replace Name and GitHub Link
<p>In index.html, replace occurrences of "Neil Javiya" with your name and GitHub link.</p>

Example:
```
Made with ❤️ by <a href="https://github.com/your-github-username" target="_blank"><strong>Your Name</strong></a>
```
4. Update All Resource Links
<p>In index.html, update the resource links (src attributes of <img> tags) to point directly to your forked repository's raw content for the GIFs.</p>

Example (replace neiljaviya with your GitHub username and its-a-date with your repository name):
```
<img id="cute-gif" src="https://github.com/your-github-username/your-repository-name/blob/main/res/cat-cute.gif?raw=true" alt="Cute GIF" class="gif">
```
5. Publish Your Code with GitHub pages or other Web Host
<p>Finally, head over to repository settings > pages and under Branches section select the branch having updated code and press 'Save' to publish with GitHub pages.</p>

### Have fun and Good Luck ;)
