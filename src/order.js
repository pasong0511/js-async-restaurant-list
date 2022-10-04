/*
 * Order 클래스
 * Restaurant 클래스에서 Order 클래스 생성
 * Manager가 중복된 order를 선택하는 경우 에러 발생해서 재선택
 */
export default class Order {
  constructor(foodName, eatTime, orderNum) {
    this.foodName = foodName;
    this.eatTime = eatTime;
    this.orderNum = orderNum;
    this.orderState = "대기";
    this.selected = false; //매니저가 같은거 찾는지 확인용
  }

  setOrderState(state) {
    this.orderState = state;
  }

  //매니저가 중복된 order를 찾는 경우 throw
  setSelected() {
    if (this.selected) {
      throw new Error("already selected"); //동일한거 찾으면 에러 표출
    }
    this.selected = true;
  }
}
