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
import storeCoconut from "../assets/store-coconut.png";
import ShopModal from "../components/shop/ShopModal.jsx";

const TABS = ["캐릭터", "캐릭터 스킨", "장신구", "펫", "열매", <>스테이지<br/>스킨</>];

export default function ShopPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [modalStep, setModalStep] = useState(null); // null | 'buy_confirm' | 'use_confirm'

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

        {renderTabContent(activeTab, (it) => {
          if (it.id === 'coconut-skin' || it.id === 'coconut' || it.name.includes('코코넛')) {
            setModalStep('buy_confirm');
          } else {
            handleBuy(it);
          }
        })}
      </ContentArea>

      <FooterSpacer />
      <Footer />

      {/* 구매 확인 모달 */}
      <ShopModal
        isOpen={modalStep === 'buy_confirm'}
        icon={storeCoconut}
        iconWidth={156}
        iconHeight={189}
        title={<span><span className="accent">코코넛</span> 상품을<br/>구매하시겠습니까?</span>}
        description="화분에서 자라난 나뭇잎 고양이!"
        buttons={[
          { label: '돌아가기', onClick: () => setModalStep(null) },
          { label: '구매하기', onClick: () => {
              // TODO: 구매 API 연동
              setModalStep('use_confirm');
            }
          }
        ]}
      />

      {/* 사용 여부 모달 */}
      <ShopModal
        isOpen={modalStep === 'use_confirm'}
        title={<span>바로 상품을<br/>사용할까요?</span>}
        buttons={[
          { label: '아니오', onClick: () => setModalStep(null) },
          { label: '예', onClick: () => {
              try {
                localStorage.setItem('equippedMascot', 'coconut');
              } catch (e) {}
              setModalStep(null);
            }
          }
        ]}
      />
    </PageRoot>
  );
}

/* ===== 탭 컨텐츠 렌더러 ===== */
function renderTabContent(activeTab, handleBuy) {
  if (activeTab === "캐릭터") {
    const characters = [
      { id: "idle", name: "리프", price: 200, image: mascotIdle },
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
      { id: "idle-skin", name: "리프", price: 206, image: mascotIdle },
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
  background: #5C4D49; /* 화면 내부 배경색 */
`;

const ContentArea = styled.div`
  padding: 12px 16px 0 16px;
  padding-top: 70%; /* fixed 헤더 여백 */
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


