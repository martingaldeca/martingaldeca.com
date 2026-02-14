import re
import os
import shutil
import sys

# ── Configuration ────────────────────────────────────────────────────────────

ESSAYS = {
    'queja-y-propuesta': {
        'source_dir': 'Queja_y_propuesta',
        'chapter': '01-Queja',
        'bib_chapter': None,
    },
    'disertacion-sobre-la-entropia': {
        'source_dir': 'Disertación_sobre_la_entropía',
        'chapter': '01-Disertación',
        'bib_chapter': None,
    },
    'debate-interno-sobre-el-mal': {
        'source_dir': 'Debate_interno_sobre_el_mal',
        'chapter': '01-Escrito',
        'bib_chapter': '02-Bibliografia',
    },
    'valencia-inundada': {
        'source_dir': 'Valencia_inundada',
        'chapter': '01-Escrito',
        'bib_chapter': '02-Bibliografia',
    },
    'la-religion-y-la-politica': {
        'source_dir': 'La_religión_y_la_política',
        'chapter': '01-Escrito',
        'bib_chapter': '02-Bibliografia',
    },
    'el-caso-de-begona-gomez': {
        'source_dir': 'El_caso_de_Begoña_Gomez',
        'chapter': '01-Escrito',
        'bib_chapter': '02-Bibliografia',
    },
    'el-liberal-libertario': {
        'source_dir': 'El_liberal_libertario',
        'chapter': '01-Escrito',
        'bib_chapter': '00-Bibliografia',
    },
}

BASE = "src/assets/essays"
OUTPUT = "src/content/essays"
PUBLIC_IMAGES = "public/images/essays"


def copy_images(source_dir, slug):
    """Copy images from essay source to public directory."""
    img_src = os.path.join(BASE, source_dir, 'Imagenes')
    img_dst = os.path.join(PUBLIC_IMAGES, slug)

    if not os.path.exists(img_src):
        print(f"  ⚠️  No Imagenes dir for {slug}")
        return

    os.makedirs(img_dst, exist_ok=True)
    for fname in os.listdir(img_src):
        src_file = os.path.join(img_src, fname)
        dst_file = os.path.join(img_dst, fname)
        if os.path.isfile(src_file) and not os.path.exists(dst_file):
            shutil.copy2(src_file, dst_file)
            print(f"  📷 Copied {fname}")


def strip_latex_formatting(text):
    """Remove LaTeX formatting commands from text."""
    for _ in range(10):
        prev = text
        text = re.sub(r'\\textit\{([^{}]+)\}', r'\1', text)
        text = re.sub(r'\\textbf\{([^{}]+)\}', r'\1', text)
        text = re.sub(r'\\textsc\{([^{}]+)\}', r'\1', text)
        text = re.sub(r'\\emph\{([^{}]+)\}', r'\1', text)
        if text == prev:
            break
    return text.strip()


def parse_bibliography(bib_content):
    """Parse LaTeX bibliography into structured data."""
    entries = bib_content.split('\\bibitem{')[1:]
    key_to_num = {}
    references_items = []
    counter = 1

    for entry in entries:
        key_end = entry.find('}')
        if key_end == -1:
            continue
        key = entry[:key_end].strip()
        rest = entry[key_end + 1:]

        href_match = re.search(r'\\href\s*\{([^}]+)\}\s*\{([^}]+)\}', rest, re.DOTALL)
        site_match = re.search(r'\\textsc\s*\{([^}]+)\}', rest)

        url = ""
        title = ""
        site = ""

        if href_match:
            url = href_match.group(1).strip()
            title = href_match.group(2).replace('\n', ' ').replace('  ', ' ').strip()
        if site_match:
            site = site_match.group(1).strip()

        # Handle case where textsc comes before href (some essays have this order)
        if not title and site_match:
            title_from_sc = site_match.group(1).strip()
            if not href_match:
                title = title_from_sc
            elif not title:
                title = title_from_sc

        # Some entries have textsc as the title and href as the link label
        if href_match and site_match:
            # Check order - if textsc comes first, it's the description
            sc_pos = rest.find('\\textsc')
            href_pos = rest.find('\\href')
            if sc_pos < href_pos and sc_pos != -1:
                desc = site_match.group(1).strip()
                link_title = href_match.group(2).replace('\n', ' ').replace('  ', ' ').strip()
                title = desc
                site = link_title
            else:
                title = href_match.group(2).replace('\n', ' ').replace('  ', ' ').strip()
                site = site_match.group(1).strip()

        # Strip any remaining LaTeX formatting from title and site
        title = strip_latex_formatting(title)
        site = strip_latex_formatting(site)

        if url or title:
            key_to_num[key] = counter
            references_items.append((counter, title, url, site))
            counter += 1

    return key_to_num, references_items


def build_references_md(references_items):
    """Build the references section HTML."""
    if not references_items:
        return ''

    md = '\n\n## Referencias\n\n<div class="references-list">\n\n'
    for num, title, url, site in references_items:
        if url:
            md += f'<p id="ref-{num}" class="reference-item"><span class="ref-num">[{num}]</span> <a href="{url}" target="_blank" rel="noopener noreferrer">{title}</a>, <span class="ref-site">{site}</span></p>\n\n'
        else:
            md += f'<p id="ref-{num}" class="reference-item"><span class="ref-num">[{num}]</span> {title}, <span class="ref-site">{site}</span></p>\n\n'
    md += '</div>\n'
    return md


def convert_content(content, slug, key_to_num):
    """Convert LaTeX content to Markdown with HTML."""

    # Strip LaTeX indentation (prevents markdown code blocks)
    content = re.sub(r'^[ \t]+', '', content, flags=re.MULTILINE)

    # Remove title block (\center{...} format)
    content = re.sub(r'\\center\{[^}]*\{[^}]*\{[^}]*\}\}\}', '', content)
    # Remove \begin{center}...\end{center} title blocks
    content = re.sub(r'\\begin\{center\}.*?\\end\{center\}', '', content, flags=re.DOTALL)

    # Remove structural commands
    content = content.replace('\\justifying', '')
    content = re.sub(r'\\label\{[^}]+\}', '', content)
    content = content.replace('\\noindent', '')
    content = content.replace('\\newpage', '')
    content = content.replace('\\clearpage', '')

    # Convert sections → markdown headers
    content = re.sub(r'\\section\*?\{([^}]+)\}', r'\n\n## \1\n\n', content)
    content = re.sub(r'\\subsection\*?\{([^}]+)\}', r'\n\n### \1\n\n', content)

    # Convert itemize environments
    content = re.sub(r'\\begin\{itemize\}', '', content)
    content = re.sub(r'\\end\{itemize\}', '', content)
    content = re.sub(r'\\item\[[-•]\]', '- ', content)
    content = re.sub(r'\\item', '- ', content)

    # Citations → navigable links
    def replace_cite(match):
        keys = match.group(1).strip()
        result = ''
        for key in keys.split(','):
            key = key.strip()
            if key in key_to_num:
                n = key_to_num[key]
                result += f'<a href="#ref-{n}" class="citation-link"><sup>[{n}]</sup></a>'
            else:
                result += f'[{key}]'
        return result
    content = re.sub(r'\\cite\{([^}]+)\}', replace_cite, content)

    # href → markdown links
    content = re.sub(r'\\href\{([^}]+)\}\{([^}]+)\}', r'[\2](\1)', content)

    # LaTeX math — preserve $...$ delimiters for KaTeX rendering
    # (no transformation needed; remark-math handles $...$ natively)

    # Euro symbol
    content = content.replace('\\euro{}', '€')

    # Text styling (iterative for nested macros)
    for _ in range(10):
        prev = content
        content = re.sub(r'\\textbf\{([^{}]+)\}', r'**\1**', content)
        content = re.sub(r'\\textit\{([^{}]+)\}', r'*\1*', content)
        content = re.sub(r'\\LARGE\{([^{}]+)\}', r'\1', content)
        content = re.sub(r'\\textsc\{([^{}]+)\}', r'\1', content)
        content = re.sub(r'\\emph\{([^{}]+)\}', r'*\1*', content)
        if content == prev:
            break

    # Quotes
    content = content.replace("''", '"')
    content = content.replace("``", '"')

    # ── Process Figures ──────────────────────────────────────────────

    def img_path(raw):
        return raw.replace('Imagenes/', f'/images/essays/{slug}/')

    parts = re.split(r'(\\begin\{figure\}(?:\[.*?\])?.*?\\end\{figure\})', content, flags=re.DOTALL)
    final = ""

    for part in parts:
        if part.startswith('\\begin{figure}'):
            if 'minipage' in part:
                minis = re.findall(r'\\begin\{minipage\}.*?\\end\{minipage\}', part, re.DOTALL)
                final += '\n<div class="figure-grid">\n'
                for mp in minis:
                    si = re.search(r'\\includegraphics(?:\[.*?\])?\{([^}]+)\}', mp)
                    sc = re.search(r'\\caption\{([^}]+)\}', mp)
                    if si:
                        p = img_path(si.group(1))
                        c = sc.group(1).replace('\n', ' ').strip() if sc else ""
                        final += f'<figure class="essay-figure">\n<img src="{p}" alt="{c}" />\n<figcaption>{c}</figcaption>\n</figure>\n'
                final += '</div>\n\n'
            else:
                imgs = re.findall(r'\\includegraphics(?:\[.*?\])?\{([^}]+)\}', part)
                cap = re.search(r'\\caption\{([^}]+)\}', part, re.DOTALL)
                caption = cap.group(1).replace('\n', ' ').strip() if cap else ""
                for im in imgs:
                    p = img_path(im)
                    final += f'\n<figure class="essay-figure">\n<img src="{p}" alt="{caption}" />\n<figcaption>{caption}</figcaption>\n</figure>\n\n'
        else:
            # Handle standalone \includegraphics (e.g. signature)
            text = re.sub(
                r'\\includegraphics(?:\[.*?\])?\{([^}]+)\}',
                lambda m: f'\n<figure class="essay-figure essay-signature">\n<img src="{img_path(m.group(1))}" alt="" />\n</figure>\n',
                part
            )
            final += text

    # Final cleanup
    final = final.replace('\\centering', '').replace('\\hfill', '')
    final = re.sub(r'\n{3,}', '\n\n', final)

    return final


def convert_essay(slug, config):
    """Convert a single essay from LaTeX to Markdown."""
    source_dir = config['source_dir']
    chapter = config['chapter']
    bib_chapter = config['bib_chapter']

    escrito_path = os.path.join(BASE, source_dir, 'Capitulos', f'{chapter}.tex')
    output_path = os.path.join(OUTPUT, f'{slug}.md')

    if not os.path.exists(escrito_path):
        print(f"❌ Source not found: {escrito_path}")
        return False

    with open(escrito_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Parse bibliography if available
    key_to_num = {}
    references_items = []
    if bib_chapter:
        bib_path = os.path.join(BASE, source_dir, 'Capitulos', f'{bib_chapter}.tex')
        if os.path.exists(bib_path):
            with open(bib_path, 'r', encoding='utf-8') as f:
                bib_content = f.read()
            key_to_num, references_items = parse_bibliography(bib_content)

    # Convert content
    final = convert_content(content, slug, key_to_num)

    # Add references
    references_md = build_references_md(references_items)
    final += references_md

    # Write output
    os.makedirs(OUTPUT, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final)

    print(f"✅ {slug}: {len(final)} bytes → {output_path}")
    print(f"   {len(key_to_num)} references mapped")

    # Copy images
    copy_images(source_dir, slug)

    return True


if __name__ == "__main__":
    # If specific slugs provided as args, only convert those
    if len(sys.argv) > 1:
        slugs = sys.argv[1:]
    else:
        slugs = list(ESSAYS.keys())

    success = 0
    for slug in slugs:
        if slug in ESSAYS:
            print(f"\n{'─' * 60}")
            print(f"Converting: {slug}")
            if convert_essay(slug, ESSAYS[slug]):
                success += 1
        else:
            print(f"❌ Unknown essay: {slug}")

    print(f"\n{'═' * 60}")
    print(f"Done! {success}/{len(slugs)} essays converted.")
