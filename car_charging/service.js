async function showServices() {
    let url = "https://localhost:44326/api/Admin/GetAllServices";
    let response = await fetch(url);
    let data = await response.json();
    let allservices = document.getElementById("allService");
    data.forEach(element => {

        if (!data.isHidden) {
            allservices.innerHTML += `
                 <div class="col-md-6 col-lg-4 wow fadeInUp" id="service3" data-wow-delay="0.1s">
                    <div class="service-item">
                        <img class="img-fluid" style="height: 100%"  src="img/${element.image}" alt="">
                        <div class="service-img">
                            <img class="img-fluid" style="height: 110px;width:110px" src="./img/${element.image}" alt="">
                        </div>
                        <div class="service-detail">
                            <div class="service-title">
                                <hr class="w-25">
                                <h3 class="mb-0">${element.serviceName}</h3>
                                <hr class="w-25">
                            </div>
                            <div class="service-text">
                                <p class="text-white mb-0">${element.description}</p>
                            </div>
                        </div>
                        <a class="btn btn-light" onclick="gotopage(${element.id})" >Book Now</a>
                    </div>
                </div>
    `
        }
    });
}

showServices();

function gotopage(id) {
    if (id == 3) {
        window.location.href = "./service1.html";
    }
    else if (id == 4) {
        window.location.href = "./service2.html";
    }
    else if (id == 5) {
        window.location.href = "./service3.html";
    }
}

async function getAllProject() {
    let url = "https://localhost:44326/api/Admin/GetAllProjects";
    let response = await fetch(url);
    let data = await response.json();
    let allproject = document.getElementById("projectid");
    data.forEach(element => {
        allproject.innerHTML += `
            <a class="project-item" href="">
                <img class="img-fluid" src="img/${element.image}" alt="">
                <div class="project-title">
                    <h5 class="text-primary mb-0">${element.projectName}</h5>
                </div>
            </a>  `
    });
    // استهداف سلايدر محدد بالمعرف
    $('#projectid').owlCarousel('destroy'); // إزالة التهيئة الحالية للسلايدر المحدد فقط
    $('#projectid').owlCarousel({
        loop: true,
    rewind: false,  // الانتقال إلى أول صورة عند انتهاء السلايدر
        margin: 0, // إزالة الفراغات بين العناصر
        stagePadding: 0,  // إزالة أي حشو من السلايدر
        loop: true,  // تفعيل التكرار
        nav: true, // لتفعيل الأسهم
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'], // تخصيص الأزرار باستخدام أيقونات الفونت أوسم
        autoplay: true, // تشغيل تلقائي
        autoplayTimeout: 3000, // مدة الانتظار بين التنقلات (3000 ميلي ثانية = 3 ثوانٍ)
        autoplayHoverPause: true, // توقف السلايدر عند تمرير الماوس
        responsive: {
            0: {
                items: 1 // عدد العناصر المراد عرضها على الشاشات الصغيرة
            },
            600: {
                items: 3 // عدد العناصر المراد عرضها على الشاشات المتوسطة
            },
            1000: {
                items: 5 // عدد العناصر المراد عرضها على الشاشات الكبيرة
            }
        }
    });



}

getAllProject();