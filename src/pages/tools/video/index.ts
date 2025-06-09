import { gifTools } from './gif';
import { tool as trimVideo } from './trim/meta';
import { tool as rotateVideo } from './rotate/meta';
import { tool as compressVideo } from './compress/meta';
import { tool as loopVideo } from './loop/meta';
import { tool as flipVideo } from './flip/meta';
import { tool as cropVideo } from './crop-video/meta';
import { tool as changeSpeed } from './change-speed/meta';

export const videoTools = [
  ...gifTools,
  trimVideo,
  rotateVideo,
  compressVideo,
  loopVideo,
  flipVideo,
  cropVideo,
  changeSpeed
];
