"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

export const en: Dict = {
  "nav.home": "Home",
  "nav.studio": "Studio",
  "nav.capabilities": "Capabilities",
  "nav.gallery": "Gallery",
  "nav.models": "Models",
  "nav.pricing": "Pricing",
  "nav.api": "API Access",
  "nav.company": "Company",
  "nav.open": "Open navigation",
  "nav.close": "Close navigation",
  "nav.cta": "See Image 1.0",
  "nav.status": "In intensive training",
  "common.notReleased": "Not yet released",
  "common.comingSoon": "Coming soon",
  "common.learnMore": "Learn more",
  "common.viewGallery": "View gallery",
  "common.tryStudio": "Try the studio",
  "common.emailUs": "Email us",
  "common.backHome": "Back to home",
  "home.eyebrow": "See AI presents",
  "home.title": "See Image 1.0",
  "home.subtitle":
    "Images that read, write, and feel real. A new image model family from See AI — built for precise Arabic lettering inside images, and for pictures people believe.",
  "home.ctaPrimary": "Explore the models",
  "home.ctaSecondary": "See the gallery",
  "home.trainingTitle": "In intensive training",
  "home.trainingBody":
    "See Image 1.0 is currently in intensive training. It is not released yet, and it is not available through any provider today. Join the waitlist on the Company page and we will tell you the moment it opens.",
  "home.resTitle": "Expected output resolution",
  "home.resValue": "Up to 2K",
  "home.resBody":
    "Images are expected to reach up to 2K resolution, with fine detail that holds up at full size.",
  "home.modelsTitle": "Two models. One vision.",
  "home.modelsBody":
    "Mini is for drafts — fast ideas, quick directions, early looks. Large is for final images — the picture you actually publish.",
  "home.capTitle": "What it does best",
  "home.capBody":
    "Text that stays legible, edits that follow plain instructions, and scenes that stay consistent from one picture to the next.",
  "home.galleryTitle": "Made with See Image 1.0",
  "home.galleryBody":
    "A first look at the pictures See Image 1.0 is being trained on — nights on the Nile, old Cairo, the desert, and portraits that feel alive.",
  "home.arabicTitle": "Arabic, written right",
  "home.arabicBody":
    "Our signature focus: precise Arabic lettering inside images — calligraphy, shop signs, book covers, and posters where every letter lands where it should.",
  "home.accessTitle": "How you will get it",
  "home.accessBody":
    "When it launches, See Image 1.0 will be available through third-party providers or the See AI API. The API is not live yet.",
  "studio.eyebrow": "Studio — front-end preview",
  "studio.title": "Generation Studio",
  "studio.body":
    "A preview of the studio experience. This is a front-end preview only — no model runs behind it yet. Results shown here come from the launch gallery.",
  "studio.promptLabel": "Your prompt",
  "studio.promptPh": "Describe the image you want…",
  "studio.ready": "Ready prompts",
  "studio.style": "Style",
  "studio.ratio": "Aspect ratio",
  "studio.model": "Model",
  "studio.generate": "Generate",
  "studio.generating": "Generating…",
  "studio.copy": "Copy prompt",
  "studio.copied": "Copied",
  "studio.stage1": "Reading your prompt",
  "studio.stage2": "Composing the scene",
  "studio.stage3": "Rendering details",
  "studio.stage4": "Finishing the image",
  "studio.previewNote":
    "Preview only — this image comes from the launch gallery. The model is in intensive training and is not available yet.",
  "studio.miniNote": "Mini — for drafts",
  "studio.largeNote": "Large — for final images",
  "cap.eyebrow": "Capabilities",
  "cap.title": "Built for pictures that have to work",
  "cap.body":
    "Not just pretty pictures — pictures with words, layouts, and details you can actually use.",
  "cap.textTitle": "Precise text in images",
  "cap.textBody":
    "Signs, posters, book covers, and calligraphy — rendered legibly, in Arabic and English, with layout that respects the words.",
  "cap.arabicTitle": "Arabic lettering, first-class",
  "cap.arabicBody":
    "Arabic is not an afterthought here. It is the signature focus of See Image 1.0: letters, diacritics, and calligraphic forms placed with care inside the image.",
  "cap.editTitle": "Edit with plain instructions",
  "cap.editBody":
    "Describe the change in words — replace an object, restyle a scene, add text — and the picture follows, keeping the rest of the scene intact.",
  "cap.refTitle": "Consistent characters and products",
  "cap.refBody":
    "Keep the same person or product consistent across shots, using reference images to hold identity, style, and detail steady.",
  "cap.resTitle": "Up to 2K resolution",
  "cap.resBody":
    "Images are expected to reach up to 2K resolution — sharp enough for posters, covers, and full-screen display.",
  "cap.transTitle": "Transparent backgrounds",
  "cap.transBody":
    "Ask for a transparent background and get a real alpha channel — ready to drop straight into a design, a slide, or a storefront.",
  "gallery.eyebrow": "Gallery",
  "gallery.title": "Made with See Image 1.0",
  "gallery.body":
    "Thirteen pictures from the launch gallery. Tap any image to view it larger, with its full description.",
  "gallery.count": "13 images",
  "gallery.close": "Close",
  "models.eyebrow": "Models",
  "models.title": "See Image 1.0 Mini & Large",
  "models.body":
    "Two models, one family. Both are in intensive training and not yet released.",
  "models.miniTitle": "See Image 1.0 Mini",
  "models.miniTag": "For drafts",
  "models.miniBody":
    "Fast, light, and made for exploring. Sketch an idea, test a direction, try ten variations before breakfast — Mini is the draft table.",
  "models.largeTitle": "See Image 1.0 Large",
  "models.largeTag": "For final images",
  "models.largeBody":
    "The full-quality model. Richer detail, cleaner text, and the finish you need for the picture you actually publish.",
  "models.resRow": "Expected output resolution",
  "models.resValue": "Up to 2K",
  "models.statusRow": "Status",
  "models.statusValue": "In intensive training — not yet released",
  "models.accessRow": "Access",
  "models.accessValue": "Third-party providers or the See AI API",
  "models.compareTitle": "Mini vs Large",
  "models.compareBody":
    "Start with Mini to find the idea. Finish with Large to make the image.",
  "models.colModel": "Model",
  "models.colUse": "Best for",
  "models.colStatus": "Status",
  "pricing.eyebrow": "Pricing",
  "pricing.title": "Simple pricing, announced soon",
  "pricing.body":
    "Three plans are coming. Prices will be announced when the models launch — for now, every plan shows a dash.",
  "pricing.announce": "Official price to be announced",
  "pricing.plan1": "Starter",
  "pricing.plan1Body": "For trying ideas and early drafts.",
  "pricing.plan2": "Creator",
  "pricing.plan2Body": "For regular work, clients, and campaigns.",
  "pricing.plan3": "Studio",
  "pricing.plan3Body": "For teams and high-volume production.",
  "pricing.perMonth": "per month",
  "pricing.f1": "Mini — drafts",
  "pricing.f2": "Large — final images",
  "pricing.f3": "API access",
  "pricing.f4": "Priority support",
  "pricing.cta": "Get notified at launch",
  "api.eyebrow": "API Access",
  "api.title": "Use See Image 1.0 in your product",
  "api.body":
    "When it launches, See Image 1.0 will be available through third-party providers or the See AI API. The API is not live yet, and keys are not being issued.",
  "api.notLive": "API not live yet",
  "api.example": "Example request — not yet live",
  "api.providersTitle": "Third-party providers",
  "api.providersBody":
    "At launch, the models will also be available through selected third-party providers. The provider list will be published here.",
  "api.docsTitle": "Documentation",
  "api.docsBody":
    "Full API documentation, guides, and examples will be published before launch.",
  "company.eyebrow": "Company",
  "company.title": "Built by See AI",
  "company.body":
    "See Image 1.0 is built by an Arab development team, led by its founder and lead developer.",
  "company.founder": "Founder & Lead Developer",
  "company.founderName": "Mahmoud Saad",
  "company.founderBody":
    "Founder of See AI and lead developer of See Image 1.0.",
  "company.team": "Development team",
  "company.teamBody": "An Arab development team, building from Egypt for the world.",
  "company.hq": "Headquarters",
  "company.hqValue":
    "Faqous — a city and center in Sharqia Governorate, Arab Republic of Egypt",
  "company.contact": "Contact",
  "company.contactBody": "Official email for all inquiries:",
  "footer.tag": "Images that read, write, and feel real.",
  "footer.models": "Models",
  "footer.company": "Company",
  "footer.contact": "Contact",
  "footer.rights": "© 2026 See AI. All rights reserved.",
  "footer.training": "See Image 1.0 is in intensive training and is not yet released.",
};

export const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.studio": "الاستوديو",
  "nav.capabilities": "القدرات",
  "nav.gallery": "المعرض",
  "nav.models": "الموديلات",
  "nav.pricing": "الأسعار",
  "nav.api": "الوصول عبر API",
  "nav.company": "الشركة",
  "nav.open": "فتح التنقّل",
  "nav.close": "إغلاق التنقّل",
  "nav.cta": "See Image 1.0",
  "nav.status": "في تدريب مكثّف",
  "common.notReleased": "لم يُطلق بعد",
  "common.comingSoon": "قريبًا",
  "common.learnMore": "اعرف المزيد",
  "common.viewGallery": "شاهد المعرض",
  "common.tryStudio": "جرّب الاستوديو",
  "common.emailUs": "راسلنا",
  "common.backHome": "العودة للرئيسية",
  "home.eyebrow": "تقدّم See AI",
  "home.title": "See Image 1.0",
  "home.subtitle":
    "صور تقرأ وتكتب وتبدو حقيقية. عائلة موديلات صور جديدة من See AI — مبنية من أجل كتابة عربية دقيقة داخل الصور، وصور يصدّقها الناس.",
  "home.ctaPrimary": "استكشف الموديلات",
  "home.ctaSecondary": "شاهد المعرض",
  "home.trainingTitle": "في تدريب مكثّف",
  "home.trainingBody":
    "موديل See Image 1.0 حاليًا في تدريب مكثّف. لم يُطلق بعد، وغير متاح عبر أي مزوّد اليوم. سجّل في قائمة الانتظار في صفحة الشركة وسنخبرك لحظة فتحه.",
  "home.resTitle": "دقة الإخراج المتوقعة",
  "home.resValue": "حتى 2K",
  "home.resBody":
    "من المتوقع أن تصل الصور إلى دقة 2K، بتفاصيل دقيقة تتحمّل العرض بالحجم الكامل.",
  "home.modelsTitle": "موديلان. رؤية واحدة.",
  "home.modelsBody":
    "Mini للمسودات — أفكار سريعة واتجاهات أولية ونظرات مبكرة. و Large للصور النهائية — الصورة التي تنشرها فعلًا.",
  "home.capTitle": "ماذا يفعل بأفضل شكل",
  "home.capBody":
    "نص يبقى مقروءًا، وتعديلات تتّبع التعليمات البسيطة، ومشاهد تبقى متسقة من صورة إلى أخرى.",
  "home.galleryTitle": "صُنعت باستخدام See Image 1.0",
  "home.galleryBody":
    "نظرة أولى على الصور التي يُدرَّب عليها See Image 1.0 — ليالٍ على النيل، والقاهرة القديمة، والصحراء، وبورتريهات تبدو حيّة.",
  "home.arabicTitle": "العربية، مكتوبة صح",
  "home.arabicBody":
    "تركيزنا المميّز: كتابة عربية دقيقة داخل الصور — خط عربي، ولافتات محلات، وأغلفة كتب، وملصقات يقع فيها كل حرف في مكانه الصحيح.",
  "home.accessTitle": "كيف ستحصل عليه",
  "home.accessBody":
    "عند الإطلاق، سيكون See Image 1.0 متاحًا عبر مزوّدين من طرف ثالث أو عبر واجهة See AI البرمجية (API). والـ API ليست حيّة بعد.",
  "studio.eyebrow": "الاستوديو — معاينة واجهة",
  "studio.title": "استوديو التوليد",
  "studio.body":
    "معاينة لتجربة الاستوديو. هذه معاينة واجهة فقط — لا يعمل خلفها موديل بعد. النتائج المعروضة هنا من معرض الإطلاق.",
  "studio.promptLabel": "الوصف الخاص بك",
  "studio.promptPh": "صِف الصورة التي تريدها…",
  "studio.ready": "أوصاف جاهزة",
  "studio.style": "النمط",
  "studio.ratio": "نسبة الأبعاد",
  "studio.model": "الموديل",
  "studio.generate": "توليد",
  "studio.generating": "جارٍ التوليد…",
  "studio.copy": "نسخ الوصف",
  "studio.copied": "تم النسخ",
  "studio.stage1": "قراءة الوصف",
  "studio.stage2": "تكوين المشهد",
  "studio.stage3": "رسم التفاصيل",
  "studio.stage4": "إنهاء الصورة",
  "studio.previewNote":
    "معاينة فقط — هذه الصورة من معرض الإطلاق. الموديل في تدريب مكثّف وغير متاح بعد.",
  "studio.miniNote": "Mini — للمسودات",
  "studio.largeNote": "Large — للصور النهائية",
  "cap.eyebrow": "القدرات",
  "cap.title": "مبني لصور يجب أن تعمل",
  "cap.body":
    "ليست صورًا جميلة فقط — بل صور فيها كلمات وتخطيطات وتفاصيل يمكنك استخدامها فعلًا.",
  "cap.textTitle": "نص دقيق داخل الصور",
  "cap.textBody":
    "لافتات وملصقات وأغلفة كتب وخط عربي — تُرسم بوضوح، بالعربية والإنجليزية، وبتخطيط يحترم الكلمات.",
  "cap.arabicTitle": "الحروف العربية، بدرجة أولى",
  "cap.arabicBody":
    "العربية ليست إضافة متأخرة هنا. إنها التركيز المميّز لـ See Image 1.0: حروف وتشكيل وأشكال خطية توضع بعناية داخل الصورة.",
  "cap.editTitle": "التعديل بتعليمات بسيطة",
  "cap.editBody":
    "صِف التغيير بكلمات — استبدل عنصرًا، أو غيّر نمط مشهد، أو أضف نصًا — وستتّبع الصورة ذلك مع الحفاظ على بقية المشهد سليمًا.",
  "cap.refTitle": "شخصيات ومنتجات متسقة",
  "cap.refBody":
    "حافظ على الشخص أو المنتج نفسه متسقًا عبر اللقطات، باستخدام صور مرجعية تثبّت الهوية والنمط والتفاصيل.",
  "cap.resTitle": "دقة حتى 2K",
  "cap.resBody":
    "من المتوقع أن تصل الصور إلى دقة 2K — حادّة بما يكفي للملصقات والأغلفة والعرض بملء الشاشة.",
  "cap.transTitle": "خلفيات شفافة",
  "cap.transBody":
    "اطلب خلفية شفافة واحصل على قناة ألفا حقيقية — جاهزة لوضعها مباشرة في تصميم أو عرض تقديمي أو متجر.",
  "gallery.eyebrow": "المعرض",
  "gallery.title": "صُنعت باستخدام See Image 1.0",
  "gallery.body":
    "ثلاث عشرة صورة من معرض الإطلاق. انقر أي صورة لعرضها أكبر، مع وصفها الكامل.",
  "gallery.count": "13 صورة",
  "gallery.close": "إغلاق",
  "models.eyebrow": "الموديلات",
  "models.title": "See Image 1.0 Mini و Large",
  "models.body":
    "موديلان، عائلة واحدة. كلاهما في تدريب مكثّف ولم يُطلقا بعد.",
  "models.miniTitle": "See Image 1.0 Mini",
  "models.miniTag": "للمسودات",
  "models.miniBody":
    "سريع وخفيف ومصمم للاستكشاف. ارسم فكرة، وجرّب اتجاهًا، وجرّب عشر نسخ قبل الإفطار — Mini هو طاولة المسودات.",
  "models.largeTitle": "See Image 1.0 Large",
  "models.largeTag": "للصور النهائية",
  "models.largeBody":
    "الموديل بالجودة الكاملة. تفاصيل أغنى، ونص أنظف، واللمسة الأخيرة التي تحتاجها للصورة التي ستنشرها فعلًا.",
  "models.resRow": "دقة الإخراج المتوقعة",
  "models.resValue": "حتى 2K",
  "models.statusRow": "الحالة",
  "models.statusValue": "في تدريب مكثّف — لم يُطلق بعد",
  "models.accessRow": "الوصول",
  "models.accessValue": "مزوّدون من طرف ثالث أو واجهة See AI البرمجية",
  "models.compareTitle": "Mini مقابل Large",
  "models.compareBody":
    "ابدأ بـ Mini لتجد الفكرة. وأنهِ بـ Large لتصنع الصورة.",
  "models.colModel": "الموديل",
  "models.colUse": "الأفضل لـ",
  "models.colStatus": "الحالة",
  "pricing.eyebrow": "الأسعار",
  "pricing.title": "أسعار بسيطة، تُعلن قريبًا",
  "pricing.body":
    "ثلاث خطط قادمة. وستُعلن الأسعار عند إطلاق الموديلات — وحتى ذلك الحين، تظهر كل خطة بشرطة.",
  "pricing.announce": "السعر الرسمي سيُعلن قريبًا",
  "pricing.plan1": "Starter",
  "pricing.plan1Body": "لتجربة الأفكار والمسودات الأولى.",
  "pricing.plan2": "Creator",
  "pricing.plan2Body": "للعمل المنتظم والعملاء والحملات.",
  "pricing.plan3": "Studio",
  "pricing.plan3Body": "للفرق والإنتاج بكميات كبيرة.",
  "pricing.perMonth": "شهريًا",
  "pricing.f1": "Mini — للمسودات",
  "pricing.f2": "Large — للصور النهائية",
  "pricing.f3": "الوصول عبر API",
  "pricing.f4": "دعم ذو أولوية",
  "pricing.cta": "أعلمني عند الإطلاق",
  "api.eyebrow": "الوصول عبر API",
  "api.title": "استخدم See Image 1.0 في منتجك",
  "api.body":
    "عند الإطلاق، سيكون See Image 1.0 متاحًا عبر مزوّدين من طرف ثالث أو عبر واجهة See AI البرمجية. والـ API ليست حيّة بعد، ولا تُصدر مفاتيح.",
  "api.notLive": "الـ API ليست حيّة بعد",
  "api.example": "مثال طلب — ليس حيًا بعد",
  "api.providersTitle": "مزوّدون من طرف ثالث",
  "api.providersBody":
    "عند الإطلاق، ستكون الموديلات متاحة أيضًا عبر مزوّدين مختارين من طرف ثالث. وستُنشر قائمة المزوّدين هنا.",
  "api.docsTitle": "التوثيق",
  "api.docsBody":
    "سيُنشر التوثيق الكامل للـ API والأدلة والأمثلة قبل الإطلاق.",
  "company.eyebrow": "الشركة",
  "company.title": "بناء See AI",
  "company.body":
    "يبني See Image 1.0 فريق تطوير عربي، بقيادة مؤسسه ومطوّره الرئيسي.",
  "company.founder": "المؤسس والمطوّر الرئيسي",
  "company.founderName": "Mahmoud Saad",
  "company.founderBody": "مؤسس See AI والمطوّر الرئيسي لـ See Image 1.0.",
  "company.team": "فريق التطوير",
  "company.teamBody": "فريق تطوير عربي، يبني من مصر للعالم.",
  "company.hq": "المقر الرئيسي",
  "company.hqValue": "فاقوس — مدينة ومركز في محافظة الشرقية، جمهورية مصر العربية",
  "company.contact": "التواصل",
  "company.contactBody": "البريد الرسمي لجميع الاستفسارات:",
  "footer.tag": "صور تقرأ وتكتب وتبدو حقيقية.",
  "footer.models": "الموديلات",
  "footer.company": "الشركة",
  "footer.contact": "التواصل",
  "footer.rights": "© 2026 See AI. جميع الحقوق محفوظة.",
  "footer.training": "See Image 1.0 في تدريب مكثّف ولم يُطلق بعد.",
};

const dicts: Record<Lang, Dict> = { en, ar };

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => en[key] ?? key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("see-lang");
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("see-lang", l);
    } catch {
      // ignore
    }
  };

  const t = (key: string) => dicts[lang][key] ?? en[key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LangContext);
}
