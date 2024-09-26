async function userprofileinfo() {
    let id = localStorage.getItem('userId');
    let url = `https://localhost:44326/api/User/UserProfileInfo /${id}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("username").innerHTML = data.userName;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("phonenumber").innerHTML = data.phonrNumber;
    document.getElementById("carplatenumber").innerHTML = data.carPlateNumber;
    document.getElementById("city").innerHTML = data.city;
    document.getElementById("street").innerHTML = data.street;
    let image = "img/" + data.image;
    document.getElementById("image").src = image;
    

}

userprofileinfo();