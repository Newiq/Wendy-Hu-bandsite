const showInfo = [
    {
        date:'2024-09-09',
        weekDay:'Monday',
        venue:'Ronald Lane',
        location:'San Francisco, CA'
    },
    {
        date:'2024-09-17',
        weekDay:'Tuesday',
        venue:'Pier 3 East',
        location:'San Francisco, CA'
    },
    {
        date:'2024-10-12',
        weekDay:'Saturday',
        venue:'View Lounge',
        location:'San Francisco, CA'
    },
    {
        date:'2024-11-16',
        weekDay:'Saturday',
        venue:'Hyatt Agency',
        location:'San Francisco, CA'
    },
    {
        date:'2024-11-29',
        weekDay:'Friday',
        venue:'Moscow Center',
        location:'San Francisco, CA'
    },
    {
        date:'2024-12-18',
        weekDay:'Wednesday',
        venue:'Press Club',
        location:'San Francisco, CA'
    }
];

const labelInfo = ['DATE', 'VENUE', 'LOCATION'];

// Function: format the weekday
function formatWeekday(weekDayString) {
    const shortWeekDay = weekDayString.substring(0, 3);
    return shortWeekDay;
}

// Function: format date to MMM DD YYYY
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Function: display the show in mobile
function displayShowsCol(show, label) {
    // Create container
    const container = document.getElementById("show");
    const showDiv = document.createElement('div');
    container.appendChild(showDiv);
    showDiv.classList.add('show__container');

    // Create 1st tag container for flexbox
    const tagContainer1 = document.createElement('div');
    tagContainer1.classList.add('show__tag');
    showDiv.appendChild(tagContainer1);

    // Create 1st label span
    const labelElement1 = document.createElement('span');
    labelElement1.textContent = label[0];
    labelElement1.classList.add('show__label');
    tagContainer1.appendChild(labelElement1);

    // Create date p
    const dateElement = document.createElement('p');
    dateElement.classList.add('show__date');
    dateElement.textContent = formatWeekday(show.weekDay) + ' ' + formatDate(show.date);
    tagContainer1.appendChild(dateElement);

    // Create 2nd tag container for flexbox
    const tagContainer2 = document.createElement('div');
    tagContainer2.classList.add('show__tag');
    showDiv.appendChild(tagContainer2);

    // Create 2nd label span
    const labelElement2 = document.createElement('span');
    labelElement2.textContent = label[1];
    labelElement2.classList.add('show__label');
    tagContainer2.appendChild(labelElement2);

    // Create venue p
    const venueElement = document.createElement('p');
    venueElement.classList.add('show__venue');
    venueElement.textContent = show.venue;
    tagContainer2.appendChild(venueElement);

    // Create 3rd tag container for flexbox
    const tagContainer3 = document.createElement('div');
    tagContainer3.classList.add('show__tag');
    showDiv.appendChild(tagContainer3);

    // Create 3rd label span
    const labelElement3 = document.createElement('span');
    labelElement3.textContent = label[2];
    labelElement3.classList.add('show__label');
    tagContainer3.appendChild(labelElement3);

    // Create location p
    const locationElement = document.createElement('p');
    locationElement.classList.add('show__location');
    locationElement.textContent = show.location;
    tagContainer3.appendChild(locationElement);

    // Create button
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
    dateElement.textContent = formatWeekday(show.weekDay) + ' ' + formatDate(show.date);
    tagContainer2.appendChild(dateElement);

    // Create venue p
    const venueElement = document.createElement('p');
    venueElement.classList.add('show__venue');
    venueElement.textContent = show.venue;
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

//display for different sizes of screen
document.addEventListener('DOMContentLoaded', function () {
    function applyResponsiveStyles() {
        const container = document.getElementById("show");
        container.innerHTML = ""; // Clear the container

        createTitle();

        if (window.innerWidth < 767) {
            for (let i = 0; i < showInfo.length; i++) {
                displayShowsCol(showInfo[i], labelInfo);
            }
        } else {
            const parentDiv = createLabelDiv(labelInfo); 
            for (let i = 0; i < showInfo.length; i++) {
                displayShowsRow(showInfo[i], parentDiv); 
            }
        }
    }

    // Initial check
    applyResponsiveStyles();

    // Re-check on window resize
    window.addEventListener('resize', applyResponsiveStyles);
});
