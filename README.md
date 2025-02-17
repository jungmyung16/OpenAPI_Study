- 배포시 API 오류로 인해 Pages 배포 중단

# TourAPI 지역 코드 조회 🌍

이 프로젝트는 **TourAPI**를 이용하여 지역 코드 조회 및 지역 기반 관광 정보를 불러오는 기능을 제공하는 웹 애플리케이션입니다. 이를 통해 사용자는 대한민국의 지역 코드 및 상세 지역 코드, 그리고 위치 기반의 관광 정보를 쉽게 조회할 수 있습니다. 😊

## 주요 기능 ✨

1. **지역 코드 조회** 🔍

   - 도별 지역 코드 확인
   - 세부 지역별 코드 확인

2. **지역 기반 관광 정보 조회** 🌆

   - 지역 코드 및 시군구 코드 선택 후 관광 정보 조회

3. **위치 기반 관광 정보 조회** 📍

   - 위도, 경도, 범위 값을 입력하여 해당 지역의 관광 정보 조회

4. **카카오 지도** 🗺️
   - 위도, 경도 값을 기반으로 위치 표시

## 사용 방법 💻

### 1. 지역 코드 조회

- "확인하기" 버튼을 눌러 대한민국의 도별 지역 코드를 확인할 수 있습니다.
- 세부 지역 코드를 확인하려면 드롭다운 메뉴에서 지역을 선택하고 "조회하기" 버튼을 클릭하세요.

### 2. 지역 기반 관광 정보 조회

- "지역코드"와 "시군구 코드"를 선택한 후 "지역기반 조회하기" 버튼을 클릭하여 해당 지역의 관광 정보를 확인할 수 있습니다.

### 3. 위치 기반 관광 정보 조회

- 위도, 경도, 범위 값을 입력한 후 "위치기반 조회하기" 버튼을 클릭하면 지정된 위치를 기준으로 관광 정보를 검색합니다.

## 프로젝트 구조 📁

- `index.html`
  - 사용자 인터페이스(UI) 구성
- `app.js`
  - TourAPI 호출 및 데이터 처리 로직
- `config.js`
  - API 키 설정 파일 (개인 API 키를 여기에 넣어주세요)

## 설치 방법 🛠️

1. 이 프로젝트를 클론합니다.

   ```bash
   git clone https://github.com/your-username/tourapi-region-code.git
   ```

2. `config.js` 파일에 본인의 **TourAPI API Key**를 입력합니다.

3. `index.html` 파일을 웹 브라우저에서 열어 실행합니다.

## API 사용 ⚙️

이 프로젝트는 **TourAPI**를 사용하여 지역 코드 및 관광 정보를 불러옵니다. API 호출에 필요한 `serviceKey`는 `config.js` 파일에 설정됩니다.

- **공공데이터 포털**: [https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101578](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101578)
- **TourAPI 공식 사이트**: [https://api.visitkorea.or.kr/#/](https://api.visitkorea.or.kr/#/)
