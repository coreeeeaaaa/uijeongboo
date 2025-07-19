/**
 * SAAAAHA 디자인 피드백 자동 감지 및 저장 시스템
 * 
 * 사용자 메시지에서 디자인 관련 키워드를 감지하고 자동으로 저장
 */

class AutoDesignTracker {
  constructor() {
    this.designKeywords = [
      // 색상 관련
      '색상', '컬러', 'color', '라임', '코랄핑크', '배경', '그라데이션',
      
      // 형태 관련
      '모양', '원', '사각형', '둥근', '모서리', '테두리', '그림자',
      
      // 레이아웃 관련
      '패딩', '여백', '간격', '정렬', '배치', '사이드바', '푸터',
      
      // 스타일 관련
      '디자인', '스타일', '플랫', '미니멀', '깔끔한', '일관성',
      
      // 애니메이션 관련
      '애니메이션', '전환', '호버', '클릭', '부드러운',
      
      // 문제 관련
      '픽셀', '깨짐', '어긋남', '오류', '에러', '버그'
    ];
    
    this.memoryFile = '/Users/a/personaluse/agents/saaaaha/SAAAAHA_DESIGN_MEMORY.md';
  }

  /**
   * 메시지가 디자인 관련인지 자동 감지
   */
  isDesignRelated(message) {
    const lowerMessage = message.toLowerCase();
    return this.designKeywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
  }

  /**
   * 피드백 자동 저장 함수 (에이전트가 호출)
   */
  async autoSaveFeedback(userMessage) {
    if (!this.isDesignRelated(userMessage)) {
      return { saved: false, reason: '디자인 관련 메시지 아님' };
    }

    const date = new Date().toISOString().split('T')[0];
    const timestamp = new Date().toISOString();
    
    const feedbackEntry = `
### ${date} (자동 감지)
- "${userMessage}"
- **적용**: [에이전트가 처리 예정]
- **감지 시간**: ${timestamp}
`;

    try {
      // 실제 파일 저장은 에이전트가 Bash 명령어로 처리
      return {
        saved: true,
        command: `/Users/a/personaluse/agents/saaaaha/setup-design-system.sh feedback "${userMessage}"`,
        entry: feedbackEntry
      };
    } catch (error) {
      return { saved: false, error: error.message };
    }
  }

  /**
   * 에이전트용 사용 가이드
   */
  getAgentInstructions() {
    return `
// 에이전트가 사용자 메시지를 받았을 때 자동 실행
const tracker = new AutoDesignTracker();
const result = await tracker.autoSaveFeedback(userMessage);

if (result.saved) {
  // Bash 명령어 실행
  await executeBashCommand(result.command);
  console.log('디자인 피드백 자동 저장 완료');
}
`;
  }
}

module.exports = AutoDesignTracker;