import pptxgen from "pptxgenjs";

const BLUE = "2563EB";
const DARK = "111827";
const GRAY = "6B7280";
const LIGHT_BG = "F9FAFB";
const WHITE = "FFFFFF";
const ACCENT = "DBEAFE";

function addSlideHeader(slide: pptxgen.Slide, tag: string) {
  slide.addText(tag.toUpperCase(), {
    x: 0.5, y: 0.3, w: 9, h: 0.3,
    fontSize: 9,
    color: BLUE,
    bold: true,
    charSpacing: 3,
    fontFace: "Arial",
  });
  slide.addShape("rect", { x: 0.5, y: 0.65, w: 0.4, h: 0.03, fill: { color: BLUE } });
}

interface SlideItem {
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

export async function generatePptx(slides: SlideItem[]) {
  const prs = new pptxgen();
  prs.layout = "LAYOUT_WIDE";

  slides.forEach((s) => {
    const slide = prs.addSlide();
    slide.background = { color: WHITE };

    if (s.type === "cover") {
      slide.addShape("rect", { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: LIGHT_BG } });
      slide.addShape("rect", { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: BLUE } });
      slide.addText(s.title, {
        x: 0.7, y: 1.2, w: 9, h: 2.5,
        fontSize: 36,
        bold: true,
        color: DARK,
        fontFace: "Arial",
        lineSpacingMultiple: 1.2,
      });
      slide.addShape("rect", { x: 0.7, y: 3.9, w: 1.2, h: 0.04, fill: { color: GRAY } });
      slide.addText(s.subtitle, {
        x: 0.7, y: 4.1, w: 6, h: 0.4,
        fontSize: 12,
        color: GRAY,
        fontFace: "Arial",
      });
      slide.addText(s.desc, {
        x: 0.7, y: 4.7, w: 9, h: 1.8,
        fontSize: 13,
        color: GRAY,
        fontFace: "Arial",
        lineSpacingMultiple: 1.4,
      });
      slide.addText("Права · История · Защита", {
        x: 0.7, y: 6.8, w: 6, h: 0.4,
        fontSize: 10,
        color: "9CA3AF",
        fontFace: "Arial",
      });
    }

    if (s.type === "text") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, {
        x: 0.5, y: 0.9, w: 12.3, h: 1,
        fontSize: 26,
        bold: true,
        color: DARK,
        fontFace: "Arial",
      });
      s.body.forEach((para: string, i: number) => {
        slide.addShape("rect", { x: 0.5, y: 2.1 + i * 1.5, w: 0.05, h: 0.9, fill: { color: BLUE } });
        slide.addText(para, {
          x: 0.75, y: 2.0 + i * 1.5, w: 12, h: 1.1,
          fontSize: 12,
          color: GRAY,
          fontFace: "Arial",
          lineSpacingMultiple: 1.45,
        });
      });
    }

    if (s.type === "timeline") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, {
        x: 0.5, y: 0.9, w: 12.3, h: 0.7,
        fontSize: 26,
        bold: true,
        color: DARK,
        fontFace: "Arial",
      });
      slide.addText(s.intro, {
        x: 0.5, y: 1.65, w: 12, h: 0.5,
        fontSize: 11,
        color: GRAY,
        fontFace: "Arial",
        italic: true,
      });
      s.timeline!.forEach((t, i) => {
        const y = 2.35 + i * 1.0;
        slide.addShape("ellipse", { x: 0.5, y: y + 0.05, w: 0.35, h: 0.35, fill: { color: ACCENT }, line: { color: BLUE, width: 1.5 } });
        slide.addText(t.year, { x: 0.5, y: y + 0.07, w: 0.35, h: 0.3, fontSize: 7, bold: true, color: BLUE, fontFace: "Arial", align: "center" });
        if (i < s.timeline.length - 1) {
          slide.addShape("rect", { x: 0.655, y: y + 0.4, w: 0.04, h: 0.6, fill: { color: "E5E7EB" } });
        }
        slide.addText(`${t.event}`, { x: 1.05, y, w: 11.5, h: 0.3, fontSize: 12, bold: true, color: DARK, fontFace: "Arial" });
        slide.addText(t.desc, { x: 1.05, y: y + 0.3, w: 11.5, h: 0.55, fontSize: 10, color: GRAY, fontFace: "Arial", lineSpacingMultiple: 1.3 });
      });
    }

    if (s.type === "cards") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, { x: 0.5, y: 0.9, w: 12.3, h: 0.6, fontSize: 24, bold: true, color: DARK, fontFace: "Arial" });
      slide.addText(s.intro, { x: 0.5, y: 1.55, w: 12, h: 0.4, fontSize: 11, color: GRAY, fontFace: "Arial" });
      const cols = 3;
      s.cards!.forEach((c, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 0.3 + col * 4.3;
        const y = 2.1 + row * 2.45;
        slide.addShape("rect", { x, y, w: 4.1, h: 2.2, fill: { color: LIGHT_BG }, line: { color: "E5E7EB", width: 1 }, rectRadius: 0.1 });
        slide.addText(c.emoji, { x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.5, fontSize: 18 });
        slide.addText(c.title, { x: x + 0.15, y: y + 0.65, w: 3.8, h: 0.4, fontSize: 12, bold: true, color: DARK, fontFace: "Arial" });
        slide.addText(c.desc, { x: x + 0.15, y: y + 1.05, w: 3.8, h: 1.05, fontSize: 9.5, color: GRAY, fontFace: "Arial", lineSpacingMultiple: 1.35 });
      });
    }

    if (s.type === "problems") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, { x: 0.5, y: 0.9, w: 12.3, h: 0.6, fontSize: 26, bold: true, color: DARK, fontFace: "Arial" });
      slide.addText(s.intro, { x: 0.5, y: 1.55, w: 12, h: 0.5, fontSize: 11, color: GRAY, fontFace: "Arial", italic: true });
      s.problems!.forEach((p, i) => {
        const y = 2.2 + i * 1.2;
        slide.addText(p.num, { x: 0.3, y, w: 0.7, h: 1.0, fontSize: 28, bold: true, color: "E5E7EB", fontFace: "Arial" });
        slide.addText(p.title, { x: 1.1, y: y + 0.05, w: 11.5, h: 0.4, fontSize: 13, bold: true, color: DARK, fontFace: "Arial" });
        slide.addText(p.desc, { x: 1.1, y: y + 0.45, w: 11.5, h: 0.7, fontSize: 10.5, color: GRAY, fontFace: "Arial", lineSpacingMultiple: 1.35 });
      });
    }

    if (s.type === "solutions") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, { x: 0.5, y: 0.9, w: 12.3, h: 0.6, fontSize: 26, bold: true, color: DARK, fontFace: "Arial" });
      slide.addText(s.intro, { x: 0.5, y: 1.55, w: 12, h: 0.5, fontSize: 11, color: GRAY, fontFace: "Arial", italic: true });
      s.solutions!.forEach((sol, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 0.4 + col * 6.4;
        const y = 2.2 + row * 2.2;
        slide.addShape("rect", { x, y, w: 6.1, h: 1.9, fill: { color: LIGHT_BG }, line: { color: "E5E7EB", width: 1 }, rectRadius: 0.1 });
        slide.addShape("rect", { x: x + 0.15, y: y + 0.15, w: 0.55, h: 0.55, fill: { color: ACCENT }, rectRadius: 0.06 });
        slide.addText(sol.title, { x: x + 0.85, y: y + 0.15, w: 5.1, h: 0.35, fontSize: 13, bold: true, color: DARK, fontFace: "Arial" });
        slide.addText(sol.desc, { x: x + 0.15, y: y + 0.75, w: 5.8, h: 1.0, fontSize: 10, color: GRAY, fontFace: "Arial", lineSpacingMultiple: 1.35 });
      });
    }

    if (s.type === "examples") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, { x: 0.5, y: 0.9, w: 12.3, h: 0.6, fontSize: 26, bold: true, color: DARK, fontFace: "Arial" });
      slide.addText(s.intro, { x: 0.5, y: 1.55, w: 12, h: 0.4, fontSize: 11, color: GRAY, fontFace: "Arial", italic: true });
      s.examples!.forEach((e, i) => {
        const y = 2.1 + i * 1.2;
        slide.addShape("rect", { x: 0.5, y, w: 0.04, h: 0.9, fill: { color: BLUE } });
        const flag = e.country.split(" ")[0];
        const name = e.country.split(" ").slice(1).join(" ");
        slide.addText(`${flag} ${name} — ${e.title}`, { x: 0.7, y: y + 0.05, w: 12, h: 0.35, fontSize: 13, bold: true, color: DARK, fontFace: "Arial" });
        slide.addText(e.desc, { x: 0.7, y: y + 0.42, w: 12, h: 0.65, fontSize: 10, color: GRAY, fontFace: "Arial", lineSpacingMultiple: 1.35 });
      });
    }

    if (s.type === "conclusion") {
      addSlideHeader(slide, s.tag);
      slide.addText(s.title, { x: 0.5, y: 0.9, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: DARK, fontFace: "Arial" });
      s.points!.forEach((p, i) => {
        const y = 1.8 + i * 1.0;
        slide.addShape("ellipse", { x: 0.4, y: y + 0.08, w: 0.38, h: 0.38, fill: { color: ACCENT } });
        slide.addText(`${i + 1}`, { x: 0.4, y: y + 0.09, w: 0.38, h: 0.36, fontSize: 11, bold: true, color: BLUE, fontFace: "Arial", align: "center" });
        slide.addText(p.text, { x: 0.95, y, w: 11.8, h: 0.6, fontSize: 11.5, color: DARK, fontFace: "Arial", lineSpacingMultiple: 1.3 });
      });
      slide.addShape("rect", { x: 0.4, y: 5.75, w: 12.5, h: 1.05, fill: { color: DARK }, rectRadius: 0.12 });
      slide.addText(s.final, { x: 0.7, y: 5.88, w: 12, h: 0.6, fontSize: 13, bold: true, color: WHITE, fontFace: "Arial" });
      slide.addText(s.source, { x: 0.5, y: 6.95, w: 12, h: 0.3, fontSize: 8, color: "9CA3AF", fontFace: "Arial" });
    }

    slide.addText(`${s.id + 1} / 9`, {
      x: 12.0, y: 7.1, w: 1.1, h: 0.3,
      fontSize: 9, color: "D1D5DB", fontFace: "Arial", align: "right",
    });
  });

  await prs.writeFile({ fileName: "Права_ребёнка_презентация.pptx" });
}