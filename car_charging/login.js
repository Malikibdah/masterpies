const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});
function showLogin() {
  user = localStorage.getItem("userId");
  if (user == null || user == undefined) {
    let showlogoutandprofile = document.getElementById("showprofileandlogout");
    showlogoutandprofile.innerHTML += `<div class="btn p-4">
          <a href="./login.html" class=" text-white p-2 ps-3 pe-3" style="background-color: #8cc63f;">Sign In</a>
        </div>`;
  } else {
    let showprofile = document.getElementById("showprofileandlogout");
    showprofile.innerHTML += `<a href="profile.html" id="profileId" class="nav-item nav-link">Profile</a>`;
    let showlogout = document.getElementById("showprofileandlogout");
    showlogout.innerHTML += ` <div class="btn p-4">
          <a href="" onclick="logout()" class=" text-white p-2 ps-3 pe-3" style="background-color: #8cc63f;">Logout</a>
        </div> `;
    
  }

}
showLogin();
async function Regester() {

  debugger
  event.preventDefault();
  let password = document.getElementById("password").value;
  let confirmpassword = document.getElementById("confirmpassword").value;
  if (password != confirmpassword) {
    alert("Passwords do not match");
  }
  let url = "https://localhost:7077/api/User/UserRegester";
  let form = document.getElementById("regesterform");
  let formData = new FormData(form);
  let response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    alert("Regestered Successfully");
  }
  else {
    alert("Failed to Regester");
  }

}

async function login() {
  debugger
  event.preventDefault();
  let url = "https://localhost:44326/api/User/UserLogin";
  let form = document.getElementById("loginform");
  let formData = new FormData(form);
  let response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    let data = await response.json();
    let userId = data.id;
    alert(`Welcome to our website ${data.userName}`);
    let user = localStorage.setItem("userId", userId);
    window.location.href = "./index.html";
  } else {
    let adminurl = "https://localhost:44326/api/Admin/AdminLogin";
    let form = document.getElementById("loginform");
    let formData = new FormData(form);
    let response = await fetch(adminurl, {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      let data = await response.json();
      let adminId = data.id;
      alert(`Welcome to our website ${data.adminName}`);
      let admin = localStorage.setItem("adminId", adminId);
      window.location.href = "./daasbord.html";
    } else { alert("Failed to login"); }
  }
}


function logout() {
  localStorage.removeItem("userId");
  window.location.href = "./index.html";
}