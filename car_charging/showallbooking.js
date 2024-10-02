async function GetAllVehiclechargingrequests() {
    let userid = localStorage.getItem('userId');
    let url = `https://localhost:44326/api/User/GetAllVehiclechargingrequestsByUserId/${userid}`;
    let response = await fetch(url);
    let data = await response.json();
    let allVehicleBooking = document.getElementById('allbookingId');
    data.forEach(element => {
        allVehicleBooking.innerHTML += `
        <tr style="color: white;">
            <td >${element.userName}</td>
            <td >${element.phoneNumber}</td>
            <td >${element.carPlateNumber}</td>
            <td >${element.carType}</td>
            <td >${element.status}</td>
            <td >Vehiclecharging</td>
        </tr>

        `
} );
}
GetAllVehiclechargingrequests();

async function GetAllComputerCheckRequests() {
    let userid = localStorage.getItem('userId');
    let url = `https://localhost:44326/api/User/GetAllComputerCheckRequestsByUserId/${userid}`;
    let response = await fetch(url);
    let data = await response.json();
    let allVehicleBooking = document.getElementById('allbookingId');
    data.forEach(element => {
        allVehicleBooking.innerHTML += `
        <tr style="color: white;">
            <td >${element.userName}</td>
            <td >${element.phoneNumber}</td>
            <td >${element.carPlateNmber}</td>
            <td >${element.carType}</td>
            <td >${element.status}</td>
            <td >ComputerCheck</td>
        </tr>

        `
} );
}
GetAllComputerCheckRequests();

async function GetAllDeliveryChargerRequests() {
    let userid = localStorage.getItem('userId');
    let url = `https://localhost:44326/api/User/GetAllDeliveryChargerRequestsByUserId/${userid}`;
    let response = await fetch(url);
    let data = await response.json();
    let allVehicleBooking = document.getElementById('allbookingId');
    data.forEach(element => {
        allVehicleBooking.innerHTML += `
        <tr style="color: white;">
            <td >${element.userName}</td>
            <td >${element.phoneNumber}</td>
            <td >${element.carPlateNumber}</td>
            <td >${element.carType}</td>
            <td >${element.status}</td>
            <td >DeliveryCharger</td>
        </tr>

        `
} );
}
GetAllDeliveryChargerRequests();