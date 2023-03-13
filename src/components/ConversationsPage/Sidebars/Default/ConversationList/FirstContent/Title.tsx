import { Base } from 'components/ConversationsPage/Sidebars/ConversationsListBase/FirstContent/Title';
import { useFontSizeBasedOnMeasurement } from 'hooks/useFontSizeBasedOnMeasurement';
import { useRef } from 'react';

export function Title() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { fontSize } = useFontSizeBasedOnMeasurement(
    ref.current?.parentElement,
    9.2
  );

  return <Base componentRef={ref} fontSize={fontSize} />;
}
