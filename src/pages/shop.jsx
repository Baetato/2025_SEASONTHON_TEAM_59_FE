import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../states/userContext";
import Footer from "../components/footer";
import RoofBar from "../components/shop/RoofBar";
import ShopTabBar from "../components/shop/ShopTabBar";
import CharacterCard from "../components/shop/CharacterCard";
import CharacterGrid from "../components/shop/CharacterGrid";
import mascotCoconut from "../assets/mascot-coconut.png";
import mascotIdle from "../assets/mascot-basic.png";
import mascotCarrot from "../assets/mascot-carrot.png";
import mascotUnready from "../assets/mascot-unready.png";

const TABS = ["캐릭터", "캐릭터 스킨", "장신구", "펫", "열매", "스테이지 스킨"];

export default function ShopPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // TODO: 탭 이동 시 목록 fetch 예정 (API 연동)
  // useEffect(() => { fetchItems(activeTab) }, [activeTab])

  const handleBuy = (item) => {
    // TODO: 구매 API POST 연동 예정
    // await api.post('/v1/shop/purchase', { itemId: item.id })
    alert(`구매 시도: ${item.name}`);
  };

  return (
    <PageRoot>
      <ContentArea>
        <RoofBar leafCount={user.point ?? 0} />
        <ShopTabBar
          tabs={TABS}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {renderTabContent(activeTab, handleBuy)}
      </ContentArea>

      <FooterSpacer />
      <Footer />
    </PageRoot>
  );
}

/* ===== 탭 컨텐츠 렌더러 ===== */
function renderTabContent(activeTab, handleBuy) {
  if (activeTab === "캐릭터") {
    const characters = [
      { id: "idle", name: "아이들", price: 200, image: mascotIdle },
      { id: "carrot", name: "캐럿", price: 201, image: mascotCarrot },
    ];
    return (
      <CharacterGrid>
        {characters.map((it) => (
          <CharacterCard
            key={it.id}
            name={it.name}
            image={it.image}
            price={it.price}
            onClick={() => handleBuy(it)}
          />
        ))}
      </CharacterGrid>
    );
  }

  if (activeTab === "캐릭터 스킨") {
    const skins = [
      { id: "coconut-skin", name: "코코넛", price: 200, image: mascotCoconut },
      { id: "idle-skin", name: "아이들", price: 206, image: mascotIdle },
      { id: "unknown", name: "???", price: 206, image: mascotUnready, disabled: true },
    ];
    return (
      <CharacterGrid>
        {skins.map((it) => (
          <CharacterCard
            key={it.id}
            name={it.name}
            image={it.image}
            price={it.price}
            disabled={it.disabled}
            onClick={it.disabled ? undefined : () => handleBuy(it)}
          />
        ))}
      </CharacterGrid>
    );
  }

  return <Placeholder>상품 준비 중</Placeholder>;
}

/* ===== styled ===== */
const PageRoot = styled.div`
  position: relative;
  min-height: 100%;
  background: #8D726B; /* 화면 내부 배경색 */
`;

const ContentArea = styled.div`
  padding: 12px 16px 0 16px;
  padding-top: 72px; /* fixed 헤더 여백 */
  padding-bottom: 220px; /* 푸터 + 고정 Roof/탭 여유 공간 확보 */
`;

const Placeholder = styled.div`
  display: grid;
  place-items: center;
  color: #281900;
  font-family: "Maplestory OTF";
  font-weight: 700;
  height: 200px;
`;

const FooterSpacer = styled.div`
  height: 101px; /* Footer 높이와 동일 */
`;


