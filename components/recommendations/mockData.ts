import { startOfWeek, addWeeks, formatISO } from 'date-fns';
import { type Recommendation } from './types';

const REFERENCE_MONDAY_2025 = new Date('2025-01-06');

// Mock healthcare providers
const PROVIDERS = [
  'Dr. Emily Smith',
  'Nurse Jamie Lee',
  'Dr. Carlos Hernandez',
  'Dr. Sarah Wilson',
  'Nurse Maria Rodriguez',
  'Dr. Michael Chen',
  'Dr. Rachel Green',
  'Nurse David Thompson'
];

// YouTube video IDs (randomly generated but consistent format)
const VIDEO_IDS = [
  'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'kJQP7kiw5Fk', 'JGwWNGJdvx8',
  'RgKAFK5djSk', '9bZkp7q19f0', 'OPf0YbXqDm0', 'fJ9rUzIMcZQ',
  'YVkUvmDQ3HY', 'hT_nvWreIhg', 'CevxZvSJLk8', '0KSOMA3QBU0',
  'KYniUCGPGLs', 'JRfuAukYTKg', '2Vv-BfVoq4g', 'y6120QOlsfU',
  'PWgvGjAhvIw', 'KQ6zr6kCPj8', 'ASO_zypdnsQ'
];

// Medical websites for articles
const MEDICAL_SITES = [
  { domain: 'mayoclinic.org', path: 'pregnancy-week-by-week/week-' },
  { domain: 'whattoexpect.com', path: 'pregnancy/week-' },
  { domain: 'acog.org', path: 'patient-resources/pregnancy/week-' },
  { domain: 'healthline.com', path: 'pregnancy/week-' },
  { domain: 'webmd.com', path: 'pregnancy/your-pregnancy-week-' }
];

// Week-specific content
const WEEKLY_TOPICS: Record<number, { video: string, article: string, videoNote: string, articleNote: string }> = {
  10: {
    video: "Early Pregnancy Symptoms and Changes",
    article: "First Trimester Nutrition Guide",
    videoNote: "Learn about common symptoms and bodily changes during week 10 of pregnancy.",
    articleNote: "Essential nutrients and dietary recommendations for the end of your first trimester."
  },
  11: {
    video: "Your Baby's Development at 11 Weeks",
    article: "Managing Morning Sickness",
    videoNote: "Watch how your baby's vital organs are developing at this crucial stage.",
    articleNote: "Tips and strategies for dealing with morning sickness in early pregnancy."
  },
  12: {
    video: "First Trimester Screening Tests",
    article: "Exercise Safety in Early Pregnancy",
    videoNote: "Understanding important screening tests and what they mean for your baby.",
    articleNote: "Safe workout routines and activities for the end of your first trimester."
  },
  13: {
    video: "Your Changing Body at 13 Weeks",
    article: "Pregnancy Sleep Solutions",
    videoNote: "See how your body is adapting to support your growing baby.",
    articleNote: "Expert advice on getting better sleep during pregnancy."
  },
  14: {
    video: "Second Trimester Begins: What to Expect",
    article: "Healthy Weight Gain Guidelines",
    videoNote: "Preparing for the changes ahead in your second trimester.",
    articleNote: "Understanding appropriate weight gain targets for this stage."
  },
  15: {
    video: "Baby's First Movements",
    article: "Pregnancy Nutrition: Second Trimester",
    videoNote: "Learn when and how to detect your baby's first movements.",
    articleNote: "Updated nutritional needs as you enter your second trimester."
  },
  16: {
    video: "Understanding Pregnancy Hormones",
    article: "Preparing for Maternity Leave",
    videoNote: "How hormonal changes affect your body and mood during pregnancy.",
    articleNote: "Planning ahead for work transitions and leave arrangements."
  },
  17: {
    video: "Baby's Gender Development",
    article: "Pregnancy Exercise: Second Trimester",
    videoNote: "Learn about fetal development and gender determination.",
    articleNote: "Safe exercises and activities for your growing belly."
  },
  18: {
    video: "Anatomy Scan Preparation",
    article: "Common Pregnancy Symptoms at 18 Weeks",
    videoNote: "What to expect during your upcoming anatomy ultrasound.",
    articleNote: "Managing and understanding mid-pregnancy symptoms."
  },
  19: {
    video: "Your Baby's Growth Spurt",
    article: "Choosing a Birth Plan",
    videoNote: "Understanding rapid fetal development during this period.",
    articleNote: "Key considerations when creating your birth plan."
  },
  20: {
    video: "Halfway Point: Major Milestones",
    article: "Essential Pregnancy Nutrients",
    videoNote: "Celebrating and understanding the halfway point of pregnancy.",
    articleNote: "Critical nutrients needed for baby's development at 20 weeks."
  },
  21: {
    video: "Understanding Baby's Movement Patterns",
    article: "Pregnancy Brain: Myth or Reality?",
    videoNote: "Learn about normal fetal movement patterns and kick counting.",
    articleNote: "Scientific explanation of cognitive changes during pregnancy."
  },
  22: {
    video: "Preparing for the Third Trimester",
    article: "Back Pain Relief Techniques",
    videoNote: "Getting ready for the final stage of pregnancy.",
    articleNote: "Safe methods for managing pregnancy-related back pain."
  },
  23: {
    video: "Baby's Hearing Development",
    article: "Preparing Your Hospital Bag",
    videoNote: "Understanding how your baby responds to sounds and voices.",
    articleNote: "Complete checklist for hospital bag essentials."
  },
  24: {
    video: "Pregnancy Yoga and Stretching",
    article: "Signs of Preterm Labor",
    videoNote: "Safe yoga poses and stretches for the second trimester.",
    articleNote: "Important warning signs to watch for at this stage."
  },
  25: {
    video: "Understanding Braxton Hicks",
    article: "Gestational Diabetes Testing",
    videoNote: "Learn about practice contractions and when to call your doctor.",
    articleNote: "Preparing for and understanding glucose screening tests."
  },
  26: {
    video: "Baby's Brain Development",
    article: "Third Trimester Nutrition Guide",
    videoNote: "Amazing insights into fetal brain development at this stage.",
    articleNote: "Dietary recommendations for the final trimester."
  },
  27: {
    video: "Third Trimester Preparations",
    article: "Sleep Positions and Tips",
    videoNote: "Essential preparations for the final stretch of pregnancy.",
    articleNote: "Best sleeping positions and comfort tips for late pregnancy."
  },
  28: {
    video: "Understanding Fetal Movement Counts",
    article: "Third Trimester Exercise Guidelines",
    videoNote: "How to monitor and track your baby's movements.",
    articleNote: "Safe workout modifications for your third trimester."
  }
};

export const generateMockRecommendations = (): Recommendation[] => {
  const mockRecs: Recommendation[] = [];
  
  for (let wk = 10; wk <= 28; wk++) {
    const monday = startOfWeek(addWeeks(REFERENCE_MONDAY_2025, wk - 1), { weekStartsOn: 1 });
    const weekStart = formatISO(monday, { representation: 'date' });
    
    // Get random but unique providers for this week
    const weekProviders = [...PROVIDERS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    // Get random medical site for the article
    const medicalSite = MEDICAL_SITES[Math.floor(Math.random() * MEDICAL_SITES.length)];
    
    // Get random video ID
    const videoId = VIDEO_IDS[Math.floor(Math.random() * VIDEO_IDS.length)];
    
    // Get week-specific content
    const weekContent = WEEKLY_TOPICS[wk];
    
    mockRecs.push(
      {
        id: `rec-wk${wk}-1`,
        weekStart,
        title: weekContent.video,
        type: 'video',
        embedUrl: `https://www.youtube.com/watch?v=${videoId}`,
        notes: weekContent.videoNote,
        uploadedBy: { name: weekProviders[0] }
      },
      {
        id: `rec-wk${wk}-2`,
        weekStart,
        title: weekContent.article,
        type: 'article',
        embedUrl: `https://www.${medicalSite.domain}/${medicalSite.path}${wk}`,
        notes: weekContent.articleNote,
        uploadedBy: { name: weekProviders[1] }
      }
    );
  }
  
  return mockRecs;
};

export const mockRecommendations = generateMockRecommendations(); 