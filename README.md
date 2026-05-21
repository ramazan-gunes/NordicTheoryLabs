# Nordic Theory Labs — Independent Software Studio

Bu depo, Stockholm, İsveç merkezli bağımsız bir yazılım stüdyosu olan **Nordic Theory Labs**'in ana web sitesini, yasal metinlerini ve amiral gemisi ürünü olan İsveç ehliyet sınavına hazırlık uygulaması **Körkort Hero**'nun tanıtım sayfasını barındıran statik web projesidir.

---

## 📖 İçindekiler
1. [Proje Hakkında ve Tasarım Felsefesi](#-proje-hakkında-ve-tasarım-felsefesi)
2. [Öne Çıkan Ürün: Körkort Hero](#-öne-çıkan-ürün-körkort-hero)
3. [Dizin ve Dosya Yapısı](#-dizin-ve-dosya-yapısı)
4. [Teknik Mimari ve Altyapı](#-teknik-mimari-ve-altyapı)
   - [i18n (Çoklu Dil) Sistemi](#1-i18n-çoklu-dil-sistemi)
   - [Dinamik Tema Düzenleyici (Tweaks Panel)](#2-dinamik-tema-düzenleyici-tweaks-panel)
   - [CSS ve Tasarım Sistemi](#3-css-ve-tasarım-sistemi)
   - [Dil Yönlendirmeleri (Redirects)](#4-dil-yönlendirmeleri-redirects)
5. [Yerel Geliştirme ve Çalıştırma](#-yerel-geliştirme-ve-çalıştırma)
6. [Dağıtım (Deployment)](#-dağıtım-deployment)

---

## 🏛️ Proje Hakkında ve Tasarım Felsefesi

Nordic Theory Labs, gündelik ritüeller için "sakin ve özenli uygulamalar" geliştiren iki kişilik bağımsız bir Nordik yazılım stüdyosudur. Stüdyonun temel tasarım felsefesi **"Kuzeyli İtidali" (Northern Restraint)** ve **"Sakin Teknoloji" (Calm Technology)** üzerine kuruludur:
- Kullanıcıyı sürekli dır dır eden bildirimler veya "streak" (seri) sayaçlarıyla rahatsız etmeyen arayüzler.
- Reklam kimliği (IDFA) ve Google Analytics/piksel takibi barındırmayan, kullanıcı gizliliğine odaklı yerel (local-first) veri yönetimi.
- Yılda maksimum bir veya iki özenli ürün teslim etmeye odaklanan yavaş ve zanaat odaklı geliştirme temposu.

---

## 🚗 Öne Çıkan Ürün: Körkort Hero

Stüdyonun yayındaki ilk ve aktif ürünü **Körkort Hero**, İsveç'te B sınıfı (binek araç) ehliyet alacak sürücü adayları için tasarlanmış bir mobil teorik sınav hazırlık uygulamasıdır.
- **Resmi Format:** Trafikverket'in resmi formatında kurgulanmış ve her dönem güncellenen **1.287 adet özgün teori sorusu**.
- **Teori Kitabı:** 10 ana kategoriye yayılmış, yaklaşık 6 saatlik okuma sunan **154 bölümlük resimli teori rehberi**.
- **İnteraktif Araçlar:** 293 trafik işareti rehberi, 590+ terimlik sözlük ve spaced repetition (aralıklı tekrar) prensibine dayalı Flashcard aracı.
- **12 Dil Desteği:** Sürücü adaylarının İsveç trafik kurallarını kendi anadillerinde öğrenip resmi sınava İsveççe girmelerine imkan tanır. Desteklenen diller: *Türkçe, İsveççe, İngilizce, Arapça, Farsça, Somalice, Kürtçe, Lehçe, Fince, Boşnakça, İspanyolca ve Rusça*.

---

## 📂 Dizin ve Dosya Yapısı

```bash
├── apps/
│   └── korkort-hero/         # Körkort Hero ürün detay/tanıtım sayfası
│       └── index.html        # Körkort Hero ana landing sayfası
├── assets/
│   ├── legal.css             # Yasal (Privacy, Terms) sayfalar için ortak stiller
│   ├── mobile-fixes.css      # Mobil tarayıcılar için uyumluluk düzeltmeleri
│   ├── styles.css            # Stüdyo ana web sitesi için CSS kuralları
│   └── logo.svg              # Nordic Theory Labs vektörel logomarkı
├── privacy/                  # GDPR uyumlu gizlilik politikası sayfaları (12 dil)
│   ├── index.html            # İngilizce gizlilik politikası
│   ├── tr.html               # Türkçe gizlilik politikası
│   ├── sv.html               # İsveççe gizlilik politikası
│   └── ...                   # Diğer dillerdeki HTML belgeleri
├── terms/                    # Kullanım koşulları (Terms of Service) sayfaları
├── images/                   # Körkort Hero ekran görüntüleri ve görsel varlıklar
├── logos/                    # Stüdyo ve uygulama logoları / favicon seti
├── index.html                # Nordic Theory Labs ana stüdyo giriş sayfası
├── i18n.js                   # Çoklu dil (localization) motoru (Tüm çeviri sözlüklerini içerir)
├── tweaks-panel.jsx          # Tasarımcı/geliştirici önizleme ayar paneli (React & Babel)
├── wrangler.jsonc            # Cloudflare Pages dağıtım yapılandırma dosyası
├── [ar|bs|es|fa|fi|ku|pl|ru|so|sv|tr].html  # Hızlı dil yönlendirme (redirect) dosyaları
└── README.md                 # Proje belgelendirmesi (Bu dosya)
```

---

## 🛠️ Teknik Mimari ve Altyapı

Proje, gereksiz kütüphane ve derleme yüklerinden arındırılmış, hafif ve yüksek performanslı **statik HTML, CSS ve saf Javascript (Vanilla JS)** üzerine kurulmuştur.

### 1. i18n (Çoklu Dil) Sistemi
Projede çok dilli altyapı, `i18n.js` dosyası tarafından yönetilir:
- Ana kaynak dili İngilizce'dir (`en`).
- Çeviriler `i18n.js` içerisindeki devasa bir JSON sözlüğünde saklanır. Bu sayede tüm diller tek bir dosyadan beslenir.
- Tarayıcıda dil geçişi yapıldığında, DOM taranarak `data-i18n` özniteliğine (attribute) sahip elemanların `innerHTML` içeriği seçilen dilin karşılığıyla dinamik olarak değiştirilir.
- Dil seçimi sırasıyla; URL'deki query parametresine (`?lang=tr`), tarayıcı diline veya `localStorage` değerine bakılarak otomatik olarak algılanır.

### 2. Dinamik Tema Düzenleyici (Tweaks Panel)
Stüdyo sayfasında (`index.html`) tasarım ekibinin renk ve yazı tipi kombinasyonlarını canlı olarak test edebilmesi için gizli bir önizleme paneli bulunur:
- `tweaks-panel.jsx`, React 18 ile yazılmış ve tarayıcıda doğrudan derlenebilmesi için `@babel/standalone` kütüphanesini kullanır.
- Panel üzerinden renk paletleri (Paper, Ice, Sand, Moss, Dark), vurgu rengi aksanları, arka plandaki aurora animasyon şiddeti ve yazı tipi çiftleri (serif/sans) dinamik olarak ayarlanabilir.
- Yapılan değişiklikler anında CSS Custom Properties (`--paper`, `--ink`, `--serif` vb.) üzerinden tüm sayfaya uygulanır ve tarayıcıda anlık test imkanı sağlar.

### 3. CSS ve Tasarım Sistemi
Tüm stiller Vanilla CSS ile optimize edilmiş olup, akıcı ve şık animasyonlar barındırır:
- Renkler premium bir hava yakalamak adına özel tonlarda (örn: `oklch` ve HSL modelleri) tanımlanmıştır.
- Sayfadaki grenli kağıt dokusu (`body::before` radial gradyanı ile oluşturulan ince noktalar) ve fare hareketini takip eden yumuşak aurora arka plan ışığı (`.aurora-mouse`) gibi modern mikro-interaktif detaylar içerir.
- Düzenin tüm ekran boyutlarında kusursuz görünmesi için `clamp()` fonksiyonlarıyla ölçeklenen fontlar ve esnek CSS Grid/Flexbox yapıları tercih edilmiştir.

### 4. Dil Yönlendirmeleri (Redirects)
Arama motoru indekslemesi ve doğrudan bağlantı sağlama amacıyla, kök dizinde yer alan `tr.html`, `sv.html` gibi dosyalar istemci taraflı yönlendirme yapar:
- `<meta http-equiv="refresh" content="0; url=/?lang=tr" />` meta etiketi ve küçük bir satır içi JS (`location.replace`) kullanarak gelen ziyaretçiyi ana sayfadaki ilgili dil parametresine hızlıca aktarır.

---

## 💻 Yerel Geliştirme ve Çalıştırma

Proje tamamen statik dosyalardan oluştuğu için karmaşık bir `npm install` sürecine gerek yoktur. Herhangi bir yerel HTTP sunucusu ile projeyi anında çalıştırabilirsiniz.

**Örnek Yöntemler:**

1. **Python ile:**
   ```bash
   python3 -m http.server 8000
   ```
   Ardından tarayıcınızda `http://localhost:8000` adresine gidebilirsiniz.

2. **Node.js (serve) ile:**
   ```bash
   npx serve .
   ```

3. **VS Code Live Server:**
   VS Code kullanıyorsanız, `Live Server` eklentisi ile sağ tıklayıp "Open with Live Server" seçeneğiyle doğrudan çalıştırabilirsiniz.

---

## 🚀 Dağıtım (Deployment)

Proje, Cloudflare üzerinde barındırılmaktadır. Yapılandırma `wrangler.jsonc` dosyası üzerinden yönetilir:
- Statik varlıklar doğrudan kök dizinden (`.`) servis edilir.
- `nodejs_compat` uyumluluk modu etkindir.
- Cloudflare Pages veya Wrangler CLI aracılığıyla dağıtım yapılabilir:
  ```bash
  # wrangler ile yerel geliştirme sunucusu
  npx wrangler pages dev .
  
  # wrangler ile projeyi dağıtma (deploy)
  npx wrangler pages deploy .
  ```
