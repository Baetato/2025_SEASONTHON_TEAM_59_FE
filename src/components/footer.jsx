import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

import footerImg from "../assets/bottomTab.svg";
import iconStore from "../assets/icon-store.svg";
import iconChallenge from "../assets/icon-challenge.svg";
import leafUpLogo from "../assets/footer-logo.svg";
import iconRanking from "../assets/icon-ranking.svg";
import iconFriend from "../assets/icon-friend.svg";

export default function Footer() {
  const navigate = useNavigate();

  const items = [
    { id: "store",     label: "가게",   icon: iconStore,     path: "/store" },
    { id: "challenge", label: "챌린지", icon: iconChallenge, path: "/challenge" },
    { id: "home",      label: "리프업", icon: leafUpLogo,    path: "/", isHome: true },
    { id: "ranking",   label: "랭킹",   icon: iconRanking,   path: "/ranking" },
    { id: "friend",    label: "친구",   icon: iconFriend,    path: "/friends" },
  ];

  const onKey = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <FooterRoot role="contentinfo" aria-label="하단 탭 바">
      <Content>
        {items.map((it) => (
          <Item
            key={it.id}
            role="button"
            tabIndex={0}
            aria-label={it.label}
            onClick={() => navigate(it.path)}
            onKeyDown={(e) => onKey(e, it.path)}
          >
            {it.isHome ? (
              <HomeLogo src={it.icon} alt={it.label} draggable={false} />
            ) : (
              <Icon src={it.icon} alt={it.label} draggable={false} />
            )}
            <Label>{it.label}</Label>
          </Item>
        ))}
      </Content>
      <Bg src={footerImg} alt="" aria-hidden="true" />
    </FooterRoot>
  );
}

/* ===== styled ===== */

const FooterRoot = styled.footer`
  position: fixed;
  width: 393px;
  height: 101px; /* footerImg 실제 높이 */
  z-index: 1000;
`;

const Bg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`;

const Content = styled.nav`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: end;
  justify-items: center;
  padding: 0 12px 10px;
  box-sizing: border-box;
  gap: 14px;
  /* 배경과 정확히 겹치고 싶으면 필요 시 미세 보정값 사용
     transform: translateX(-6px); */
`;

const Item = styled.div`
  display: grid;
  place-items: center;
  grid-auto-rows: max-content;
  gap: 2px;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  outline: none;

  /* 아이콘과 라벨이 살짝 겹치도록 */
  & > span {
    margin-top: -6px;
  }

  /* 호버/포커스 시 아이콘 애니메이션 */
  &:hover img,
  &:focus-visible img {
    transform: translateY(-3px) scale(1.06);
    filter: brightness(1.06) drop-shadow(0 0 6px rgba(255,213,125,.35));
  }

  /* 클릭 시 눌림 느낌 */
  &:active img {
    transform: translateY(0) scale(0.96);
    filter: brightness(0.98);
  }
`;

const baseLabel = css`
  z-index: 2;
  text-align: center;
  -webkit-text-stroke-width: 0.8px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 110% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  pointer-events: none;
`;

const Label = styled.span`
  ${baseLabel}
`;

/* 일반 아이콘 */
const Icon = styled.img`
  width: 55px;
  height: auto;
  margin-bottom: 0px; /* 라벨과 살짝 겹치게 */
  object-fit: contain;
  display: block;
  filter: brightness(.95);
  user-select: none;
  transition: transform .18s ease, filter .18s ease;
`;

/* 중앙 홈 로고(조금 더 큼, 개별 오프셋) */
const HomeLogo = styled.img`
  height: 68px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 2px 0 #382C28);
  user-select: none;
  margin-bottom: 7px; /* 로고만 별도 보정 */
  transition: transform .18s ease, filter .18s ease;
`;

// import styled, { css } from "styled-components";
// import footerImg from "../assets/bottomTab.svg";
// import iconStore from "../assets/icon-store.svg";
// import iconChallenge from "../assets/icon-challenge.svg";
// import leafUpLogo from "../assets/footer-logo.svg";
// import iconRanking from "../assets/icon-ranking.svg";
// import iconFriend from "../assets/icon-friend.svg";

// export default function Footer() {
//   const items = [
//     { id: "store", label: "가게", icon: iconStore },
//     { id: "challenge", label: "챌린지", icon: iconChallenge },
//     { id: "home", label: "리프업", icon: leafUpLogo, isHome: true },
//     { id: "ranking", label: "랭킹", icon: iconRanking },
//     { id: "friend", label: "친구", icon: iconFriend },
//   ];

//   return (
//     <FooterRoot role="contentinfo" aria-label="하단 탭 바">
//       <Content>
//         {items.map((it) => (
//           <Item key={it.id} aria-label={it.label}>
//             {it.isHome ? (
//               <HomeLogo src={it.icon} alt={it.label} draggable={false} />
//             ) : (
//               <Icon src={it.icon} alt={it.label} draggable={false} />
//             )}
//             <Label>{it.label}</Label>
//           </Item>
//         ))}
//       </Content>
//       <Bg src={footerImg} alt="" aria-hidden="true" />
//     </FooterRoot>
//   );
// }

// /* ===== styled ===== */

// const FooterRoot = styled.footer`
//   position: relative;
//   width: 100%;
//   height: 101px; /* footerImg 실제 높이 */
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
// `;

// const Bg = styled.img`
//   position: absolute;
//   inset: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover; /* svg면 contain/cover 중 맞게 선택 */
//   z-index: 0;
//   pointer-events: none; /* 배경 클릭 막기 */
// `;

// const Content = styled.nav`
//   position: relative;
//   z-index: 1;     
//   height: 100%;
//   left: -6px;
//   gap:12px;
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   align-items: end;
//   justify-items: center;
//   padding: 0px 12px 10px;
//   box-sizing: border-box;
// `;

// const Item = styled.div`
//   display: grid;
//   place-items: center;
//   gap: 2px;
//   grid-auto-rows: max-content;
//   align-items: center;
//   justify-items: center;

//   /* 아이콘과 라벨이 살짝 겹치도록 음수 마진 */
//   & > span {
//     margin-top: -6px; /* ← 여기 수치로 겹침 정도 조절 */
//   }
// `;

// const baseLabel = css`
//   z-index: 2;
//   text-align: center;
//   -webkit-text-stroke-width: 0.8px;
//   -webkit-text-stroke-color: #281900;
//   font-family: "Maplestory OTF";
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 22px; /* 110% */
//   letter-spacing: -0.408px;
//   background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   user-select: none;
//   pointer-events: none; /* 라벨은 클릭 없음 */
// `;

// const Label = styled.span`
//   ${baseLabel}
// `;

// /* 일반 아이콘 */
// const Icon = styled.img`
//   width: 60px;
//   height: auto;
//   margin-bottom: -6px; /* ← 여기 수치로 겹침 정도 조절 */
//   object-fit: contain;
//   display: block;
//   filter: brightness(.95);
//   user-select: none;
// `;

// /* 중앙 홈 로고(조금 더 큼) */
// const HomeLogo = styled.img`
//   height: 68px; 
//   width: auto;
//   object-fit: contain;
//   display: block;
//   filter: drop-shadow(0 2px 0 #382C28);
//   user-select: none;
//   margin-bottom: 7px;
// `;