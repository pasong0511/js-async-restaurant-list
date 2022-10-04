/*
 * Food 클래스
 * Restaurant에서 음식 클래스 생성
 * 생성 즉시 먹히는 시간 감소
 * 1이 되면 먹히는 시간 중지
 */
export default class Food {
  constructor(order, restaurant) {
    this.foodNum = order.orderNum;
    this.foodName = order.foodName;
    this.eatTime = order.eatTime;
    this.myRestaurant = restaurant;
    this.eatenStart(); //생성 즉시 손님이 먹기 시작함
  }

  //손님이 음식을 먹기 시작함
  eatenStart() {
    const interval = setInterval(() => {
      this.eatTime -= 1; //-1초 감소

      //음식이 다 먹혔으면 foodQueue에서 제거
      if (this.eatTime === 0) {
        delete this.myRestaurant.foodQueue[this.foodNum];
        clearInterval(interval);
      }
    }, 1000);
  }
}
