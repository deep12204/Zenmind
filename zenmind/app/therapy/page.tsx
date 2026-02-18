"use client";
import { useState } from "react";

type Resource = {
  id: string;
  category: string;
  type: "video";
  lang: string;
  title: string;
  link: string;
};

const categories = [
  "Stress Relief Breathing",
  "Coping with Anxiety",
  "Mindfulness Guide",
  "Sleep Relaxation",
  "Mental Wellness",
];

const types = ["video"];
const languages = ["English", "Hindi", "Bengali", "Tamil", "Kannada"];

const resources: Resource[] = [
  // ===== Stress Relief Breathing =====
  {
    id: "en-stress-video-1",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "English",
    title: "Box Breathing Relaxation Technique",
    link: "https://www.youtube.com/watch?v=tEmt1Znux58",
  },
  {
    id: "en-stress-video-2",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "English",
    title: "5 Minute Guided Box Breathing",
    link: "https://www.youtube.com/watch?v=aPYmZOhJF5Q",
  },

  // ===== Coping with Anxiety =====
  {
    id: "en-anxiety-video-1",
    category: "Coping with Anxiety",
    type: "video",
    lang: "English",
    title: "5 Minute Grounding Meditation",
    link: "https://www.youtube.com/watch?v=q_L_DiqoRn4",
  },
  {
    id: "en-anxiety-video-2",
    category: "Coping with Anxiety",
    type: "video",
    lang: "English",
    title: "Breathing Meditation for Anxiety",
    link: "https://www.youtube.com/watch?v=nJYwx94tLdA",
  },

  // ===== Mindfulness Guide =====
  {
    id: "en-mindfulness-video-1",
    category: "Mindfulness Guide",
    type: "video",
    lang: "English",
    title: "Mindfulness for Beginners - 10 Minutes",
    link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
  },
  {
    id: "en-mindfulness-video-2",
    category: "Mindfulness Guide",
    type: "video",
    lang: "English",
    title: "10 Minute Guided Mindfulness Meditation",
    link: "https://www.youtube.com/watch?v=6p_yaNFSYao",
  },

  // ===== Sleep Relaxation =====
  {
    id: "en-sleep-video-1",
    category: "Sleep Relaxation",
    type: "video",
    lang: "English",
    title: "20 Minute Guided Sleep Meditation",
    link: "https://www.youtube.com/watch?v=qJgA_Ci6gNc",
  },
  {
    id: "en-sleep-video-2",
    category: "Sleep Relaxation",
    type: "video",
    lang: "English",
    title: "Guided Sleep Meditation - Jason Stephenson",
    link: "https://www.youtube.com/watch?v=RUvAsMmbyMo",
  },

  // ===== Mental Wellness =====
  {
  id: "en-wellness-video-1",
  category: "Mental Wellness",
  type: "video",
  lang: "English",
  title: "5 Proven Strategies to Boost Your Mental Health Today",
  link: "https://www.youtube.com/watch?v=vGgDIPMyP2g",
},

  {
    id: "en-wellness-video-2",
    category: "Mental Wellness",
    type: "video",
    lang: "English",
    title: "Daily Mental Wellness Routine",
    link: "https://www.youtube.com/watch?v=7H0FKzeuVVs",
  },
  // ===== Stress Relief Breathing =====
  {
    id: "hi-stress-video-1",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Hindi",
    title: "Breathing Exercise for Relaxation (Hindi)",
    link: "https://www.youtube.com/watch?v=l6uCHOeaoRU",  // valid :contentReference[oaicite:0]{index=0}
  },
  {
    id: "hi-stress-video-2",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Hindi",
    title: "Guided Belly Breathing Exercise (Hindi)",
    link: "https://www.youtube.com/watch?v=SzDBU3MlY0Q",  // valid :contentReference[oaicite:1]{index=1}
  },

  // ===== Coping with Anxiety =====
  {
    id: "hi-anxiety-video-1",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Hindi",
    title: "Daily Breathing Exercises ‒ 12 Minutes (Hindi)",
    link: "https://www.youtube.com/watch?v=OtHPzU0-t2Y",  // valid :contentReference[oaicite:2]{index=2}
  },
  {
    id: "hi-anxiety-video-2",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Hindi",
    title: "Deep Breathing Meditation Guide (Hindi)",
    link: "https://www.youtube.com/watch?v=UoEt8wlKAAQ",  // valid :contentReference[oaicite:3]{index=3}
  },

  // ===== Mindfulness Guide =====
  {
    id: "hi-mindfulness-video-1",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Hindi",
    title: "Easy Guided Meditation in Hindi ‒ Night Meditation",
    link: "https://www.youtube.com/watch?v=pxBu0oz24ec",  // valid :contentReference[oaicite:4]{index=4}
  },
  {
    id: "hi-mindfulness-video-2",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Hindi",
    title: "Beginners Meditation for Peace of Mind (Hindi)",
    link: "https://www.youtube.com/watch?v=YWDRFZFCrGE",  // valid :contentReference[oaicite:5]{index=5}
  },

  // ===== Sleep Relaxation =====
  {
    id: "hi-sleep-video-1",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Hindi",
    title: "Meditation for Deep Sleep in Hindi",
    link: "https://www.youtube.com/watch?v=VkBW57G7NG4",  // valid :contentReference[oaicite:6]{index=6}
  },
  {
    id: "hi-sleep-video-2",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Hindi",
    title: "Sleep Meditation [ दस गिनने से पहले सो जायेंगे ] (Hindi)",
    link: "https://www.youtube.com/watch?v=dRWV6MzZKCs",  // valid :contentReference[oaicite:7]{index=7}
  },

  // ===== Mental Wellness =====
  {
    id: "hi-wellness-video-1",
    category: "Mental Wellness",
    type: "video",
    lang: "Hindi",
    title: "Transform Anxiety, Stress & Sleep Overnight (Hindi)",
    link: "https://www.youtube.com/watch?v=y41Vc5dsiCk",  // valid :contentReference[oaicite:8]{index=8}
  },
  {
    id: "hi-wellness-video-2",
    category: "Mental Wellness",
    type: "video",
    lang: "Hindi",
    title: "Night Meditation for Deep Rest and Calmness (Hindi)",
    link: "https://www.youtube.com/watch?v=gqIh9Y4iDKE",  // valid :contentReference[oaicite:9]{index=9}
  },

  // ===== Stress Relief Breathing =====
  {
    id: "ta-stress-video-1",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Tamil",
    title: "4 எளிமையான மூச்சு பயிற்சிகள் (4 Simple Breathing Techniques)",
    link: "https://www.youtube.com/watch?v=hyi1toT8n70",  // breathing techniques video :contentReference[oaicite:0]{index=0}
  },
  {
    id: "ta-stress-video-2",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Tamil",
    title: "How to Breathe Properly? Breathing Techniques in Tamil",
    link: "https://www.youtube.com/watch?v=mLP4eK4Vg88",  // breathing techniques video :contentReference[oaicite:1]{index=1}
  },

  // ===== Coping with Anxiety =====
  {
    id: "ta-anxiety-video-1",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Tamil",
    title: "Simple Guided Meditation for STRESS Relief, Anxiety, Depression (Tamil)",
    link: "https://www.youtube.com/watch?v=dAeYLYBaczI",  // guided meditation video :contentReference[oaicite:2]{index=2}
  },
  {
    id: "ta-anxiety-video-2",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Tamil",
    title: "Breathing Exercise For Instant Stress Relief (Tamil)",
    link: "https://www.youtube.com/watch?v=QLDvPHzpDUo",  // instant stress relief breathing :contentReference[oaicite:3]{index=3}
  },

  // ===== Mindfulness Guide =====
  {
    id: "ta-mindfulness-video-1",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Tamil",
    title: "BEST Guided Meditation for BEGINNERS (Tamil)",
    link: "https://www.youtube.com/watch?v=_flmnpBMBSE",  // beginner meditation :contentReference[oaicite:4]{index=4}
  },
  {
    id: "ta-mindfulness-video-2",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Tamil",
    title: "MINDFUL MEDITATION for BEGINNERS in Tamil",
    link: "https://www.youtube.com/watch?v=7Kkg7NS60Pc",  // mindful meditation starter :contentReference[oaicite:5]{index=5}
  },

  // ===== Sleep Relaxation =====
  {
    id: "ta-sleep-video-1",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Tamil",
    title: "Guided Sleep Meditation Tamil — Relieve Stress Before Sleep",
    link: "https://www.youtube.com/watch?v=fQt0S1FJe9g",  // sleep meditation video :contentReference[oaicite:6]{index=6}
  },
  {
    id: "ta-sleep-video-2",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Tamil",
    title: "22 Minutes Guided Meditation in Tamil",
    link: "https://www.youtube.com/watch?v=0T-SPZoHRUI",  
  },

  // ===== Mental Wellness =====
  {
    id: "ta-wellness-video-1",
    category: "Mental Wellness",
    type: "video",
    lang: "Tamil",
    title: "Daily Guided Meditation | S8-D32 | Tamil",
    link: "https://www.youtube.com/watch?v=pdiSCKF1n_I", 
  },
  {
    id: "ta-wellness-video-2",
    category: "Mental Wellness",
    type: "video",
    lang: "Tamil",
    title: "Simple Guided Meditation for STRESS relief anxiety depression (Tamil)",
    link: "https://www.youtube.com/watch?v=dAeYLYBaczI", 
  },
// ===== Stress Relief Breathing =====
  {
    id: "bn-stress-video-1",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Bengali",
    title: "Breathing Exercise for Relaxation (Bengali)",
    link: "https://www.youtube.com/watch?v=GWQbTCyI7Mc",
  },
  {
    id: "bn-stress-video-2",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Bengali",
    title: "The Power Of Deep Breathing Exercises (Bengali)",
    link: "https://www.youtube.com/watch?v=Dt8O5Rp0zLM",
  },

  // ===== Mindfulness Guide =====
  {
    id: "bn-mindfulness-video-1",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Bengali",
    title: "Mindfulness Meditation - Guided 10 Minutes (Bengali)",
    link: "https://www.youtube.com/watch?v=c5H6lRiS9Wc",
  },
  {
    id: "bn-mindfulness-video-2",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Bengali",
    title: "Bangla Mindfulness Exercise 2: Mindful Breathing",
    link: "https://www.youtube.com/watch?v=su1eO4OExAk",
  },

  // ===== Coping with Anxiety =====
  {
    id: "bn-anxiety-video-1",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Bengali",
    title: "Mindfulness in Challenging Times (Bangla)",
    link: "https://www.youtube.com/watch?v=DHGhPpSUtVI",
  },
  {
  id: "bn-anxiety-video-2",
  category: "Coping with Anxiety",
  type: "video",
  lang: "Bengali",
  title: "Guided Meditation for Anxiety (Bengali)",
  link: "https://www.youtube.com/watch?v=hRw-TBtfq7s",
},


  // ===== Sleep Relaxation =====
  {
    id: "bn-sleep-video-1",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Bengali",
    title: "Deep Sleep Meditation in Bengali",
    link: "https://www.youtube.com/watch?v=1UHBJAZx3F8",
  },
  {
    id: "bn-sleep-video-2",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Bengali",
    title: "5-Minute Deep Sleep Meditation in Bangla",
    link: "https://www.youtube.com/watch?v=aghK2dZ9CpY",
  },

  // ===== Mental Wellness =====
  {
    id: "bn-wellness-video-1",
    category: "Mental Wellness",
    type: "video",
    lang: "Bengali",
    title: "#HealthServeTips 1/4 - Mental Wellness (Bengali)",
    link: "https://www.youtube.com/watch?v=VmiFHJFJDf8",
  },
  {
    id: "bn-wellness-video-2",
    category: "Mental Wellness",
    type: "video",
    lang: "Bengali",
    title: "#HealthServeTips 2/4 - Mental Wellness (Bengali)",
    link: "https://www.youtube.com/watch?v=TAVZMWQUK8k",
  },
// ===== Stress Relief Breathing =====
  {
    id: "kn-stress-video-1",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Kannada",
    title: "Breathing Exercises | De-stress with deep breathing (Kannada)",
    link: "https://www.youtube.com/watch?v=3a0VT7iDIBI",
  },
  {
    id: "kn-stress-video-2",
    category: "Stress Relief Breathing",
    type: "video",
    lang: "Kannada",
    title: "Pranayama with Dr. Jasmine (Kannada)",
    link: "https://www.youtube.com/watch?v=y9YYwuMOp0k",
  },

  // ===== Mindfulness Guide =====
  {
    id: "kn-mindfulness-video-1",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Kannada",
    title: "Guided Meditation for Deep Relaxation | Gurudev (English & Kannada)",
    link: "https://www.youtube.com/watch?v=OFIwmLSWQzc",
  },
  {
    id: "kn-mindfulness-video-2",
    category: "Mindfulness Guide",
    type: "video",
    lang: "Kannada",
    title: "Mindfulness Meditation Music | Almost Everything Kannada",
    link: "https://www.youtube.com/watch?v=3m84KIEZk7c",
  },

  
  {
    id: "kn-anxiety-video-1",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Kannada",
    title: "How to reduce Stress Depression Anxiety in Kannada",
    link: "https://www.youtube.com/watch?v=oTAkMFBYrd4",
  },
  {
    id: "kn-anxiety-video-2",
    category: "Coping with Anxiety",
    type: "video",
    lang: "Kannada",
    title: "Dr. Sowjanya Vasista: Anxiety Management Tips (Kannada)",
    link: "https://www.youtube.com/watch?v=Y9SC_bHEHQE",
  },

  
  {
    id: "kn-sleep-video-1",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Kannada",
    title: "Guided Meditation for Deep Sleep (Kannada)",
    link: "https://www.youtube.com/watch?v=TVGQ1YkbuOk",
  },
  {
    id: "kn-sleep-video-2",
    category: "Sleep Relaxation",
    type: "video",
    lang: "Kannada",
    title: "Guided Relaxation before Sleep | Sri.VG (Kannada)",
    link: "https://www.youtube.com/watch?v=miXNMaomDq4",
  },

  
  {
    id: "kn-wellness-video-1",
    category: "Mental Wellness",
    type: "video",
    lang: "Kannada",
    title: "Emotional Well-being and Mental Health (Kannada)",
    link: "https://www.youtube.com/watch?v=bDARBw8Wa8M",
  },
  {
    id: "kn-wellness-video-2",
    category: "Mental Wellness",
    type: "video",
    lang: "Kannada",
    title: "How to manage stress? | Dr. CR Chandrashekhar (Kannada)",
    link: "https://www.youtube.com/watch?v=zXYCCr3CKZk",
  },
];





const getYouTubeThumbnail = (url: string) => {
  const match = url.match(/v=([^&]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
};

export default function TherapyPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLang, setSelectedLang] = useState<string>("all");

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 mt-10">
        Therapy Content Hub
      </h1>

      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          className="px-4 py-2 border rounded-lg bg-neutral-900 text-white"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg bg-neutral-900 text-white"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          <option value="all">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

  
      <div className="space-y-10">
        {categories.map((cat) => {
          const filtered = resources.filter(
            (r) =>
              r.category === cat &&
              (selectedType === "all" || r.type === selectedType) &&
              (selectedLang === "all" || r.lang === selectedLang)
          );

          return (
            <div key={cat}>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {cat}
              </h2>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 ">
                  {filtered.map((res) => (
                    <a
  key={res.id}
  href={res.link}
  target="_blank"
  rel="noopener noreferrer"
  className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 "
>
  <div className="relative aspect-video">
    
    <img
      src={getYouTubeThumbnail(res.link)}
      alt={res.title}
      className="w-full h-full object-cover"
    />

    
    <div className="absolute top-0 left-0 w-full  bg-opacity-50  px-2 py-1 text-sm font-semibold">
      {res.title}
    </div>

    
    <div className="absolute bottom-0 left-0 w-full  bg-opacity-50  px-2 py-1 text-xs">
      {res.lang}
    </div>
  </div>
</a>


                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No resources found.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
