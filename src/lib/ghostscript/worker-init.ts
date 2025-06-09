export const COMPRESS_ACTION = 'compress-pdf';
export const PROTECT_ACTION = 'protect-pdf';

export async function compressWithGhostScript(dataStruct: {
  psDataURL: string;
}): Promise<string> {
  const worker = getWorker();
  worker.postMessage({
    data: { ...dataStruct, type: COMPRESS_ACTION },
    target: 'wasm'
  });
  return getListener(worker);
}

export async function protectWithGhostScript(dataStruct: {
  psDataURL: string;
}): Promise<string> {
  const worker = getWorker();
  worker.postMessage({
    data: { ...dataStruct, type: PROTECT_ACTION },
    target: 'wasm'
  });
  return getListener(worker);
}

const getListener = (worker: Worker): Promise<string> => {
  return new Promise((resolve) => {
    const listener = (e: MessageEvent) => {
      resolve(e.data);
      worker.removeEventListener('message', listener);
      setTimeout(() => worker.terminate(), 0);
    };
    worker.addEventListener('message', listener);
  });
};

const getWorker = () => {
  return new Worker(new URL('./background-worker.js', import.meta.url), {
    type: 'module'
  });
};
