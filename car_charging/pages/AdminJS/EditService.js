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
    let url = `https://localhost:44326/api/Admin/UpdateService/${id}`;
    let form = document.getElementById("editservice");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });
    alert("Service Edited successfully");
    localStorage.removeItem('serviceId');
}