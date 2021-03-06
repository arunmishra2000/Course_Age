const fetchData = async (id) => {
  const response = await fetch(
    `https://www.udemy.com/api-2.0/courses/${id}/?fields[course]=created`
  )
    .then((res) => res.json())
    .then((jsonres) => jsonres);
  return response;
};

const getAge = async () => {
  const id = document.body.getAttribute("data-clp-course-id");
  const data = await fetchData(id);
  const date = data.created.slice(0, 10);

  const dataContainer = document.querySelector(".clp-lead__element-meta");
  const dateElement = document.createElement("div");
  const iconSpan = `<span style="font-size: 18px; line-height: 0px">&#10711;</span>`;
  dateElement.style.cssText = `
        text-align: center;
        box-sizing: border-box;
        border: solid 1px #fff; 
        color: #fff; 
        padding: 4px 8px; 
        margin-right: 8px; 
        font-size: 14px;
        width: 125px;
        `;
  dateElement.classList.add("clp-lead__element-item");
  dateElement.innerHTML = iconSpan + " " + date;
  dataContainer.prepend(dateElement);

  const actualDate = new Date();
  const yearDiff = actualDate.getFullYear() - parseInt(date.slice(0, 4));
  const monthDiff = actualDate.getMonth() + 1 - parseInt(date.slice(5, 7));
  const dayDiff = parseInt(date.slice(8, 10)) - (actualDate.getDay() + 1);
  const isEqualYear = actualDate.getFullYear() === parseInt(date.slice(0, 4));
  const isEqualMonth = actualDate.getMonth() + 1 === parseInt(date.slice(5, 7));

  dateElement.addEventListener("mouseover", () => {
    dateElement.innerHTML = `${iconSpan} ${yearDiff} Years old`;

    if (isEqualYear) {
      dateElement.innerHTML = `${iconSpan} ${monthDiff} Month${
        monthDiff > 1 ? "s" : ""
      } old`;
      if (isEqualMonth) {
        dateElement.innerHTML = `${iconSpan} ${dayDiff} Day${
          dayDiff > 1 ? "s" : ""
        } old`;
      }
    }
  });

  dateElement.addEventListener("mouseout", () => {
    dateElement.innerHTML = `<span style="font-size: 18px; line-height: 0px">&#10711;</span> ${date}`;
  });
};

getAge();
