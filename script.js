document.addEventListener("DOMContentLoaded", function() {
    
    // --- KATEGORİ FİLTRELEME SİSTEMİ ---
    const tumIlanlarButonu = document.getElementById('tum-ilanlar-link');
    const emlakButonu = document.getElementById('emlak-link');
    const vasitaButonu = document.getElementById('vasita-link');
    const ikinciElButonu = document.getElementById('ikinci-el-link');
    const elektronikButonu = document.getElementById('elektronik-link');

    const tumIlanlar = document.querySelectorAll('.ad-card');

    function filtrele(kategori) {
        tumIlanlar.forEach(function(ilan) {
            if (kategori === 'all') {
                ilan.style.display = 'block';
            } else {
                if (ilan.classList.contains(kategori)) {
                    ilan.style.display = 'block';
                } else {
                    ilan.style.display = 'none';
                }
            }
        });
    }

    if (tumIlanlarButonu) tumIlanlarButonu.addEventListener('click', function(e) { e.preventDefault(); filtrele('all'); });
    if (emlakButonu) emlakButonu.addEventListener('click', function(e) { e.preventDefault(); filtrele('emlak'); });
    if (vasitaButonu) vasitaButonu.addEventListener('click', function(e) { e.preventDefault(); filtrele('vasita'); });
    if (ikinciElButonu) ikinciElButonu.addEventListener('click', function(e) { e.preventDefault(); filtrele('ikinci-el'); });
    if (elektronikButonu) elektronikButonu.addEventListener('click', function(e) { e.preventDefault(); filtrele('elektronik'); });


    // --- GELİŞMİŞ ARAMA MOTORU ---
    const aramaGirdisi = document.querySelector('.search-area input');
    const aramaButonu = document.querySelector('.search-area button');

    function ilanAra() {
        const arananKelime = aramaGirdisi.value.trim().toLowerCase();
        let kategoriKarsiligi = arananKelime;
        if (arananKelime === 'vasıta' || arananKelime === 'araba' || arananKelime === 'otomobil') {
            kategoriKarsiligi = 'vasita';
        } else if (arananKelime === 'ikinci el' || arananKelime === '2.el' || arananKelime === 'sıfır' || arananKelime === 'kiyafet' || arananKelime === 'ayakkabı') {
            kategoriKarsiligi = 'ikinci-el';
        } else if (arananKelime === 'kamera' || arananKelime === 'telefon' || arananKelime === 'kulaklık') {
            kategoriKarsiligi = 'elektronik';
        }

        tumIlanlar.forEach(function(ilan) {
            const ilanBasligi = ilan.querySelector('.ad-info h4').textContent.toLowerCase();
            const ilanSiniflari = ilan.className.toLowerCase(); 
            if (ilanBasligi.includes(arananKelime) || ilanSiniflari.includes(kategoriKarsiligi)) {
                ilan.style.display = 'block';
            } else {
                ilan.style.display = 'none';
            }
        });
    }

    if (aramaButonu) aramaButonu.addEventListener('click', ilanAra);
    if (aramaGirdisi) {
        aramaGirdisi.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ilanAra();
            }
        });
    }


    // --- MODAL AÇMA / KAPATMA TETİKLEYİCİLERİ ---
    const girisYapLink = document.querySelector('.login-btn');
    const hesapAcLink = document.querySelector('.register-btn');
    const ucretsizIlanButonu = document.querySelector('.add-listing-btn');

    if (girisYapLink) {
        girisYapLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-modal').style.display = 'flex';
        });
    }

    if (hesapAcLink) {
        hesapAcLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('register-modal').style.display = 'flex';
        });
    }

    if (ucretsizIlanButonu) {
        ucretsizIlanButonu.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('add-listing-modal').style.display = 'flex';
        });
    }


    // --- DİNAMİK İLAN DETAY VE ÖZEL TELEFON GÖSTERME SİSTEMİ ---
    tumIlanlar.forEach(function(kart) {
        kart.style.cursor = 'pointer';

        kart.addEventListener('click', function() {
            // Tıklanan kartın içindeki bilgileri dinamik okuyoruz
            const baslik = kart.querySelector('.ad-info h4').textContent;
            const fiyat = kart.querySelector('.ad-info .price').textContent;
            const konum = kart.querySelector('.ad-info .location').textContent;
            const resimSrc = kart.querySelector('.ad-image img').src;
            const telefonNumarasi = kart.getAttribute('data-phone') || "0850 000 00 00";

            // Detay modalını bu bilgilerle dolduruyoruz
            document.getElementById('modal-detail-title').textContent = baslik;
            document.getElementById('modal-detail-price').textContent = fiyat;
            document.getElementById('modal-detail-location').textContent = `📍 ${konum}`;
            document.getElementById('modal-detail-body').querySelector('img').src = resimSrc;

            // İletişim butonunu güncelliyoruz
            const iletisimButonu = document.getElementById('modal-detail-phone-btn');
            if (iletisimButonu) {
                iletisimButonu.onclick = function() {
                    alert(`Satıcı İletişim Numarası: ${telefonNumarasi}`);
                };
            }

            // Detay modalını açıyoruz
            document.getElementById('ad-detail-modal').style.display = 'flex';
        });
    });

    // Dışarı tıklanınca modalları kapatma
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('login-modal');
        const registerModal = document.getElementById('register-modal');
        const addListingModal = document.getElementById('add-listing-modal');
        const adDetailModal = document.getElementById('ad-detail-modal');

        if (event.target === loginModal) loginModal.style.display = 'none';
        if (event.target === registerModal) registerModal.style.display = 'none';
        if (event.target === addListingModal) addListingModal.style.display = 'none';
        if (event.target === adDetailModal) adDetailModal.style.display = 'none';
    });
});

// Küresel kapatma fonksiyonu (HTML'deki onclick özellikleri için)
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}