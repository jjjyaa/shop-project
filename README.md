# Shop-Project - 개인 쇼핑몰 프로젝트
## 0. 프로젝트 개요

이 프로젝트는 **개인 학습과 실무 시뮬레이션**을 위해 제작된 쇼핑몰 웹 애플리케이션 입니다.
기획부터 구현까지 모든 과정을 1인 개발로 수행하였으며 실제 전자상거래 서비스에서 사용되는 전형적인 기능들을 포함합니다.

프론트엔드는 **Next.js 기반의 React 프레임워크**로 구현하였으며, 백엔드는 **Spring Boot 기반의 REST API 서버**로 구성되어 있습니다.  
현대적인 웹 개발 환경과 트렌드를 반영하여 Tailwind CSS, styled-components 등 최신 도구들을 적극 활용하였습니다.

### 주요 특징
- **Next.js의 파일 기반 라우팅과 서버 사이드 렌더링을 활용하여 빠르고 SEO 친화적인 화면 구성**
- **Spring Boot 기반 RESTful API** 상품조회, 주문, 회원 관련 데이터를 처리하는 API 서버 구성 
- **스타일링 프레임워크 사용** styled-components의 컴포넌트 기반 스타일을 조합
- **도메인 분리 구조** `/front`와 `/back/minishop`으로 프론트/백엔드 완전 분리 → 유지보수와 배포에 유리

## 1. 개발 환경
| 구분 | 내용 |
|------|------|
| 운영체제 | Windows 11 / MacOS 개발환경 모두 가능 |
| 백엔드 | Java 17, Spring Boot 3.4.4, Gradle |
| 프론트엔드 | React 19, Next.js 15.3.1, styled-components, Tailwind CSS |
| 패키지 관리 | Gradle (백엔드), npm (프론트엔드) |
| 빌드 도구 | Gradle Wrapper, Next.js 빌드 명령어 |
| 실행 방식 | 로컬에서 `npm run dev`, `gradlew bootRun`으로 실행 |

## 2. 기술 스택
- **Frontend**: React, TypeScript, Next.js, Styled-Components, Context API, Axios
- **Backend**: Spring Boot, JPA
- **Database**: MySQL 8.0
- **Build Tool**: Gradle

## 3. 주요 기능
- **회원가입** : 이메일 및 비밀번호를 통한 사용자 등록
- **상품 목록/상세** : 상품 목록조회, 상품 상세페이지 보기
- **장바구니 담기/삭제** : 상품 장바구니, 상품 삭제 기능

## 4. 주요 화면
### 🏠 홈페이지  
![홈페이지](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/homepage.png)

### 🛒 장바구니  
![장바구니](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/cart.png)

### 🔐 로그인  
![로그인](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/login.png)

### 👤 마이페이지  
![마이페이지](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/mypage.png)

### 📝 회원정보 수정  
![회원정보수정](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/mypageedit.png)

### 📄 상품 목록  
![상품 목록](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/productlist.png)

### 📄 상품 상세  
![상품 상세](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/productdetil.png)

### 🧍 회원가입  
![회원가입](https://raw.githubusercontent.com/jjjyaa/shop-project/master/img/signup.png)
<<<<<<< HEAD

=======
>>>>>>> 0ad08864b1fe9168cc9a94290bab3be36f89eec2
