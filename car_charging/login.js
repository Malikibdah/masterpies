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
  debugger;
  event.preventDefault();

  // استرداد القيم من المدخلات
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmpassword = document.getElementById("confirmpassword").value;

  // يتحقق من صيغة البريد الإلكتروني باستخدام Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    await Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
    });
    return; // لمنع استمرار التنفيذ في حال كان البريد الإلكتروني غير صحيح
  }

  // تحقق من أن كلمة المرور لا تقل عن 8 خانات وتحتوي على أحرف ورموز وأرقام
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    await Swal.fire({
      icon: 'error',
      title: 'Weak Password',
      text: 'Password must be at least 8 characters long, and include letters, numbers, and special characters.',
    });
    return; // لمنع استمرار التنفيذ في حال كانت كلمة المرور غير قوية
  }

  // تحقق من تطابق كلمات المرور
  if (password !== confirmpassword) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Passwords do not match!',
    });
    return; // لمنع استمرار التنفيذ في حال كانت كلمات المرور غير متطابقة
  }

  
  let url = "https://localhost:44326/api/User/UserRegester";
  let form = document.getElementById("regesterform");
  let formData = new FormData(form);

 
  let response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  
  if (response.ok) {
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Registered Successfully',
      
    });
    window.location.href = "login.html";
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: 'Please check your information and try again',

    });
  }
}


async function login() {
  debugger;
  event.preventDefault();
  let url = "https://localhost:44326/api/User/UserLogin";
  let form = document.getElementById("loginform");
  let formData = new FormData(form);
  let response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    let data = await response.json();
    let userId = data.id;
    await Swal.fire({
      icon: 'success',
      title: 'Welcome!',
      text: `Welcome to our website, ${data.userName}`,
    });
    localStorage.setItem("userId", userId);
    window.location.href = "./index.html";
  } else {
    let adminurl = "https://localhost:44326/api/Admin/AdminLogin";
    let response = await fetch(adminurl, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      let data = await response.json();
      let adminId = data.id;
      await Swal.fire({
        icon: 'success',
        title: 'Welcome Admin!',
        text: `Welcome to our website, ${data.adminName}`,
      });
      localStorage.setItem("adminId", adminId);
      window.location.href = "./daasbord.html";
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password',
      });
    }
  }
}


function logout() {
  localStorage.removeItem("userId");
  window.location.href = "./index.html";
}