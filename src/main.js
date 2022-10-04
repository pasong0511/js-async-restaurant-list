import Chef from "./chef.js";
import Food from "./food.js";
import Manager from "./manager.js";
import Order from "./order.js";
import View from "./view.js";

//국밥, 스테이크 버튼
const foodBtn1 = document.querySelector(".foodBtn1");
const foodBtn2 = document.querySelector(".foodBtn2");

//주문
const orderListUlEl = document.querySelector(".orderListUl");

//매니저
const magagerEl = document.querySelectorAll(".magager > .magagerState");

//요리사
const chefEl = document.querySelectorAll(".chef > .chefState");

//음식
const foodListUlEl = document.querySelector(".foodListUl");

const MANAGERS_INFO = ["메인매니저", "서브매니저"];
const CHEFS_INFO = {
  백종원: 1,
  장금이: 2,
};
const MENU = {
  스테이크: 10,
  국밥: 5,
};

/*
 * Restaurant 클래스
 * 레스토랑을 관리하는 클래스
 * 화면 렌더링 클래스 생성
 * 매니저 클래스 생성해서 매니저 무한 일시킴, 요리사 클래스 생성
 * 주문 들어오면 주문 생성
 * 주문 전체 데이터, 음식 전체 데이터 관리
 */
class Restaurant {
  constructor(orderListUlEl, magagerEl, chefEl, foodListUlEl) {
    this.view = new View(orderListUlEl, magagerEl, chefEl, foodListUlEl);

    this.orderQueue = {};
    this.foodQueue = {};
    this.orderNum = 0;
    this.managers = MANAGERS_INFO.map(
      (name) => new Manager(name, this, this.view)
    );
    this.chefs = Object.keys(CHEFS_INFO).map(
      (name) => new Chef(name, CHEFS_INFO[name], this)
    );

    this.startManagerLoop();
    this.startViewLoop();
  }

  //주문 생성시마다 증가하는 오더 순서 번호
  getOrderNum() {
    this.orderNum += 1;
    return this.orderNum;
  }

  //버튼으로 주문 생성시 Order 객체 생성
  //orderQueue에 order 객체 정보 저장
  //order 엘리먼트 생성
  addOrder(foodNmae) {
    const order = new Order(foodNmae, MENU[foodNmae], this.getOrderNum());

    this.orderQueue[this.orderNum] = order;
    this.view.createOrderView(order);
  }

  //매니저에게 일을 시킴
  startManagerLoop() {
    this.managers.forEach((manager) => manager.work());
  }

  //리렌더링을 위해서 뷰에 레스토랑 객체 데이터 전달
  startViewLoop() {
    this.view.work(this);
  }

  //요리사가 요리 완료하면 Restaurant에 완성 데이터 저장
  //food 객체 생성 -> foodQueue에 food 객체 저장
  complete(completeOrder) {
    const food = new Food(completeOrder, this);
    this.foodQueue[food.foodNum] = food;
    this.view.createFoodView(food);
  }
}

const restaurant = new Restaurant(
  orderListUlEl,
  magagerEl,
  chefEl,
  foodListUlEl
);

foodBtn1.addEventListener("click", () => {
  restaurant.addOrder("국밥");
});

foodBtn2.addEventListener("click", () => {
  restaurant.addOrder("스테이크");
});
