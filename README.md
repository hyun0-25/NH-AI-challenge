# NH농협은행 AI Idea Challenge

# 한눈에, 농업금융 (AI 기반 농업인 맞춤 금융 플랫폼)


## 📝 프로젝트 개요
**“내 농장과 내 상황에 꼭 맞춘 AI 기반 금융·보험·정책 플랫폼으로 농업인의 경영과 의사결정을 지원”**

본 서비스는 농업인을 위한 금융·보험·정책 통합 플랫폼으로, RAG 기반 AI 챗봇과 맞춤형 추천 리스트를 통해 농업인의 실질적 어려움을 해소하고 NH농협은행 모바일 앱 이용자 수 확대에 기여합니다.

---

## 🌟 서비스 개요
- **내 영농/농장 관리**: 농장 위치 및 유형/면적 정보와 작물의 품종을 선택하여 맞춤형 정보 지원
- **AI 챗봇**: 실시간 질의응답 및 맞춤형 상담 지원  
- **추천 리스트**: 금융·보험·정책 상품 맞춤 추천  
- **알리미 서비스**: 자연재해 및 정책 업데이트 푸시 알림 제공  

---

## 💡 핵심 기능
###  AI 챗봇
- 농업, 보험, 정책 등 다양한 주제 질의응답  
- 자연어 이해 기반 맞춤형 답변 제공  
- 추천 근거와 함께 제공

###  추천 리스트
- 최신 보험 및 금융 상품 실시간 반영  
- 정책 변화 및 신규 상품 신속 안내  
- 최대 3개 맞춤형 추천 상품 제공, 나머지는 최신순 확인 가능

###  알리미 서비스
- 농작물 재해 발생 시 최적화된 보험 상품 자동 추천  
- 신규 정책, 보조금, 금융상품 업데이트 시 푸시 알림

---

## 🎬 기능 동작 화면
### 1. 농장 정보 등록
<img src="https://github.com/user-attachments/assets/bd252ccd-f54a-4936-ab7c-dc0ada7bf112" width="250" style="border-radius:15px;"/>

### 2. 내 영농/농장 삭제
<img src="https://github.com/user-attachments/assets/dba35151-5c78-4ed2-a9ab-4070eece2d95" width="250" style="border-radius:15px;"/>

### 3. 추천 금융·보험·정책 리스트
<table>
  <tr>
    <td align="center"><b>정책</b></td>
    <td align="center"><b>보험</b></td>
    <td align="center"><b>금융</b></td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/a22c2daa-d785-44cb-a1b5-5e37c2d1bc78" width="250" style="border-radius:15px;"/>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c4529643-3d8e-4d57-aed8-f692fe3f64d5" width="250" style="border-radius:15px;"/>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/4b2f1e9e-8695-4663-805c-ae3348e56c5f" width="250" style="border-radius:15px;"/>
    </td>
  </tr>
</table>

### 4. AI 챗봇 상담
<img src="https://github.com/user-attachments/assets/7cdf7bbe-fc82-47c4-9bde-a158bccab781" width="250" style="border-radius:15px;"/>


### 5. 맞춤 푸시 알리미
<img src="https://github.com/user-attachments/assets/89817175-8fbe-4022-a766-7832511f70e2" width="250" style="border-radius:15px;"/>



## 🛠 기술 스택
| 구분 | 기술 |
|------|------|
| **UI/UX** | Figma |
| **프론트엔드** | Cursor AI, React, TypeScript, Tailwind CSS |
| **백엔드** | Spring Boot, FastAPI (AI 모델 호출) |
| **데이터베이스** | MySQL, VectorDB |
| **AI/ML** | RAG 기반 LLM, OpenAI API, LangChain |


## ⚡ 설치 및 실행 방법
### 1. Frontend
```bash
cd frontend/app
npm install
npm run dev
```
### 2. Backend
```
cd backend
./gradlew bootRun
```

### 3. AI Server
```
cd ai
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
