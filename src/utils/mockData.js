export const STAGE_STATUS = {
    READY: 'ready',
    LOCKED: 'locked',
    PENDING: 'pending',
    REJECTED: 'rejected',
    DONE: 'done',
};

export const DIFFICULTY = { EASY:'easy', MEDIUM:'medium', HARD:'hard' };
export const difficultyLabel = (d)=> d===DIFFICULTY.EASY? '쉬움' : d===DIFFICULTY.MEDIUM? '중간' : '어려움';


const ALL_ACTIVITIES = [
    { id:'use-tumbler', title:'텀블러 사용하기', reward:6, difficulty: DIFFICULTY.EASY },
    { id:'eco-bag', title:'에코백 사용하기', reward:6, difficulty: DIFFICULTY.EASY },
    { id:'reuse', title:'재사용 팁 공유', reward:10, difficulty: DIFFICULTY.MEDIUM },
    { id:'wash-tumbler', title:'텀블러 세척 방법', reward:15, difficulty: DIFFICULTY.MEDIUM },
    { id:'trash-pick', title:'쓰레기 담기', reward:20, difficulty: DIFFICULTY.HARD, requiresTwoShots: true, twoShotHints:['빈 봉투 촬영','채운 봉투 촬영'] },
];


export function pickRandomActivities(){
    // 쉬움2 / 중간2 / 어려움1 고정 샘플 (랜덤 셔플)
    const easy = ALL_ACTIVITIES.filter(a=> a.difficulty===DIFFICULTY.EASY);
    const med = ALL_ACTIVITIES.filter(a=> a.difficulty===DIFFICULTY.MEDIUM);
    const hard = ALL_ACTIVITIES.filter(a=> a.difficulty===DIFFICULTY.HARD);


    const shuffle = (arr)=> arr.slice().sort(()=> Math.random() - .5);
    const pick = (arr,n)=> shuffle(arr).slice(0,n);
    const bundle = [...pick(easy, Math.min(2, easy.length)), ...pick(med, Math.min(2, med.length)), ...pick(hard, 1)];
    
    return shuffle(bundle);
}