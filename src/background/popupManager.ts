import { v4 as uuid } from 'uuid';

const ACTIVE_POPUP_KEY = 'activePopup';

export async function setActivePopup(): Promise<string> {
  const id = uuid();
  await chrome.storage.local.set({ [ACTIVE_POPUP_KEY]: id });
  return id;
}

export async function isPopupActive(id: string): Promise<boolean> {
  const result = await chrome.storage.local.get([ACTIVE_POPUP_KEY]);
  return id === result[ACTIVE_POPUP_KEY];
}
