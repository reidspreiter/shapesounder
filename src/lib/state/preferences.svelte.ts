const STORAGE_KEY = "preferences";

export interface Preferences {
  darkMode: boolean;
}

const defaultPreferences: Preferences = {
  darkMode: true,
};

export const preferences = $state<Preferences>(defaultPreferences);

const load = () => {
  const savedPrefs = localStorage.getItem(STORAGE_KEY);

  let parsedPrefs = null;
  if (savedPrefs !== null) {
    try {
      parsedPrefs = JSON.parse(savedPrefs);
    } catch {
      // ignore
    }
  }

  if (parsedPrefs !== null) {
    Object.assign(preferences, parsedPrefs);
  } else {
    // Because the app is mostly white to represent sheet music, only default to light
    // mode if the system preference wants it
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    preferences.darkMode = prefersDark;
  }
};

load();

const isDark = $derived(preferences.darkMode);

$effect.root(() => {
  $effect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  });

  $effect(() => {
    document.querySelector("html")?.setAttribute("data-theme", isDark ? "dark" : "light");
  });
});
