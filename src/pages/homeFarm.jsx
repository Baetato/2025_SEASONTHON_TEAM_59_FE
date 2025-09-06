// 홈-텃밭 화면

export default function HomeFarm() {
  return (
    <div className="p-4">
      {/* 상단 요약 영역 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">나의 팜</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          >
            새로고침
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          >
            정렬
          </button>
        </div>
      </div>

      {/* 팜 그리드 영역 (카드 예시) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 카드 예시 1 */}
        <article className="rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
          <header className="mb-2 flex items-center justify-between">
            <h2 className="font-medium">오늘의 작물</h2>
            <span className="text-xs text-gray-500">업데이트: 방금 전</span>
          </header>
          <p className="text-sm text-gray-700">
            물 주기, 수확, 교배 등 팜 관련 액션을 여기서 보여주세요.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            >
              물 주기
            </button>
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            >
              수확
            </button>
          </div>
        </article>

        {/* 카드 예시 2 */}
        <article className="rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
          <header className="mb-2 flex items-center justify-between">
            <h2 className="font-medium">내 재화/포인트</h2>
            <span className="text-xs text-gray-500">동기화 완료</span>
          </header>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>씨앗: 120개</li>
            <li>물: 45병</li>
            <li>포인트: 3,240</li>
          </ul>
        </article>

        {/* 카드 예시 3 */}
        <article className="rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
          <header className="mb-2 flex items-center justify-between">
            <h2 className="font-medium">진행 중 미션</h2>
            <span className="text-xs text-gray-500">3개</span>
          </header>
          <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-1">
            <li>텀블러 사용 3회 인증</li>
            <li>분리수거 5회 인증</li>
            <li>플로깅 2회 인증</li>
          </ol>
        </article>
      </div>
    </div>
);
}