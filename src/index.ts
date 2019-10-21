import { AudioSync } from './audio-sync';

window['audioSync'] = (sources) => new AudioSync(sources);
