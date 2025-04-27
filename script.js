// ubah opacity bg ketika scroll
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar-desktop");
    if (window.scrollY > 5) {
        navbar.style.backgroundColor = "rgb(205, 206, 207, 1)"; // Opacity lebih tinggi
    } else {
        navbar.style.backgroundColor = "rgba(205, 206, 207, 0.3)"; // Opacity awal
    }
});



//function untuk menampilkan sidebar
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
let isOpenNavBar = false;

menuBtn.addEventListener('click', () => {
    isOpenNavBar = !isOpenNavBar;
    navbar.classList.toggle('-translate-y-full', !isOpenNavBar);
    navbar.classList.toggle('translate-y-0', isOpenNavBar);
});


const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

let sidebarOpen = false;

sidebarToggle.addEventListener('click', () => {
    if (sidebarOpen) {
        sidebar.style.left = "-100%";
        sidebarToggle.innerHTML = "➜"; // Ubah ikon ke kanan
    } else {
        sidebar.style.left = "0";
        sidebarToggle.innerHTML = "⬅"; // Ubah ikon ke kiri
    }
    sidebarOpen = !sidebarOpen;
});


// function untuk buka anak menu
let activeMenu = null;

function toggleMenu(id) {
    const submenu = document.getElementById(id);

    //tutup menu yang terbuka
    if (activeMenu && activeMenu !== submenu) {
            activeMenu.classList.add("hidden");
    }

    //toggle menu yang di klik
    submenu.classList.toggle("hidden");

    //simpan active menu
    activeMenu = submenu.classList.contains("hidden") ? null : submenu;
}

let userPoints = 0
const materiData = [
    {
        "file": "pretest.html",
        "level": 0,
    },
    {
        "file": "apersepsi.html",
        "level": 1,
    },
    {
        "file": "preview.html",
        "level": 2,
    },
    {
        "file": "Ekosistem.html",
        "level": 3,
    },
    {
        "file": "Komponen_Penyusun_Ekosistem.html",
        "level": 4,
    },
    {
        "file": "tipe_ekosistem_bioma.html",
        "level": 5,
    },
    {
        "file": "Interaksi_Antar_Komponen_Ekosistem.html",
        "level": 6,
    },
    {
        "file": "Simbiosis.html",
        "level": 7,
    },
    {
        "file": "predasi.html",
        "level": 8,
    },
    {
        "file": "kompetisi.html",
        "level": 9,
    },
    {
        "file": "review_interaksi.html",
        "level": 10,
    },
    {
        "file": "rantai_dan_jaringan_makanan.html",
        "level": 11,
    },
    {
        "file": "rantai_makanan_dan_piramida_ekologi.html",
        "level": 12,
    },
    {
        "file": "dinamika_populasi_dan_suksesi.html",
        "level": 13,
    },
    {
        "file": "review_jaring_rantai.html",
        "level": 14,
    },
    {
        "file": "Siklus_Biogeokimia.html",
        "level": 15,
    },
    {
        "file": "Review_Pembelajaran_Biogeokimia.html",
        "level": 16,
    },
    {
        "file": "jenis_pencemaran_lingkungan.html",
        "level": 17,
    },
    {
        "file": "upaya_pelestarian_ekosistem.html",
        "level": 18,
    },
    {
        "file": "review_masalah_lingkungan.html",
        "level": 19,
    },
    {
        "file": "posttest.html",
        "level": 20,
    },
]

let activeMenuId = null; 

function loadContent(page, id) {
    const materi = materiData.find(m => m.file === page);
    if (!materi) {
        alert('Materi tidak ditemukan.');
        return;
    }

    if (materi.level > userPoints + 1) {
        alert('Anda belum bisa mengakses materi ini. Selesaikan materi sebelumnya terlebih dahulu.');
        return;
    }

    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            
            if (materi.level === userPoints + 1) {
                userPoints = materi.level;
            }
            console.log(userPoints);

            if (activeMenuId) {
                document.getElementById(activeMenuId).classList.remove('font-black');
                document.getElementById(activeMenuId).classList.add('font-bold');
            }

            document.getElementById(id).classList.add('font-black');
            document.getElementById(id).classList.remove('font-bold');

            activeMenuId = id;

            if (window.innerWidth < 960 && isOpenSideBar) {
                isOpenSideBar = false;
                sidebar.classList.remove('slide-in');
                sidebar.classList.add('slide-out');
            }
        })
        .catch(error => console.error('Gagal memuat konten:', error));
}