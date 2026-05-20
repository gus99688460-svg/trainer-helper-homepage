# 트레이너 헬퍼 — 홍보 랜딩 페이지

PT 결제 전환율을 높이는 트레이너 전용 상담 분석 도구 **트레이너 헬퍼**의 홍보용 단일 페이지 랜딩입니다.
순수 HTML/CSS/JS로 작성되어 빌드 도구·번들러 없이 브라우저에서 바로 동작합니다.

## 로컬 미리보기

정적 파일이라 `index.html`을 더블클릭해도 열리지만, 폰트 CDN과 일부 기능을 정상 확인하려면
간단한 로컬 서버로 띄우는 것을 권장합니다.

```bash
cd /mnt/c/Users/user/projects/homepage
python3 -m http.server 8000
```

이후 브라우저에서 접속:

```
http://localhost:8000
```

## 운영 앱 URL (연결 완료)

모든 버튼/링크는 운영 앱에 연결되어 있습니다. 앱 URL은 **`main.js` 최상단 한 줄**에서만 관리합니다.

```js
// main.js 10행 부근
const APP_URL = "https://web-production-237fa.up.railway.app";
```

- `data-app-link`(시작하기/지금 시작하기/요금 카드 버튼) → `APP_URL + "/app"`
- `data-app-path="/login"`(로그인) → `APP_URL + "/login"`
- 푸터 약관/개인정보/환불 `data-app-path="/terms|/privacy|/refund"` → `APP_URL + 경로`
- `APP_URL`을 `"#"`로 두면 모든 링크가 `#`로 폴백됩니다(미정 시 안전 처리).

운영 도메인이 바뀌면 위 한 줄만 교체하면 전체가 일괄 갱신됩니다.

## 사업자 정보

`index.html` 푸터의 사업자 정보(상호/대표자/사업자등록번호/주소/통신판매업신고/문의)는
운영 실제 값으로 채워져 있습니다. 변경 시 실제 사업자 정보만 사용하세요(임의 생성 금지).
통신판매업신고는 "신고 준비중" 상태이며, 신고번호 발급 후 교체하면 됩니다.

## 파일 구조

```
homepage/
├─ index.html   # 시맨틱 단일 페이지 (Nav·Hero·문제·핵심기능7·부가기능·작동방식·요금·FAQ·최종CTA·Footer)
├─ style.css    # 디자인 토큰(:root) + 반응형 3구간 + 모션/접근성
├─ main.js      # APP_URL 주입, 햄버거 메뉴, 스크롤 리빌
└─ README.md    # (이 문서)
```

## 기술 메모

- **폰트**: Pretendard (CDN, v1.3.9). fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- **아이콘**: 외부 라이브러리 없이 인라인 SVG(핵심 기능 7종·부가·배지) + 일부 이모지(문제 카드).
- **외부 자원**: Pretendard 폰트 CDN만 허용. 트래커·분석 스크립트·외부 이미지 없음.
- **반응형**: 모바일 ≤768(1열·햄버거) / 태블릿 769–1024(2~3열) / 데스크탑 ≥1025(3열, 7번째 기능 카드 2칸 span). 360–1440px 무파손 목표.
- **접근성**: `<html lang="ko">`, 시맨틱 랜드마크, 포커스 링, 44px 터치 타겟, `prefers-reduced-motion` 존중, FAQ는 `<details>`로 JS 없이도 동작.
- **콘텐츠 정직성**: 측정 안 된 통계·가짜 후기·가짜 수치 없음. 모든 카피는 실제 기능 기반.
