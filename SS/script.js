const statusText = document.getElementById('status');

// Function to get the current location
function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(successCallback, errorCallback, {
            enableHighAccuracy: true,  // Use GPS if available
            maximumAge: 0,  // Do not use cached location
            timeout: 10000  // Timeout after 10 seconds
        });
    } else {
        statusText.innerText = "Geolocation is not supported by this browser.";
    }
}

// Success callback - when location is successfully obtained
function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display location on the webpage
    statusText.innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;

    // Send this location to Firebase
    sendToServer(latitude, longitude);
}

// Error callback - if there's an error getting location
function errorCallback(error) {
    statusText.innerText = `Error: ${error.message}`;
}

// Function to send location to Firebase
function sendToServer(latitude, longitude) {
    firebase.database().ref('locations/user1').set({
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date().toISOString()
    });
}

// Start sharing location when the button is clicked
document.getElementById('start').addEventListener('click', () => {
    statusText.innerText = "Getting location...";
    sendLocation();
});
