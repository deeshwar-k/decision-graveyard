import os, re
files = ['home page.html', 'Decision_form.html', 'Timeline page.html', 'insights.html', 'lessons.html', 'settings.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '<div class="header-left">' not in content:
        pattern = re.compile(r'<a href="[^"]*" class="header-logo">Decision <span>Graveyard</span></a>')
        replacement = '''<div class="header-left">
                <button id="mobileMenuBtn" class="mobile-menu-btn" aria-label="Toggle Menu">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <a href="home page.html" class="header-logo">Decision <span>Graveyard</span></a>
            </div>'''
        content = pattern.sub(replacement, content, count=1)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')
    else:
        print(f'{f} already has header-left')