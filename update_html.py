import os, re
files = ['home page.html', 'Decision_form.html', 'Timeline page.html', 'insights.html', 'lessons.html', 'settings.html']

header_old = '<a href="home page.html" class="header-logo">Decision <span>Graveyard</span></a>'
header_new = '''<div class="header-left">
            <button id="mobileMenuBtn" class="mobile-menu-btn" aria-label="Toggle Menu">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <a href="home page.html" class="header-logo">Decision <span>Graveyard</span></a>
        </div>'''

js_inject = '''
    <script>
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.querySelector('nav');
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('open');
            });
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navMenu.classList.remove('open');
                }
            });
        }
    </script>
</body>'''

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if 'id="mobileMenuBtn"' not in content:
        content = content.replace(header_old, header_new)
        content = content.replace('</body>', js_inject)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')