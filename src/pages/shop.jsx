import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../states/userContext";
import Footer from "../components/footer";
import RoofBar from "../components/shop/RoofBar";
import ShopTabBar from "../components/shop/ShopTabBar";
import CharacterCard from "../components/shop/CharacterCard";
import CharacterGrid from "../components/shop/CharacterGrid";

import mascotCarrot from "../assets/store-mascot-carrot.png";
import mascotIdle from "../assets/mascot-idle.png";

import skinCoconut from "../assets/store-skin-coconut.png";
import skinHamster from "../assets/store-skin-hamster.png";
import mascotUnready from "../assets/mascot-unready.png";
import storeCoconut from "../assets/store-skin-coconut.png";
import ShopModal from "../components/shop/ShopModal.jsx";

import api from "../api/api.js";
import { getShopItems, purchaseAvatar, equipAvatar } from "../api/shopApi.js";

const TABS = ["캐릭터", "캐릭터 스킨", "장신구", "펫", "열매", <>스테이지<br/>스킨</>];

export default function ShopPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [modalStep, setModalStep] = useState(null); // null | 'buy_confirm' | 'use_confirm' | 'error'
  const [modalMessage, setModalMessage] = useState(""); // 오류 메시지
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // 모달에 표시할 아이템
  const [loading, setLoading] = useState(false); // 상점조회 로딩 상태 추가
  const [purchaseLoading, setPurchaseLoading] = useState(false); // 구매 로딩 상태 추가

  {/* 상점 목록 항상 불러오기 */}
  useEffect(() => {
    async function fetchAvatars() {
      try {
        setLoading(true); // 데이터 로딩 시작

        const items = await getShopItems();
        console.log("상점 아바타 목록:", items);

        setAvatars(items);
      } catch (e) {
        console.error("상점 아바타 불러오기 실패", e);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    }
    fetchAvatars();
  }, []);


  const handleBuy = async (item) => {
    setPurchaseLoading(true);
    try {
      await purchaseAvatar(item.avatarId);
      setModalStep('use_confirm');
      console.log("구매하려는 아이템", item);

    } catch (err) {
      // 오류 모달 띄우기
      setModalMessage(err.message);
      setModalStep('error');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleEquip = async (item) => {
    try {
      await equipAvatar(item.avatarId);
    } catch (err) {
      setModalMessage(err.message);
      setModalStep('error');
    }
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

        {loading ? (
          <Placeholder>로딩 중...</Placeholder>
        ) : (
          renderTabContent(activeTab, avatars, (item) => {
            setSelectedAvatar(item); // 모달에 표시할 아이템
            setModalStep('buy_confirm');
          })
        )}

        {/*renderTabContent(activeTab, avatars,(it) => {
          if (it.id === 'coconut-skin' || it.id === 'coconut' || it.name.includes('코코넛')) {
            setModalStep('buy_confirm');
          } else {
            handleBuy(it);
          }
        })*/}
      </ContentArea>

      <FooterSpacer />
      <Footer />

      {/* 구매 확인 모달 */}
      <ShopModal
        isOpen={modalStep === 'buy_confirm'}
        icon={selectedAvatar?.avatarUrl}
        iconWidth={156}
        iconHeight={189}
        title={<span><span className="accent">{selectedAvatar?.name}</span> 상품을<br/>구매하시겠습니까?</span>}
        description="화분에서 자라난 나뭇잎 고양이!"  // TODO: API에서 설명 받아오기
        buttons={[
          { label: '돌아가기', onClick: () => setModalStep(null) },
          { label: '구매하기', onClick: () => {
              handleBuy(selectedAvatar);
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
          { label: '예', onClick: () => handleEquip(selectedAvatar) }
        ]}
      />

      {/* 오류 모달 */}
      <ShopModal
        isOpen={modalStep === 'error'}
        title={<span>오류가 발생했어요.</span>}
        description={modalMessage}
        buttons={[
          { label: '확인', onClick: () => setModalStep(null) }
        ]}
      />
    </PageRoot>
  );
}

/* ===== 탭 컨텐츠 렌더러 ===== */
function renderTabContent(activeTab, avatars, onClickItem) {
  console.log("렌더링 탭:", activeTab, avatars);
  const filtered = avatars.filter((it) => it.type === activeTab);
  if (filtered.length === 0) return <Placeholder>상품 준비 중</Placeholder>;

  return (
    <CharacterGrid>
      {filtered.map((it) => (
        <CharacterCard
          key={it.avatarId}
          name={it.name}
          image={it.avatarUrl}
          price={it.point}
          disabled={it.isOwned}
          onClick={it.isOwned ? undefined : () => onClickItem(it)}
        />
      ))}
    </CharacterGrid>
  );
}

/* ===== styled ===== */
const PageRoot = styled.div`
  position: relative;
  min-height: 100%;
  background: #5C4D49; /* 화면 내부 배경색 */
`;

const ContentArea = styled.div`
  padding: 12px 16px 0 16px;
  padding-top: 65%; /* fixed 헤더 여백 */
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


