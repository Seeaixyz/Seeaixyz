export type GalleryImage = {
  src: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/nile-night.jpg",
    titleEn: "Nile at Night",
    titleAr: "النيل ليلًا",
    descEn: "A felucca gliding under the Cairo skyline, lights shimmering on the water.",
    descAr: "فلوكة تنساب تحت سماء القاهرة، وأضواء تتلألأ على الماء.",
  },
  {
    src: "/images/luxor-temple.jpg",
    titleEn: "Luxor Temple",
    titleAr: "معبد الأقصر",
    descEn: "The sphinx avenue at night, stone and starlight side by side.",
    descAr: "طريق الكباش ليلًا، حجر وضوء نجوم جنبًا إلى جنب.",
  },
  {
    src: "/images/arabic-library.jpg",
    titleEn: "The Arabic Library",
    titleAr: "المكتبة العربية",
    descEn: "A quiet reading hall with carved wooden screens and golden evening light.",
    descAr: "قاعة قراءة هادئة بشبابيك خشبية منحوتة وضوء مسائي ذهبي.",
  },
  {
    src: "/images/khan-el-khalili.jpg",
    titleEn: "Khan El-Khalili",
    titleAr: "خان الخليلي",
    descEn: "The old bazaar after dark — lanterns, brass, textiles, and crowds.",
    descAr: "البازار القديم بعد الظلام — فوانيس ونحاس وأقمشة وحشود.",
  },
  {
    src: "/images/desert-oasis.jpg",
    titleEn: "Desert Oasis",
    titleAr: "واحة الصحراء",
    descEn: "Palms and still water in the middle of the desert at dusk.",
    descAr: "نخيل وماء ساكن في قلب الصحراء عند الغسق.",
  },
  {
    src: "/images/calligraphy-bookstore.jpg",
    titleEn: "Calligraphy Bookstore",
    titleAr: "مكتبة الخط العربي",
    descEn: "A glowing Arabic sign above a bookshop door on a quiet night street.",
    descAr: "لافتة عربية مضيئة فوق باب مكتبة في شارع هادئ ليلًا.",
  },
  {
    src: "/images/night-fashion-man.jpg",
    titleEn: "Night Fashion",
    titleAr: "أزياء ليلية",
    descEn: "A portrait in a dark suit against the city lights.",
    descAr: "بورتريه ببدلة داكنة أمام أضواء المدينة.",
  },
  {
    src: "/images/arabic-coffee.jpg",
    titleEn: "Arabic Coffee",
    titleAr: "قهوة عربية",
    descEn: "A brass dallah pouring coffee, steam rising in warm light.",
    descAr: "دلّة نحاسية تصب القهوة، والبخار يتصاعد في ضوء دافئ.",
  },
  {
    src: "/images/future-city.jpg",
    titleEn: "City of Tomorrow",
    titleAr: "مدينة الغد",
    descEn: "A glowing future city, towers and light trails above the clouds.",
    descAr: "مدينة مستقبلية مضيئة، أبراج ومسارات ضوئية فوق الغيوم.",
  },
  {
    src: "/images/glowing-calligraphy.jpg",
    titleEn: "Glowing Calligraphy",
    titleAr: "خط مضيء",
    descEn: "Arabic calligraphy written in light — the word glows in blue and violet.",
    descAr: "خط عربي مكتوب بالضوء — الكلمة تتوهج بالأزرق والبنفسجي.",
  },
  {
    src: "/images/desert-portrait.jpg",
    titleEn: "Desert Portrait",
    titleAr: "بورتريه الصحراء",
    descEn: "A portrait in soft desert light, wind in her hair, golden hour.",
    descAr: "بورتريه في ضوء صحراوي ناعم، والريح في شعرها، والساعة الذهبية.",
  },
  {
    src: "/images/luxury-perfume.jpg",
    titleEn: "Luxury Perfume",
    titleAr: "عطر فاخر",
    descEn: "A crystal perfume bottle, cut glass catching pink and blue light.",
    descAr: "زجاجة عطر كريستالية، زجاج مقطوع يلتقط ضوءًا ورديًا وأزرق.",
  },
  {
    src: "/images/giza-pyramids.jpg",
    titleEn: "Giza at Dusk",
    titleAr: "الجيزة عند الغسق",
    descEn: "The Great Pyramids under a starry twilight sky, a caravan crossing the sand.",
    descAr: "أهرامات الجيزة تحت سماء الغسق المرصعة بالنجوم، وقافلة تعبر الرمال.",
  },
];

export type ReadyPrompt = { en: string; ar: string };

export const readyPrompts: ReadyPrompt[] = [
  {
    en: "A luxury perfume bottle on black marble, pink and blue rim light",
    ar: "زجاجة عطر فاخرة على رخام أسود، وإضاءة وردية وزرقاء على الحواف",
  },
  {
    en: "An Arabic calligraphy bookstore at night, glowing sign, old Cairo street",
    ar: "مكتبة خط عربي ليلًا، ولافتة مضيئة، وشارع من القاهرة القديمة",
  },
  {
    en: "A felucca on the Nile at night, Cairo skyline, golden reflections",
    ar: "فلوكة على النيل ليلًا، وأفق القاهرة، وانعكاسات ذهبية",
  },
  {
    en: "A desert oasis at dusk, palm trees and still blue water",
    ar: "واحة صحراوية عند الغسق، ونخيل وماء أزرق ساكن",
  },
  {
    en: "A night fashion portrait, dark suit, city lights behind glass",
    ar: "بورتريه أزياء ليلي، وبدلة داكنة، وأضواء مدينة خلف الزجاج",
  },
  {
    en: "A brass dallah pouring Arabic coffee, steam, warm light",
    ar: "دلّة نحاسية تصب قهوة عربية، وبخار، وضوء دافئ",
  },
  {
    en: "The Great Pyramids at dusk under a starry sky, camel caravan",
    ar: "أهرامات الجيزة عند الغسق تحت سماء مرصعة بالنجوم، وقافلة جمال",
  },
  {
    en: "A futuristic city above the clouds, glowing towers, night",
    ar: "مدينة مستقبلية فوق الغيوم، وأبراج مضيئة، وليل",
  },
  {
    en: "Glowing Arabic calligraphy in blue and violet light on black",
    ar: "خط عربي متوهج بضوء أزرق وبنفسجي على خلفية سوداء",
  },
  {
    en: "The sphinx avenue in Luxor at night, stone and starlight",
    ar: "طريق الكباش في الأقصر ليلًا، وحجر وضوء نجوم",
  },
  {
    en: "A quiet Arabic library, carved wooden screens, golden light",
    ar: "مكتبة عربية هادئة، وشبابيك خشبية منحوتة، وضوء ذهبي",
  },
  {
    en: "A desert portrait at golden hour, wind in her hair, soft light",
    ar: "بورتريه صحراوي في الساعة الذهبية، والريح في شعرها، وضوء ناعم",
  },
];

export const styles = ["Cinematic", "Photoreal", "Calligraphy", "Product", "Portrait", "Fantasy"];

export const ratios = ["16:9", "1:1", "3:4"];

export const siteUrl = "https://seeai.xyz";
export const contactEmail = "See@seeai.xyz";
