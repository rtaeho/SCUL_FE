import { useEffect, useRef, useState } from 'react';
import * as Styled from './Styled';

export const AdjustInput = ({ placeholder, onValueChange, formatValue }) => {
  const [value, setValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [width, setWidth] = useState(0);
  const [focused, setFocused] = useState(false);

  const mirrorRef = useRef(null);

  useEffect(() => {
    setWidth(mirrorRef.current.clientWidth);
  }, [displayValue]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    if (value) {
      const formattedValue = formatValue ? formatValue(value) : value;
      setDisplayValue(formattedValue);
    }
  };

  // 부모 컴포넌트로 값 전달
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(newValue)) {
      setValue(newValue);
      onValueChange(newValue);
      setDisplayValue(newValue); // 포커스시 raw value 표시
    }
  };

  return (
    <>
      <Styled.Input
        width={width}
        value={focused ? value : displayValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Styled.InputMirror ref={mirrorRef} aria-hidden>
        {focused ? value : displayValue || placeholder}
      </Styled.InputMirror>
    </>
  );
};
