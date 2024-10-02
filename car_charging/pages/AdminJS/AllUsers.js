async function AllUsers() {
    let url = "https://localhost:44326/api/Admin/GetAllUsers";
    let userstable = document.getElementById('allusertableId');
    let response = await fetch(url);
    let data = await response.json();
    data.forEach(element => {
        userstable.innerHTML += `
        
        <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img src="../img/${element.image}" class="avatar avatar-lg me-3 border-radius-lg"
                              alt="user1">
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${element.userName}</h6>
                            <p class="text-xs text-secondary mb-0">${element.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">${element.phonrNumber}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">${element.city} / ${element.street}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${element.carPlateNumber}</span>
                      </td>
                      <td class="align-middle">
                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"onclick="DeletUser(${element.id})" href=""><i
                            class="material-icons text-sm me-2">delete</i>Delete</a>

                        <a class="btn btn-link text-success px-3 mb-0" onclick="EditUser(${element.id})" href="./EditUser.html"><i
                            class="material-icons text-sm me-2">edit</i>Edit</a>

                      </td>
                    </tr>
        
        `;
    });
};

AllUsers();

async function DeletUser(id) {
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
      let url = `https://localhost:44326/api/Admin/DeletUser/${id}`;
      let response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      
      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'User deleted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); // إعادة تحميل الصفحة بعد الضغط على "OK"
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to delete User',
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


function EditUser(id) {
    let project = localStorage.setItem('edituserbyId', id);
}

async function filterUserByCarPlateNumber() {
  debugger
  event.preventDefault();
  let userstable = document.getElementById('allusertableId');
  userstable.innerHTML = '';
  let carNumber = document.getElementById('CarPlateNumber').value;
  let url = `https://localhost:44326/api/Admin/GetUserByCarPlateNumber/${carNumber}`;
  let response = await fetch(url);
  let data = await response.json();
  
  data.forEach(element => {
    userstable.innerHTML += `
    
    <tr>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img src="../img/${element.image}" class="avatar avatar-lg me-3 border-radius-lg"
                          alt="user1">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${element.userName}</h6>
                        <p class="text-xs text-secondary mb-0">${element.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">${element.phonrNumber}</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">${element.city} / ${element.street}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${element.carPlateNumber}</span>
                  </td>
                  <td class="align-middle">
                    <a class="btn btn-link text-danger text-gradient px-3 mb-0"onclick="DeletUser(${element.id})" href=""><i
                        class="material-icons text-sm me-2">delete</i>Delete</a>

                    <a class="btn btn-link text-success px-3 mb-0" onclick="EditUser(${element.id})" href="./EditUser.html"><i
                        class="material-icons text-sm me-2">edit</i>Edit</a>

                  </td>
                </tr>
    
    `;
});
};
  
