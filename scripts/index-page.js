import BandSiteApi from './band-site-api.js';

const api = new BandSiteApi('e0eea5f0-0f8c-4b54-9fc4-ff50843766d4');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const comments = await api.getComments();
        console.log('Fetched comments:', comments);
        comments.forEach(comment => {
            displayComment(comment);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
});

function displayComment(comment) {
    const container = document.getElementById("comment__container");
    if (!container) {
        console.error('Comment container not found');
        return;
    }
    
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('comment__info');

    const avatarElement = document.createElement('div');
    avatarElement.classList.add('comment__avatar');
    if (comment.avatar) {
        avatarElement.style.backgroundImage = `url(${comment.avatar})`;
    } else {
        avatarElement.classList.add('placeholder');
    }
    infoDiv.appendChild(avatarElement);

    const nameElement = document.createElement('span');
    nameElement.classList.add('comment__name');
    nameElement.textContent = comment.name;
    infoDiv.appendChild(nameElement);

    const timeElement = document.createElement('p');
    timeElement.classList.add('comment__time');
    const timestamp = typeof comment.timestamp === 'string' ? comment.timestamp : new Date(comment.timestamp).toISOString();
    timeElement.textContent = timestamp.split('T')[0];
    infoDiv.appendChild(timeElement);

    commentDiv.appendChild(infoDiv);

    const commentElement = document.createElement('p');
    commentElement.classList.add('comment__text');
    commentElement.textContent = comment.comment;
    commentDiv.appendChild(commentElement);
    

    //add like btn
    const likeBtn = document.createElement('img');
    likeBtn.src = '../assets/icons/SVG/icon-like.svg';
    likeBtn.alt = 'Like Button';
    likeBtn.classList.add('comment__btn');
    likeBtn.style.cursor = 'pointer';
    commentElement.appendChild(likeBtn);


    //add like number
    const likeNum = document.createElement('span');
    likeNum.classList.add('comment__likenum');
    likeNum.textContent = `${comment.likes}`;
    commentElement.appendChild(likeNum);

    //add event button listener to like btn
    likeBtn.addEventListener('click', async function() {
        try{
            console.log('Like button clicked!');
            const updatedLike = await api.likeComment(comment.id);
            likeNum.textContent = `${updatedLike.likes}`;
            console.log('likes have been updated!');

        }catch(error){
            console.log('error like comment:',error);

        }
        
    });

    //add delete btn
    const deleteBtn = document.createElement('img');
    deleteBtn.src = '../assets/icons/SVG/icon-delete.svg';
    deleteBtn.alt = 'Delete Button';
    commentElement.classList.add('comment__btn');
    deleteBtn.style.cursor = 'pointer';

    //add event button listener to delete btn
    deleteBtn.addEventListener('click', async function () {
        try {
            const deleteComment = await api.deleteComment(comment.id);
            console.log('Delete comments:', deleteComment);
            commentDiv.remove();
        } catch (error) {
            console.log('error delete comment:',error);
        }
        
    })
    commentElement.appendChild(deleteBtn);

    container.appendChild(commentDiv);
    

}

document.getElementById('commentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('Form submission started');
    
    const usernameInput = document.getElementById("username");
    const commentsInput = document.getElementById("comments");
    const username = usernameInput.value.trim();
    const comments = commentsInput.value.trim();

    console.log('Username:', username);
    console.log('Comment:', comments);

    usernameInput.classList.remove('error');
    commentsInput.classList.remove('error');

    let isValid = true;
    if (!username) {
        usernameInput.classList.add('error');
        isValid = false;
    }

    if (!comments) {
        commentsInput.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        console.log('Form validation failed');
        return;
    }

    const newUser = {
        name: username,
        comment: comments
    }

    console.log('New user object:', newUser);

    try {
        const postResponse = await api.postComment(newUser);
        console.log('Post response:', postResponse);

        const updatedComments = await api.getComments();
        document.getElementById("comment__container").innerHTML = '';
        updatedComments.forEach(comment => {
            displayComment(comment);
        });
        console.log('Posted new comment:', newUser);
    } catch (error) {
        console.error('Error posting comment:', error);
    }

    document.getElementById('commentForm').reset();
});
