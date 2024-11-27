async function getServiceById() {
    let ServiceId = localStorage.getItem('serviceId');
    let url = `https://localhost:44326/api/Admin/GetServiceInfoById/${ServiceId}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("serviceName").value = data.serviceName;
    document.getElementById("description").value = data.description;
    
}

getServiceById();


async function EditService() {
    debugger

    id = localStorage.getItem('serviceId');
    event.preventDefault();

    let serviceName = document.getElementById("serviceName").value;
    if (serviceName == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill service Name before proceeding.',
        });
        return;
    }
    let description = document.getElementById("description").value;
    if (description == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill service description before proceeding.',
        });
        return;
    }

    let url = `https://localhost:44326/api/Admin/UpdateService/${id}`;
    let form = document.getElementById("editservice");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });
    if (response.status === 200) {

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Service Edited successfully.',
        }).then(() => {
            localStorage.removeItem('serviceId');
            window.location.href = "Services.html";
        });
    } else {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error has occurred. Please try again.',
        });
    }
    
}