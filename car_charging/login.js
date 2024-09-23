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
  alert("Regestered Successfully");}
  else {
    alert("Failed to Regester");
  }

}

async function login() {
  debugger
  event.preventDefault();
  let url = "https://localhost:7077/api/User/Login";
  let form = document.getElementById("loginform");
  let formData = new FormData(form);
  let response = await fetch(url, {
    method: 'POST',
    body: formData
  });
}