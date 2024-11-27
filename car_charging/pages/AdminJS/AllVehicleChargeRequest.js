async function GetAllVehicleChargeRequest() {
    let url = "https://localhost:44326/api/Booking/GetAllVehiclechargingrequests";
    let response = await fetch(url);
    let data = await response.json();
    let vehicleChargingRequestTable = document.getElementById('vehicleChargingRequestTableId');
    data.forEach(element => {
        vehicleChargingRequestTable.innerHTML += `
        <tr>
                      <td>
                        <div class="d-flex px-2">

                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.phoneNumber}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.carType}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.carPlateNumber}</p>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.date}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.time}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.chargerType}</span>
                      </td>

                      <td class="align-middle">
                        <a onclick="deletrequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                            class="material-icons text-sm me-2" >delete</i>Delete</a>
                        <a onclick="acceptrequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i
                            class="material-icons text-sm me-2">check</i>Accept</a>
                      </td>
                    </tr>
        `
    });
}

GetAllVehicleChargeRequest();

async function acceptrequest(id) {
  event.preventDefault();

  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to accept this request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, cancel!',
  });

  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Booking/AcceptVehicleChargingRequest/${id}`;
      let response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Request accepted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); 
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to accept request',
              confirmButtonText: 'OK'
          });
      }
  } else {
      Swal.fire({
          icon: 'info',
          title: 'Request acceptance canceled',
          confirmButtonText: 'OK'
      });
  }
}


async function deletrequest(id) {
  event.preventDefault();

  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  });

  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Booking/DeletVehicleChargingRequest/${id}`;
      let response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Request deleted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); 
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to delete request',
              confirmButtonText: 'OK'
          });
      }
  } else {
      Swal.fire({
          icon: 'info',
          title: 'Deletion canceled',
          confirmButtonText: 'OK'
      });
  }
}


async function getVehicleRequestByCaeNumber() {
  event.preventDefault();
  let carPlateNumber = document.getElementById("carPlateNumber").value;
  let url = `https://localhost:44326/api/Admin/GetVehicleRequestByCarPlateNumber/${carPlateNumber}`;
  let response = await fetch(url);
  let data = await response.json();
  let vehicleChargingRequestTable = document.getElementById('vehicleChargingRequestTableId');
  vehicleChargingRequestTable.innerHTML = '';
  data.forEach(element => {
    vehicleChargingRequestTable.innerHTML += `
    <tr>
                          <td>
                            <div class="d-flex px-2">
                            
                              <div class="my-auto">
                               <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                               </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-sm font-weight-bold mb-0">${element.phoneNumber}</p>
                          </td>
                          <td>
                            <p class="text-sm font-weight-bold mb-0">${element.carType}</p>
                          </td>
                          <td>
                            <p class="text-sm font-weight-bold mb-0">${element.carPlateNumber}</p>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.date}</span>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.time}</span>
                          </td>
                          <td>
                            <span class="text-xs font-weight-bold">${element.chargerType}</span>
                          </td>
                          <td class="align-middle">
                          <a onclick="deletrequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                          class="material-icons text-sm me-2" >delete</i>Delete</a>
                          <a onclick="acceptrequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i
                          class="material-icons text-sm me-2">check</i>Accept</a>
                          </td>
                        </tr>
    `
  });
};
  
