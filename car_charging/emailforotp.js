async function SendOptToEmail() {
    event.preventDefault();
    let url = "https://localhost:44326/api/PasswordReset/request-reset";
    let form = document.getElementById("otpform");
    let email = document.getElementById("email").value;
    sessionStorage.setItem("useremail", email);
    let formData = new FormData(form);
    
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    
    if (response.status == 200) {
        await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'OTP sent successfully to your registered email address.',
        });
        window.location.href = "./otp.html"; // الانتقال إلى صفحة OTP بعد عرض التنبيه
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Failed to Send OTP',
            text: 'Failed to send OTP. Please try again.',
        });
    }
}
