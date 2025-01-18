function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const registrationForm = document.getElementById("registrationForm");
  const toggleButton = document.getElementById("toggleButton");

  if (loginForm.classList.contains("block")) {
    loginForm.classList.replace("block", "hidden");
    registrationForm.classList.replace("hidden", "block");
    toggleButton.textContent = "Already have an account? Sign in";
  } else {
    loginForm.classList.replace("hidden", "block");
    registrationForm.classList.replace("block", "hidden");
    toggleButton.textContent = "Don't have an account? Sign up";
  }
}

async function handleLogin(event) {
  try {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const credentials = JSON.stringify({ email, password });

    const result = await loginUser(credentials);

    if (!result.success) {
      alert("Login Failed! Try Again Later");
    } else {
      alert("Logged in successfully.");
    }
    const id = result.data.user.id;
    const userProfile = await getProfile();
    if (!userProfile.success) {
      alert("Invalid User Login Again");
      return;
    }

    localStorage.setItem("userAuth", JSON.stringify(userProfile.data));

    userProfile.data.profileImg
      ? (window.location.href = "index.html")
      : (window.location.href = "profile.html");

    console.log(userProfile.data);
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
}

async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const user = {
    name,
    email,
    password,
    code: Math.floor(1000 + Math.random() * 9000), // Generate a unique code
  };

  const result = await registerUser(user);

  if (result.success) {
    alert(`Registration successful! ${result.data.message}`);
    toggleForms(); // Assuming this toggles between forms
  } else {
    alert(`Registration failed: ${result.message}`);
  }
}

async function registerUser(user) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Fix: Use 'headers' instead of 'header'
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(
      "https://4436.vercel.app/api/auth/register", // Replace with your API endpoint
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
}

async function loginUser(cred) {
  try {
    const requestOption = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: cred,
    };

    const response = await fetch(
      "https://4436.vercel.app/api/auth/login",
      requestOption
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
}

async function getProfile() {
  try {
    const result = await fetch("https://4436.vercel.app/api/auth/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) throw new Error("Http Shit if happedning");
    const data = await result.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
}
