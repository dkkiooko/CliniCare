<?php
session_start();
 
$servername = "localhost";
$username = "bek";
$password = "2518E11e&&";
$dbname = "password_test";
 
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
 
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
 
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];
 
  // Hash the password
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);
 
  // Prepare the SQL statement
  $sql = "SELECT * FROM users WHERE username='$username'";
  $result = mysqli_query($conn, $sql);
 
  // Check if the user was found
  if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
 
    // Verify the password
    if (password_verify($password, $row["password"])) {
      // Set the session variables
      $_SESSION["loggedin"] = true;
      $_SESSION["username"] = $username;
 
      // Redirect to the protected page
      header("location: protected_page.php");
    } else {
      // Password is incorrect
      echo "Incorrect password";
    }
  } else {
    // User not found
    echo "User not found";
  }
}
 
mysqli_close($conn);
?>

