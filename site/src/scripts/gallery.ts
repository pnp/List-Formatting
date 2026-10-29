const form = document.querySelector<HTMLFormElement>('#filters');
const grid = document.querySelector<HTMLElement>('#sample-grid');
const count = document.querySelector<HTMLElement>('#result-count');
const sort = document.querySelector<HTMLSelectElement>('#sort');
const more = document.querySelector<HTMLButtonElement>('#load-more');
const empty = document.querySelector<HTMLElement>('#empty');
const chips = document.querySelector<HTMLElement>('#active-filters');
if (!form || !grid || !count || !sort || !more || !empty || !chips) throw new Error('Gallery controls could not be initialized.');

const controls = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input,select')];
const cards = [...grid.querySelectorAll<HTMLElement>('[data-sample-card]')].map((element) => ({
  element,
  fields: JSON.parse(element.dataset.fields ?? '{}') as Record<string, string[]>,
}));
const tiles = [...document.querySelectorAll<HTMLButtonElement>('[data-type]')];
const panel = document.querySelector<HTMLDetailsElement>('.filter-panel');
if (panel && matchMedia('(max-width: 760px)').matches) panel.open = false;
let limit = 18;

function restore() {
  const query = new URLSearchParams(location.search);
  for (const control of controls) {
    const value = query.get(control.name) ?? '';
    control.value = control instanceof HTMLSelectElement && ![...control.options].some((option) => option.value === value) ? '' : value;
  }
  const requestedSort = query.get('sort');
  sort!.value = ['updated', 'created', 'title'].includes(requestedSort ?? '') ? requestedSort! : 'updated';
  limit = Math.max(18, Math.min(cards.length, Number(query.get('limit')) || 18));
  const advanced = form!.querySelector<HTMLDetailsElement>('.advanced-filters');
  if (advanced && [...advanced.querySelectorAll('select')].some((select) => select.value)) advanced.open = true;
}

function apply(updateUrl = true) {
  const selections = controls.filter((control) => control.value.trim());
  const matches = cards.filter(({ element, fields }) => selections.every((control) => {
    const value = control.value.trim().toLowerCase();
    if (control.name === 'q') return element.dataset.search?.includes(value);
    if (control.name === 'type') return element.dataset.family === value;
    if (control.name === 'author') return element.dataset.authors?.split('|').includes(value);
    return (fields[control.dataset.key ?? ''] ?? []).some((entry) => entry.toLowerCase() === value);
  }));
  matches.sort((a, b) => sort!.value === 'title'
    ? (a.element.dataset.title ?? '').localeCompare(b.element.dataset.title ?? '')
    : (b.element.dataset[sort!.value] ?? '').localeCompare(a.element.dataset[sort!.value] ?? '') ||
      (a.element.dataset.title ?? '').localeCompare(b.element.dataset.title ?? ''));
  for (const { element } of cards) element.hidden = true;
  matches.forEach(({ element }, index) => {
    element.hidden = index >= limit;
    grid!.append(element);
  });
  count!.textContent = `Showing ${Math.min(limit, matches.length)} of ${matches.length} samples`;
  more!.hidden = matches.length <= limit;
  empty!.hidden = matches.length > 0;
  const family = controls.find((control) => control.name === 'type')?.value ?? '';
  for (const tile of tiles) {
    const active = tile.dataset.type === family;
    tile.classList.toggle('is-active', active);
    tile.setAttribute('aria-pressed', String(active));
  }
  chips!.replaceChildren();
  for (const control of selections) {
    const button = document.createElement('button');
    const label = control instanceof HTMLSelectElement ? control.selectedOptions[0].textContent : control.value;
    button.textContent = `${label} ×`;
    button.type = 'button';
    button.setAttribute('aria-label', `Remove ${label} filter`);
    button.addEventListener('click', () => { control.value = ''; limit = 18; apply(); });
    chips!.append(button);
  }
  if (updateUrl) {
    const query = new URLSearchParams();
    for (const control of selections) query.set(control.name, control.value);
    if (sort!.value !== 'updated') query.set('sort', sort!.value);
    if (limit > 18) query.set('limit', String(limit));
    const url = `${location.pathname}${query.size ? `?${query}` : ''}${location.hash}`;
    if (url !== `${location.pathname}${location.search}${location.hash}`) history.pushState(null, '', url);
  }
}
restore();
apply(false);
form.addEventListener('submit', (event) => event.preventDefault());
form.addEventListener('input', () => { limit = 18; apply(); });
form.addEventListener('reset', () => { setTimeout(() => { limit = 18; apply(); }); });
sort.addEventListener('change', () => { limit = 18; apply(); });
more.addEventListener('click', () => { limit += 18; apply(); });
document.querySelector('#empty-reset')?.addEventListener('click', () => form.reset());
for (const tile of tiles) tile.addEventListener('click', () => {
  const family = controls.find((control) => control.name === 'type');
  if (family) family.value = tile.dataset.type ?? '';
  limit = 18;
  apply();
});
addEventListener('popstate', () => { restore(); apply(false); });
