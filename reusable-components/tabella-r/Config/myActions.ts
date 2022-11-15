import {myActionEnum} from "./myActionEnum";

export  class myActions {

  //in angular è comune usare proprietà public al contrario di java
  constructor(public action: myActionEnum,
              public showInRow: boolean) {
  }
}
