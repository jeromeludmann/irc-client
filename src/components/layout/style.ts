import styled from "styled-components";

const navigationBoxWidth = 150;
const inputBoxHeight = 30;

export const NavBox = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${navigationBoxWidth}px;
  padding: 0 5px;
  border-right: 1px solid #ddd;
  overflow-x: hidden;
  overflow-y: auto;

  /* debug */
  /* border: 1px dashed blue; */
`;

export const ChatBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${navigationBoxWidth}px;

  /* debug */
  /* border: 1px dashed red;  */
`;

export const MessagesBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${inputBoxHeight}px;
  overflow-x: hidden;
  overflow-y: auto;

  /* debug */
  /* border: 2px dashed green; */
`;

export const InputBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${inputBoxHeight}px;
  border-top: 1px dotted #ddd;

  /* debug */
  /* border: 2px dashed yellow; */
`;
