async function admininfo() {
   
    let adminId = localStorage.getItem('adminId');
    let url1 = `https://localhost:44326/api/Admin/GetAdminInfo/${adminId}`;
    let response1 = await fetch(url1);
    let data1 = await response1.json();
    
    document.getElementById('employeeName').value = data1.adminName;
    document.getElementById('adminEmail').value = data1.email;
    document.getElementById('phoneNumber').value = data1.phoneNumber;
    document.getElementById('Address').value = data1.address;
    document.getElementById('adminimage').src = "../img/" + data1.image;
    

}
admininfo();


async function EditAdmin() {
    debugger
    let adminId = localStorage.getItem('adminId');
    event.preventDefault();
    let url = `https://localhost:44326/api/Admin/UpdateAdminInfo/${adminId}`;
    let form = document.getElementById("editadminformId");
    
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });

    if (response.status === 200) {
        
        Swal.fire({
            title: 'Success!',
            text: 'Admin Edited successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.reload(); 
        });
    } else {
        
        Swal.fire({
            title: 'Error!',
            text: 'Failed to edit admin. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}


async function resetpassword() {
    debugger;
    let password = document.getElementById('newpassword').value;
    let confirmPassword = document.getElementById('confirmpassword').value;

    if (password !== confirmPassword) {
        await Swal.fire({
            icon: 'error',
            title: 'Passwords Do Not Match',
            text: 'Please make sure both passwords are the same.',
        });
        return;
    }

    let adminId = localStorage.getItem('adminId');
    let url2 = `https://localhost:44326/api/Admin/ResetAdminPassword/${adminId}`;
    
    // تغيير كلمة السر
    let response = await fetch(url2, {
        method: 'PUT',
        body: JSON.stringify({ password: confirmPassword }),
        headers: {
            'Content-Type': 'application/json' 
        },
    });

    if (response.status === 200) {
        await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password reset successfully.',
        });

        // إعادة تحميل الصفحة
        window.location.reload();
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Reset Failed',
            text: 'Failed to reset password. Please try again.',
        });
    }
}


