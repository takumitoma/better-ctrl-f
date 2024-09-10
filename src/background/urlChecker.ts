export function checkIsSpecialized(url: string): boolean {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname.toLowerCase();
  const hostname = urlObj.hostname.toLowerCase();

  // file checking
  const specializedFiles = [
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
  ];
  if (specializedFiles.some((file) => pathname.endsWith(file))) {
    return true;
  }

  // app checking
  const specializedApps = [
    {
      host: 'docs.google.com',
      paths: ['/document', '/spreadsheets', '/presentation'],
    },
    {
      host: 'office.com',
      paths: ['/launch/word', '/launch/excel', '/launch/powerpoint'],
    },
    { host: 'office.live.com', paths: ['/word', '/excel', '/powerpoint'] },
    { host: 'acrobat.adobe.com', paths: ['/link/review'] },
  ];

  for (const domain of specializedApps) {
    if (
      hostname === domain.host &&
      domain.paths.some((path) => pathname.startsWith(path))
    ) {
      return true;
    }
  }

  return false;
}
