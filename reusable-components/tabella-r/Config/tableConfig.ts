import {myHeaders} from "./myHeaders"
import {myOrder} from "./myOrder";
import {myFilter} from "./myFilter";
import {myPagination} from "./myPagination";
import {myActionEnum} from "./myActionEnum";
import {myActions} from "./myActions";

export class tableConfig {
  header !: myHeaders[];
  order !: myOrder;
  filter !: myFilter;
  pagination !: myPagination;
  actions !: myActions[];
}
