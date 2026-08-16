document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (menuBtn && navLinks) {
    // Fonction de bascule du menu
    const toggleMenu = (state) => {
      const isOpen = state !== undefined ? state : !navLinks.classList.contains('open');
      navLinks.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen.toString());
    };

    // Clic sur le bouton Hamburger
    menuBtn.addEventListener('click', () => toggleMenu());

    // Fermer le menu lors du clic sur un lien
    links.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Boutons interactifs de copie d'email / téléphone
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy');
      const copyTextSpan = button.querySelector('.copy-text');
      const originalText = copyTextSpan ? copyTextSpan.textContent : 'Copier';

      try {
        await navigator.clipboard.writeText(textToCopy);

        button.classList.add('copied');
        if (copyTextSpan) copyTextSpan.textContent = 'Copié !';

        setTimeout(() => {
          button.classList.remove('copied');
          if (copyTextSpan) copyTextSpan.textContent = originalText;
        }, 2000);
      } catch (err) {
        // Fallback pour navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        button.classList.add('copied');
        if (copyTextSpan) copyTextSpan.textContent = 'Copié !';

        setTimeout(() => {
          button.classList.remove('copied');
          if (copyTextSpan) copyTextSpan.textContent = originalText;
        }, 2000);
      }
    });
  });
});