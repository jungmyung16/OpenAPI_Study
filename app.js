// /config.js에서 API_KEY를 불러옵니다.
import config from "./config.js";
const { API_KEY } = config;

// 지역 코드 조회 URL (도별 코드 조회)
const url_region = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${API_KEY}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;

// 세부 지역 코드 조회 URL (서울을 기준으로 조회)
const url_detailRegion = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${API_KEY}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=1&_type=json`;

// DOM 요소들 변수로 저장 (버튼, 셀렉트 박스 등)
const checkRegionCodeButton = document.getElementById("checkRegionCode");
const checkDetailRegionCodeButton = document.getElementById(
  "checkDetailRegionCode"
);
const detailRegionSelect = document.getElementById("detailRegionSelect");
const detailRegionIndexSelect = document.getElementById(
  "detailRegionIndexSelect"
);
const detaildetailRegionIndexSelect = document.getElementById(
  "detaildetailRegionIndexSelect"
);
const dataDisplay = document.getElementById("data");
const searchButton = document.getElementById("searchButton");

// 지역 코드 조회 버튼 이벤트 리스너 추가
checkRegionCodeButton.addEventListener("click", () => {
  fetch(url_region)
    .then((res) => res.json())
    .then((myJson) => {
      dataDisplay.innerText = JSON.stringify(myJson, null, 2);
    })
    .catch((error) => {
      dataDisplay.innerText = "Error fetching data: " + error;
    });
});

// 지역 기반 관광 정보 조회 URL (기본적으로 서울, 시군구 코드 1)
const url_region_tourInfo = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=study&_type=json&areaCode=1&sigunguCode=1&serviceKey=${API_KEY}`;

// 위치 기반 관광 정보 조회 URL (기본적으로 지정된 좌표와 반경으로 조회)
const url_location_tourInfo = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?numOfRows=100&MobileOS=ETC&MobileApp=study&mapX=127.919482&mapY=37.341868&radius=3000&serviceKey=${API_KEY}`;

// 세부 지역 셀렉트 박스 및 시군구 셀렉트 박스 초기화
const detailRegionCodes = [
  1, 2, 3, 4, 5, 6, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

// 지역 이름과 코드 매핑
const detailRegionNames = {
  1: "서울",
  2: "인천",
  3: "대전",
  4: "대구",
  5: "광주",
  6: "부산",
  7: "울산",
  8: "세종",
  31: "경기",
  32: "강원",
  33: "충북",
  34: "충남",
  35: "경북",
  36: "경남",
  37: "전북",
  38: "전남",
  39: "제주",
};

// 세부 지역 셀렉트 박스와 시군구 셀렉트 박스에 옵션 추가
detailRegionCodes.forEach((code) => {
  const option = document.createElement("option");
  option.value = code;
  option.text = `${detailRegionNames[code]} - ${code}`;
  detailRegionSelect.appendChild(option);

  const indexOption = document.createElement("option");
  indexOption.value = code;
  indexOption.text = `${detailRegionNames[code]} - ${code}`;
  detailRegionIndexSelect.appendChild(indexOption);
});

// 시군구 데이터를 채우는 함수
function populateSigunguSelect(areaCode) {
  const detailUrl = url_detailRegion.replace(
    "areaCode=1",
    `areaCode=${areaCode}`
  );
  fetch(detailUrl)
    .then((res) => res.json())
    .then((myJson) => {
      // 시군구 셀렉트 박스 초기화
      detaildetailRegionIndexSelect.innerHTML = "";

      const items = myJson.response.body.items.item;
      const itemArray = Array.isArray(items) ? items : [items];

      // 시군구가 없을 경우 처리
      if (itemArray[0] === undefined) {
        const option = document.createElement("option");
        option.value = "";
        option.text = `해당 지역에 시군구 정보가 없습니다.`;
        detaildetailRegionIndexSelect.appendChild(option);
      } else {
        // 시군구 데이터를 셀렉트 박스에 추가
        itemArray.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.code;
          option.text = item.name;
          detaildetailRegionIndexSelect.appendChild(option);
        });
      }
    });
}

// 세부 지역 선택 시 시군구 데이터 채우기
detailRegionIndexSelect.addEventListener("change", () => {
  const selectedCode = detailRegionIndexSelect.value;
  populateSigunguSelect(selectedCode);
});

// 서울을 기본값으로 시군구 데이터 초기화
populateSigunguSelect(1);

// 세부 지역별 코드 확인하기 버튼 클릭 시 이벤트
checkDetailRegionCodeButton.addEventListener("click", () => {
  const selectedAreaCode = detailRegionSelect.value;
  const detailUrl = url_detailRegion.replace(
    "areaCode=1",
    `areaCode=${selectedAreaCode}`
  );
  fetch(detailUrl)
    .then((res) => res.json())
    .then((myJson) => {
      dataDisplay.innerText = JSON.stringify(myJson, null, 2);
    })
    .catch((error) => {
      dataDisplay.innerText = "Error fetching data: " + error;
    });
});

// 지역 기반 관광 정보 조회 버튼 클릭 시 이벤트
searchButton.addEventListener("click", () => {
  const areaCode = detailRegionIndexSelect.value;
  const sigunguCode = detaildetailRegionIndexSelect.value;

  // 지역 및 시군구 코드에 맞는 URL 설정
  const searchUrl = url_region_tourInfo
    .replace(/areaCode=\d+/, `areaCode=${areaCode}`)
    .replace(/sigunguCode=\d+/, `sigunguCode=${sigunguCode}`);

  // 데이터 조회 후 출력
  fetch(searchUrl)
    .then((res) => res.json())
    .then((myJson) => {
      dataDisplay.innerText = JSON.stringify(myJson, null, 2);
    })
    .catch((error) => {
      dataDisplay.innerText = "Error fetching data: " + error;
    });
});

// 위치 기반 관광 정보 조회 버튼 클릭 시 이벤트
locationsearchButton.addEventListener("click", () => {
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;
  const radius = document.getElementById("radius").value;

  // 위치 및 범위에 맞는 URL 설정
  const searchUrl = url_location_tourInfo
    .replace(/mapX=[^&]*/, `mapX=${longitude}`)
    .replace(/mapY=[^&]*/, `mapY=${latitude}`)
    .replace(/radius=[^&]*/, `radius=${radius}`);

  // 데이터 조회 후 출력
  fetch(searchUrl)
    .then((res) => res.text()) // 응답을 텍스트로 처리
    .then((data) => {
      try {
        // JSON 형식으로 파싱
        const jsonData = JSON.parse(data);
        dataDisplay.innerText = JSON.stringify(jsonData, null, 2);
      } catch (e) {
        // JSON 파싱 실패 시 XML로 처리
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        console.log(xmlDoc); // XML 로깅
        dataDisplay.innerText = data; // 원시 XML 출력
      }
    })
    .catch((error) => {
      dataDisplay.innerText = "Error fetching data: " + error;
    });
});
