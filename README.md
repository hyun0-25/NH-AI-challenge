# NH농협은행 AI Idea Challenge

# 한눈에, 농업금융 (AI 기반 농업인 맞춤 금융 플랫폼)


## 💚 프로젝트 개요
**“내 농장과 내 상황에 꼭 맞춘 AI 기반 금융·보험·정책 플랫폼으로 농업인의 경영과 의사결정을 지원”**

본 서비스는 농업인을 위한 금융·보험·정책 통합 플랫폼으로, RAG 기반 AI 챗봇과 맞춤형 추천 리스트를 통해 농업인의 실질적 어려움을 해소하고 NH농협은행 모바일 앱 이용자 수 확대에 기여합니다.

---

## 📝 서비스 개요
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
<p align="left">농장 위치 & 유형 -> 작물 품종선택 -> 등록 완료</p>
<img src="https://github.com/user-attachments/assets/7ef4617e-7171-4926-a6e3-289ee02d528c" width="200" style="border-radius:15px;"/>

### 2. 내 영농/농장 삭제
<p align="left">내 영농/농장 리스트 -> 농장 삭제</p>
<img src="https://github.com/user-attachments/assets/0c8e986a-e3e2-4c89-8118-0059952f86b0" width="200" style="border-radius:15px;"/>

### 3. 추천 금융·보험·정책 리스트
농장별 작물 택1 -> 추천 버튼 클릭 -> RAG기반 상위 3개 추천 & 이외 최신 리스트
<table>
  <tr>
    <td align="center"><b>금융</b></td>
    <td align="center"><b>보험</b></td>
    <td align="center"><b>정책</b></td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d1b7f60b-7629-4257-b2c9-c1f9e76fd401" width="200" style="border-radius:15px;"/>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/a515933f-ed2c-49ad-89b3-f1e1c431d8e5" width="200" style="border-radius:15px;"/>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/7d0c1a8d-d132-4589-bd8e-705eba02f6cf" width="200" style="border-radius:15px;"/>
    </td>
  </tr>
</table>

### 4. AI 챗봇 상담
<p align="left">농장별 작물 택1 -> AI 챗봇 상담 버튼 클릭 -> 상담 영역 선택 -> 사용자 질의 -> RAG기반 LLM 응답 생성</p>
<img src="https://github.com/user-attachments/assets/3399448b-a1db-4b77-b0e7-beb117e00285" width="200" style="border-radius:15px;"/>


### 5. 맞춤 푸시 알리미
<p align="left">(재해 발생, 맞춤 정책/금융상품 업데이트 -> 고객 정보 기반 알림 생성) => 푸시알림 수신 -> 알림 내역 -> 세부내용 조회</p>
<img src="https://github.com/user-attachments/assets/cc43d688-bec3-4f69-b6b3-419d2aa172ba" width="200" style="border-radius:15px;"/>

<br>
<br>

## 🛠 기술 스택
| 구분 | 기술 |
|------|------|
| **UI/UX** | Figma |
| **프론트엔드** | Cursor AI, React, TypeScript, Tailwind CSS |
| **백엔드** | Spring Boot, FastAPI (AI 모델 호출) |
| **데이터베이스** | MySQL, VectorDB |
| **AI/ML** | RAG 기반 LLM, OpenAI API, LangChain |

<br>

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
