export const initialValue = '0:00';

export function formatAudioTime(secs: number) {
  const hr = Math.floor(secs / 3600);
  const min = Math.floor((secs - hr * 3600) / 60);
  let sec: number | string = Math.floor(secs - hr * 3600 - min * 60);

  if (sec < 10) {
    sec = '0' + sec;
  }

  return min + ':' + sec; // 0:00;
}
