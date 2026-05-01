# 🗺️ MVP Roadmap

## فاز ۱ — تکمیل هسته اصلی (در حال انجام) - ~6h

| گام | کار | وضعیت |
|-----|-----|--------|
| ۱.۱ | Merge سرویس نهایی SensorReadingsService (Welford + thresholds) | ~1h | ✅ Done |
| ۱.۲ | نوشتن sensor-readings.service.spec.ts کامل |✅ Done |
| ۱.۳ | تکمیل NotificationsService (حذف hardcode، پیاده‌سازی sendSensorAnomalyNotification) | ~2h | ✅ Done |
| ۱.۴ | تکمیل AdviceService (منطق واقعی بر اساس threshold + sensor data) | ~1h | ✅ Done |
| ۱.۵ | تکمیل NotificationsController (uncomment + wire کردن endpoints) | ~1h | ⏳ |

## فاز ۲ — هوشمندسازی - ~30h

| گام | کار |
|-----|-----|
| ۲.۱ | Adaptive Care Schedule بر اساس داده واقعی سنسور | ~10h | ⏳ |
| ۲.۲ | Real-time WebSocket برای هشدار فوری | ~8h | ⏳ |
| ۲.۳ | AI توصیه‌ساز با LLM (OpenAI/Gemini) | ⏳ |
| ۲.۴ | داشبورد نمودار (API endpoints برای frontend) | ~6h | ⏳ |

## فاز ۳ — درآمدزایی و فروشگاه - ~40h

| گام | کار |
|-----|-----|
| ۳.۱ | فروشگاه محصولات (کود، خاک، لامپ) |
| ۳.۲ | پکیج‌های مراقبتی تخصصی |
| ۳.۳ | سیستم Recommendation محصول |

## فاز ۴ — Scale

| گام | کار |
|-----|-----|
| ۴.۱ | اپ موبایل API |
| ۴.۲ | Multi-device dashboard |
| ۴.۳ | تحلیل‌های پیشرفته‌تر |
