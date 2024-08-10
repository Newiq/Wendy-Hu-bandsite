import BandSiteApi from './band-site-api.js';

const api = new BandSiteApi('e0eea5f0-0f8c-4b54-9fc4-ff50843766d4');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const shows = await api.getShows();
        console.log('Fetched shows:', shows);

        function applyResponsiveStyles() {
            const container = document.getElementById("show");
            container.innerHTML = ""; 
            createTitle();

            if (window.innerWidth < 767) {
                shows.forEach(show => {
                    displayShowsCol(show, labelInfo);
                });
            } else {
                const parentDiv = createLabelDiv(labelInfo); 
                shows.forEach(show => {
                    displayShowsRow(show, parentDiv); 
                });
            }
        }

        applyResponsiveStyles();

        window.addEventListener('resize', applyResponsiveStyles);
    } catch (error) {
        console.error('Error fetching shows:', error);
    }
});

const labelInfo = ['DATE', 'VENUE', 'LOCATION'];

// Function: format date 
function formatDate(timestamp) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(/,/g, ' '); 
}

// Function: display the show in mobile
function displayShowsCol(show, label) {
    // Create container
    const container = document.getElementById("show");
    const showDiv = document.createElement('div');
    container.appendChild(showDiv);
    showDiv.classList.add('show__container');

    // 1stlabel container
    const tagContainer1 = document.createElement('div');
    tagContainer1.classList.add('show__tag');
    showDiv.appendChild(tagContainer1);

    // 1stlabel
    const labelElement1 = document.createElement('span');
    labelElement1.textContent = label[0];
    labelElement1.classList.add('show__label');
    tagContainer1.appendChild(labelElement1);

    // date
    const dateElement = document.createElement('p');
    dateElement.classList.add('show__date');
    dateElement.textContent = formatDate(show.date);
    tagContainer1.appendChild(dateElement);

    // 2nd label container
    const tagContainer2 = document.createElement('div');
    tagContainer2.classList.add('show__tag');
    showDiv.appendChild(tagContainer2);

    // 2ndlabel
    const labelElement2 = document.createElement('span');
    labelElement2.textContent = label[1];
    labelElement2.classList.add('show__label');
    tagContainer2.appendChild(labelElement2);

    // location
    const venueElement = document.createElement('p');
    venueElement.classList.add('show__venue');
    venueElement.textContent = show.place; 
    tagContainer2.appendChild(venueElement);

    // 3rd label container
    const tagContainer3 = document.createElement('div');
    tagContainer3.classList.add('show__tag');
    showDiv.appendChild(tagContainer3);

    // 3rd label
    const labelElement3 = document.createElement('span');
    labelElement3.textContent = label[2];
    labelElement3.classList.add('show__label');
    tagContainer3.appendChild(labelElement3);

    // location
    const locationElement = document.createElement('p');
    locationElement.classList.add('show__location');
    locationElement.textContent = show.location;
    tagContainer3.appendChild(locationElement);

    // button
    const button = document.createElement('button');
    button.classList.add('show__button');
    button.textContent = 'BUY TICKETS';
    showDiv.appendChild(button);
}

//Function: create label div, only for larger screen
function createLabelDiv(label){
    // Create container
    const container = document.getElementById("show");
    const showDiv = document.createElement('div');
    container.appendChild(showDiv);
    showDiv.classList.add('show__container');
    
    // Create container for label
    const tagContainer1 = document.createElement('div');
    tagContainer1.classList.add('show__container-label');
    showDiv.appendChild(tagContainer1);

    // Create 1st label span
    const labelElement1 = document.createElement('span');
    labelElement1.textContent = label[0];
    labelElement1.classList.add('show__label');
    tagContainer1.appendChild(labelElement1);

    // Create 2nd label span
    const labelElement2 = document.createElement('span');
    labelElement2.textContent = label[1];
    labelElement2.classList.add('show__label');
    tagContainer1.appendChild(labelElement2);

    // Create 3rd label span
    const labelElement3 = document.createElement('span');
    labelElement3.textContent = label[2];
    labelElement3.classList.add('show__label');
    tagContainer1.appendChild(labelElement3);

    return showDiv;
}

// Function: display the show in large screen
function displayShowsRow(show, parentDiv){
    // Create container for other info
    const tagContainer2 = document.createElement('div');
    tagContainer2.classList.add('show__container-info');
    parentDiv.appendChild(tagContainer2);

    // Create date p
    const dateElement = document.createElement('p');
    dateElement.classList.add('show__date');
    dateElement.textContent = formatDate(show.date);
    tagContainer2.appendChild(dateElement);

    // Create venue p
    const venueElement = document.createElement('p');
    venueElement.classList.add('show__venue');
    venueElement.textContent = show.place;
    tagContainer2.appendChild(venueElement);

    // Create location p
    const locationElement = document.createElement('p');
    locationElement.classList.add('show__location');
    locationElement.textContent = show.location;
    tagContainer2.appendChild(locationElement);

    // Create button
    const button = document.createElement('button');
    button.classList.add('show__button');
    button.textContent = 'BUY TICKETS';
    tagContainer2.appendChild(button);
}

//create title
function createTitle(){
    const container = document.getElementById("show");
    const showTitle = document.createElement('h2');
    showTitle.classList.add('show__title');
    showTitle.textContent = 'Shows';
    container.appendChild(showTitle);
}
