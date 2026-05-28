'use client';

import { PortfolioData } from '@/types/portfolio';

export function downloadHTML(html: string, name: string) {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPDF(html: string, name: string) {
  // Use a hidden iframe + print dialog — most reliable cross-browser PDF approach
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1200px;height:800px;opacity:0;pointer-events:none;';
  iframe.srcdoc = html;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    setTimeout(() => {
      try {
        const win = iframe.contentWindow;
        if (!win) return;
        win.document.title = `${name} — Portfolio`;
        win.focus();
        win.print();
      } finally {
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 3000);
      }
    }, 800);
  };
}

export async function downloadPPTX(data: PortfolioData, _html?: string) {
  // Dynamic import so pptxgenjs doesn't bloat initial bundle
  const PptxGenJS = (await import('pptxgenjs')).default;
  const pptx = new PptxGenJS();

  pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'WIDE';

  const primary = data.primaryColor || '#00C9A7';
  const dark = '#1A1A2E';
  const light = '#F8F8F6';

  // ── SLIDE 1: Title / Hero ──────────────────────────────────────────────────
  const slide1 = pptx.addSlide();
  slide1.background = { color: dark.replace('#', '') };

  // Accent bar
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.08, h: 7.5,
    fill: { color: primary.replace('#', '') }, line: { color: primary.replace('#', '') },
  });

  // Name
  slide1.addText(data.fullName || 'Your Name', {
    x: 0.5, y: 1.8, w: 8, h: 1.2,
    fontSize: 48, bold: true, color: 'FFFFFF',
    fontFace: 'Helvetica Neue',
  });

  // Title
  slide1.addText(data.jobTitle || '', {
    x: 0.5, y: 3.1, w: 8, h: 0.6,
    fontSize: 20, color: primary.replace('#', ''),
    fontFace: 'Helvetica Neue',
  });

  // Bio
  if (data.bio) {
    slide1.addText(data.bio, {
      x: 0.5, y: 3.9, w: 9, h: 1.4,
      fontSize: 13, color: 'AAAAAA', wrap: true,
      fontFace: 'Helvetica Neue',
    });
  }

  // Contact row
  const contactParts = [data.email, data.phone, data.location].filter(Boolean);
  if (contactParts.length) {
    slide1.addText(contactParts.join('  •  '), {
      x: 0.5, y: 5.6, w: 10, h: 0.4,
      fontSize: 11, color: '888888', fontFace: 'Courier New',
    });
  }

  // Social links
  const socials = [data.linkedin, data.github, data.website, data.twitter].filter(Boolean);
  if (socials.length) {
    slide1.addText(socials.join('  ·  '), {
      x: 0.5, y: 6.1, w: 12, h: 0.4,
      fontSize: 10, color: primary.replace('#', ''), fontFace: 'Courier New',
    });
  }

  // FolioAI badge
  slide1.addText('Made with FolioAI', {
    x: 10.5, y: 7.0, w: 2.5, h: 0.35,
    fontSize: 8, color: '555555', align: 'right',
  });

  // ── SLIDE 2: Skills ────────────────────────────────────────────────────────
  if (data.skills.length > 0) {
    const slide2 = pptx.addSlide();
    slide2.background = { color: 'FAFAFA' };

    slide2.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.08,
      fill: { color: primary.replace('#', '') }, line: { color: primary.replace('#', '') },
    });

    slide2.addText('Skills & Expertise', {
      x: 0.5, y: 0.3, w: 10, h: 0.7,
      fontSize: 28, bold: true, color: dark.replace('#', ''),
      fontFace: 'Helvetica Neue',
    });

    // Render skills as tag-like text boxes, 4 per row
    const cols = 4;
    const tagW = 2.8, tagH = 0.42, gapX = 0.2, gapY = 0.18;
    const startX = 0.5, startY = 1.3;

    data.skills.forEach((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (tagW + gapX);
      const y = startY + row * (tagH + gapY);
      if (y + tagH > 7.2) return; // stop if overflows

      slide2.addShape(pptx.ShapeType.roundRect, {
        x, y, w: tagW, h: tagH, rectRadius: 0.08,
        fill: { color: primary.replace('#', '') + '22' },
        line: { color: primary.replace('#', ''), width: 1 },
      });
      slide2.addText(skill, {
        x, y, w: tagW, h: tagH,
        fontSize: 12, bold: true, color: primary.replace('#', ''),
        align: 'center', valign: 'middle', fontFace: 'Helvetica Neue',
      });
    });

    if (data.languages.length > 0) {
      slide2.addText('Languages: ' + data.languages.join(', '), {
        x: 0.5, y: 6.9, w: 12, h: 0.4,
        fontSize: 12, color: '666666', italic: true,
      });
    }
  }

  // ── SLIDES 3+: Work Experience ─────────────────────────────────────────────
  if (data.workExperience.length > 0) {
    const expSlide = pptx.addSlide();
    expSlide.background = { color: dark.replace('#', '') };

    expSlide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.08,
      fill: { color: primary.replace('#', '') }, line: { color: primary.replace('#', '') },
    });

    expSlide.addText('Work Experience', {
      x: 0.5, y: 0.3, w: 10, h: 0.7,
      fontSize: 28, bold: true, color: 'FFFFFF', fontFace: 'Helvetica Neue',
    });

    let yPos = 1.3;
    data.workExperience.slice(0, 4).forEach((exp) => {
      if (yPos > 6.8) return;

      // Company + dates row
      expSlide.addText(exp.company, {
        x: 0.5, y: yPos, w: 7, h: 0.4,
        fontSize: 15, bold: true, color: primary.replace('#', ''),
        fontFace: 'Helvetica Neue',
      });
      const dateStr = `${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}`;
      expSlide.addText(dateStr, {
        x: 9.5, y: yPos, w: 3.3, h: 0.4,
        fontSize: 11, color: '888888', align: 'right', fontFace: 'Courier New',
      });

      // Role
      expSlide.addText(exp.role, {
        x: 0.5, y: yPos + 0.38, w: 12, h: 0.35,
        fontSize: 13, color: 'DDDDDD', italic: true, fontFace: 'Helvetica Neue',
      });

      // Description (truncated)
      if (exp.description) {
        const desc = exp.description.replace(/[•\-\*]\s*/g, '').slice(0, 180) + (exp.description.length > 180 ? '…' : '');
        expSlide.addText(desc, {
          x: 0.5, y: yPos + 0.76, w: 12, h: 0.5,
          fontSize: 11, color: '999999', wrap: true, fontFace: 'Helvetica Neue',
        });
      }

      // Divider
      yPos += 1.5;
      if (yPos < 6.8) {
        expSlide.addShape(pptx.ShapeType.line, {
          x: 0.5, y: yPos - 0.1, w: 12.3, h: 0,
          line: { color: '333333', width: 0.5 },
        });
      }
    });
  }

  // ── SLIDE: Projects ────────────────────────────────────────────────────────
  if (data.projects.length > 0) {
    const projSlide = pptx.addSlide();
    projSlide.background = { color: 'FAFAFA' };

    projSlide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.08,
      fill: { color: primary.replace('#', '') }, line: { color: primary.replace('#', '') },
    });

    projSlide.addText('Featured Projects', {
      x: 0.5, y: 0.3, w: 10, h: 0.7,
      fontSize: 28, bold: true, color: dark.replace('#', ''), fontFace: 'Helvetica Neue',
    });

    const projPerRow = 2;
    const cardW = 5.8, cardH = 2.4, gapX = 0.4;
    const startX = 0.5, startY = 1.3;

    data.projects.slice(0, 4).forEach((proj, i) => {
      const col = i % projPerRow;
      const row = Math.floor(i / projPerRow);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + 0.3);
      if (y + cardH > 7.3) return;

      // Card bg
      projSlide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: cardW, h: cardH, rectRadius: 0.1,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 },
        shadow: { type: 'outer', blur: 6, offset: 3, angle: 90, color: '00000015' },
      });

      // Top accent bar
      projSlide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: cardW, h: 0.06, rectRadius: 0,
        fill: { color: primary.replace('#', '') }, line: { color: primary.replace('#', '') },
      });

      // Title
      projSlide.addText(proj.title, {
        x: x + 0.2, y: y + 0.18, w: cardW - 0.4, h: 0.45,
        fontSize: 14, bold: true, color: dark.replace('#', ''), fontFace: 'Helvetica Neue',
      });

      // Description
      const desc = (proj.description || '').slice(0, 140) + ((proj.description || '').length > 140 ? '…' : '');
      projSlide.addText(desc, {
        x: x + 0.2, y: y + 0.65, w: cardW - 0.4, h: 0.9,
        fontSize: 11, color: '666666', wrap: true, fontFace: 'Helvetica Neue',
      });

      // Tech tags
      if (proj.technologies?.length) {
        projSlide.addText(proj.technologies.slice(0, 4).join(' · '), {
          x: x + 0.2, y: y + 1.7, w: cardW - 0.4, h: 0.3,
          fontSize: 10, color: primary.replace('#', ''), bold: true, fontFace: 'Courier New',
        });
      }

      // Link
      if (proj.link) {
        projSlide.addText('↗ ' + proj.link.replace('https://', '').slice(0, 35), {
          x: x + 0.2, y: y + 2.05, w: cardW - 0.4, h: 0.25,
          fontSize: 9, color: '999999', fontFace: 'Courier New',
        });
      }
    });
  }

  // ── SLIDE: Education + Certs ───────────────────────────────────────────────
  if (data.education.length > 0 || data.certifications.length > 0) {
    const eduSlide = pptx.addSlide();
    eduSlide.background = { color: dark.replace('#', '') };

    eduSlide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.08,
      fill: { color: primary.replace('#', '') }, line: { color: primary.replace('#', '') },
    });

    eduSlide.addText('Education & Certifications', {
      x: 0.5, y: 0.3, w: 12, h: 0.7,
      fontSize: 28, bold: true, color: 'FFFFFF', fontFace: 'Helvetica Neue',
    });

    let yPos = 1.3;
    data.education.forEach((edu) => {
      if (yPos > 4.5) return;
      eduSlide.addText(`🎓 ${edu.degree}${edu.field ? ' in ' + edu.field : ''}`, {
        x: 0.5, y: yPos, w: 9, h: 0.4,
        fontSize: 15, bold: true, color: 'FFFFFF', fontFace: 'Helvetica Neue',
      });
      eduSlide.addText(edu.institution, {
        x: 0.5, y: yPos + 0.38, w: 9, h: 0.32,
        fontSize: 13, color: primary.replace('#', ''), fontFace: 'Helvetica Neue',
      });
      eduSlide.addText(`${edu.startYear} – ${edu.endYear}`, {
        x: 10, y: yPos, w: 3, h: 0.4,
        fontSize: 12, color: '888888', align: 'right', fontFace: 'Courier New',
      });
      yPos += 1.0;
    });

    if (data.certifications.length > 0) {
      yPos = Math.max(yPos, 4.8);
      eduSlide.addText('Certifications', {
        x: 0.5, y: yPos, w: 12, h: 0.4,
        fontSize: 14, bold: true, color: primary.replace('#', ''), fontFace: 'Helvetica Neue',
      });
      yPos += 0.45;
      data.certifications.slice(0, 4).forEach((cert) => {
        if (yPos > 7.1) return;
        eduSlide.addText(`🏆 ${cert.name} — ${cert.issuer} (${cert.date})`, {
          x: 0.5, y: yPos, w: 12, h: 0.32,
          fontSize: 12, color: 'CCCCCC', fontFace: 'Helvetica Neue',
        });
        yPos += 0.35;
      });
    }
  }

  // ── SLIDE: Contact / CTA ───────────────────────────────────────────────────
  const lastSlide = pptx.addSlide();
  lastSlide.background = { color: primary.replace('#', '') };

  lastSlide.addText("Let's Connect", {
    x: 1, y: 1.6, w: 11.33, h: 1.2,
    fontSize: 52, bold: true, color: 'FFFFFF',
    fontFace: 'Helvetica Neue', align: 'center',
  });

  const contactLines = [data.email, data.phone, data.linkedin, data.github, data.website]
    .filter(Boolean).join('  ·  ');

  lastSlide.addText(contactLines, {
    x: 1, y: 3.2, w: 11.33, h: 0.6,
    fontSize: 14, color: 'FFFFFF', align: 'center',
    fontFace: 'Courier New', charSpacing: 1,
  });

  lastSlide.addText(data.fullName + ' · ' + (data.jobTitle || ''), {
    x: 1, y: 4.1, w: 11.33, h: 0.5,
    fontSize: 16, color: 'FFFFFFbb', align: 'center',
    fontFace: 'Helvetica Neue', italic: true,
  });

  lastSlide.addText('Made with FolioAI', {
    x: 10.5, y: 7.05, w: 2.5, h: 0.35,
    fontSize: 8, color: 'FFFFFF88', align: 'right',
  });

  // ── SAVE ──────────────────────────────────────────────────────────────────
  await pptx.writeFile({ fileName: `${(data.fullName || 'portfolio').replace(/\s+/g, '-').toLowerCase()}-portfolio.pptx` });
}

