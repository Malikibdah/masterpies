async function SendOptToEmail() {
    let url = "https://localhost:44326/api/PasswordReset/request-reset";
    event.preventDefault();
    let form = document.getElementById("otpform");
    let email = document.getElementById("email").value;
    sessionStorage.setItem("useremail", email);
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    window.location.href = "./otp.html";
    
}