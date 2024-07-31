//comments array
const defaultComments = [
    {
        name:'Victor Pinto',
        timestamp:'2023-11-02',
        comment:'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
        avatar:''
    },
    {
        name:'Christina Cabrera',
        timestamp:'2023-10-28',
        comment:'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
        avatar:''
    },
    {
        name:'Isaac Tadesse',
        timestamp:'2023-10-20',
        comment:'I can\'t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.',
        avatar:''
    }
]

// function: format timestamp to MM/DD/YYYY
function formatTimestamp(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

//function: display the comments
function displayComment(comment){
    //create container&comments elements
    const container = document.getElementById("comment__container");
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    // add avatar element
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('comment__avatar');
    //validation:avatar
    if (comment.avatar) {
        avatarElement.style.backgroundImage = `url(${comment.avatar})`;
        avatarElement.style.backgroundSize = 'cover';
    } else {
        avatarElement.classList.add('placeholder');
    }
    commentDiv.appendChild(avatarElement);

    //add names elements
    const nameElement = document.createElement('span');
    nameElement.classList.add('comment__name');
    nameElement.textContent = comment.name;
    commentDiv.appendChild(nameElement);
    
    // add timestamp
    const timeElement = document.createElement('p');
    timeElement.classList.add('comment__time');
    timeElement.textContent = formatTimestamp(comment.timestamp);
    commentDiv.appendChild(timeElement);

    //add comments
    const commentElement = document.createElement('p');
    commentElement.classList.add('comment__text');
    commentElement.textContent = comment.comment;
    commentDiv.appendChild(commentElement);

    //add div to the container
    container.appendChild(commentDiv);
}

defaultComments.forEach(comment => {
    displayComment(comment);
});

//HTML form
document.getElementById('commentForm').addEventListener('submit', function(e){
    e.preventDefault();
    //get user info
    const username = document.getElementById("username").value;
    const comments = document.getElementById("comments").value;
    const avatar = document.getElementById("avatar").src;
    const newTimeStamp = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];//get YYYY-MM-DD
    }
    const newUser = {
        name: username,
        timestamp:newTimeStamp(),
        comment:comments,
        avatar: avatar
    }
    
    //push user info to the array
    defaultComments.push(newUser);

   // Clear the container before redisplaying
    document.getElementById("comment__container").innerHTML = '';

    //sort the comments by time & display them
    defaultComments.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    defaultComments.forEach(comment => {
        displayComment(comment);
    });
    // clear form fields
    document.getElementById('commentForm').reset();

})
