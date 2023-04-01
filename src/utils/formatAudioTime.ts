export const initialValue = '0:00';

export function formatAudioTime(secs: number) {
  const hr = Math.floor(secs / 3600);
  let min: number | string = Math.floor((secs - hr * 3600) / 60);
  let sec: number | string = Math.floor(secs - hr * 3600 - min * 60);

  if (sec < 10) {
    sec = '0' + sec;
  }

  if (hr !== 0) {
    if (min < 10) {
      min = '0' + min;
    }

    return hr + ':' + min + ':' + sec; // 0:00:00;
  }

  return min + ':' + sec; // 0:00
}
