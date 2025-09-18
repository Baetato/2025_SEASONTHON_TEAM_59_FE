import { useState, useEffect } from "react";
import DashButtonImg from "../../assets/ChoiceBtn.png";
import StaticImg from "../../assets/statistics.png";
import { getGlobalCarbonStatics } from "../../api/rankingApi";
import {
    DashSection,
    FontBox,
    FontStyle,
    FlexBox,
    StatContainer,
    DashInfo,
    ImgCon,
    InnerText,
    InnerValue,
    MarginBox,
    EnvCon,
    DashProtected,
    TopMargin,
    StaticImg as StyledStaticImg,
    StaticImage,
} from "../../styles/dashStyles";

export default function DashBoardBody() {
    const [stats, setStats] = useState({
        totalCarbonReduction: 0,
        totalMemberCount: 0,
        dailyAverageReduction: 0,
        treesPlantedEffect: 0,
        carEmissionReductionEffect: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCarbonStats = async () => {
            try {
                const response = await getGlobalCarbonStatics();
                console.log("API Response:", response);
                if (!isMounted) return;

                const data = response.data && typeof response.data === "object" ? response.data : {};
                setStats({
                    totalCarbonReduction: Number(data.totalCarbonReduction) || 0,
                    totalMemberCount: Number(data.totalMemberCount) || 0,
                    dailyAverageReduction: Number(data.dailyAverageReduction) || 0,
                    treesPlantedEffect: Number(data.treesPlantedEffect) || 0,
                    carEmissionReductionEffect: Number(data.carEmissionReductionEffect) || 0,
                });
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error("API Error:", err);
                setError(err.message || "탄소 통계 데이터를 가져오지 못했습니다.");
                setLoading(false);
            }
        };

        fetchCarbonStats();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DashSection>
            <div>
                <FontBox>
                    <FontStyle>전체 사용자 탄소 감축량 대시보드</FontStyle>
                </FontBox>
                <FlexBox>
                    <StatContainer>
                        <DashInfo>
                            <ImgCon as="img" src={DashButtonImg} alt="대시버튼 컨테이너" />
                            <InnerText>총 탄소감축량</InnerText>
                            <InnerValue>
                                {Number.isFinite(stats.totalCarbonReduction)
                                    ? `${stats.totalCarbonReduction.toLocaleString()}gCO₂eq`
                                    : "0 gCO₂eq"}
                            </InnerValue>
                        </DashInfo>
                        <DashInfo>
                            <ImgCon as="img" src={DashButtonImg} alt="대시버튼 컨테이너" />
                            <InnerText>전체 사용자 수</InnerText>
                            <InnerValue>
                                {Number.isFinite(stats.totalMemberCount) ? `${stats.totalMemberCount.toLocaleString()}명` : "0명"}
                            </InnerValue>
                        </DashInfo>
                        <DashInfo>
                            <ImgCon as="img" src={DashButtonImg} alt="대시버튼 컨테이너" />
                            <InnerText>일평균 감축량</InnerText>
                            <InnerValue>
                                {Number.isFinite(stats.dailyAverageReduction)
                                    ? `${stats.dailyAverageReduction.toLocaleString()}gCO₂eq`
                                    : "0 gCO₂eq"}
                            </InnerValue>
                        </DashInfo>
                    </StatContainer>
                </FlexBox>
            </div>
            <MarginBox>
                <FontStyle>환경 보호 효과</FontStyle>
                <EnvCon>
                    <TopMargin>
                        <DashProtected>
                            <ImgCon as="img" src={DashButtonImg} alt="대시버튼 컨테이너" />
                            <InnerText>
                                {Number.isFinite(stats.treesPlantedEffect) ? `${stats.treesPlantedEffect.toLocaleString()}그루` : "0 그루"}
                            </InnerText>
                            <InnerValue>나무 심기와 동일한 효과</InnerValue>
                        </DashProtected>
                    </TopMargin>
                    <TopMargin>
                        <DashProtected>
                            <ImgCon as="img" src={DashButtonImg} alt="대시버튼 컨테이너" />
                            <InnerText>
                                {Number.isFinite(stats.carEmissionReductionEffect)
                                    ? `${stats.carEmissionReductionEffect.toLocaleString()}대`
                                    : "0 대"}
                            </InnerText>
                            <InnerValue>내연기관 자동차 1년간 운행 저감 효과</InnerValue>
                        </DashProtected>
                    </TopMargin>
                </EnvCon>
            </MarginBox>
            <StyledStaticImg>
                <StaticImage src={StaticImg} alt="스태틱 이미지" />
            </StyledStaticImg>
        </DashSection>
    );
}
