async function getServiceById() {
    let ServiceId = localStorage.getItem('projectId');
    let url = `https://localhost:44326/api/Admin/GetProjectInfoById/${ServiceId}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("ProjectName").value = data.projectName;
    
}

getServiceById();


async function EditProject() {
    debugger
    let projectId = localStorage.getItem('projectId');
    event.preventDefault();
    let url = `https://localhost:44326/api/Admin/UpdateProject/${projectId}`;

    let form = document.getElementById("editprojectform");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });
    if (response.status === 200){
    alert("Project Edited successfully");

    localStorage.removeItem('projectId');
    } else {
        alert("Failed to edit Project");
    }
}