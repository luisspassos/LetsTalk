import { RefObject, useEffect, useState } from 'react';
import { resizeObserver } from 'utils/resizeObserver';

type Element = HTMLElement | undefined | null;
type Ref = RefObject<HTMLElement>;

type Measure = Ref | Element | number;

/**
 * A React hook that returns a font size based on the sent measurement
 *
 * @param measurement Usually it's a width, height or ref. If it's a ref, then the measurement will be a width of the element.
 * @param valueThatDividesMeasurement A number that is a divisor of the measurement. If the sent value is a bigger number, it will return a smaller font size. If the value is a smaller number, it will return a bigger font size.
 */

export function useFontSizeBasedOnMeasurement(
  measurement: Measure,
  valueThatDividesMeasure: number
) {
  const [fontSize, setFontSize] = useState('1rem');

  useEffect(() => {
    function getFontSize(width: number) {
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      const newFontSize = width / valueThatDividesMeasure / rem;

      const fontSize = newFontSize + 'rem';

      setFontSize(fontSize);
    }

    const isWidth = typeof measurement === 'number';

    if (isWidth) {
      getFontSize(measurement);

      return;
    }

    if (!measurement) return;

    const isNotRef = measurement instanceof HTMLElement;

    const element = isNotRef ? measurement : measurement.current;

    if (element === null) return;

    const callback = () => {
      const width = element?.offsetWidth;

      getFontSize(width);
    };

    const { unobserve } = resizeObserver(callback, element);

    return () => {
      unobserve();
    };
  }, [measurement, valueThatDividesMeasure]);

  return { fontSize };
}
