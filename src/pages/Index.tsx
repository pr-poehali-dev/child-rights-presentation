import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { generatePptx } from "@/lib/generatePptx";

interface SlideData {
  id: number;
  type: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  tag?: string;
  body?: string[];
  intro?: string;
  timeline?: { year: string; event: string; desc: string }[];
  cards?: { emoji: string; title: string; desc: string }[];
  problems?: { num: string; title: string; desc: string }[];
  solutions?: { icon: string; title: string; desc: string }[];
  examples?: { country: string; title: string; desc: string }[];
  points?: { icon: string; text: string }[];
  final?: string;
  source?: string;
}

const slides = [
  {
    id: 0,
    type: "cover",
    title: "Права ребёнка в современном обществе",
    subtitle: "Школьный проект · 2026",
    desc: "Каждый ребёнок на планете имеет права — вне зависимости от страны, семьи или достатка. В этой презентации мы разберём, что это за права, откуда они взялись и почему важно о них знать.",
  },
  {
    id: 1,
    type: "text",
    tag: "Актуальность",
    title: "Почему это важно сегодня?",
    body: [
      "По данным ЮНИСЕФ, более 1 миллиарда детей в мире ежегодно сталкиваются с теми или иными нарушениями своих прав. Это каждый второй ребёнок на планете.",
      "В России проблема тоже актуальна: дети страдают от домашнего насилия, неравного доступа к образованию, буллинга в школах и в интернете.",
      "Чем больше людей знают о правах детей — тем меньше нарушений происходит. Осведомлённость работает лучше любых запретов. Именно поэтому изучение этой темы начинается в школе.",
    ],
  },
  {
    id: 2,
    type: "text",
    tag: "Введение",
    title: "Что такое права ребёнка?",
    body: [
      "Права ребёнка — это особые права, которыми наделён каждый человек с момента рождения и до достижения 18 лет. Они закреплены в международных документах и законах большинства стран мира.",
      "Главный документ — Конвенция ООН о правах ребёнка (1989). Её подписали 196 государств, включая Россию. Конвенция содержит 54 статьи, охватывающие все аспекты жизни ребёнка: от имени и гражданства до защиты от насилия.",
      "Права ребёнка делятся на три группы: право на выживание (жизнь, питание, медицина), право на развитие (образование, досуг, культура) и право на защиту (от насилия, эксплуатации, дискриминации).",
    ],
  },
  {
    id: 3,
    type: "timeline",
    tag: "История",
    title: "Как появились права детей",
    intro: "До XX века дети не считались отдельными субъектами права — они были «собственностью» родителей. Всё изменилось благодаря международным организациям и гражданскому обществу.",
    timeline: [
      { year: "1924", event: "Женевская декларация", desc: "Первый международный документ о правах детей, принятый Лигой Наций. Признал, что ребёнок нуждается в особой защите." },
      { year: "1948", event: "Всеобщая декларация", desc: "ООН приняла Всеобщую декларацию прав человека, включив в неё права детей как часть универсальных прав." },
      { year: "1959", event: "Декларация ООН", desc: "Специальная Декларация прав ребёнка из 10 принципов. Провозгласила право на имя, гражданство, образование и защиту." },
      { year: "1989", event: "Конвенция ООН", desc: "Главный документ и по сей день. 54 статьи, 196 стран-участниц. Впервые ребёнок получил статус полноправного субъекта права." },
      { year: "1990", event: "Россия присоединилась", desc: "СССР (затем Россия) ратифицировал Конвенцию. С этого момента государство обязано защищать права каждого ребёнка." },
    ],
  },
  {
    id: 4,
    type: "cards",
    tag: "Основные права",
    title: "Главные права каждого ребёнка",
    intro: "Конвенция ООН гарантирует десятки прав. Вот самые важные из них:",
    cards: [
      { emoji: "🏠", title: "Право на семью", desc: "Каждый ребёнок имеет право знать своих родителей и жить с ними. Разлучение с семьёй допускается только в крайних случаях — когда это необходимо для защиты самого ребёнка." },
      { emoji: "📚", title: "Право на образование", desc: "Начальное образование должно быть бесплатным и обязательным для всех. Государство обязано создавать условия для доступного среднего и высшего образования." },
      { emoji: "🏥", title: "Право на здоровье", desc: "Все дети имеют право на медицинскую помощь. Государство должно снижать детскую смертность, бороться с болезнями и обеспечивать чистую воду и питание." },
      { emoji: "🛡️", title: "Право на защиту", desc: "Дети защищены от физического и психологического насилия, эксплуатации, торговли людьми и участия в вооружённых конфликтах." },
      { emoji: "🗣️", title: "Право на мнение", desc: "Ребёнок вправе свободно выражать своё мнение. При принятии решений, касающихся ребёнка, его точка зрения должна быть учтена — соответственно возрасту." },
      { emoji: "🎮", title: "Право на отдых", desc: "Дети имеют право на отдых, игру и участие в культурной жизни. Чрезмерная нагрузка учёбой или работой — нарушение этого права." },
    ],
  },
  {
    id: 5,
    type: "problems",
    tag: "Проблемы",
    title: "Современные нарушения прав детей",
    intro: "Несмотря на существование Конвенции, права детей нарушаются во всём мире — в том числе в развитых странах. Вот главные проблемы современности:",
    problems: [
      {
        num: "01",
        title: "Кибербуллинг",
        desc: "Травля в интернете стала одной из главных угроз для детей. По данным ВОЗ, с ней сталкивается каждый третий подросток. Анонимность сети делает агрессию безнаказанной, а её последствия — депрессия, тревога, отказ от учёбы.",
      },
      {
        num: "02",
        title: "Детский труд",
        desc: "По данным МОТ, около 160 миллионов детей в мире вынуждены работать вместо того, чтобы учиться. Большинство — в Африке и Азии. Детский труд лишает ребёнка права на образование и нормальное детство.",
      },
      {
        num: "03",
        title: "Неравный доступ к образованию",
        desc: "В России и во всём мире качество образования сильно зависит от места проживания и достатка семьи. Дети из сёл, многодетных или малообеспеченных семей получают значительно меньше возможностей.",
      },
      {
        num: "04",
        title: "Домашнее насилие",
        desc: "По статистике, большинство случаев насилия над детьми происходит в семье. Часто это остаётся скрытым — дети боятся говорить, а взрослые не замечают. Культура телесных наказаний до сих пор широко распространена.",
      },
    ],
  },
  {
    id: 6,
    type: "solutions",
    tag: "Решения",
    title: "Что можно сделать?",
    intro: "Защита прав детей — задача не только государства, но и каждого из нас: учителей, родителей, самих детей.",
    solutions: [
      { icon: "BookOpen", title: "Просвещение", desc: "Включить тему прав ребёнка в школьную программу с начальных классов. Дети, знающие свои права, лучше защищены и реже становятся жертвами." },
      { icon: "Scale", title: "Законодательство", desc: "Ужесточить ответственность за насилие над детьми, развивать службы опеки и поддержки семей в кризисных ситуациях." },
      { icon: "Heart", title: "Поддержка семей", desc: "Государство должно помогать неблагополучным и малообеспеченным семьям: материально, психологически, юридически." },
      { icon: "Wifi", title: "Цифровая безопасность", desc: "Обучать детей и родителей безопасному поведению в интернете. Ввести уголовную ответственность за кибербуллинг и онлайн-преследование." },
    ],
  },
  {
    id: 7,
    type: "examples",
    tag: "Примеры",
    title: "Как это работает в разных странах",
    intro: "Некоторые государства стали примером для всего мира в защите прав детей:",
    examples: [
      {
        country: "🇸🇪 Швеция",
        title: "Первой запретила наказания",
        desc: "В 1979 году Швеция стала первой страной в мире, запретившей телесные наказания детей — даже в семье. Сегодня этот опыт переняли более 60 государств. Ключевую роль сыграло именно просвещение родителей, а не только закон.",
      },
      {
        country: "🇫🇮 Финляндия",
        title: "Лучшее образование без стресса",
        desc: "Финская система образования считается одной из лучших в мире. В начальной школе нет оценок и домашних заданий — дети учатся без давления. При этом финские школьники показывают высокие результаты в международных тестах.",
      },
      {
        country: "🇳🇴 Норвегия",
        title: "Детский омбудсмен",
        desc: "С 1981 года в Норвегии работает специальный государственный уполномоченный — детский омбудсмен. Его задача — следить за соблюдением прав детей на всех уровнях власти и выступать защитником их интересов.",
      },
      {
        country: "🇷🇺 Россия",
        title: "Уполномоченный по правам",
        desc: "В России действует институт Уполномоченного по правам ребёнка — как на федеральном уровне, так и в каждом регионе. Любой ребёнок или родитель может обратиться за помощью при нарушении прав.",
      },
    ],
  },
  {
    id: 8,
    type: "conclusion",
    tag: "Заключение",
    title: "Что важно помнить",
    points: [
      { icon: "Star", text: "Права ребёнка — это не привилегия, а гарантия для каждого с рождения, независимо от страны, семьи или достатка." },
      { icon: "Lightbulb", text: "Знание своих прав — первый шаг к их защите. Ребёнок, который знает, что насилие недопустимо, скорее обратится за помощью." },
      { icon: "Users", text: "Защита детей — общая задача: государства, родителей, учителей, соседей и самих детей. Равнодушие — тоже нарушение." },
      { icon: "Globe", text: "Россия подписала Конвенцию ООН — это значит, государство взяло на себя обязательство соблюдать все 54 статьи." },
    ],
    final: "Начни с себя: узнай свои права, расскажи другу, поддержи того, кому нужна помощь.",
    source: "Источник: Конвенция ООН о правах ребёнка · ЮНИСЕФ · МОТ",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [visible, setVisible] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generatePptx(slides);
    } finally {
      setDownloading(false);
    }
  };

  const go = useCallback((d: number) => {
    const next = current + d;
    if (next < 0 || next >= slides.length) return;
    setDir(d);
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 250);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const s = slides[current];

  return (
    <div className="min-h-screen bg-white font-body text-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
        <span className="text-sm text-gray-400 font-body">Права ребёнка</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-40 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">{current + 1} / {slides.length}</span>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            <Icon name={downloading ? "Loader" : "Download"} size={14} className={downloading ? "animate-spin" : ""} />
            {downloading ? "Создаю..." : "Скачать .pptx"}
          </button>
        </div>
      </div>

      {/* Slide */}
      <div className="flex-1 pt-14 pb-20 overflow-y-auto">
        <div
          className="min-h-full transition-all duration-250"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : `translateY(${dir > 0 ? "16px" : "-16px"})`,
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {s.type === "cover" && <SlideCover s={s} />}
          {s.type === "text" && <SlideText s={s} />}
          {s.type === "timeline" && <SlideTimeline s={s} />}
          {s.type === "cards" && <SlideCards s={s} />}
          {s.type === "problems" && <SlideProblems s={s} />}
          {s.type === "solutions" && <SlideSolutions s={s} />}
          {s.type === "examples" && <SlideExamples s={s} />}
          {s.type === "conclusion" && <SlideConclusion s={s} />}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-colors"
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > current ? 1 : -1); setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 250); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-blue-500" : "w-2 h-2 bg-gray-200 hover:bg-gray-400"}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-colors"
        >
          Вперёд
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full tracking-wide uppercase mb-4">
      {label}
    </span>
  );
}

function SlideCover({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-6">
        {s.title}
      </h1>
      <div className="w-16 h-0.5 bg-gray-200 mb-6" />
      <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">{s.desc}</p>
      <span className="text-sm text-gray-400">{s.subtitle}</span>
    </div>
  );
}

function SlideText({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-8">{s.title}</h2>
      <div className="flex flex-col gap-5">
        {s.body.map((p: string, i: number) => (
          <p key={i} className="text-gray-600 text-lg leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  );
}

function SlideTimeline({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">{s.title}</h2>
      <p className="text-gray-500 text-base leading-relaxed mb-10">{s.intro}</p>
      <div className="flex flex-col gap-0">
        {s.timeline!.map((t, i) => (
          <div key={i} className="flex gap-6 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center shrink-0">
                <span className="text-blue-600 text-xs font-semibold">{t.year.slice(-2)}</span>
              </div>
              {i < s.timeline!.length - 1 && <div className="w-0.5 flex-1 bg-gray-100 mt-2" />}
            </div>
            <div className="pt-1.5 pb-2">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-blue-600 font-semibold text-sm">{t.year}</span>
                <span className="font-semibold text-gray-800 text-base">{t.event}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCards({ s }: { s: SlideData }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">{s.title}</h2>
      <p className="text-gray-500 text-base mb-8">{s.intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {s.cards!.map((c, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
            <div className="flex items-start gap-4">
              <span className="text-2xl shrink-0">{c.emoji}</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideProblems({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">{s.title}</h2>
      <p className="text-gray-500 text-base leading-relaxed mb-10">{s.intro}</p>
      <div className="flex flex-col gap-8">
        {s.problems!.map((p, i) => (
          <div key={i} className="flex gap-5">
            <span className="text-3xl font-semibold text-gray-100 shrink-0 leading-none mt-1">{p.num}</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideSolutions({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">{s.title}</h2>
      <p className="text-gray-500 text-base leading-relaxed mb-10">{s.intro}</p>
      <div className="flex flex-col gap-6">
        {s.solutions!.map((sol, i) => (
          <div key={i} className="flex gap-5 items-start">
            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <Icon name={sol.icon} size={18} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">{sol.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{sol.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideExamples({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">{s.title}</h2>
      <p className="text-gray-500 text-base leading-relaxed mb-10">{s.intro}</p>
      <div className="flex flex-col gap-6">
        {s.examples!.map((e, i) => (
          <div key={i} className="border-l-2 border-blue-200 pl-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{e.country.split(" ")[0]}</span>
              <span className="font-semibold text-gray-800">{e.country.split(" ").slice(1).join(" ")} — {e.title}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideConclusion({ s }: { s: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Tag label={s.tag} />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-10">{s.title}</h2>
      <div className="flex flex-col gap-5 mb-10">
        {s.points!.map((p, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Icon name={p.icon} size={15} className="text-blue-500" />
            </div>
            <p className="text-gray-600 text-base leading-relaxed pt-1">{p.text}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 text-white rounded-2xl p-6 mb-6">
        <p className="text-lg font-semibold leading-snug">{s.final}</p>
      </div>
      <p className="text-gray-400 text-xs">{s.source}</p>
    </div>
  );
}