import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useUser } from "../states/userContext";
import Footer from "../components/footer";
import RoofBar from "../components/shop/RoofBar";
import ShopTabBar from "../components/shop/ShopTabBar";
import ShopItemCard from "../components/shop/ShopItemCard";

const TABS = ["캐릭터", "캐릭터 스킨", "장신구", "펫", "열매", "스테이지 스킨"];

export default function ShopPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // TODO: 탭 이동 시 목록 fetch 예정 (API 연동)
  // useEffect(() => { fetchItems(activeTab) }, [activeTab])

  const items = useMemo(() => mockItemsByTab(activeTab), [activeTab]);

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

        <ItemsGrid>
          {items.map((it) => (
            <ShopItemCard
              key={it.id}
              thumbnail={it.thumbnail}
              name={it.name}
              price={it.price}
              onBuy={() => handleBuy(it)}
            />
          ))}
        </ItemsGrid>
      </ContentArea>

      <FooterSpacer />
      <Footer />
    </PageRoot>
  );
}

/* ===== Mock (임시) 데이터: API 연동 전까지 탭별 항목 샘플 ===== */
function mockItemsByTab(tab) {
  const base = [
    { id: `${tab}-1`, name: `${tab} A`, price: 50, thumbnail: "/icons/icon-192.png" },
    { id: `${tab}-2`, name: `${tab} B`, price: 120, thumbnail: "/icons/icon-512.png" },
    { id: `${tab}-3`, name: `${tab} C`, price: 200, thumbnail: "/vite.svg" },
    { id: `${tab}-4`, name: `${tab} D`, price: 90, thumbnail: "/icons/icon-192.png" },
  ];
  return base;
}

/* ===== styled ===== */
const PageRoot = styled.div`
  position: relative;
  min-height: 100%;
  background: #FFF8E8;
`;

const ContentArea = styled.div`
  padding: 12px 16px 0 16px;
  padding-bottom: 120px; /* 푸터 공간 확보 */
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 */
  gap: 12px;
  margin-top: 12px;
  padding-bottom: 12px;
`;

const FooterSpacer = styled.div`
  height: 101px; /* Footer 높이와 동일 */
`;


