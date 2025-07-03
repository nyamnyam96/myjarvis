// ================================================
// 📁 StyleGuide.jsx
// 📌 MyJarvis default.css 기반 스타일 가이드 페이지
// 📌 Button, Card, Input 등 공통 컴포넌트와 스타일을 시각적으로 테스트 가능
// ================================================
import React, { useState } from 'react';

// 📅 캘린더/일정 컴포넌트 (calendar/)
import CalendarTag from "../components/calendar/CalendarTag";
import ScheduleCard from "../components/calendar/ScheduleCard";
import CalendarCell from "../components/calendar/CalendarCell";

//  공통 컴포넌트 (common/)
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Badge from "../components/common/Badge";
import SearchBar from "../components/common/SearchBar";
import ProgressBar from "../components/common/ProgressBar";

//  제어 컴포넌트 (control/)
import Checklist from "../components/control/Checklist";
import SwitchToggle from "../components/control/SwitchToggle";
import FilterChip from "../components/control/FilterChip";

//  피드백 컴포넌트 (feedback/)
import Toast from "../components/feedback/Toast";
import Skeleton from "../components/feedback/Skeleton";
import Notification from "../components/feedback/Notification";
import TimelineList from "../components/feedback/TimelineList";

//  대시보드 컴포넌트 (dashboard/)
import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/ChartCard";
import ChartWrapper from "../components/dashboard/ChartWrapper";
import ActivityCard from "../components/dashboard/ActivityCard";

//  레이아웃 컴포넌트 (layout/)
import Modal from "../components/layout/Modal";
import SectionTitle from "../components/layout/SectionTitle";
import Divider from "../components/layout/Divider";

// 네비게이션 컴포넌트 (navigation/)
import Breadcrumb from "../components/navigation/Breadcrumb";
import TabGroup from "../components/navigation/TabGroup";
import Tabs from "../components/navigation/Tabs";
import Stepper from "../components/navigation/Stepper";

//  사용자 컴포넌트 (user/)
import UserAvatar from "../components/user/UserAvatar";
import DropdownMenu from "../components/user/DropdownMenu";

//  업로드 컴포넌트 (upload/)
import Dropzone from "../components/upload/Dropzone";


const StyleGuide = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isToggleOn, setIsToggleOn] = useState(true);
  return (
    <div className="section-wrapper space-y-8">
      <h1 className="text-title">🎨 MyJarvis Style Guide</h1>

      {/* 🔘 버튼 스타일 테스트 */}
      <Card>
        <h2 className="section-title">🔘 Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="disabled">Disabled</Button>
        </div>
      </Card>

      {/* 📝 입력창 테스트 */}
      <Card>
        <h2 className="section-title">📝 Input</h2>
        <Input label="정상 입력" placeholder="example@domain.com" />
        <Input label="에러 입력" placeholder="필수 입력값 누락" error />
      </Card>

      {/* 🏷️ 뱃지 테스트 */}
      <Card>
        <h2 className="section-title">🏷️ Badges</h2>
        <div className="flex gap-2">
          <Badge text="기본" type="gray" />
          <Badge text="성공" type="success" />
          <Badge text="경고" type="warning" />
          <Badge text="위험" type="danger" />
        </div>
      </Card>

      {/* 🔤 텍스트 계층 테스트 */}
      <Card>
        <h2 className="section-title">🔤 Typography</h2>
        <p className="text-title">.text-title: 제목 텍스트</p>
        <p className="text-body">.text-body: 본문 텍스트</p>
        <p className="text-subtle">.text-subtle: 설명 텍스트</p>
      </Card>

      {/* 🔗 링크 스타일 */}
      <Card>
        <h2 className="section-title">🔗 Link</h2>
        <a href="#" className="link">자세히 보기 →</a>
      </Card>

      {/* 🕳️ 스켈레톤 테스트 */}
      <Card>
        <h2 className="section-title">🕳️ Skeleton</h2>
        <div className="space-y-2 w-1/2">
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-2/3"></div>
        </div>
      </Card>

      {/* ─ 구분선 테스트 */}
      <Card>
        <h2 className="section-title">─ Divider</h2>
        <p>위 텍스트</p>
        <div className="divider"></div>
        <p>아래 텍스트</p>
      </Card>

      {/* 📋 테이블 테스트 */}
      <Card>
        <h2 className="section-title">📋 Table</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th">이름</th>
              <th className="th">역할</th>
              <th className="th">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td">홍길동</td>
              <td className="td">개발자</td>
              <td className="td">
                <span className="badge badge-success">활성</span>
              </td>
            </tr>
            <tr>
              <td className="td">김영희</td>
              <td className="td">디자이너</td>
              <td className="td">
                <span className="badge badge-warning">대기</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* 📢 토스트 설명 */}
      <Card>
        <h2 className="section-title">📢 Toast / Modal</h2>
        <p className="text-subtle">
          실제 동작은 컴포넌트에서 제어 (예: showToast, openModal)
        </p>
        <div className="toast">✅ 저장이 완료되었습니다!</div>
      </Card>

      {/* 📊 통계 카드 (.stat-card) */}
      <Card>
        <h2 className="section-title">📊 Stat Card</h2>
        <p className="text-subtle">
          대시보드 요약 숫자에 사용되는 카드. <code>.stat-card</code> 내에{" "}
          <code>.stat-icon</code>, <code>.stat-number</code>, <code>.stat-label</code> 구성 포함.
        </p>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard icon="💰" number="₩1,240,000" label="이번 달 매출" />
          <StatCard icon="📄" number="7건" label="신규 계약" />
          <StatCard
            icon="⚠️"
            number="₩520,000"
            label="미수금"
            numberClass="text-red-600"
            labelClass="text-red-500"
          />
        </div>
      </Card>


      {/* ⏳ 진행률 바 (.progress-bar) */}
      <Card>
        <h2 className="section-title">⏳ Progress Bar</h2>
        <p className="text-subtle">
          퍼센트 기반의 진행률을 시각화합니다. <code>.progress-bar</code>,{" "}
          <code>.progress-fill</code>, <code>.progress-label</code> 클래스로 구성됩니다.
        </p>
        <br />
        <div className="space-y-4">
          <ProgressBar percent={25} label="계약 준비 중 (25%)" />
          <ProgressBar percent={60} label="작업 진행 중 (60%)" />
          <ProgressBar percent={100} label="완료됨 (100%)" />
        </div>
      </Card>


      {/*  체크리스트 (.checklist) */}
      <Card>
        <h2 className="section-title">✅ Checklist</h2>
        <p className="text-subtle">
          할 일 목록, 작업 상태 등을 표시하는 구성입니다. <code>.checklist</code>,{" "}
          <code>.todo-item</code>, <code>.todo-label</code> 클래스를 사용하며,
          완료 항목에는 <code>.todo-checked</code>가 자동 적용됩니다.
        </p>
        <br />
        <Checklist
          items={[
            { label: '계약서 작성', checked: true },
            { label: '회의 일정 잡기', checked: false },
            { label: '세금계산서 발행', checked: false },
          ]}
        />
      </Card>


          {/* 🗂️ 탭 그룹 (.tab-group, .tab-item) */}
          <Card>
            <h2 className="section-title">🗂️ Tab Group</h2>
            <p className="text-subtle">
              페이지 내 섹션 전환에 사용되는 탭입니다. <code>.tab-group</code>, <code>.tab-item</code>,{" "}
              <code>.active</code> 클래스를 활용하며 클릭 시 <code>onChange</code>로 상태를 관리합니다.
            </p>
            <br />
            {/* 탭 그룹 예시 */}
            <TabGroup
              tabs={["설정", "계약", "통계"]}
              activeIndex={tabIndex}
              onChange={(index) => setTabIndex(index)}
            />
          </Card>


          {/* 🧭 일반 탭 네비게이션 (.tabs) */}
          <Card>
            <h2 className="section-title">🧭 Tabs (Navigation)</h2>
            <p className="text-subtle">
              페이지 상단이나 카드 내부에 사용되는 일반 탭 네비게이션 UI입니다. `.tabs .tab-item` 구성 + `.active`로 강조 배경 처리.
            </p>
            <br />

            {/*  컴포넌트 기반 탭 네비게이션 */}
            <Tabs
              tabs={['전체', '미확인', '완료됨']}
              activeIndex={tabIndex}
              onChange={(index) => setTabIndex(index)}
            />

            {/* 선택된 탭 표시 (옵션) */}
            <p className="mt-4 text-sm text-gray-600">
              현재 선택된 탭: <strong>{['전체', '미확인', '완료됨'][tabIndex]}</strong>
            </p>
          </Card>


          <Card>
            <h2 className="section-title">📅 CalendarTag</h2>
            <p className="text-subtle">
              일정 마감일, 회의 예정일 등 간단한 일정 태그입니다. `.calendar-tag` 클래스를 사용하며, 텍스트 중심의 태그 스타일입니다.
            </p>
            <br />

            {/*  컴포넌트 기반 캘린더 태그 예시 */}
            <div className="flex gap-2">
              <CalendarTag label="D-3" />
              <CalendarTag label="오늘" />
              <CalendarTag label="내일" />
              <CalendarTag label="다음 주" />
            </div>
          </Card>


          {/* 🗓️ 일정 카드 박스 (.schedule-card) */}
        <Card>
          <h2 className="section-title">🗓️ ScheduleCard</h2>
          <p className="text-subtle">
            단일 일정 항목을 카드 형태로 보여주는 UI입니다. `.schedule-card`, `.schedule-date`, `.schedule-title` 클래스를 사용합니다.
          </p>
          <br />

          {/*  컴포넌트 기반 일정 카드 예시 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ScheduleCard date="2025-07-15" title="계약서 마감" />
            <ScheduleCard date="2025-07-17" title="고객 미팅" />
            <ScheduleCard date="2025-07-20" title="정산 마감일" />
          </div>
        </Card>


          {/* 📈 차트 카드 (.chart-card) */}
        <Card>
          <h2 className="section-title">📈 ChartCard</h2>
          <p className="text-subtle">
            통계 차트 또는 시각화 데이터를 출력하는 박스 UI입니다. `.chart-card`, `.chart-title`, `.chart-subtext`, `.chart-container` 클래스를 사용합니다.
          </p>
          <br />

          {/*  컴포넌트 기반 차트 카드 예시 */}
          <ChartCard title="매출 추이" subtext="최근 6개월 기준">
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
              🔧 차트 컴포넌트 (예: BarChart 등) 위치
            </div>
          </ChartCard>
        </Card>

            {/* 📂 파일 드롭존 (.dropzone) */}
        <Card>
          <h2 className="section-title">📂 Dropzone</h2>
          <p className="text-subtle">
            사용자가 파일을 업로드할 수 있는 드래그 앤 드롭 영역입니다. `.dropzone`, `.dropzone-text` 클래스를 기반으로 구성됩니다.
          </p>
          <br />
          {/*  Dropzone 컴포넌트 예시 */}
          <Dropzone
            onDrop={(files) => {
              console.log('업로드된 파일 목록:', files);
              // StyleGuide 내에서는 업로드 처리 대신 콘솔 출력
            }}
          />
        </Card>

          {/* 🧭 브레드크럼 (.breadcrumb) */}
        <Card>
          <h2 className="section-title">🧭 Breadcrumb</h2>
          <p className="text-subtle">
            현재 위치를 표시하는 네비게이션 경로 UI입니다. `.breadcrumb`, `.breadcrumb-item`, `.breadcrumb-separator` 클래스를 사용하며,
            탭/버튼과 달리 페이지 구조를 안내합니다.
          </p>
          <br />
          {/*  Breadcrumb 컴포넌트 예시 */}
          <Breadcrumb items={['고객', '계약', '상세']} />
        </Card>


        {/* 📜 활동 카드 (.activity-card) */}
          <Card>
            <h2 className="section-title">📜 ActivityCard</h2>
            <p className="text-subtle">
              최근 작업, 알림, 변경 이력 등을 시간순으로 나열하는 카드입니다. `.activity-card`, `.activity-item`, `.activity-icon`, `.activity-text`, `.activity-time` 클래스를 사용합니다.
            </p>
            <br />
            {/*  ActivityCard 컴포넌트 예시 */}
            <ActivityCard
              activities={[
                { icon: '📄', text: '계약서 업로드 완료', time: '5분 전' },
                { icon: '🔔', text: '회의 알림 전송됨', time: '30분 전' },
                { icon: '✏️', text: '계약서 내용 수정', time: '2시간 전' }
              ]}
            />
          </Card>


        {/* 🔔 알림 메시지 (.notification) */}
          <Card>
            <h2 className="section-title">🔔 Notification</h2>
            <p className="text-subtle">
              알림 센터 또는 드롭다운 내 알림 항목에 사용됩니다. `.notification`, `.notification-icon`, `.notification-title`, `.notification-time` 등의 클래스를 조합해 구성합니다.
            </p>
            <br />
            {/*  Notification 컴포넌트 예시 */}
            <div className="space-y-2">
              <Notification icon="📩" title="새 메시지가 도착했어요" time="3분 전" />
              <Notification icon="📅" title="회의 일정이 곧 시작돼요" time="10분 전" />
              <Notification icon="✅" title="작업이 완료되었습니다" time="1시간 전" />
            </div>
          </Card>


          {/* 🔍 검색 입력창 (.search-bar) */}
          <Card>
            <h2 className="section-title">🔍 SearchBar</h2>
            <p className="text-subtle">
              상단 검색이나 필터 입력용으로 사용되는 컴포넌트입니다. `.search-bar` 클래스 내부에 인풋이 포함되며, <code>:focus-within</code> 시 box-shadow 강조 효과가 적용됩니다.
            </p>
            <br />
            {/*  SearchBar 컴포넌트 예시 */}
            <div className="max-w-md">
              <SearchBar placeholder="계약명을 검색하세요" value="" onChange={() => {}} />
            </div>
          </Card>


          {/* 👤 사용자 아바타 (.user-avatar) */}
          <Card>
            <h2 className="section-title">👤 UserAvatar</h2>
            <p className="text-subtle">
              사용자 프로필 이미지를 원형으로 출력하며, 하단 우측에 온라인 상태 뱃지를 표시합니다. `.user-avatar` 클래스 기반으로 스타일링되며, 상태값에 따라 `.status-online` 또는 `.status-offline` 클래스가 적용됩니다.
            </p>
            <br />
            {/*  UserAvatar 컴포넌트 예시 */}
            <div className="flex gap-4 items-center">
              <UserAvatar src="/images/sample-user1.jpg" status="online" />
              <UserAvatar src="/images/sample-user2.jpg" status="offline" />
            </div>
          </Card>


          {/* ⬇️ 드롭다운 메뉴 (.dropdown-menu) */}
          <Card>
            <h2 className="section-title">⬇️ DropdownMenu</h2>
            <p className="text-subtle">
              필터, 설정, 계정 옵션 등의 팝업형 메뉴에 사용되는 컴포넌트입니다. `.dropdown-menu`와 `.dropdown-item` 클래스 기반으로 구성되며, 위험 항목은 `.dropdown-item-danger` 클래스로 강조됩니다.
            </p>
            <br />
            {/*  DropdownMenu 컴포넌트 예시 */}
            <div className="relative inline-block">
              <DropdownMenu
                items={[
                  { label: '프로필 보기' },
                  { label: '설정' },
                  { label: '로그아웃', danger: true },
                ]}
                onSelect={(item) => alert(`선택됨: ${item.label}`)}
              />
            </div>
          </Card>

<br />
<br />

      {/* 🔘 스위치 토글 (.switch-toggle) */}
          <Card>
            <h2 className="section-title">🔘 Switch Toggle</h2>
            <p className="text-subtle">
              설정 값의 활성화/비활성화를 제어하는 토글 스위치입니다. `.switch-toggle` 및 `.checked` 클래스로 색상 및 위치를 제어합니다.
            </p>
            <br />

            <div className="flex items-center gap-4">
              <SwitchToggle
                checked={isToggleOn}
                onToggle={() => setIsToggleOn((prev) => !prev)}
              />
              <span className="text-sm text-gray-600">
                현재 상태: {isToggleOn ? "ON" : "OFF"}
              </span>
            </div>
          </Card>


    {/* 📆 타임라인 리스트 (.timeline-list) */}
          <Card>
            <h2 className="section-title">📆 TimelineList</h2>
            <p className="text-subtle">
              계약 이력, 일정 흐름 등 시간 순서에 따른 시각적 정보 흐름을 보여주는 컴포넌트입니다.
              `.timeline-list`, `.timeline-item`, `.timeline-content` 등의 클래스로 구성되며, 왼쪽에 점과 선을 기준으로 정렬됩니다.
            </p>
            <br />
            {/* TimelineList 예시 */}
            <TimelineList
              items={[
                { content: '계약서 초안 작성 완료', time: '2025-07-01 10:00' },
                { content: '검토 요청 전송', time: '2025-07-01 14:30' },
                { content: '클라이언트 피드백 수신', time: '2025-07-02 09:15' },
                { content: '최종 확정 및 서명', time: '2025-07-03 17:45' },
              ]}
            />
          </Card>


              {/* 🪜 스텝 UI (.stepper) */}
          <Card>
            <h2 className="section-title">🪜 Stepper</h2>
            <p className="text-subtle">
              프로세스의 현재 단계를 시각적으로 표시하는 UI입니다. 
              `.stepper`, `.step`, `.step-line`, `.step.active` 클래스를 조합하여 구성합니다.
              <br />예: 회원가입, 계약 절차, 온보딩 단계 등에서 사용합니다.
            </p>
            <br />
            {/* Stepper 예시 */}
            <Stepper
              steps={['계약 생성', '검토 중', '서명 완료', '진행 완료']}
              currentStep={1}
            />
          </Card>


          {/* 📅 달력 셀 (.calendar-cell) */}
          <Card>
            <h2 className="section-title">📅 CalendarCell</h2>
            <p className="text-subtle">
              달력 셀을 나타내는 단위 UI로, `.calendar-cell`, `.today`, `.selected` 클래스를 사용해 오늘 날짜 또는 선택 상태를 구분합니다.
              <br />달력 구성이나 마감일 표시 등에 적합합니다.
            </p>
            <br />
            {/* CalendarCell 예시 */}
            <div className="grid grid-cols-7 gap-2">
              <CalendarCell day="28" />
              <CalendarCell day="29" />
              <CalendarCell day="30" />
              <CalendarCell day="1" isToday />
              <CalendarCell day="2" isSelected />
              <CalendarCell day="3" />
              <CalendarCell day="4" />
            </div>
          </Card>



          {/* 🏷️ 필터 칩 (.filter-chip) */}
          <Card>
            <h2 className="section-title">🏷️ Filter Chip</h2>
            <p className="text-subtle">
              통계, 리스트 등에서 선택형 필터로 사용됩니다. `.filter-chip`에 `.active` 클래스로 선택 상태를 시각화합니다.
            </p>
            <br/>
            <div className="flex flex-wrap gap-2">
              <span className="filter-chip active">전체</span>
              <span className="filter-chip">진행 중</span>
              <span className="filter-chip">완료</span>
              <span className="filter-chip">지연됨</span>
              <span className="filter-chip">보류</span>
            </div>
          </Card>


          {/* 📊 차트 래퍼 (.chart-wrapper) */}
          <Card>
            <h2 className="section-title">📊 ChartWrapper</h2>
            <p className="text-subtle">
              통계, 매출, 계약 현황 등 데이터를 시각화할 때 사용하는 래퍼입니다. 내부에 BarChart, LineChart 등을 넣어 사용하세요.
            </p>
            <br />
            <ChartWrapper>
              {/* 예시 차트 모양 (진짜 차트 대신 박스 형태로 표현) */}
              <div className="w-full h-48 bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-md flex items-center justify-center text-white font-semibold">
                [여기에 BarChart, LineChart 등이 삽입됩니다]
              </div>
            </ChartWrapper>
          </Card>


    </div>

      
  );
};

export default StyleGuide;
