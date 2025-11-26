import React, { useState, useEffect, useRef } from "react";
// ▼ 여기에 'Legend'가 추가되었습니다!
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MessageSquare,
  Send,
  Briefcase,
  Building,
  Layers,
  Menu,
  X,
  Search,
  MapPin,
  Heart,
  Info,
  Check,
  Clock,
  Zap,
  Award,
  MousePointer2,
} from "lucide-react";

// ==================================================================================
// [DATA] 수동 데이터 (이 부분을 수정해서 데이터 관리)
// ==================================================================================
const RAW_DATA = [
  {
    회사명: "니더(급구)",
    제목: "백앤드 개발자 신입 (부산)",
    모집요강: { 주요업무: "백엔드 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페이타랩",
    제목: "데이터 분석가 (Growth Data Analyst), 부산",
    모집요강: { 주요업무: "데이터 분석" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "트리노드",
    제목: "[부산/2년 이상] 코어팀 - AI엔지니어",
    모집요강: { 주요업무: "AI 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페이타랩",
    제목: "그로스 마케터 (CRM), 부산",
    모집요강: { 주요업무: "마케팅 전략" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "비쥬얼쇼크",
    제목: "신사업 프로젝트팀 담당자",
    모집요강: { 주요업무: "사업 기획" },
    근무조건: { 근무지: "부산 연제구" },
  },
  {
    회사명: "허브플렛폼",
    제목: "하단 네비게이션 (웹디자이너)",
    모집요강: { 주요업무: "디자인" },
    근무조건: { 근무지: "부산 사상구" },
  },
  {
    회사명: "페이타랩",
    제목: "[부산]콘텐츠 디자이너 (AI)",
    모집요강: { 주요업무: "AI 디자인" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페블",
    제목: "디지털자산 시스템 운용(퀀트)",
    모집요강: { 주요업무: "자금 운용" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "엘리스",
    제목: "엘리스랩 교육운영 매니저(부산)",
    모집요강: { 주요업무: "교육 운영" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페이타랩",
    제목: "인사 담당자 (부산)",
    모집요강: { 주요업무: "인사 관리" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "두꺼비세상",
    제목: "[아파트너] 영업(부산)",
    모집요강: { 주요업무: "B2B 영업" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "니더(급구)",
    제목: "앱 서비스 PM/PO",
    모집요강: { 주요업무: "서비스 기획" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "테크핀레이팅스",
    제목: "프론트엔드 웹개발자",
    모집요강: { 주요업무: "프론트엔드 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "트리노드",
    제목: "ML엔지니어",
    모집요강: { 주요업무: "머신러닝 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페이타랩",
    제목: "GA Manager[총무]",
    모집요강: { 주요업무: "총무 관리" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "트리노드",
    제목: "ID팀 - 사업PM",
    모집요강: { 주요업무: "사업 PM" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "노마드앤컴퍼니",
    제목: "[NOMAD LIVE] 운영매니저",
    모집요강: { 주요업무: "운영 매니징" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페블",
    제목: "디지털자산 펀터멘탈 운용",
    모집요강: { 주요업무: "자금 운용" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페이타랩",
    제목: "지원사업 담당자 (부산)",
    모집요강: { 주요업무: "정부지원사업" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페이타랩",
    제목: "[주니어] 마케터(부산)",
    모집요강: { 주요업무: "마케팅 기획" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페블",
    제목: "[인턴] 알고리즘 트레이딩",
    모집요강: { 주요업무: "알고리즘 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "더블미디어",
    제목: "재무회계 담당자(부산)",
    모집요강: { 주요업무: "재무 회계" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "세마그룹",
    제목: "HR 컨설턴트 / 부산",
    모집요강: { 주요업무: "HR 컨설팅" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페이타랩",
    제목: "[부산] 평가보상 담당자",
    모집요강: { 주요업무: "인사 평가" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페리스휠",
    제목: "[게인스보로] 비주얼 디렉터",
    모집요강: { 주요업무: "비주얼 디렉팅" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "더원인터내셔널",
    제목: "PHP 백엔드 개발자",
    모집요강: { 주요업무: "백엔드 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "숨핏애슬레저",
    제목: "스포츠 의류 디자이너",
    모집요강: { 주요업무: "의류 디자인" },
    근무조건: { 근무지: "부산 강서구" },
  },
  {
    회사명: "페이타랩",
    제목: "퍼포먼스 마케터 (부산)",
    모집요강: { 주요업무: "퍼포먼스 마케팅" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페블",
    제목: "[인턴] 리서치 애널리스트",
    모집요강: { 주요업무: "시장 분석" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "프리그로우",
    제목: "임베디드 개발자 (부산)",
    모집요강: { 주요업무: "임베디드 개발" },
    근무조건: { 근무지: "부산 동구" },
  },
  {
    회사명: "더블미디어",
    제목: "리셉션 및 카페매니저",
    모집요강: { 주요업무: "서비스 운영" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "페이타랩",
    제목: "HR Generalist (부산)",
    모집요강: { 주요업무: "인사 총무" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "페이타랩",
    제목: "[부산] 파트너지원(CS)",
    모집요강: { 주요업무: "CS 운영" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "세마그룹",
    제목: "Marketing 컨설턴트",
    모집요강: { 주요업무: "마케팅 컨설팅" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "비쥬얼쇼크",
    제목: "물류사원 (신입)",
    모집요강: { 주요업무: "물류 관리" },
    근무조건: { 근무지: "부산 연제구" },
  },
  {
    회사명: "비쥬얼쇼크",
    제목: "물류 팀장 (3년 이상)",
    모집요강: { 주요업무: "물류 총괄" },
    근무조건: { 근무지: "부산 연제구" },
  },
  {
    회사명: "더블미디어",
    제목: "HR 담당자 (부산)",
    모집요강: { 주요업무: "인사 관리" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "더블미디어",
    제목: "백엔드 개발자(부산)",
    모집요강: { 주요업무: "백엔드 개발" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "더블미디어",
    제목: "서비스 기획(부산)",
    모집요강: { 주요업무: "서비스 기획" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "이식스프로덕츠코리아",
    제목: "퍼포먼스 마케팅 & SEO",
    모집요강: { 주요업무: "마케팅 SEO" },
    근무조건: { 근무지: "부산 해운대구" },
  },
  {
    회사명: "세마그룹",
    제목: "CS 컨설턴트 / 부산",
    모집요강: { 주요업무: "CS 컨설팅" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "세마그룹",
    제목: "CRM 컨설턴트 / 부산",
    모집요강: { 주요업무: "CRM 컨설팅" },
    근무조건: { 근무지: "부산 부산진구" },
  },
  {
    회사명: "바크",
    제목: "신발 브랜드 물류 담당자",
    모집요강: { 주요업무: "물류 관리" },
    근무조건: { 근무지: "부산 강서구" },
  },
  {
    회사명: "신우씨링",
    제목: "[부산] 기술 영업담당자",
    모집요강: { 주요업무: "기술 영업" },
    근무조건: { 근무지: "부산 중구" },
  },
  {
    회사명: "피엠인터내셔널코리아",
    제목: "고객지원·행정지원",
    모집요강: { 주요업무: "고객 지원" },
    근무조건: { 근무지: "부산 연제구" },
  },
  {
    회사명: "코레일테크",
    제목: "현장 기간제사원",
    모집요강: { 주요업무: "현장 관리" },
    근무조건: { 근무지: "전국" },
  },
  {
    회사명: "동남권원자력의학원",
    제목: "방사선사 채용",
    모집요강: { 주요업무: "의료 기술" },
    근무조건: { 근무지: "부산 기장군" },
  },
  {
    회사명: "한국해양과학기술원",
    제목: "연수연구원 공개채용",
    모집요강: { 주요업무: "해양 연구" },
    근무조건: { 근무지: "부산 영도구" },
  },
  {
    회사명: "주택관리공단",
    제목: "채용형 인턴",
    모집요강: { 주요업무: "행정 기술" },
    근무조건: { 근무지: "부산 울산" },
  },
  {
    회사명: "한국마사회",
    제목: "일반직 신입사원",
    모집요강: { 주요업무: "경영 지원" },
    근무조건: { 근무지: "부산경남" },
  },
  {
    회사명: "부산대학교병원",
    제목: "간호직 공개채용",
    모집요강: { 주요업무: "간호 업무" },
    근무조건: { 근무지: "부산 서구" },
  },
  {
    회사명: "부산항만공사",
    제목: "기간제 직원(전문계약직)",
    모집요강: { 주요업무: "항만 운영" },
    근무조건: { 근무지: "부산 중구" },
  },
  {
    회사명: "한국교통안전공단",
    제목: "청년인턴 채용",
    모집요강: { 주요업무: "행정 지원" },
    근무조건: { 근무지: "부산" },
  },
];

// ==================================================================================
// [ENGINE] 데이터 처리 및 분류 로직
// ==================================================================================
const classifyIndustry = (title, task) => {
  const text = (title + " " + task).toLowerCase();
  if (
    text.match(
      /개발|sw|java|python|ai|엔지니어|데이터|웹|앱|it|컴퓨터|정보통신|보안|임베디드/
    )
  )
    return "IT/개발";
  if (text.match(/의사|간호|병원|보건|약사|의료|치과|임상|방사선/))
    return "의료/보건";
  if (text.match(/건설|토목|현장|건축|시설|전기|기계|안전|환경|공사/))
    return "건설/현장";
  if (text.match(/경영|회계|사무|총무|인사|hr|재무|행정|기획|비서|지원사업/))
    return "경영/사무";
  if (text.match(/영업|마케팅|세일즈|판매|md|홍보|광고|제휴/))
    return "영업/마케팅";
  if (text.match(/디자인|영상|콘텐츠|웹디|ui|ux|그래픽/)) return "디자인";
  if (text.match(/연구|r&d|석사|박사|학술|분석가/)) return "연구/R&D";
  if (text.match(/서비스|운영|매니저|상담|cs|안내|카페|조리|운전|배송|물류/))
    return "서비스/운영";
  return "기타";
};

const mockJobListings = RAW_DATA.map((item, index) => {
  const jobInfo = item["모집요강"] || {};
  const conditions = item["근무조건"] || {};
  const title = item["제목"] || "채용 공고";
  const task = jobInfo["주요업무"] || "";
  const industryType = classifyIndustry(title, task);
  let locText = conditions["근무지"] || "부산";
  if (locText.length > 15) locText = locText.substring(0, 12) + "...";

  return {
    id: index,
    company: item["회사명"] || "기업",
    title: title,
    location: locText,
    salary: "회사 내규",
    industry: industryType,
    description: task,
    logo: `https://ui-avatars.com/api/?name=${item["회사명"]}&background=random&color=fff&size=128`,
  };
});

// [차트 데이터]
const industryStats = {};
mockJobListings.forEach((j) => {
  industryStats[j.industry] = (industryStats[j.industry] || 0) + 1;
});
const pieData = Object.keys(industryStats)
  .map((k) => ({ name: k, value: industryStats[k] }))
  .sort((a, b) => b.value - a.value);
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
];

// [UI 컴포넌트]
function ImageWithFallback({ src, alt, className }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div
      className={`bg-white flex items-center justify-center text-gray-400 text-xs font-bold border ${className}`}
    >
      {alt ? alt.substring(0, 1) : "C"}
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! 어떤 일자리를 찾으세요?" },
  ]);
  const [input, setInput] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredList = mockJobListings.filter(
    (job) =>
      job.title.includes(search) ||
      job.company.includes(search) ||
      job.industry.includes(search)
  );

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setTimeout(() => {
      const results = mockJobListings.filter(
        (j) => j.title.includes(text) || j.industry.includes(text)
      );
      const resText =
        results.length > 0
          ? `🔍 '${text}' 관련 공고 ${results.length}건을 찾았습니다.`
          : "조건에 맞는 공고가 없습니다.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: resText, data: results.slice(0, 3) },
      ]);
    }, 500);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* 사이드바 */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r z-10">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">부산 채용매칭</h1>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: "dashboard", icon: Layers, label: "대시보드" },
            { id: "chatbot", icon: MessageSquare, label: "AI 상담" },
            { id: "jobs", icon: Briefcase, label: "전체 공고" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`flex items-center w-full p-3 rounded-xl font-bold ${
                activeTab === m.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <m.icon size={20} className="mr-3" /> {m.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="md:hidden p-4 bg-white border-b flex justify-between items-center z-20">
          <h1 className="font-bold text-blue-600 text-lg">부산 채용매칭</h1>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <Menu />
          </button>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden absolute top-14 w-full bg-white shadow-lg z-20 border-b">
            {["dashboard", "chatbot", "jobs"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  setMobileNavOpen(false);
                }}
                className="block w-full text-left p-4 font-bold capitalize border-b"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          {/* 1. 대시보드 */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    부산·경남 채용 시장 대시보드
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    부산 지역 채용 시장 트렌드와 통계를 확인해보세요.
                  </p>
                </div>
                <div className="relative w-64 hidden md:block">
                  <input
                    className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white"
                    placeholder="검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border shadow-sm">
                  <div className="text-gray-500 text-sm">전체 공고</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {mockJobListings.length}건
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border shadow-sm">
                  <div className="text-gray-500 text-sm">참여 기업</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {new Set(mockJobListings.map((j) => j.company)).size}개
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border shadow-sm">
                  <div className="text-gray-500 text-sm">직무 분야</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {pieData.length}개
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border shadow-sm">
                  <div className="text-gray-500 text-sm">매칭 성공</div>
                  <div className="text-2xl font-bold text-pink-600">87%</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border col-span-1">
                  <h3 className="font-bold mb-4">산업군 비중</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border col-span-2">
                  <h3 className="font-bold mb-4">직무별 현황 (Top 5)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={pieData.slice(0, 5)}
                        layout="vertical"
                        margin={{ top: 0, right: 20, left: 30, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={false}
                        />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={90}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip cursor={{ fill: "#f9fafb" }} />
                        <Bar
                          dataKey="value"
                          fill="#3b82f6"
                          radius={[0, 4, 4, 0]}
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">
                  실시간 공고
                </div>
                <div className="divide-y">
                  {filteredList.slice(0, 6).map((job) => (
                    <div
                      key={job.id}
                      className="p-4 hover:bg-blue-50 transition flex items-center gap-4 cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <img
                        src={job.logo}
                        className="w-10 h-10 rounded bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 truncate">
                          {job.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.company} · {job.location}
                        </div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {job.industry}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. 챗봇 */}
          {activeTab === "chatbot" && (
            <div className="flex flex-col h-full bg-white rounded-2xl border overflow-hidden max-w-3xl mx-auto">
              <div className="p-4 bg-blue-50 border-b font-bold text-blue-800 flex items-center gap-2">
                <MessageSquare /> AI 채용 비서
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl text-sm ${
                        m.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {m.text}
                      {m.data && (
                        <div className="mt-2 space-y-2">
                          {m.data.map((j) => (
                            <div
                              key={j.id}
                              className="bg-white p-2 rounded text-black border text-xs cursor-pointer"
                              onClick={() => setSelectedJob(j)}
                            >
                              <div className="font-bold text-blue-600">
                                {j.title}
                              </div>
                              <div>{j.company}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t flex gap-2">
                <input
                  className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="질문 입력..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white p-2 rounded-xl"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}

          {/* 3. 전체 공고 */}
          {activeTab === "jobs" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {mockJobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-5 rounded-2xl border hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      {job.industry}
                    </span>
                    <Heart size={16} className="text-gray-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 모달 */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-start">
              <h2 className="text-xl font-bold leading-tight flex-1">
                {selectedJob.title}
              </h2>
              <button onClick={() => setSelectedJob(null)}>
                <X />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
              <p className="font-bold text-blue-600 mb-2">
                {selectedJob.company}
              </p>
              {selectedJob.description}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">
                지원하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
