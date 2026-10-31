import React from 'react';
import { ArrowDown, Recycle, ShieldCheck, HeartHandshake, Truck, ClipboardCheck } from 'lucide-react';
import { CONTENT_KIT } from '../lib/contentKit';

const icons = [ClipboardCheck, ShieldCheck, HeartHandshake, Truck, Recycle];

export default function HowItWorksPage({ lang }) {
  const steps = CONTENT_KIT.howItWorks.steps;
  const copy = lang === 'mr';
  const details = copy ? [
    'दाता अन्नाचा प्रकार, प्रमाण, तयार केल्याची वेळ, सुरक्षित हाताळणीची माहिती आणि पिकअपचे ठिकाण नोंदवतो. त्यामुळे जवळच्या संस्थांना उपलब्ध अन्न लगेच दिसते.',
    'प्रणाली अन्नाचा प्रकार, वेळ, अंतर आणि संस्थेची गरज पाहून योग्य प्राप्तकर्त्यांना प्राधान्याने सुचवते. सुरक्षितता तपासणीशिवाय अन्न वितरणासाठी पुढे जात नाही.',
    'अनाथालये, निवारा केंद्रे आणि गोशाळा त्यांच्या गरजेनुसार जुळणी स्वीकारतात. दाता स्वतः पोहोचवू शकतो किंवा उपलब्ध रायडरची मदत मागू शकतो.',
    'रायडर अन्न उचलून प्राप्तकर्त्यापर्यंत पोहोचवतो. हस्तांतरणाची नोंद आणि सूचना दिल्यामुळे दाता व प्राप्तकर्ता दोघांनाही स्थिती कळते.',
    'तपासणीत नाकारलेले, मानवोपयोगी नसलेले किंवा खराब झालेले अन्न जेवणासाठी वापरले जात नाही. ते कंपोस्ट युनिटकडे पाठवून सेंद्रिय खत तयार केले जाते आणि पोषकद्रव्ये जमिनीत परत जातात.'
  ] : [
    'A donor records the food type, quantity, preparation time, safe handling details, and pickup location. Nearby verified organizations can then see what is available while it is still timely.',
    'PotBhar considers food type, time, distance, and recipient needs to recommend suitable organizations in priority order. Food moves forward only when its safety information is clear.',
    'Orphanages, shelters, and gaushalas can accept a suitable match. The donor chooses self-delivery or requests an available rider, keeping the handoff practical and quick.',
    'A rider collects the food and delivers it to the matched recipient. Status updates and handoff confirmation keep both donor and recipient informed.',
    'Food declined during inspection, unsuitable for people, or spoiled is kept out of meals. It is routed to the compost unit and processed into organic manure, returning nutrients to local soil.'
  ];

  return (
    <section id="how-it-works" className="bg-[#FFF6E8] text-[#4B2E1E] scroll-mt-24">
      <section className="relative overflow-hidden border-b border-[#E8DAC2] bg-gradient-to-br from-[#EAF5EC] via-[#FFF6E8] to-[#FFF0DE] py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#4E9A59]/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A7D7AF] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1F5C3A]">
            <HeartHandshake className="h-4 w-4" /> {copy ? 'अन्न पुनर्वापर प्रवास' : 'The food recovery journey'}
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-[#1F5C3A] sm:text-6xl">
            {copy ? 'अन्नदानापासून मातीच्या पुनरुज्जीवनापर्यंत' : 'From surplus food to nourished soil'}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#735747] sm:text-lg">
            {copy ? 'PotBhar सुरक्षित अन्न योग्य लोकांपर्यंत पोहोचवते आणि जेवणासाठी योग्य नसलेल्या अन्नाला जबाबदार कंपोस्टिंगचा मार्ग देते.' : 'PotBhar connects safe surplus with people who need it, while giving food that cannot be served a responsible path into compost.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <span className="rounded-full bg-[#1F5C3A] px-4 py-2 text-white">{steps.length} {copy ? 'स्पष्ट टप्पे' : 'clear steps'}</span>
            <span className="rounded-full border border-[#E0A922] bg-[#FFF8DA] px-4 py-2 text-[#735314]">{copy ? 'कंपोस्ट हा महत्त्वाचा शेवटचा टप्पा' : 'Compost is part of the complete cycle'}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-7 sm:space-y-9">
          {steps.map((step, index) => {
            const Icon = icons[index] || ClipboardCheck;
            const compost = index === 4;
            return (
              <article key={step.num} className={`relative grid overflow-hidden rounded-[2rem] border bg-white shadow-soft md:grid-cols-[0.9fr_1.1fr] ${compost ? 'border-[#E0A922] shadow-xl ring-4 ring-[#F6C343]/30' : 'border-[#E8DAC2]'}`}>
                <div className="flex min-h-52 items-center justify-center bg-[#FFFBF5] p-4 sm:p-7">
                  <img src={step.image} alt={step.title[lang]} className="max-h-72 w-full rounded-2xl object-contain" loading="lazy" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${compost ? 'bg-[#F6C343] text-[#17452D]' : 'bg-[#FFF0DE] text-[#B85F00]'}`}><Icon className="h-5 w-5" /></span>
                    <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#B85F00]">{copy ? `टप्पा ${step.num}` : `Step ${step.num}`}</span>
                    {compost && <span className="rounded-full bg-[#F6C343] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#17452D]">{copy ? 'मुख्य वैशिष्ट्य' : 'PotBhar advantage'}</span>}
                  </div>
                  <h2 className="font-display text-2xl font-extrabold leading-snug text-[#1F5C3A] sm:text-3xl">{step.title[lang]}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#735747] sm:text-base">{details[index]}</p>
                  {compost && <div className="mt-6 rounded-2xl border border-[#A7D7AF] bg-[#EAF5EC] p-4 text-sm font-semibold leading-relaxed text-[#1F5C3A]">{copy ? 'योग्य अन्न गरजूंपर्यंत; अयोग्य अन्न जमिनीच्या पुनरुज्जीवनासाठी. कोणताही सुरक्षित पुनर्वापराचा मार्ग वाया जाऊ देत नाही.' : 'Good food reaches people. Unsuitable food helps restore the soil. The recovery cycle has a safe, useful destination at every stage.'}</div>}
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center text-[#4E9A59]"><ArrowDown className="h-6 w-6 animate-bounce" aria-hidden="true" /></div>
      </section>
    </section>
  );
}
