   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Movie Card with Popper.js</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js"></script>
  <style>
      body{
        height: 200vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    } 
    .card {
      width: 250px;
      height: 350px;
      position: relative;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
    }

    .card:hover {
      transform: scale(1.05);
    }

    .card-body {
      padding: 0;
      margin: 0;
      background-color: #333;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      border-radius: 10px;
      background-image: url('https://via.placeholder.com/250x350');
      background-size: cover;
    }

    .card-title {
      font-size: 18px;
      font-weight: bold;
    }

    .movie-tooltip {
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 14px;
      visibility: hidden;
      position: absolute;
      width: 250px;
      max-width: 90%;
      z-index: 10;
      display: none;
    }
  </style>
</head>
<body class="bg-dark d-flex justify-content-center align-items-center" style="height: 200vh;">

  <div class="card" id="movieCard">
    <div class="card-body">
      <div class="card-title">Movie Title</div>
    </div>
    <div class="movie-tooltip" id="movieDetails">
      <h5>Movie Details</h5>
      <p><strong>Director:</strong> John Doe</p>
      <p><strong>Genre:</strong> Action</p>
      <p><strong>Release Date:</strong> 2024-05-01</p>
      <p><strong>Rating:</strong> 8.7/10</p>
    </div>
  </div>

  <script>
    const movieCard = document.getElementById('movieCard');
    const movieDetails = document.getElementById('movieDetails');

    // Initialize Popper.js for positioning the tooltip
    const popperInstance = Popper.createPopper(movieCard, movieDetails, {
      placement: 'top',
    });

    movieCard.addEventListener('mouseenter', () => {
      movieDetails.style.visibility = 'visible'; // Show movie details on hover
      movieDetails.style.display = 'block'; // Show block display
      popperInstance.update(); // Update position of the tooltip
    });

    movieCard.addEventListener('mouseleave', () => {
      movieDetails.style.visibility = 'hidden'; // Hide movie details when mouse leaves
      movieDetails.style.display = 'none'; // Hide block display
    });
  </script>

</body>
</html>
