import styled from 'styled-components';

export const Input = styled.input`
  ${({ width }) => `width: ${width}px;`}
  text-align: left;
  outline: none;

  padding: 0;
  border: none;
  box-sizing: content-box;
  font-size: inherit;
`;

export const InputMirror = styled.div`
  display: inline-block;
  visibility: hidden;
  height: 0;
  white-space: pre;

  font-size: inherit;
  padding: 0;
  box-sizing: content-box;
  position: absolute;
`;
