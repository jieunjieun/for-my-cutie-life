
function goToRemainSubject() {
  const deadlineBox = document.getElementById('yes-deadline');
  const subject = deadlineBox.getElementsByTagName('tr');

  for (let i = 1; i < subject.length; i++) {
    const targetTd = subject[i].getElementsByTagName('td')[1].getElementsByTagName('span')[1];
    // 마감을 앞두고 있는 강의 확인, 클릭
    if (targetTd.textContent.match(/(1일|\d시간) 후 마감입니다/g)) {
      targetTd.click();
      break;
    }
  }
}

function openClass() {
  const weeklyClassTables = document.getElementsByClassName('mtablelistbox')[0].getElementsByTagName('tbody');

  for (let i = 0; i<weeklyClassTables.length; i++) {
    const weeklyClassTR = weeklyClassTables[i].children[1]
    if (!weeklyClassTR) continue;

    const currentDate = new Date();

    const weeklyClassInfos = weeklyClassTR.children[0]
    const [classStartDate, classEndDate] = weeklyClassInfos.childNodes[0].textContent.trim().split(' ~ ');

    // 현재 날짜가 강의 수강 가능 기간 안에 있는지 확인
    if (new Date(classStartDate) <= currentDate && currentDate < new Date(classEndDate)) {
      const progressStatusLabel = weeklyClassInfos.getElementsByTagName('font')[1].textContent
      if (!progressStatusLabel) continue;

      const [progressPercentage] = progressStatusLabel.match(/([+-]?([0-9]*[.])?[0-9]+)%/);
      // 강의 수강률이 100%가 아닌 강의 찾고 클릭
      if (progressPercentage !== '100%') {
        weeklyClassTR.children[1].getElementsByTagName('button')[0].click()
        break;
      }
    }
  }
}

function playClass() {
  window.dispatchEvent(new KeyboardEvent('keypress', {'key': 'Esc'}));
}

function main() {
  setTimeout(() => {
    // 메인 페이지
    if (window.location.href !== 'https://klas.kw.ac.kr/std/cmn/frame/Frame.do') return;
    goToRemainSubject();
  }, 1000)

  setTimeout(() => {
    // 강좌 리스트
    if (window.location.href !== 'https://klas.kw.ac.kr/std/lis/evltn/OnlineCntntsStdPage.do') return;
    openClass();
  }, 1000)

  // 강의
  setTimeout(() => {
    if (window.location.href !== 'https://klas.kw.ac.kr/spv/lis/lctre/viewer/LctreCntntsViewSpvPage.do') return;
    playClass();
  }, 1000)
}

main();