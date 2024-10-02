async function GetAllServices() {
    let url = "https://localhost:44326/api/Admin/GetAllServices";
    let response = await fetch(url);
    let data = await response.json();
    let services = document.getElementById("allservices");
    
    data.forEach(element => {
        
        services.innerHTML += `
        <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
                  <div>
                    <img src="../img/${element.image}" class="avatar avatar-lg me-3 border-radius-lg" alt="user1">
                  </div>
                  <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">JOCharging Service</h6>
                    <span class="mb-2 text-xs">Service Name: <span class="text-dark font-weight-bold ms-sm-2">${element.serviceName}</span></span>
                    <span class="mb-2 text-xs">Description <span class="text-dark ms-sm-2 font-weight-bold">${element.description}</span></span>
                    <span class="mb-2 text-xs">Service is hidden : <span class="text-dark ms-sm-2 font-weight-bold">${element.isHidden}</span></span>
                  </div>
                  <div class="ms-auto text-end d-flex flex-column">
                    <a class="btn btn-link text-danger text-gradient px-3 mb-2" onclick="HiddenServices(${element.id})" href=""><i class="material-icons text-sm me-2">visibility_off</i>Hidden</a>
                    <a class="btn btn-link text-info text-gradient px-3 mb-2 d-flex" onclick="UnhiddenServices(${element.id})" href=""><i class="material-icons text-sm me-2">visibility</i>Unhidden</a>
                    <a class="btn btn-link text-success px-3" onclick="EditServices(${element.id})" href="./EditService.html"><i class="material-icons text-sm me-2">edit</i>Edit</a>
                  </div>
                </li>
        `
    });
    
}
GetAllServices();
function EditServices(id) {
 localStorage.setItem('serviceId', id);
    
}

async function HiddenServices(id) {
  event.preventDefault();

  // تأكيد الإخفاء من المستخدم
  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to hide this service?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, hide it!',
      cancelButtonText: 'No, cancel!',
  });

  // إذا اختار المستخدم "نعم"
  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Admin/HiddenServiceById/${id}`;
      let response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Service Hidden Successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              location.reload(); // إعادة تحميل الصفحة بعد الضغط على "OK"
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to Hide Service',
              confirmButtonText: 'OK'
          });
      }
  } else {
      // إذا اختار المستخدم "إلغاء"
      Swal.fire({
          icon: 'info',
          title: 'Hiding canceled',
          confirmButtonText: 'OK'
      });
  }
}


async function UnhiddenServices(id) {
  event.preventDefault();

  // تأكيد الإظهار من المستخدم
  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to unhide this service?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unhide it!',
      cancelButtonText: 'No, cancel!',
  });

  // إذا اختار المستخدم "نعم"
  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Admin/UnhiddenServiceById/${id}`;
      let response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Service Unhidden Successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              location.reload(); // إعادة تحميل الصفحة بعد الضغط على "OK"
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to Unhide Service',
              confirmButtonText: 'OK'
          });
      }
  } else {
      // إذا اختار المستخدم "إلغاء"
      Swal.fire({
          icon: 'info',
          title: 'Unhiding canceled',
          confirmButtonText: 'OK'
      });
  }
}
