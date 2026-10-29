# Noob Angler — paket testing GitHub Pages

Website statis versi v0.8 dengan dua desain merch dan slideshow10detik, logo resmi, detail open trip, FAQ, screenshot Instagram statis, serta optimasi gambar. Tidak ada backend, payment gateway, atau Instagram API.

## Cara upload melalui browser GitHub
1. Ekstrak ZIP ini di laptop. **Jangan upload file ZIP langsung.**
2. Buat repository dengan nama misalnya `noob-angler`. Jika tetap ingin repository private, pastikan paket akun GitHub mendukung Pages dari private repo. Pada akun GitHub Free personal, Pages umumnya menggunakan repository public. Jangan mengubah visibility tanpa memahami bahwa source dan aset akan terbuka.
3. Buka repository → Add file → Upload files. Masukkan **isi folder hasil ekstrak**: index.html, site.css, site.js, folder assets, robots.txt, .nojekyll dan README.md. index.html harus berada di root repository, bukan di dalam folder tambahan.
4. Klik Commit changes.
5. Buka Settings → Pages → Build and deployment. Pilih **Deploy from a branch**, branch **main**, folder **/(root)**, lalu Save.
6. Tunggu GitHub menyelesaikan deployment. Periksa tab Actions atau status Pages. Alamat akan ditampilkan GitHub, umumnya `https://USERNAME.github.io/noob-angler/`.
7. Coba link di HP dan mode incognito, lalu uji navigasi, detail trip, slideshow, dan tombol WhatsApp. Klik tombol WhatsApp hanya membuat draf, tidak mengirim otomatis.

## Visibilitas testing
Link tidak diumumkan, tetapi **bukan private dan bukan akses berbasis undangan**: siapa pun yang tahu link dapat membuka atau meneruskannya. Meta robots noindex/nofollow/noarchive meminta mesin pencari tidak mengindeks; ini bukan autentikasi atau jaminan kerahasiaan. robots.txt pada project subfolder tidak menggantikan aturan robots di root domain, jadi meta noindex adalah penanda utama pada halaman ini. Tidak ada sitemap, analytics, password, token, atau data peserta.

## Ringan saat dibuka
Gambar WebP diperkecil sesuai kebutuhan, dengan varian480px untuk layar kecil. Gambar di bawah layar pertama memakai lazy-loading, hero diprioritaskan, gambar memiliki dimensi untuk mengurangi pergeseran layout, CSS/JS digabung, dan tidak ada framework/font/CDN/embed sosial eksternal yang harus diunduh. File aset terpisah dapat di-cache browser, tidak diulang sebagai base64 dalam HTML.

## Yang tidak perlu diunggah
Jangan upload file Preview-v0.x.html, ZIP, folder qa, skrip Python pengujian, riset internal, file credential atau token. Paket ini memang tidak memasukkan semuanya.

## Sebelum berbagi lebih luas
Detail fasilitas/kapasitas/operator, aturan pembayaran/pembatalan dan keselamatan trip belum final; harga, ukuran dan stok merch belum ditetapkan. Screenshot Instagram bukan feed live. Gambar/desain perlu izin penggunaan publik. Hanya satu gambar merch tambahan diterima; desain ketiga menunggu bahan.

## Pindah ke hosting/domain sendiri
Semua referensi aset relatif. Salin isi paket ke document root hosting statis lain. Tidak membutuhkan npm/build/server khusus. Jangan menambahkan CNAME sebelum domain benar-benar disiapkan. Setelah siap publik, evaluasi dan hapus penanda noindex sesuai kebutuhan.

Panduan GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
Visibilitas Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
