const defaultComments = [
    {
        name: 'Victor Pinto',
        timestamp: '2023-11-02',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
        avatar: ''
    },
    {
        name: 'Christina Cabrera',
        timestamp: '2023-10-28',
        comment: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
        avatar: ''
    },
    {
        name: 'Isaac Tadesse',
        timestamp: '2023-10-20',
        comment: 'I can\'t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.',
        avatar: ''
    }
];

// Function to get local date in YYYY-MM-DD format in Eastern Time Zone
function getLocalDate() {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Toronto' };
    const localDate = new Intl.DateTimeFormat('en-CA', options).format(now);
    return localDate.split('/').reverse().join('-'); // Convert to YYYY-MM-DD format
}

// Function: display the default comment
function displayComment(comment) {
    // Create container&comments elements
    const container = document.getElementById("comment__container");
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    // Create info div
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('comment__info');

    // Add avatar element to info div
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('comment__avatar');
    // Validation: avatar
    if (comment.avatar) {
        avatarElement.style.backgroundImage = `url(${comment.avatar})`;
        avatarElement.style.backgroundSize = 'cover';
    } else {
        avatarElement.classList.add('placeholder');
    }
    infoDiv.appendChild(avatarElement);

    // Add name element to info div
    const nameElement = document.createElement('span');
    nameElement.classList.add('comment__name');
    nameElement.textContent = comment.name;
    infoDiv.appendChild(nameElement);

    // Add timestamp to info div
    const timeElement = document.createElement('p');
    timeElement.classList.add('comment__time');
    timeElement.textContent = comment.timestamp;
    infoDiv.appendChild(timeElement);

    commentDiv.appendChild(infoDiv);

    // Add comments
    const commentElement = document.createElement('p');
    commentElement.classList.add('comment__text');
    commentElement.textContent = comment.comment;
    commentDiv.appendChild(commentElement);

    // Add div to the container
    container.appendChild(commentDiv);
}

defaultComments.forEach(comment => {
    displayComment(comment);
});

// HTML form
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Get user info
    const usernameInput = document.getElementById("username");
    const commentsInput = document.getElementById("comments");
    const username = usernameInput.value.trim(); 
    const comments = commentsInput.value.trim();

    // Get user info
    const avatar = document.getElementById("avatar") ? document.getElementById("avatar").src : '';
    const newUser = {
        name: username,
        timestamp: getLocalDate(),
        comment: comments,
        avatar: avatar || ''
    }

    // Push user info to the array
    defaultComments.push(newUser);

    // Clear the container before redisplaying
    document.getElementById("comment__container").innerHTML = '';

    // Sort the comments by time & display them
    defaultComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    defaultComments.forEach(comment => {
        displayComment(comment);
    });
    // Clear form fields
    document.getElementById('commentForm').reset();
});
