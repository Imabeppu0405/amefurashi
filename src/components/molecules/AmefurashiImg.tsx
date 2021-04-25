import { Image } from "@chakra-ui/image";
import styled, { keyframes } from "styled-components";
import { useLoginUser } from "../../hooks/useLoginUser";
import umiushi from "../../img/umiushi.png";

export const AmefurashiImg = () => {
  const { loginUser } = useLoginUser();
  return (
    <AnimBox style={{ width: `${loginUser?.width}px` }}>
      <Image src={umiushi} w="100%"/>
    </AnimBox>
  )
}

const sway = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  15% {
    transform: translate(-40%, -45%);
  }
  40% {
    transform: translate(-60%, -38%);
  }
  55% {
    transform: translate(-62%, -48%);
  }
  70% {
    transform: translate(-45%, -60%);
  }
  90% {
    transform: translate(-47%, -47%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;

const AnimBox = styled.div`
  animation-name: ${sway}; 
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-duration: 30s;
  max-width: 2000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;