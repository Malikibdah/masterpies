async function EditService() {
    id =  localStorage.getItem('serviceId');
    event.preventDefault();
    let url = `https://localhost:7077/api/Admin/UpdateService/${id}`;
    let form = document.getElementById("editservice");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });
    alert("Service Edited successfully");
    
}