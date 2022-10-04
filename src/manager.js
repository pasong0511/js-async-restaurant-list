//시간 지연
function tick(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
 * 매니저 클래스
 * 1. 주문 선택
 * -> orderQueue에서 orderState "대기" 상태 찾기
 * -> 다른 매니저가 선택하지 않은 selected 'false' 주문 선택
 * -> '대기' 상태 요리사에게 '대기' 상태 주문 요청
 * 2. 주문 요리사 선택
 * -> 요리사 '대가' 상태 찾기
 */
export default class Manager {
  constructor(name, restaurant, view) {
    this.managerName = name;
    this.managerState = "대기";
    this.myRestaurant = restaurant;
    this.myView = view;
  }

  async work() {
    while (true) {
      try {
        await this.checkOrder();
      } catch {}
      await tick(1000);
    }
  }

  setManagerState(state) {
    this.managerState = state;
  }

  //전체 주문큐를 받아서 대기중인 음식을 찾아서 요리중으로 변경해주고 반환해줘라
  async checkOrder() {
    this.setManagerState("주문 확인중"); //매니저 상태 변경 대기 -> 주문확인중

    const waitOrder = Object.values(this.myRestaurant.orderQueue).find(
      ({ selected, orderState }) => orderState === "대기" && !selected
    );

    //대기중 주문이 없는 경우 : 매니저 상태 : 대기
    if (!waitOrder) {
      return this.setManagerState("대기");
    }

    //매니저가 중복된거 찾지 않기위해서 실행, 찾더라도 취소시킴
    //중복된것 찾으면 work()의 try() catch()로 가서 해당 반복 종료 -> 다시 while 재반복
    waitOrder.setSelected();

    //요리사 상태 확인해서 대기중인 주문 전달
    while (true) {
      try {
        await this.checkChecf(waitOrder);
        break;
      } catch {}
      await tick(1000); //무한루프 방지
    }
  }

  //요리사 상태 체크
  checkChecf(waitOrder) {
    return new Promise((resolve, reject) => {
      this.setManagerState("요리사 확인중");

      // 대기중인 요리사 찾음
      const waitChef = this.myRestaurant.chefs.find(
        ({ chefState }) => chefState === "대기"
      );

      //대기중인 요리사가 없는 경우 reject
      if (!waitChef) {
        return reject("next time!");
      }

      //대기중인 요리사에게 '대기' order 전달
      waitChef.requestOrder(waitOrder);
      return resolve();
    });
  }
}
