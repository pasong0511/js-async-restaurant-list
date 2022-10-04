//엘리먼트 생성, 클래스 이름 부여
const createEl = (elKind, className = "") => {
  const el = document.createElement(elKind);
  el.className = className;

  return el;
};

/*
 * View 클래스
 * 주문 목록 리렌더링, 매니저 리렌더링, 요리사 상태 리렌더링, 음식 목록 리렌더링
 */
export default class View {
  constructor(orderListUlEl, magagerEl, chefEl, foodListUlEl) {
    this.targetOrderUl = orderListUlEl;
    this.targetFoodUl = foodListUlEl;
    this.targetMagagerEl = magagerEl;
    this.targetChefEl = chefEl;

    this.orderViewList = {}; //렌더링에 필요한 order 엘리먼트 저장용 딕셔너리
    this.foodViewList = {}; //렌더링에 필요한 foood 엘리먼트 저장용 딕셔너리
  }

  //view 정보 리랜더링을 위해 1초마다 반복
  work(restaurant) {
    setInterval(() => {
      this.reRenderOrderUI(restaurant); //주문 목록 리렌더링
      this.reRenderManagerUI(restaurant); //매니저 리렌더링
      this.reRenderChefUI(restaurant); //요리사 상태 리렌더링
      this.reRenderFoodUl(restaurant); //음식 목록 리렌더링
    }, 1000);
  }

  //restaurant의 orderQueue와 view의 orderViewList와 데이터 동기화 시켜서 화면 렌더링
  //orderQueue에 없는 데이터는 orderViewList에서 빼주고 생성
  reRenderOrderUI(restaurant) {
    this.orderViewList = Object.keys(this.orderViewList).reduce((acc, key) => {
      const data = restaurant.orderQueue[key]; //딕셔너리 키 값 이용
      if (!data) {
        return acc;
      }
      const ui = this.orderViewList[key]; //딕셔너리 키로 구분
      const state = ui.querySelector(".itemState");
      state.innerText = data.orderState;
      return { ...acc, [data.orderNum]: ui };
    }, {});
    this.renderOrderUl();
  }

  //orderViewList에 있는 값을 화면에 렌더링
  renderOrderUl() {
    this.targetOrderUl.innerText = "";
    Object.values(this.orderViewList).forEach((liItem) => {
      this.targetOrderUl.appendChild(liItem);
    });
  }

  //주문에 들어갈 엘리먼트 생성
  createOrderView(order) {
    const listItem = createEl("li", "listItem");
    const itemNumber = createEl("span", "orderNumber");
    const itemName = createEl("span", "foodName");
    const itemState = createEl("span", "itemState");

    itemNumber.innerText = `주문${order.orderNum}`;
    itemName.innerText = order.foodName;
    itemState.innerText = order.orderState;

    listItem.appendChild(itemNumber);
    listItem.appendChild(itemName);
    listItem.appendChild(itemState);

    this.orderViewList[order.orderNum] = listItem;
    this.renderOrderUl();
  }

  //restaurant의 foodQueue와 view의 foodViewList와 데이터 동기화 시켜서 화면 렌더링
  //foodQueue에 없는 데이터는 foodViewList에서 빼주고 생성
  reRenderFoodUl(restaurant) {
    this.foodViewList = Object.keys(this.foodViewList).reduce((acc, key) => {
      const data = restaurant.foodQueue[key];
      if (!data) {
        return acc;
      }
      const ui = this.foodViewList[key];
      const state = ui.querySelector(".itemState");
      state.innerText = data.eatTime; //먹는 시간 갱신
      return { ...acc, [data.foodNum]: ui };
    }, {});
    this.renderFoodUl();
  }

  //foodViewList에 있는 값을 화면에 렌더링
  renderFoodUl() {
    this.targetFoodUl.innerText = "";
    Object.values(this.foodViewList).forEach((liItem) => {
      this.targetFoodUl.appendChild(liItem);
    });
  }

  //음식에 들어갈 엘리먼트 생성
  createFoodView(food) {
    const listItem = createEl("li", "listItem");
    const itemName = createEl("span", "foodName");
    const itemTime = createEl("span", "itemState");

    itemName.innerText = food.foodName;
    itemTime.innerText = food.eatTime;

    listItem.appendChild(itemName);
    listItem.appendChild(itemTime);

    this.foodViewList[food.foodNum] = listItem;
    this.renderFoodUl();
  }

  //매니저 상태 렌더링
  reRenderManagerUI(restaurant) {
    this.targetMagagerEl[0].innerText = restaurant.managers[0].managerState;
    this.targetMagagerEl[1].innerText = restaurant.managers[1].managerState;
  }

  //요리사 상태 렌더링
  reRenderChefUI(restaurant) {
    this.targetChefEl[0].innerText = `${restaurant.chefs[0].chefState} ${restaurant.chefs[0].makeFood}`;
    this.targetChefEl[1].innerText = `${restaurant.chefs[1].chefState} ${restaurant.chefs[1].makeFood}`;
  }
}
