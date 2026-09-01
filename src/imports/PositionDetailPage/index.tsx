function Text() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[15.75px] relative shrink-0 text-[#dc2626] text-[10.5px] whitespace-nowrap">SL ₹2,720.00</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[15.75px] relative shrink-0 text-[#9ca3af] text-[10.5px] whitespace-nowrap">Entry ₹2,845.00</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[15.75px] relative shrink-0 text-[#16a34a] text-[10.5px] whitespace-nowrap">TP ₹3,200.00</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[15.75px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container2() {
  return <div className="absolute bg-[#f0f1f4] h-[4px] left-0 rounded-[2px] top-[12px] w-[834px]" data-name="Container" />;
}

function Container3() {
  return <div className="absolute bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] border-solid h-[4px] left-0 rounded-bl-[2px] rounded-tl-[2px] top-[12px] w-[217.188px]" data-name="Container" />;
}

function Container4() {
  return <div className="absolute bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.2)] border-solid h-[4px] left-[217.19px] rounded-br-[2px] rounded-tr-[2px] top-[12px] w-[616.813px]" data-name="Container" />;
}

function Container5() {
  return <div className="absolute bg-[#16a34a] h-[4px] left-[217.5px] opacity-80 rounded-[2px] top-[12.25px] w-[304px]" data-name="Container" />;
}

function Container6() {
  return <div className="absolute bg-[#dc2626] border-2 border-solid border-white left-[-5px] rounded-[5px] size-[10px] top-[9px]" data-name="Container" />;
}

function Container7() {
  return <div className="absolute bg-[#4b5563] border-2 border-solid border-white left-[212.19px] rounded-[5px] size-[10px] top-[9px]" data-name="Container" />;
}

function Container8() {
  return <div className="absolute bg-[#16a34a] border-[2.5px] border-solid border-white left-[514.25px] rounded-[7px] shadow-[0px_0px_10px_0px_#16a34a] size-[14px] top-[7px]" data-name="Container" />;
}

function Container9() {
  return <div className="absolute bg-[#16a34a] border-2 border-solid border-white left-[829px] rounded-[5px] size-[10px] top-[9px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container1 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#16a34a] text-[14px] whitespace-nowrap">LTP ₹3,020.00</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[15px] relative shrink-0 text-[#e85729] text-[10px] text-center tracking-[0.3px] whitespace-nowrap">↻</p>
    </div>
  );
}

function LtpButton() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[3px] relative rounded-[5px] shrink-0" data-name="LTPButton">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#9ca3af] text-[11px] whitespace-nowrap">+175.00 (+6.15% from entry)</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[10px] h-[31px] items-center justify-center pt-[10px] relative shrink-0 w-[834px]" data-name="Container">
      <Text3 />
      <LtpButton />
      <Text5 />
    </div>
  );
}

export default function PositionDetailPage() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[10px] pt-[28px] relative size-full" data-name="PositionDetailPage">
      <Container />
      <ContainerMargin />
      <Container10 />
    </div>
  );
}