import svgPaths from "./svg-sofqi56sw5";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M2 12L6 7L9 10L13 4" id="Vector" stroke="#00C896" strokeLinecap="square" strokeWidth="2" />
          <path d="M11 4H13V6" id="Vector_2" stroke="#00C896" strokeLinecap="square" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[28px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[#efefed] text-[17px] text-center tracking-[-0.34px] whitespace-nowrap">
        <span className="leading-[25.5px]">Swing</span>
        <span className="leading-[25.5px] text-[#00c896]">Space</span>
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center pr-[40px] relative shrink-0 w-[168px]" data-name="Button">
      <Container1 />
      <Text />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute border-[#00c896] border-b-2 border-solid content-stretch flex flex-col h-[33.5px] items-center justify-center left-0 py-[6px] top-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#efefed] text-[13px] text-center tracking-[0.13px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col h-[32.5px] items-start relative shrink-0 w-[70px]" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid content-stretch flex flex-col h-[33.5px] items-center justify-center left-0 py-[6px] top-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#7a7a77] text-[13px] text-center tracking-[0.13px] whitespace-nowrap">Positions</p>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="content-stretch flex flex-col h-[32.5px] items-start relative shrink-0 w-[57px]" data-name="Button:margin">
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid content-stretch flex flex-col h-[33.5px] items-center justify-center left-0 py-[6px] top-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#7a7a77] text-[13px] text-center tracking-[0.13px] whitespace-nowrap">New Position</p>
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="content-stretch flex flex-col h-[32.5px] items-start relative shrink-0 w-[82px]" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[974.68_0_0] gap-[24px] items-start justify-center min-w-px relative" data-name="Navigation">
      <ButtonMargin />
      <ButtonMargin1 />
      <ButtonMargin2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g id="Icon">
          <path d="M7.5 1V10M4 7L7.5 10.5L11 7" id="Vector" stroke="#7A7A77" strokeLinecap="square" strokeWidth="1.5" />
          <path d="M2 11V13H13V11" id="Vector_2" stroke="#7A7A77" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="border border-[#2c2c29] border-solid content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[34px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g clipPath="url(#clip0_0_16)" id="Icon">
          <path d="M7.5 10V1M4 4L7.5 0.5L11 4" id="Vector" stroke="#7A7A77" strokeLinecap="square" strokeWidth="1.5" />
          <path d="M2 11V13H13V11" id="Vector_2" stroke="#7A7A77" strokeLinecap="square" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_0_16">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="border border-[#2c2c29] border-solid content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[34px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="15" preserveAspectRatio="none" viewBox="0 0 15 15" width="15">
        <g clipPath="url(#clip0_0_4)" id="Icon">
          <path d={svgPaths.p69c2300} id="Vector" stroke="#7A7A77" strokeWidth="1.5" />
          <path d={svgPaths.p27e6b880} id="Vector_2" stroke="#7A7A77" strokeLinecap="square" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_0_4">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[34px]" data-name="Button">
      <Icon3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[56px] items-center max-w-[1300px] px-[24px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Navigation />
      <Container2 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#161615] border-[#2c2c29] border-b border-solid content-stretch flex flex-col items-start relative rounded-[37px] shrink-0 w-[1236px]" data-name="Header">
      <ContainerMargin />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">Total Invested</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-start pt-[12px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[26.4px] relative shrink-0 text-[#0c0c0b] text-[24px] tracking-[-0.72px] whitespace-nowrap">₹5,46,250</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[8px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">4 open positions</p>
    </div>
  );
}

function StatCard() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[28px] relative" data-name="StatCard">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">{`Unrealized P&L`}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-start pt-[12px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[26.4px] relative shrink-0 text-[#007a5e] text-[24px] tracking-[-0.72px] whitespace-nowrap">+₹17,350.00</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[8px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">+3.18%</p>
    </div>
  );
}

function StatCard1() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[28px] relative" data-name="StatCard">
      <Paragraph3 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">{`Realized P&L`}</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-start pt-[12px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[26.4px] relative shrink-0 text-[#007a5e] text-[24px] tracking-[-0.72px] whitespace-nowrap">+₹21,670.00</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[8px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">4 trades closed</p>
    </div>
  );
}

function StatCard2() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[28px] relative" data-name="StatCard">
      <Paragraph6 />
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">Avg Risk/Reward</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-start pt-[12px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[26.4px] relative shrink-0 text-[#0c0c0b] text-[24px] tracking-[-0.72px] whitespace-nowrap">2.21 R</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[8px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">across open positions</p>
    </div>
  );
}

function StatCard3() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[28px] relative" data-name="StatCard">
      <Paragraph9 />
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">{`Total P&L`}</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-start pt-[12px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[26.4px] relative shrink-0 text-[#007a5e] text-[24px] tracking-[-0.72px] whitespace-nowrap">+₹39,020.00</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pt-[8px] relative shrink-0 w-[176.398px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">unrealized + realized</p>
    </div>
  );
}

function StatCard4() {
  return (
    <div className="content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[28px] relative" data-name="StatCard">
      <Paragraph12 />
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white content-center flex flex-wrap gap-[16px_0px] h-[138px] items-center justify-center relative rounded-[24px] shrink-0 w-[1236px]" data-name="Container">
      <StatCard />
      <div className="flex h-[82px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[82px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 82 1" width="82">
                <line id="Line 4" stroke="#E4E4E4" x2="82" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <StatCard1 />
      <div className="flex h-[82px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[82px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 82 1" width="82">
                <line id="Line 4" stroke="#E4E4E4" x2="82" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <StatCard2 />
      <div className="flex h-[82px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[82px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 82 1" width="82">
                <line id="Line 4" stroke="#E4E4E4" x2="82" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <StatCard3 />
      <div className="flex h-[82px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[82px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 82 1" width="82">
                <line id="Line 4" stroke="#E4E4E4" x2="82" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <StatCard4 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">{`Closed Trade P&L`}</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[4px] relative shrink-0 w-[121px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">Per trade bar chart</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[121px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#eaeae6] content-stretch flex items-center px-[8px] py-[2px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap">4 trades</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Text1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#007a5e] content-stretch flex flex-[1_0_0] items-center justify-center min-w-[67px] opacity-85 px-[43px] py-[36px] relative rounded-[8px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">RELIANCE</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#007a5e] flex-[1_0_86px] h-[62px] min-w-[67px] opacity-85 relative rounded-[8px]" data-name="Container">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[43px] py-[36px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">INFY</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#a81f1f] content-stretch flex flex-[1_0_0] h-[81px] items-center justify-center min-w-[67px] opacity-85 px-[43px] py-[36px] relative rounded-[8px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">TATASTEEL</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#007a5e] flex-[1_0_86px] h-[41px] min-w-[67px] opacity-85 relative rounded-[8px]" data-name="Container">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[43px] py-[36px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">AXISBANK</p>
        </div>
      </div>
    </div>
  );
}

function PnlBarChart() {
  return (
    <div className="content-stretch flex gap-[3px] h-[124px] items-end pt-[24px] px-[4px] relative shrink-0 w-[552px]" data-name="PnlBarChart">
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col items-start justify-self-stretch p-[28px] relative rounded-[24px] row-1 self-stretch shrink-0" data-name="Container">
      <Container6 />
      <PnlBarChart />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#585856] text-[11px] tracking-[0.88px] uppercase whitespace-nowrap">{`Cumulative P&L`}</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[6px] relative shrink-0 w-[131px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-semibold leading-[30px] relative shrink-0 text-[#007a5e] text-[20px] whitespace-nowrap">+₹21,670.00</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[131px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
    </div>
  );
}

function CumulativeLine() {
  return (
    <div className="h-[80px] relative shrink-0 w-[552px]" data-name="CumulativeLine">
      <svg className="absolute block inset-0 size-full" fill="none" height="80" preserveAspectRatio="none" viewBox="0 0 552 80" width="552">
        <g clipPath="url(#clip0_0_9)" id="CumulativeLine">
          <path d="M0 80H552" id="Vector" stroke="#CCCBC6" strokeDasharray="4.21 4.21" strokeWidth="1.40408" />
          <path d={svgPaths.pf8ef900} id="Vector_2" stroke="#007A5E" strokeLinejoin="round" strokeWidth="2.10611" />
          <path d={svgPaths.p3959b200} fill="#007A5E" id="Vector_3" />
          <path d={svgPaths.p33ec3f80} fill="#007A5E" id="Vector_4" />
          <path d={svgPaths.pfc6f80} fill="#007A5E" id="Vector_5" />
          <path d={svgPaths.p1e2a3800} fill="#007A5E" id="Vector_6" />
        </g>
        <defs>
          <clipPath id="clip0_0_9">
            <rect fill="white" height="80" width="552" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CumulativeLineMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="CumulativeLine:margin">
      <CumulativeLine />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white col-2 content-stretch flex flex-col items-start justify-self-stretch p-[28px] relative rounded-[24px] row-1 self-stretch shrink-0" data-name="Container">
      <Container13 />
      <CumulativeLineMargin />
    </div>
  );
}

function Container4() {
  return (
    <div className="gap-x-[24px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_220.50px] h-[221px] relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container12 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[#0c0c0b] text-[14px] whitespace-nowrap">Open Positions</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#d7f4ed] content-stretch flex h-[24px] items-center px-[8px] py-[2px] relative rounded-[24px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a5e] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap">4</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="border-[#cccbc6] border-b border-solid content-stretch flex gap-[8px] items-center px-[28px] py-[20px] relative shrink-0 w-full" data-name="Container">
      <Paragraph19 />
      <Text2 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute border-[#cccbc6] border-b border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[41px] leading-[16.5px] left-0 not-italic text-[#585856] text-[11px] top-[0.25px] tracking-[0.66px] uppercase w-[1234px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[20px] top-[12px]">Symbol</p>
      <p className="absolute left-[265.77px] top-[12px]">Qty</p>
      <p className="absolute left-[363.31px] top-[12px]">Entry</p>
      <p className="absolute left-[491.25px] top-[12px]">SL</p>
      <p className="absolute left-[619.19px] top-[12px]">Target</p>
      <p className="absolute left-[749.88px] top-[12px]">LTP</p>
      <p className="absolute left-[877.81px] top-[12px]">{`Unr. P&L`}</p>
      <p className="absolute left-[1019.81px] top-[12px]">R:R</p>
      <p className="absolute left-[1137.66px] top-[12px]">Risk</p>
    </div>
  );
}

function Container19() {
  return <div className="bg-[#007a5e] relative rounded-[3px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#0c0c0b] text-[13px] whitespace-nowrap">RELIANCE</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="border border-[#cccbc6] border-solid content-stretch flex flex-col items-start px-[4px] py-px relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[#585856] text-[10px] whitespace-nowrap">NSE</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[19.88px] top-[14.5px] w-[206px]" data-name="Container">
      <Container19 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#cccbc6] border-b border-solid h-[49px] left-0 top-[41px] w-[1234px]" data-name="Table Row">
      <Container18 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[265.77px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">50</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[363.31px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹2,950</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[491.25px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹2,860</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[619.19px] text-[#585856] text-[13px] top-[15px] whitespace-nowrap">₹3,150</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[749.88px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹3,020</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[877.81px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹3500</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[1019.81px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">2.22R</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[1137.66px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹4500</p>
    </div>
  );
}

function Container21() {
  return <div className="bg-[#007a5e] relative rounded-[3px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#0c0c0b] text-[13px] whitespace-nowrap">INFY</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="border border-[#cccbc6] border-solid content-stretch flex flex-col items-start px-[4px] py-px relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[#585856] text-[10px] whitespace-nowrap">NSE</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[19.88px] top-[14.5px] w-[206px]" data-name="Container">
      <Container21 />
      <Text5 />
      <Text6 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#cccbc6] border-b border-solid h-[49px] left-0 top-[89.5px] w-[1234px]" data-name="Table Row">
      <Container20 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[265.77px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">100</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[363.31px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,580</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[491.25px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹1,520</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[619.19px] text-[#585856] text-[13px] top-[15px] whitespace-nowrap">₹1,720</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[749.88px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,648</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[877.81px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹6800</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[1019.81px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">2.33R</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[1137.66px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹6000</p>
    </div>
  );
}

function Container23() {
  return <div className="bg-[#007a5e] relative rounded-[3px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#0c0c0b] text-[13px] whitespace-nowrap">TATASTEEL</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="border border-[#cccbc6] border-solid content-stretch flex flex-col items-start px-[4px] py-px relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[#585856] text-[10px] whitespace-nowrap">NSE</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[19.88px] top-[14.5px] w-[206px]" data-name="Container">
      <Container23 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#cccbc6] border-b border-solid h-[49px] left-0 top-[138px] w-[1234px]" data-name="Table Row">
      <Container22 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[265.77px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">500</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[363.31px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹168</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[491.25px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹158</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[619.19px] text-[#585856] text-[13px] top-[15px] whitespace-nowrap">₹192</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[749.88px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹174</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[877.81px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹3000</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[1019.81px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">2.40R</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[1137.66px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹5000</p>
    </div>
  );
}

function Container25() {
  return <div className="bg-[#007a5e] relative rounded-[3px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#0c0c0b] text-[13px] whitespace-nowrap">AXISBANK</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="border border-[#cccbc6] border-solid content-stretch flex flex-col items-start px-[4px] py-px relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[#585856] text-[10px] whitespace-nowrap">NSE</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[19.88px] top-[14.5px] w-[206px]" data-name="Container">
      <Container25 />
      <Text9 />
      <Text10 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[49px] left-0 top-[186.5px] w-[1234px]" data-name="Table Row">
      <Container24 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[265.77px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">150</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[363.31px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,045</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[491.25px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹1,090</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[619.19px] text-[#585856] text-[13px] top-[15px] whitespace-nowrap">₹960</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[749.88px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,018</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[877.81px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹4050</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[1019.81px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">1.89R</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[1137.66px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹6750</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[236px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[#0c0c0b] text-[14px] whitespace-nowrap">Recent Closed Trades</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="border-[#cccbc6] border-b border-solid content-stretch flex flex-col items-start px-[28px] py-[20px] relative shrink-0 w-full" data-name="Container">
      <Paragraph20 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="[word-break:break-word] absolute border-[#cccbc6] border-b border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[41px] leading-[16.5px] left-0 not-italic text-[#585856] text-[11px] top-[0.25px] tracking-[0.66px] uppercase w-[1234px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[20px] top-[12px]">Symbol</p>
      <p className="absolute left-[334.92px] top-[12px]">Entry</p>
      <p className="absolute left-[498.1px] top-[12px]">Exit</p>
      <p className="absolute left-[661.28px] top-[12px]">{`P&L`}</p>
      <p className="absolute left-[839.3px] top-[12px]">Return %</p>
      <p className="absolute left-[1036.84px] top-[12px]">Close Date</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute border border-[#cccbc6] border-solid h-[16px] left-[115.43px] top-[17.75px] w-[30px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[3.92px] not-italic text-[#585856] text-[10px] top-0 whitespace-nowrap">NSE</p>
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#cccbc6] border-b border-solid h-[49px] left-0 top-[41px] w-[1234px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[20px] not-italic text-[#0c0c0b] text-[13px] top-[15.5px] whitespace-nowrap">TATAMOTORS</p>
      <Text11 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[334.92px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹920</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[498.1px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,008</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[661.28px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹10560</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[839.3px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+9.57%</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[1036.84px] not-italic text-[#585856] text-[13px] top-[15.5px] whitespace-nowrap">08 Jul 2025</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute border border-[#cccbc6] border-solid h-[16px] left-[69.8px] top-[17.75px] w-[30px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[3.92px] not-italic text-[#585856] text-[10px] top-0 whitespace-nowrap">NSE</p>
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[#cccbc6] border-b border-solid h-[49px] left-0 top-[89.5px] w-[1234px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[20px] not-italic text-[#0c0c0b] text-[13px] top-[15.5px] whitespace-nowrap">WIPRO</p>
      <Text12 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[334.92px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹480</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[498.1px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹522</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[661.28px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹8400</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[839.3px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+8.75%</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[1036.84px] not-italic text-[#585856] text-[13px] top-[15.5px] whitespace-nowrap">18 Jul 2025</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute border border-[#cccbc6] border-solid h-[16px] left-[111.45px] top-[17.75px] w-[30px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[3.92px] not-italic text-[#585856] text-[10px] top-0 whitespace-nowrap">NSE</p>
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute border-[#cccbc6] border-b border-solid h-[49px] left-0 top-[138px] w-[1234px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[20px] not-italic text-[#0c0c0b] text-[13px] top-[15.5px] whitespace-nowrap">SUNPHARMA</p>
      <Text13 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[334.92px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,250</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[498.1px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,192</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[661.28px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">₹4640</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[839.3px] text-[#c12020] text-[13px] top-[15px] whitespace-nowrap">-4.64%</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[1036.84px] not-italic text-[#585856] text-[13px] top-[15.5px] whitespace-nowrap">20 Jul 2025</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute border border-[#cccbc6] border-solid h-[16px] left-[99.43px] top-[17.75px] w-[30px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[3.92px] not-italic text-[#585856] text-[10px] top-0 whitespace-nowrap">NSE</p>
    </div>
  );
}

function TableRow9() {
  return (
    <div className="absolute h-[49px] left-0 top-[186.5px] w-[1234px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[20px] not-italic text-[#0c0c0b] text-[13px] top-[15.5px] whitespace-nowrap">HDFCBANK</p>
      <Text14 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[334.92px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,620</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[498.1px] text-[#0c0c0b] text-[13px] top-[15px] whitespace-nowrap">₹1,718</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[19.5px] left-[661.28px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+₹7350</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[839.3px] text-[#007a5e] text-[13px] top-[15px] whitespace-nowrap">+6.05%</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[1036.84px] not-italic text-[#585856] text-[13px] top-[15.5px] whitespace-nowrap">24 Jul 2025</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[236px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <TableRow5 />
      <TableRow6 />
      <TableRow7 />
      <TableRow8 />
      <TableRow9 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[11px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="11" preserveAspectRatio="none" viewBox="0 0 11 11" width="11">
        <g clipPath="url(#clip0_0_7)" id="Icon">
          <path d="M1 8L4 5L6 7L9 3" id="Vector" stroke="white" strokeLinecap="square" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_0_7">
            <rect fill="white" height="11" width="11" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#008f6e] content-stretch flex items-center justify-center relative shrink-0 size-[20px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Outfit:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#0c0c0b] text-[13px] whitespace-nowrap">SwingSpace</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container31 />
      <Text15 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Italic',sans-serif] font-normal italic leading-[18px] relative shrink-0 text-[#585856] text-[12px] whitespace-nowrap">Vibe coded by Mukuldev S S</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Paragraph21 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container:margin">
      <Container29 />
    </div>
  );
}

function Footer() {
  return (
    <div className="border-[#cccbc6] border-solid border-t content-stretch flex flex-col h-[61px] items-start py-[20px] relative shrink-0 w-full" data-name="Footer">
      <ContainerMargin1 />
    </div>
  );
}

export default function MacBookPro() {
  return (
    <div className="bg-[#edece8] content-stretch flex flex-col gap-[40px] items-start px-[138px] py-[24px] relative size-full" data-name="MacBook Pro 14' - 1">
      <Header />
      <Container3 />
      <Container4 />
      <Container15 />
      <Container26 />
      <Footer />
    </div>
  );
}