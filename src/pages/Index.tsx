import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 0,
    type: "cover",
    label: "01",
    title: "Права ребёнка\nв современном\nобществе",
    subtitle: "Школьный проект · 2026",
    accent: "#E8F4FD",
  },
  {
    id: 1,
    type: "relevance",
    label: "02",
    tag: "Актуальность",
    title: "Почему это важно сегодня?",
    points: [
      { icon: "Globe", text: "Более 1 млрд детей в мире сталкиваются с нарушением своих прав ежегодно" },
      { icon: "TrendingUp", text: "Рост осведомлённости о правах ребёнка — залог здорового общества" },
      { icon: "Users", text: "Каждый ребёнок заслуживает защиты, образования и свободного развития" },
    ],
  },
  {
    id: 2,
    type: "intro",
    label: "03",
    tag: "Введение",
    title: "Что такое права ребёнка?",
    text: "Права ребёнка — это особые права, которыми обладает каждый человек с рождения до 18 лет. Они защищают детей от жестокого обращения, обеспечивают доступ к образованию, здравоохранению и позволяют свободно выражать свои мысли.",
    quote: "Каждый ребёнок имеет право на счастливое детство.",
  },
  {
    id: 3,
    type: "history",
    label: "04",
    tag: "История",
    title: "Как это начиналось",
    timeline: [
      { year: "1924", event: "Женевская декларация прав ребёнка — первый международный документ" },
      { year: "1959", event: "ООН принимает Декларацию прав ребёнка из 10 принципов" },
      { year: "1989", event: "Конвенция ООН о правах ребёнка — главный документ до сих пор" },
      { year: "1990", event: "Россия ратифицирует Конвенцию, принимая обязательства" },
      { year: "2000-е", event: "Цифровая эпоха — новые вызовы и новые права в интернете" },
    ],
  },
  {
    id: 4,
    type: "rights",
    label: "05",
    tag: "Основные права",
    title: "Главные права каждого ребёнка",
    cards: [
      { emoji: "🏠", title: "На жильё и семью", desc: "Право жить с родителями в безопасной среде" },
      { emoji: "📚", title: "На образование", desc: "Бесплатное и доступное обучение для всех" },
      { emoji: "🏥", title: "На здоровье", desc: "Медицинская помощь и здоровый образ жизни" },
      { emoji: "🛡️", title: "На защиту", desc: "Защита от насилия, эксплуатации и дискриминации" },
      { emoji: "🗣️", title: "На мнение", desc: "Право выражать взгляды и быть услышанным" },
      { emoji: "🎮", title: "На отдых", desc: "Время для игр, творчества и развлечений" },
    ],
  },
  {
    id: 5,
    type: "problems",
    label: "06",
    tag: "Проблемы",
    title: "Современные вызовы",
    problems: [
      { num: "01", title: "Кибербуллинг", desc: "Травля в интернете затрагивает каждого 3-го подростка" },
      { num: "02", title: "Детский труд", desc: "160 млн детей вынуждены работать вместо учёбы" },
      { num: "03", title: "Неравный доступ", desc: "Разрыв в качестве образования между городом и деревней" },
      { num: "04", title: "Цифровая безопасность", desc: "Опасный контент и угрозы в онлайн-пространстве" },
    ],
  },
  {
    id: 6,
    type: "solutions",
    label: "07",
    tag: "Решения",
    title: "Как защитить права детей",
    solutions: [
      { icon: "BookOpen", color: "#DBEAFE", title: "Образование", text: "Включить тему прав ребёнка в школьную программу" },
      { icon: "Shield", color: "#DCFCE7", title: "Законы", text: "Усиление законодательной защиты прав детей" },
      { icon: "Heart", color: "#FCE7F3", title: "Семья", text: "Поддержка семей в трудных жизненных ситуациях" },
      { icon: "Wifi", color: "#FEF9C3", title: "Цифровая среда", text: "Создание безопасного интернет-пространства для детей" },
    ],
  },
  {
    id: 7,
    type: "examples",
    label: "08",
    tag: "Примеры",
    title: "Успешные практики в мире",
    examples: [
      { country: "🇸🇪 Швеция", text: "Первая страна, запретившая телесные наказания в 1979 году" },
      { country: "🇫🇮 Финляндия", text: "Система образования без оценок в начальной школе снижает стресс" },
      { country: "🇳🇴 Норвегия", text: "Детский омбудсмен с 1981 года защищает интересы детей на госуровне" },
      { country: "🇷🇺 Россия", text: "Уполномоченный по правам ребёнка в каждом регионе страны" },
    ],
  },
  {
    id: 8,
    type: "conclusion",
    label: "09",
    tag: "Заключение",
    title: "Защита прав ребёнка — наша общая задача",
    points: [
      "Права ребёнка — это не привилегия, а гарантия для каждого",
      "Знание своих прав помогает детям быть увереннее и защищённее",
      "Общество, которое уважает детей, строит лучшее будущее",
    ],
    final: "Начни с себя — узнай свои права и расскажи о них другим!",
  },
];

const SlideWrapper = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
  <div
    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
      isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
    }`}
  >
    {children}
  </div>
);

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir: number) => {
    if (animating) return;
    const next = current + dir;
    if (next < 0 || next >= slides.length) return;
    setAnimating(true);
    setCurrent(next);
    setTimeout(() => setAnimating(false), 700);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-body flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-stone-200">
        <div
          className="h-full bg-stone-700 transition-all duration-700"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide number */}
      <div className="fixed top-6 right-8 z-50 font-display text-sm text-stone-400 tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* COVER */}
        <SlideWrapper isActive={current === 0}>
          <div className="h-screen flex flex-col justify-between p-10 md:p-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-stone-700" />
              <span className="font-body text-xs tracking-[0.2em] text-stone-500 uppercase">Школьный проект</span>
            </div>
            <div className="max-w-4xl">
              <div className="font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[1.05] text-stone-900 whitespace-pre-line mb-8">
                {slides[0].title}
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-[2px] bg-stone-300" />
                <span className="font-body text-stone-500 text-sm tracking-wider">{slides[0].subtitle}</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="ml-2 text-stone-400 text-xs font-body">Права · История · Защита</span>
            </div>
          </div>
        </SlideWrapper>

        {/* RELEVANCE */}
        <SlideWrapper isActive={current === 1}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-5xl mx-auto">
            <Tag label={slides[1].tag!} />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-stone-900 mb-12 mt-4 leading-tight">
              {slides[1].title}
            </h2>
            <div className="flex flex-col gap-6">
              {slides[1].points!.map((p, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Icon name={p.icon} size={20} className="text-blue-600" />
                  </div>
                  <p className="font-body text-stone-700 text-lg leading-relaxed pt-2">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>

        {/* INTRO */}
        <SlideWrapper isActive={current === 2}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-5xl mx-auto">
            <Tag label={slides[2].tag!} />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-stone-900 mb-8 mt-4 leading-tight">
              {slides[2].title}
            </h2>
            <p className="font-body text-stone-600 text-xl leading-relaxed max-w-3xl mb-12">
              {slides[2].text}
            </p>
            <blockquote className="border-l-4 border-stone-300 pl-6">
              <p className="font-display italic text-2xl text-stone-500">{slides[2].quote}</p>
            </blockquote>
          </div>
        </SlideWrapper>

        {/* HISTORY */}
        <SlideWrapper isActive={current === 3}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-5xl mx-auto">
            <Tag label={slides[3].tag!} />
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-stone-900 mb-10 mt-4 leading-tight">
              {slides[3].title}
            </h2>
            <div className="relative">
              <div className="absolute left-[52px] top-0 bottom-0 w-[1px] bg-stone-200" />
              <div className="flex flex-col gap-5">
                {slides[3].timeline!.map((t, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-[104px] shrink-0 text-right">
                      <span className="font-display font-semibold text-stone-800 text-lg">{t.year}</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-stone-400 shrink-0 mt-1.5 relative z-10" />
                    <p className="font-body text-stone-600 text-base leading-relaxed">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideWrapper>

        {/* RIGHTS */}
        <SlideWrapper isActive={current === 4}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-6xl mx-auto">
            <Tag label={slides[4].tag!} />
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold text-stone-900 mb-10 mt-4 leading-tight">
              {slides[4].title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {slides[4].cards!.map((c, i) => (
                <div key={i} className="bg-white border border-stone-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <h3 className="font-display font-semibold text-stone-800 text-lg mb-2">{c.title}</h3>
                  <p className="font-body text-stone-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>

        {/* PROBLEMS */}
        <SlideWrapper isActive={current === 5}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-5xl mx-auto">
            <Tag label={slides[5].tag!} color="red" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-stone-900 mb-10 mt-4 leading-tight">
              {slides[5].title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slides[5].problems!.map((p, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span className="font-display text-4xl font-semibold text-stone-200 leading-none shrink-0">{p.num}</span>
                  <div>
                    <h3 className="font-display font-semibold text-stone-800 text-xl mb-1">{p.title}</h3>
                    <p className="font-body text-stone-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>

        {/* SOLUTIONS */}
        <SlideWrapper isActive={current === 6}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-6xl mx-auto">
            <Tag label={slides[6].tag!} color="green" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-stone-900 mb-10 mt-4 leading-tight">
              {slides[6].title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {slides[6].solutions!.map((s, i) => (
                <div key={i} className="flex gap-5 items-start p-5 rounded-2xl border border-stone-100 bg-white hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.color }}>
                    <Icon name={s.icon} size={22} className="text-stone-700" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-stone-800 text-lg mb-1">{s.title}</h3>
                    <p className="font-body text-stone-500 text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>

        {/* EXAMPLES */}
        <SlideWrapper isActive={current === 7}>
          <div className="h-screen flex flex-col justify-center p-10 md:p-16 max-w-5xl mx-auto">
            <Tag label={slides[7].tag!} />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-stone-900 mb-10 mt-4 leading-tight">
              {slides[7].title}
            </h2>
            <div className="flex flex-col gap-5">
              {slides[7].examples!.map((e, i) => (
                <div key={i} className="flex items-start gap-6 py-4 border-b border-stone-100 last:border-0">
                  <span className="font-body text-2xl shrink-0 mt-0.5">{e.country}</span>
                  <p className="font-body text-stone-600 text-lg leading-relaxed">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>

        {/* CONCLUSION */}
        <SlideWrapper isActive={current === 8}>
          <div className="h-screen flex flex-col justify-between p-10 md:p-16 max-w-5xl mx-auto">
            <div>
              <Tag label={slides[8].tag!} />
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-stone-900 mb-10 mt-4 leading-tight">
                {slides[8].title}
              </h2>
              <div className="flex flex-col gap-5">
                {slides[8].points!.map((p, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-display font-semibold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="font-body text-stone-700 text-lg leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-stone-900 text-white rounded-2xl p-8">
              <p className="font-display text-2xl font-semibold leading-snug">{slides[8].final}</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-[1px] bg-stone-500" />
                <span className="text-stone-400 font-body text-sm">Конвенция ООН о правах ребёнка · 1989</span>
              </div>
            </div>
          </div>
        </SlideWrapper>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-4 z-50">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="w-11 h-11 rounded-full border border-stone-300 bg-white flex items-center justify-center hover:bg-stone-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          <Icon name="ChevronLeft" size={18} className="text-stone-700" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 700); } }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2 bg-stone-700" : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={current === slides.length - 1}
          className="w-11 h-11 rounded-full border border-stone-300 bg-white flex items-center justify-center hover:bg-stone-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          <Icon name="ChevronRight" size={18} className="text-stone-700" />
        </button>
      </div>
    </div>
  );
}

function Tag({ label, color = "default" }: { label: string; color?: "default" | "red" | "green" }) {
  const colors = {
    default: "bg-stone-100 text-stone-600",
    red: "bg-red-50 text-red-600",
    green: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium tracking-widest uppercase ${colors[color]}`}>
      {label}
    </span>
  );
}
