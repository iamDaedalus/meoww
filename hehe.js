<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Define the document's character encoding and viewport settings -->
  <meta charset="UTF-8"> <!-- Set the character encoding to UTF-8 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Ensure responsive behavior on mobile devices -->
  <title>Observe HTML Tag</title> <!-- Set the title of the page -->

  <!-- Add styling for the placeholders and the loaded state -->
  <style>
    /* Define the default styling for placeholders */
    .placeholder {
      height: 100vh; /* Set the height of each placeholder to fill the viewport height */
      margin: 50px 0; /* Add vertical spacing around the placeholders */
      background-color: rgb(131, 12, 12); /* Set a dark red background color */
      display: flex; /* Use flexbox for centering content */
      align-items: center; /* Vertically center the content */
      justify-content: center; /* Horizontally center the content */
    }

    /* Styling for placeholders after they are loaded */
    .loaded {
      background-color: lightgreen; /* Change background to light green when loaded */
      color: white; /* Set text color to white */
      font-weight: bold; /* Make text bold */
    }
  </style>
</head>
<body>
  <!-- Add placeholders with data-content attributes for lazy loading -->
  <div class="placeholder" data-content="Content 1"></div> <!-- Placeholder for Content 1 -->
  <div class="placeholder" data-content="Content 2"></div> <!-- Placeholder for Content 2 -->
  <div class="placeholder" data-content="Content 3"></div> <!-- Placeholder for Content 3 -->

  <script>
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        // Loop through the entries (elements being observed)
        entries.forEach(entry => {
          // Check if the element is intersecting (visible in the viewport)
          if (entry.isIntersecting) {
            const div = entry.target; // Get the intersecting element
            div.textContent = div.dataset.content; // Load the content from the data-content attribute
            div.classList.add('loaded'); // Apply the 'loaded' styles
            observer.unobserve(div); // Stop observing the element once loaded
          }
        });
      },
      { threshold: 0.001 } // Trigger the observer callback when 50% of the element is visible
    );

    // Select all elements with the 'placeholder' class and observe them
    document.querySelectorAll('.placeholder').forEach(div => {
      observer.observe(div); // Start observing each placeholder
    });
  </script>
</body>
</html>
