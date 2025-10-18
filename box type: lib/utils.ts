export function ensureLightMode(): void {
  if (typeof window === 'undefined') return;
  try {
    // Remove dark class if any and set a safe background to avoid flashes
    document.documentElement.classList.remove('dark');
    document.documentElement.style.backgroundColor = '#F2F2F2';
    document.body.style.backgroundColor = '#F2F2F2';
  } catch (e) {
    // noop in non-browser environments
  }
}
