# Fitness App — Exercise Player Prototype

Mobil-öncelikli, minimalist bir fizyoterapi egzersiz uygulaması prototipi.

## Nasıl çalıştırılır

1. Node.js 18+ kurulu olduğundan emin olun
2. `npm install`
3. `npm run dev`

(Uygulama Vite ile çalışır)

## İçerik
- `src/components/ExercisePlayer.jsx` — Ana ekran: video, ses, kontrol
- `src/components/ControlBar.jsx` — Sabit alt bar: Başlat/Bitir, Müzik
- `src/components/InfoPanel.jsx` — Egzersiz bilgileri
- `src/data/exercises.js` — Demo veri

## Tasarım Kararları
- Minimal, tek kolon mobil-öncelikli layout ✅
- Soluk arka plan, büyük görsel alan (video %65-70 yüksekliğe ayarlandı) ⚪️
- Az metin, net yönlendirme: Başlat/Bitir büyük ve merkezi 🔘
- Müzik varsayılan kapalı; düşük sesle loop, bitince fade-out 🔉
- Popup/bildirim ve dikkat dağıtıcı öğeler yok
- Görseller lazy-load olarak yüklenecek; küçük poster/resimler kullanılıyor (performans optimizasyonu)

## Notlar
Bu prototip demo amaçlıdır; prodüksiyon için video hosting, erişilebilirlik iyileştirmeleri ve testler eklenmelidir.
- Optimizasyon: videolarda `poster` ve `preload="metadata"`, ses için `preload="none"` kullanıldı; küçük boyutlu thumbnail'ler eklendi.
