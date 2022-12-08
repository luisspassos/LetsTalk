import { HiDownload } from 'react-icons/hi';
import { Button } from '.';

export function DownloadButton() {
  function handleDownloadImage() {}

  return (
    <Button
      aria-label='Fazer download da imagem'
      icon={<HiDownload />}
      onClick={handleDownloadImage}
    />
  );
}
