import styled from "styled-components";
import ChallengeBtn from "../assets/ChallengeBtn.png";

export default function EnvProtectEffect({ effects }) {
  return (
    <EffectContainer>
      {effects.map((effect, index) => (
        <EffectItem key={index}>
          <EffectBox src={ChallengeBtn} alt="챌린지 버튼" />
          <EffectTextMain>{effect.title}</EffectTextMain>
          <EffectTextSub>{effect.content}</EffectTextSub>
        </EffectItem>
      ))}
    </EffectContainer>
  );
}


const EffectContainer = styled.div`
  width: 373px;
  display: flex;
  flex-direction: row;
  padding: 2.5px 1px 1px 1px;
  justify-content: space-between;
  /* align-items: center; */
  border-radius: 5px;
  background: #261B18;
  box-shadow: 0 4px 0 0 #261B18;
  margin-bottom: 20px;
`;

const EffectItem = styled.div`
  position: relative;
  width: 183px;
  height: 50px;
`;

const EffectBox = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const EffectTextMain = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-weight: 800;
  line-height: 22px;
  color: #FFF8E8;
`;

const EffectTextSub = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 10px;
  font-weight: 800;
  color: #FFF8E8;
`;