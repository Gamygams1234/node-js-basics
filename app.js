// Problem: We need a simple way to look at a user's badge count and JavaScript points

// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const https = require("https");
const username = "chalkers";

//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}
function getProfile(username) {
  // Connect to the API URL (https://teamtreehouse.com/username.json)
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
      let body = "";
      // Read the data
      // making it to string so it doesn't return a buffer
      response.on("data", (data) => {
        body += data.toString();
      });

      response.on("end", () => {
        const profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);
        // right now it is passing a string

        // Parse the data
        // Print the data
      });
    });
    request.on("error", (error) => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    console.error(error.message);
  }
}

const users = ["chalkers", "Francisco"];
users.forEach((user) => {
  getProfile(user);
});

// this can also work by useing it
// const users = process.argv;
// users.forEach(getProfile);
