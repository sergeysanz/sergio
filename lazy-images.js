const lazyItems = document.querySelectorAll('[data-lazy]');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      const type = img.dataset.lazy;
      const src = img.dataset.src;

      if (type === 'loader' && img.dataset.loader) {
        const loader = document.createElement('img');
        loader.src = img.dataset.loader;
        loader.style.position = 'absolute';
        loader.style.inset = '0';
        loader.style.margin = 'auto';
        loader.style.width = '48px';
        img.parentNode.appendChild(loader);

        img.onload = () => loader.remove();
      }

      img.src = src;
      img.onload = () => {
        img.parentNode.classList.add('loaded');
      };

      observer.unobserve(img);
    });
  },
  { threshold: 0.3 }
);

lazyItems.forEach(img => observer.observe(img));
