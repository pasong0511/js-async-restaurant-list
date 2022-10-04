/*
 * Chef 클래스
 * 쉐프 상태 변경
 * 매니저가 '대기' 요리사에게 요리 요청(requestOrder) '요리준비' 상태변경
 * 요리사는 '요리중'으로 상태변경
 * 음식 만드는 시간후에 요리 생성
 * 요리 생성 완료 후 Restaurant객체에게 전달
 * orderQueue에 있던 주문완료한 요리는 delete
 */
export default class Chef {
  constructor(name, makeTime, restaurant) {
    this.chefName = name;
    this.chefState = "대기";
    this.makeTime = makeTime * 1000;
    this.myRestaurant = restaurant;
    this.makeFood = "";
  }

  setChefState(state) {
    this.chefState = state;
  }

  //쉐프의 스펙에 따라서 요리 생성
  cooking(order) {
    this.chefState = "요리중";
    order.setOrderState("요리중");
    setTimeout(() => {
      this.chefState = "대기";
      order.setOrderState("완료");

      delete this.myRestaurant.orderQueue[order.orderNum]; //완성하면 orderQueue에서는 제거
      this.makeFood = "";
      this.myRestaurant.complete(order); //레스토링 클래스에 전달
    }, this.makeTime); //mekeTime 뒤에 요리 완료
  }

  //매니저가 요리사에게 주문 요청
  requestOrder(order) {
    if (this.chefState !== "대기") {
      //요리사 상태가 대기인 경우 에러
      throw new Error("next time!");
    }

    this.chefState = "요리준비";
    this.makeFood = `주문${order.orderNum}`;
    this.cooking(order); //주문 받아서 요리 시작
  }
}
