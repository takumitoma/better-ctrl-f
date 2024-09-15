import { useState, useEffect } from 'react';

function isUrlValid(url: string | undefined): boolean {
  if (!url) return false;
  if (url.includes('chrome://')) {
    return false;
  }

  const invalidExtensions = [
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
  ];

  return !invalidExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

async function isContentInjected(tabId: number): Promise<boolean> {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        return (window as any).isBetterCtrlFInjected === true;
      },
    });
    return results[0]?.result || false;
  } catch (error) {
    return false;
  }
}

// return true if injection successful or already injected
// return false otherwise
async function injectContent(tabId: number): Promise<boolean> {
  const isInjected = await isContentInjected(tabId);
  if (isInjected) return true;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content/content.js'],
    });

    await chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ['content/content.css'],
    });

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        (window as any).isBetterCtrlFInjected = true;
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export function useContentScriptInject(): boolean {
  const [contentInjected, setContentInjected] = useState<boolean>(false);

  useEffect(() => {
    const injectScript = async () => {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (tabs[0]?.id && isUrlValid(tabs[0].url)) {
          const result = await injectContent(tabs[0].id);
          setContentInjected(result);
        }
      });
    };

    injectScript();
  }, []);

  return contentInjected;
}
