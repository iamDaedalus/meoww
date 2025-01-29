<!DOCTYPE html>
<html>
<head>
  <title>Hash Routing</title>
</head>
<body>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <div id="content"></div>

<script>
  // Define a mapping of route names to their corresponding HTML content.
  const routes = {
    home: `<h1>Welcome to Home Page</h1>`, // The content to display when the 'home' route is active.
    about: `<h1 >About Us</h1>`,            // The content to display when the 'about' route is active.
    contact: `<h1>Contact Us</h1>`         // The content to display when the 'contact' route is active.
  };

  // Define a function to handle rendering the content based on the current hash.
  function renderRoute() {
    // Get the current hash value (e.g., '#home') without the '#' character.
    // If the hash is empty, default to 'home'.
    const hash = location.hash.slice(1) || 'home'; 

    // Retrieve the corresponding content from the 'routes' object.
    // If the hash does not match any route, default to 'Page not found' content.
    const content = routes[hash] || `<h1>Page not found</h1>`;

    // Set the inner HTML of the element with ID 'content' to the resolved content.
    document.getElementById('content').innerHTML = content;
  }

  // Listen for the 'hashchange' event, which is triggered when the hash in the URL changes.
  // Call the 'renderRoute' function to update the displayed content.
  window.addEventListener('hashchange', renderRoute);

  // Listen for the 'load' event, which is triggered when the page is initially loaded.
  // Call the 'renderRoute' function to display the appropriate content based on the initial hash.
  window.addEventListener('load', renderRoute);
</script>

</body>
</html>
