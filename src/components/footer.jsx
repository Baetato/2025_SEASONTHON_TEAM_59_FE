// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styled, { keyframes, css } from "styled-components";

// import bottomTabBg from "../assets/bottomTab.svg";
// import iconStore from "../assets/icon-store.svg";
// import iconChallenge from "../assets/icon-challenge.svg";
// import iconRanking from "../assets/icon-ranking.svg";
// import iconFriend from "../assets/icon-friend.svg";
// import leafUpLogo from "../assets/footer-logo.svg";

// /* ============ Animations ============ */
// const Press = keyframes`
//   0%   { transform: translateY(0) scale(1); }
//   50%  { transform: translateY(2px) scale(0.96); }
//   100% { transform: translateY(0) scale(1); }
// `;

// const IconBounce = keyframes`
//   0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
//   40% { transform: translateY(-4px); }
//   60% { transform: translateY(-2px); }
// `;

// /* ============ Fixed Bar (393×101) ============ */
// const BarRoot = styled.footer`
//   position: fixed;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 101px;
//   z-index: 1000;
//   pointer-events: auto;
//   padding-bottom: env(safe-area-inset-bottom, 0px);
// `;

// const BarFrame = styled.nav`
//   position: relative;
//   width: 100%;
//   height: 100%;
// `;

// const Bg = styled.div`
//   position: absolute;
//   inset: 0;
//   background: url(${bottomTabBg}) center bottom / cover no-repeat;
//   pointer-events: none;
//   z-index: 0;
// `;

// /* ============ Content ============ */
// const Content = styled.div`
//   position: absolute;
//   inset: 0;
//   display: grid;
//   grid-template-rows: 1fr auto; /* 첫 행: 아이콘, 두 번째 행: 라벨 */
//   z-index: 1;
// `;

// const Row = styled.div`
//   display: flex;
//   justify-content: space-around; /* 아이콘 균등 배치 */
//   align-items: center;           /* 아이콘 세로 가운데 정렬 */
//   width: 100%;
// `;

// const Cell = styled.div`
//   flex: 1;                       /* Row 안에서 5칸 자동 */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// `;

// const IconImg = styled.img`
//   width: 28px;
//   height: 28px;
//   object-fit: contain;
//   cursor: pointer;
//   filter: ${(p) =>
//     p.$active
//       ? "brightness(1.12) drop-shadow(0 0 6px rgba(255,213,125,.45))"
//       : "brightness(.92)"};
//   transition: filter 0.2s ease, transform 0.2s ease;

//   &:hover {
//     transform: translateY(-2px);
//   }

//   &:active {
//     transform: translateY(0px) scale(0.95);
//   }

//   ${(p) =>
//     p.$active &&
//     css`
//       animation: ${IconBounce} 600ms ease-out;
//     `}
// `;

// const HomeLogo = styled.img`
//   height: 60px;
//   width: auto;
//   object-fit: contain;
//   cursor: pointer;
//   filter: ${(p) =>
//     p.$active
//       ? "brightness(1.06) drop-shadow(0 3px 0 #382C28)"
//       : "drop-shadow(0 3px 0 #382C28)"};
//   transform: ${(p) => (p.$active ? "scale(1.03)" : "none")};
//   transition: filter 0.2s ease, transform 0.2s ease;

//   &:hover {
//     transform: ${(p) => (p.$active ? "scale(1.06)" : "scale(1.03)")};
//   }

//   &:active {
//     transform: ${(p) => (p.$active ? "scale(1.01)" : "scale(0.98)")};
//   }
// `;

// const Label = styled.span`
//   text-align: center;
//   text-shadow: 0 1px 0 #281900;
//   -webkit-text-stroke-width: 2px;
//   -webkit-text-stroke-color: #281900;
//   font-family: "Maplestory OTF";
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 22px; /* 91.667% */
//   letter-spacing: -0.408px;
//   background: var(--, linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%));
//   background-clip: text;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   user-select: none;
//   cursor: pointer;
  
//   /* 활성화 상태에 따른 추가 효과 */
//   ${(p) => p.$active && css`
//     text-shadow: 0 1px 0 #281900, 0 0 4px rgba(255,213,125,.35);
//   `}
// `;

// /* ============ Component ============ */
// export default function BottomTabBar({ onTabChange = null }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const tabs = [
//     { id: "store", label: "상점", icon: iconStore, path: "/store" },
//     { id: "challenge", label: "챌린지", icon: iconChallenge, path: "/challenge" },
//     { id: "home", label: "홈", icon: leafUpLogo, path: "/" },
//     { id: "ranking", label: "랭킹", icon: iconRanking, path: "/ranking" },
//     { id: "friends", label: "친구", icon: iconFriend, path: "/friends" },
//   ];

//   const fromPath = () => {
//     const p = location.pathname;
//     if (p === "/" || p.startsWith("/home")) return "home";
//     if (p.startsWith("/store")) return "store";
//     if (p.startsWith("/challenge")) return "challenge";
//     if (p.startsWith("/ranking")) return "ranking";
//     if (p.startsWith("/friends")) return "friends";
//     return "home";
//   };

//   const [active, setActive] = useState(fromPath());

//   useEffect(() => {
//     setActive(fromPath());
//   }, [location.pathname]);

//   const go = (t) => {
//     if (t.id === active) return;
//     setActive(t.id);
//     onTabChange ? onTabChange(t.id, t.path) : navigate(t.path);
//   };

//   return (
//       <BarFrame aria-label="bottom navigation">
//         <Bg />
//          <Content>
//            <Row>
//              {tabs.map((t) => (
//                <Cell
//                  key={`tab-${t.id}`}
//                  $active={active === t.id}
//                  aria-label={t.label}
//                >
//                  {t.id === "home" ? (
//                    <HomeLogo
//                      src={t.icon}
//                      alt="LeafUp Home"
//                      $active={active === t.id}
//                      onClick={() => go(t)}
//                    />
//                  ) : (
//                    <IconImg
//                      src={t.icon}
//                      alt={t.label}
//                      $active={active === t.id}
//                      onClick={() => go(t)}
//                    />
//                  )}
//                </Cell>
//              ))}
//            </Row>
//            <Row $labels>
//              {tabs.map((t) => (
//                <Label 
//                  key={`lbl-${t.id}`} 
//                  $active={active === t.id}
//                  onClick={() => go(t)}
//                >
//                  {t.label}
//                </Label>
//              ))}
//            </Row>
//          </Content>
//       </BarFrame>
//   );
// }
import styled from "styled-components";
import footerImg from "../assets/footerImg.png"; // footerImg 이미지 import

export default function Footer() {
  return (
    <FooterContainer>
      <FooterImage src={footerImg} alt="Footer Background" />
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
`;

const FooterImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;