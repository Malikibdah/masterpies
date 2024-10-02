async function Allemployees() {
    
    let employeestable = document.getElementById('employeesId');
    let url = "https://localhost:44326/api/Admin/GetAllEmployee";
    let response = await fetch(url);
    let data = await response.json();
    data.forEach(element => {
        employeestable.innerHTML += `
        <tr>
                          <td>
                            <div class="d-flex px-2">
                              <div>
                                <img src="../img/${element.image}" class="avatar avatar-lg rounded-circle me-2" alt="spotify">
                              </div>
                              <div class="my-auto">
                                <h6 class="mb-0 text-sm">${element.empName}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-sm font-weight-bold mb-0">${element.salary}</p>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.jobtitle}</span>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.phoneNumber}</span>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.emergencyNumber}</span>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.employeeId}</span>
                          </td>
                          
                          <td class="align-middle">
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" onclick="Deletemployee(${element.id})" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                            <a class="btn btn-link text-success px-3 mb-0" onclick="Editemployee(${element.id})" href="./EditEmployee.html"><i class="material-icons text-sm me-2">edit</i>Edit</a>
                          </td>
                        </tr>
        `; 
    });
    

};
Allemployees();

async function Deletemployee(id) {
  event.preventDefault();
  
  // تأكيد الحذف من المستخدم
  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  });

  // إذا اختار المستخدم "نعم"
  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Admin/DeleteEmployee/${id}`;
      let response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      
      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Employee deleted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); // إعادة تحميل الصفحة بعد الضغط على "OK"
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to delete employee',
              confirmButtonText: 'OK'
          });
      }
  } else {
      // إذا اختار المستخدم "إلغاء"
      Swal.fire({
          icon: 'info',
          title: 'Deletion canceled',
          confirmButtonText: 'OK'
      });
  }
}


function Editemployee(id) {
    let emloyee = localStorage.setItem('employeeId', id);
}

async function getEmployeeByIdNumber() {
  debugger
  event.preventDefault();
  let employeestable = document.getElementById('employeesId');
  employeestable.innerHTML = '';
  let idNumber = document.getElementById('employeeIdNumber').value;
  let url = `https://localhost:44326/api/Admin/GetEmployeeByIdNumber/${idNumber}`;
  let response = await fetch(url);
  let data = await response.json();
  data.forEach(element => {
    employeestable.innerHTML += `
    <tr>
                      <td>
                        <div class="d-flex px-2">
                          <div>
                            <img src="../img/${element.image}" class="avatar avatar-lg rounded-circle me-2" alt="spotify">
                          </div>
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm">${element.empName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.salary}</p>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.jobtitle}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.phoneNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.emergencyNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.employeeId}</span>
                      </td>
                      
                      <td class="align-middle">
                        <a class="btn btn-link text-danger text-gradient px-3 mb-0" onclick="Deletemployee(${element.id})" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                        <a class="btn btn-link text-success px-3 mb-0" onclick="Editemployee(${element.id})" href="./EditEmployee.html"><i class="material-icons text-sm me-2">edit</i>Edit</a>
                      </td>
                    </tr>
    `; 
});


  
  
}


