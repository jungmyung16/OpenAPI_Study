const apiKey = import.meta.env.VITE_API_KEY;

const url_region = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${VITE_API_KEY}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
const url_detailRegion = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${VITE_API_KEY}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=1&_type=json`;

const checkRegionCodeButton = document.getElementById("checkRegionCode");
const detailRegionSelect = document.getElementById("detailRegionSelect");
const detailRegionIndexSelect = document.getElementById(
  "detailRegionIndexSelect"
);
const detaildetailRegionIndexSelect = document.getElementById(
  "detaildetailRegionIndexSelect"
);
const dataDisplay = document.getElementById("data");
const searchButton = document.getElementById("searchButton");

const url_region_tourInfo = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=study&_type=json&areaCode=1&sigunguCode=1&serviceKey=${VITE_API_KEY}`;

const url_location_tourInfo = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?numOfRows=100&MobileOS=ETC&MobileApp=study&mapX=127.919482&mapY=37.341868&radius=3000&serviceKey=${VITE_API_KEY}`;

checkRegionCodeButton.addEventListener("click", () => {
  fetch(url_region)
    .then((res) => res.json())
    .then((myJson) => {
      dataDisplay.innerText = JSON.stringify(myJson, null, 2);
    });
});

// Populate detailRegionSelect and detailRegionIndexSelect
const detailRegionCodes = [
  1, 2, 3, 4, 5, 6, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

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

detailRegionCodes.forEach((code) => {
  const option = document.createElement("option");
  option.value = code;
  option.text = `${detailRegionNames[code]} - ${code}`;
  detailRegionSelect.appendChild(option);
  // Add same options to detailRegionIndexSelect
  const indexOption = document.createElement("option");
  indexOption.value = code;
  indexOption.text = `${detailRegionNames[code]} - ${code}`;
  detailRegionIndexSelect.appendChild(indexOption);
});

// Function to populate sigungu select
function populateSigunguSelect(areaCode) {
  const detailUrl = url_detailRegion.replace(
    "areaCode=1",
    `areaCode=${areaCode}`
  );

  fetch(detailUrl)
    .then((res) => res.json())
    .then((myJson) => {
      // Clear previous options
      detaildetailRegionIndexSelect.innerHTML = "";

      const items = myJson.response.body.items.item;
      //If items is not an array, make it an array. This handles cases where there's only one item.
      const itemArray = Array.isArray(items) ? items : [items];

      if (itemArray[0] === undefined) {
        const option = document.createElement("option");
        option.value = "";
        option.text = `해당 지역에 시군구 정보가 없습니다.`;
        detaildetailRegionIndexSelect.appendChild(option);
      } else {
        itemArray.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.code;
          option.text = item.name;
          detaildetailRegionIndexSelect.appendChild(option);
        });
      }
    });
}

// Event listener for checkDetailRegionCode button
const checkDetailRegionCodeButton = document.getElementById(
  "checkDetailRegionCode"
);
checkDetailRegionCodeButton.addEventListener("click", () => {
  const selectedCode = detailRegionSelect.value;
  const detailUrl = url_detailRegion.replace(
    "areaCode=1",
    `areaCode=${selectedCode}`
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

// Fetch and display data for detailRegionIndexSelect change
detailRegionIndexSelect.addEventListener("change", () => {
  const selectedCode = detailRegionIndexSelect.value;
  populateSigunguSelect(selectedCode);
});

// Initial population of sigungu select (default to Seoul)
populateSigunguSelect(1);

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const areaCode = detailRegionIndexSelect.value;
  const sigunguCode = detaildetailRegionIndexSelect.value;

  const searchUrl = url_region_tourInfo
    .replace(/areaCode=\d+/, `areaCode=${areaCode}`)
    .replace(/sigunguCode=\d+/, `sigunguCode=${sigunguCode}`);

  fetch(searchUrl)
    .then((res) => res.json())
    .then((myJson) => {
      dataDisplay.innerText = JSON.stringify(myJson, null, 2);
    })
    .catch((error) => {
      dataDisplay.innerText = "Error fetching data: " + error;
    });
});

// Event listener for the location search button
const locationsearchButton = document.getElementById("locationsearchButton");
locationsearchButton.addEventListener("click", () => {
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;
  const radius = document.getElementById("radius").value;

  const searchUrl = url_location_tourInfo
    .replace(/mapX=[^&]*/, `mapX=${longitude}`)
    .replace(/mapY=[^&]*/, `mapY=${latitude}`)
    .replace(/radius=[^&]*/, `radius=${radius}`);

  fetch(searchUrl)
    .then((res) => res.text()) // Get response as text
    .then((data) => {
      // Try parsing as JSON
      try {
        const jsonData = JSON.parse(data);
        dataDisplay.innerText = JSON.stringify(jsonData, null, 2);
      } catch (e) {
        // If JSON parsing fails, assume it's XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        console.log(xmlDoc); // Log XML for inspection
        dataDisplay.innerText = data; // Display raw XML for now
      }
    })
    .catch((error) => {
      dataDisplay.innerText = "Error fetching data: " + error;
    });
});
