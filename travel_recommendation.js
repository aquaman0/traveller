const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const containerPopup = document.getElementById('popup');

function clearForm() {
    document.getElementById("searchInput").value = "";
    hidePopup();
}
btnClear.addEventListener("click", clearForm);

function showPopup() {
    containerPopup.classList.add('show');
}

function hidePopup() {
    containerPopup.classList.remove('show');
}

function searchCondition(e) {
    e.preventDefault();
    const input = document.getElementById('searchInput').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let result = [];
            if (input === 'beaches' || input === 'temples' || input === 'beach' || input === 'temple') {
                if (input === 'beach') {
                    result = data['beaches'];
                } else if (input === 'temple') {
                    result = data['temples'];
                } else {
                    result = data[input];
                }
            } else {
                const country = data.countries.find(item => item.name.toLowerCase() === input);
                if (country) {
                    console.log('Country was found succesfully.');
                    result = country.cities;
                } else {
                    console.error('Error. No data found.');
                    suggestionsDiv.innerHTML = "<p>Sorry, we couldn't process your request. Please try again.</p>";
                    showPopup();
                    return;
                }
            }

            result.forEach((element) => {
                suggestionsDiv.innerHTML += `<div class="suggestion">
                                                <div class="suggestion-img">
                                                    <img src="./${element.imageUrl}">
                                                </div>
                                                <div class="suggestion-desc">
                                                    <h3>${element.name}</h3>
                                                    <p>${element.description}</p>
                                                    <button class="book-btn">Visit</button>
                                                </div>
                                            </div>`;
            });
            showPopup();
        })
        .catch(error => {
            console.error('Error:', error);
            suggestionsDiv.innerHTML = 'An error occurred while fetching data.';
            showPopup();
        });
}
btnSearch.addEventListener('click', searchCondition);