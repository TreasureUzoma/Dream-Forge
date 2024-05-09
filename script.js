const botName = "BOT"; // Define the bot's name with bold formatting

// Function to handle user input and trigger search
function searchRecipes() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  
  // Add user input to the conversation history
  addToConversation("You", searchInput);

  // Check if the user input contains "recipe" or search for recipes directly
  if (searchInput.includes('recipe')) {
    getRecipe(searchInput);
  } else {
    getRecipe(searchInput + ' recipe'); // Append "recipe" to the search query
  }

  // Clear the search input field
  document.getElementById('searchInput').value = '';
}

// Function to add user input to the conversation history
function addToConversation(sender, message) {
  const recipeList = document.getElementById("recipeList");
  const inputDiv = document.createElement("div");
  inputDiv.innerHTML = `<p><b>${sender}</b><br>${message}<br></p>`;
  recipeList.appendChild(inputDiv);
}

// Function to fetch recipe data from the API
function getRecipe(query) {
  const apiKey = 'dUooBoO9STAcacKbT7xNmQ==qdxPr833gJH3LlW4'; // Your API key
  const url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;
  const headers = { 'X-Api-Key': apiKey };

  fetch(url, { method: 'GET', headers: headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      console.log('API Response:', result); // Log the API response

      // Check if the API returned any recipes
      if (result.length > 0) {
        displayRecipes(result);
      } else {
        // If no recipes found, suggest usage
        suggestUsage(query);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const errorMessage = "Error fetching recipe. Please try again!";
      const botReply = { message: errorMessage, code: "", note: "" };
      displayDramaticReply(botReply.message, botReply.code, botReply.note);
    });
}

// Function to suggest usage when no recipes are found
function suggestUsage(query) {
  const usageSuggestion = `It seems like you're looking for a recipe or ingredient "${query}". You can try searching for recipes using keywords like "chicken", "pasta", "salad", etc., or let me know if you need help with anything else.`;
  const botReply = { message: usageSuggestion, code: "", note: "" };
  displayDramaticReply(botReply.message, botReply.code, botReply.note);
}

// Function to display the recipes with a dramatic typing effect
function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipeList");

  if (recipes.length === 1) {
    // If only one recipe is found
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");

    // Process styled text in the message
    const recipeMessage = `Here's a recipe for you: <br>
    <b>${recipes[0].title}</b>.<br><br>
    <b>Ingredients:</b> ${recipes[0].ingredients.replace(/\|/g, ', ')}.<br><br>
    <b>Servings:</b> ${recipes[0].servings}.<br><br>
    <b>Instructions:</b><br>${processStyledMessage(recipes[0].instructions.replace(/--/g, '<br>'))}`;

    recipeDiv.innerHTML = "<i>(is typing)</i><br><br>"; // Display "(is typing)" before showing the actual message
    recipeList.appendChild(recipeDiv);

    // Display the bot's name with bold formatting
    const botNameDiv = document.createElement("b");
    botNameDiv.innerHTML = `<b>${botName}</b>: <br>`;
    recipeDiv.insertBefore(botNameDiv, recipeDiv.firstChild);

    // Scroll to the bottom of the recipe list
    recipeList.scrollTop = recipeList.scrollHeight;

    // Simulate delay before displaying the actual message
    setTimeout(function() {
      recipeDiv.innerHTML = `<b>${botName}</b>: <br>${recipeMessage}<br><br><br><br>`; // Include bot's name in the message
    }, 1000); // Adjust this delay to match the time it takes for the API to fetch
  } else if (recipes.length > 1) {
    // If multiple recipes are found
    const botReply = { message: `I found ${recipes.length} recipes for you.`, code: "", note: "" };
    displayDramaticReply(botReply.message, botReply.code, botReply.note);
    
    recipes.forEach((recipe, index) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      // Process styled text in the message
      const recipeMessage = `Recipe ${index + 1}: <br>
      <b>${recipe.title}</b>.<br><br>
      <b>Ingredients:</b> ${recipe.ingredients.replace(/\|/g, ', ')}.<br><br>
      <b>Servings:</b> ${recipe.servings}.<br><br>
      <b>Instructions:</b><br>${processStyledMessage(recipe.instructions.replace(/--/g, '<br>'))}`;

      recipeDiv.innerHTML = "<i>(is typing)</i><br><br>"; // Display "(is typing)" before showing the actual message
      recipeList.appendChild(recipeDiv);

      // Display the bot's name with bold formatting
      const botNameDiv = document.createElement("b");
      botNameDiv.innerHTML = `<b>${botName}</b>: <br>`;
      recipeDiv.insertBefore(botNameDiv, recipeDiv.firstChild);

      // Scroll to the bottom of the recipe list
      recipeList.scrollTop = recipeList.scrollHeight;

      // Simulate delay before displaying the actual message
      setTimeout(function() {
        recipeDiv.innerHTML = `<b>${botName}</b><br>: ${recipeMessage}<br><br><br><br>`; // Include bot's name in the message
      }, 1000); // Adjust this delay to match the time it takes for the API to fetch
    });
  }
}

// Function to process styled text
function processStyledMessage(message) {
  // Replace **bold**, __underline__, and ~~strike-through~~ formats
  message = message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  message = message.replace(/__(.*?)__/g, '<u>$1</u>');
  message = message.replace(/~~(.*?)~~/g, '<s>$1</s>');
  return message;
}

// Function to display the bot's reply with a dramatic typing effect
// Function to display the bot's reply with a dramatic typing effect
function displayDramaticReply(message, code, note) {
  const recipeList = document.getElementById("recipeList");

  // Clear any existing "(is typing)" messages
  const typingMessages = recipeList.querySelectorAll(".is-typing");
  typingMessages.forEach(message => message.remove());

  const recipeDiv = document.createElement("div");
  recipeDiv.classList.add("recipe");

  // Display the bot's name with bold formatting and a line break
  const botNameDiv = document.createElement("b");
  botNameDiv.innerHTML = `<b>${botName}</b>: <br>`;
  recipeDiv.appendChild(botNameDiv);

  // Display "(is typing)" before showing the actual message
  recipeDiv.innerHTML += "<i>(is typing)</i><br><br>"; 

  recipeList.appendChild(recipeDiv);

  // Scroll to the bottom of the recipe list
  recipeList.scrollTop = recipeList.scrollHeight;

  // Simulate delay before displaying the actual message
  setTimeout(function() {
    // Clear the "(is typing)" message
    recipeDiv.innerHTML = `<b>${botName}</b>: <br>${processStyledMessage(message)}<br><br><br><br>`;
  }, 1000); // Adjust this delay to match the time it takes for the API to fetch
}

