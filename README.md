# js-pang-list

공부한 내용을 최대한 참고하여 다음을 구현하세요

<center>
  <img
    src="./restaurant.gif"
  />
</center>

## 요구사항

- 식당 운영을 시뮬레이션 해보는 과제입니다
- 식당에는 `주문`, `매니저`, `요리사`, `음식` 요소가 있으며 각각을 구현해야 합니다
- 각각의 요소는 각자 독립적으로 실행되며 이 요소들을 총괄하는 주체 또는 코드는 존재하지 않습니다. 요소 간의 유기적인 협동으로 식당이 운영됩니다
- 각 요소들을 하나의 자바스크립트 파일로 만들어 모듈로 구현합니다

### 음식

- 음식은 국밥과 스테이크 메뉴가 있습니다. (마음대로 구성해도 무방합니다)
- 음식을 주문할 수 있는 버튼이 제공됩니다
- 음식에는 각각 식사시간이 존재하며 국밥은 5초, 스테이크는 10초입니다
- 음식이 만들어지면 음식 이름과 남은 식사시간이 출력됩니다
- 시간이 지남에 따라 남은 식사시간이 실시간으로 표시됩니다
- 식사시간이 종료되면 해당 음식은 삭제됩니다. 예를 들어 국밥은 만들어 진 이후 5초 후에 삭제되어야 합니다

### 주문

- 음식을 주문하면 주문이 생성됩니다
- 주문에는 주문명, 주문한 음식 이름, 현재 상태가 존재합니다
- 주문명은 ‘주문32’ 와 같이 주문에 주문번호가 붙습니다. 주문번호는 1부터 순서대로 올라갑니다
- 주문의 상태는 다음의 두 가지입니다. 이는 하나의 예시이며 자유롭게 구성해도 무방합니다
  - 대기 - 주문이 들어온 최초 상태입니다
  - 요리중 - 해당 주문에 대해 요리 중인 상태입니다
- 주문이 들어오면 주문명과 주문한 음식 이름, 현재 상태를 출력합니다. 상태가 변경되면 화면에서도 바로 반영되어야 합니다
- 주문의 요리가 완료되어 음식이 나오면 주문은 삭제됩니다

### 요리사

- 요리사는 들어온 주문에 대해 실제 요리를 하여 음식을 만듭니다
- 요리사는 장금이와 백주부 두 명이 있습니다. (마음대로 구성해도 무방합니다)
- 요리사는 요리사 이름, 요리 속도, 현재 상태를 갖습니다
- 요리 속도는 음식을 만드는 데 걸리는 시간이며 초로 표시합니다. 편의상 한 명의 요리사는 모든 음시의 요리 속도가 동일하다고 가정합니다
- 장금이는 요리속도가 1초, 백주부는 2초입니다. 예를들어 백주부는 국밥과 스테이크를 만드는데 2초가 걸립니다
- 요리사의 상태는 다음의 세 가지입니다. 이는 하나의 예시이며 자유롭게 구성해도 무방합니다
  - 대기 - 요리를 하기 위해 대기하는 상태입니다
  - 요리준비 - 특정 주문에 대한 요리를 할 준비를 하는 상태입니다
  - 요리중 - 요리를 하고 있는 상태입니다
- 요리가 끝나면 음식을 생성하고 반환합니다
- 요리사 이름과 현재 상태 및 요리 중인 주문명을 출력합니다. 상태가 변경되면 화면에서도 바로 반영되어야 합니다

### 매니저

- 매니저는 주문을 받아 요리사에게 전달하는 역할을 합니다
- 매니저는 열혈매니저와 부매니저 두 명이 있습니다. (마음대로 구성해도 무방합니다)
- 매니저는 매니저 이름, 현재 상태를 갖습니다
- 매니저의 상태는 다음의 세 가지입니다. 이는 하나의 예시이며 자유롭게 구성해도 무방합니다
  - 대기 - 주문을 받기 위해 대기하는 상태입니다
  - 주문 확인중 - 주문이 들어오면 확인하는 상태입니다
  - 요리사 확인중 - 현재 요리가 가능한 요리사를 확인하는 상태입니다
- 매니저는 먼저 들어온 주문을 확인하며 가장 먼저 들어온 주문부터 처리합니다
- 주문을 요리사에게 전달하기 위해 현재 요리가 가능한 요리사를 확인합니다
- 요리사가 모두 요리 중이라면 요리가 끝날 때까지 기다립니다
- 요리가 끝나면 요리사에게 주문을 전달하고 요리를 해달라고 요청합니다
- 매니저 이름과 현재 상태를 출력합니다. 상태가 변경되면 화면에서도 바로 반영되어야 합니다

### 도움이 될 만한 사항

- 구현이 복잡하고 어려울 수 있는데 처음부터 간단한 것부터 차근히 구현해 보세요.
- 가능한 구현 예시 소스를 보지 말고 사이트만 보면서 어떻게 하면 동일하게 구현할 수 있을지 고민해 보세요
- 복잡한 비동기 프로그래밍이 필요합니다. async / await 구문을 쓰는 것을 많이 고려해 보세요
- 매니저를 구현하는 것이 가장 복잡합니다
- 매니저는 계속 동일한 작업을 반복해야 합니다. 주문을 확인하고 요리사에게 요청하는 작업을 중단없이 반복문으로 반복해야만 합니다
- 매니저가 반복문으로 동일 작업을 반복할 때 동기적으로 반복하면 브라우저가 멈춰 버립니다. 개별 작업들이 비동기적으로 실행되어야 하며 다른 코드들이 실행될 수 있도록 약간의 시간 간격을 두고 반복해야 합니다
- 매니저는 요리사를 확인한 이후에는 요리가 끝날 때까지 기다릴 필요가 없습니다. 나머지는 요리사에게 맡기고서 바로 다음 주문을 확인해야 합니다. 이를 구현하기 위해 비동기 프로그래밍이 필요합니다
