async function AllTestimonials() {
    let url = "https://localhost:44326/api/Admin/GetAllTestimonials";
    let response = await fetch(url);
    let data = await response.json();
    let alltestimonials = document.getElementById("testimonialid");
    data.forEach(element => {
        if(element.isAccepted == true) {
        alltestimonials.innerHTML += `
            <tr>
                      <td>
                        <div class="d-flex px-2">
                          
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.email}</p>
                      </td>
                      <td class="text-wrap" style="min-width: 200px; max-width: 650px;">
                        <span class="text-xs font-weight-bold text-wrap break-word">${element.theTestimonial}</span>
                      </td>
                      <td class="align-middle">
                        <a class="btn btn-link text-danger text-gradient px-3 mb-0" onclick="DeletTestimonial(${element.id})" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                      </td>
                    </tr>
        `;
        }else {
            alltestimonials.innerHTML += `
            <tr>
                      <td>
                        <div class="d-flex px-2">
                          
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.email}</p>
                      </td>
                      <td class="text-wrap" style="min-width: 200px; max-width: 650px;">
                        <span class="text-xs font-weight-bold text-wrap break-word">${element.theTestimonial}</span>
                      </td>
                      <td class="align-middle">
                        <a class="btn btn-link text-danger text-gradient px-3 mb-0" onclick="DeletTestimonial(${element.id})" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                        <a class="btn btn-link text-success px-3 mb-0" onclick="AcceptTestimonial(${element.id})" href=""><i class="material-icons text-sm me-2">check</i>Accept</a>
                      </td>
                    </tr>
        `;

        }
    
});
};

AllTestimonials();

async function DeletTestimonial(id) {
  event.preventDefault();

  // تأكيد الحذف من المستخدم
  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this testimonial?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  });

  // إذا اختار المستخدم "نعم"
  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Admin/DeleteTestimonial/${id}`;
      let response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Testimonial deleted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); // إعادة تحميل الصفحة بعد الضغط على "OK"
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to delete Testimonial',
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


async function AcceptTestimonial(id) {
  event.preventDefault();

  // تأكيد القبول من المستخدم
  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to accept this testimonial?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, cancel!',
  });

  // إذا اختار المستخدم "نعم"
  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Admin/AcceptTestimonial/${id}`;
      let response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Testimonial accepted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); // إعادة تحميل الصفحة بعد الضغط على "OK"
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to accept Testimonial',
              confirmButtonText: 'OK'
          });
      }
  } else {
      // إذا اختار المستخدم "إلغاء"
      Swal.fire({
          icon: 'info',
          title: 'Acceptance canceled',
          confirmButtonText: 'OK'
      });
  }
}
