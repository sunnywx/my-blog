import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';

const urlsToCache=getFiles()

setupRouting();
setupPrecaching(urlsToCache);
