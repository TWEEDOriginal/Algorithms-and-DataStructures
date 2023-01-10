class Employee {
  constructor(name) {
    this.name = name;
    this.available = true;
  }
  isAvailable() {
    return this.available == true;
  }
  canHandleCall(callLevel, expectedLevel) {
    if (callLevel > expectedLevel) return false;
    return true;
  }
}

class Director extends Employee {
  constructor(name) {
    super(name);
  }
  pickCall(call) {
    console.log("director handling", call);
    return this;
  }
}

class Manager extends Employee {
  constructor(name, director) {
    super(name);
    this.director = director;
  }
  pickCall(call) {
    if (!this.isAvailable()) {
      return this.dispatchCall(call);
    }

    this.available = false;

    if (!this.canHandleCall(call.level, 1)) {
      this.available = true;
      return this.dispatchCall(call);
    }
    console.log("manager handling", call);
    return this;
  }

  dispatchCall(call) {
    return this.director.pickCall(call);
  }
}

class Respondent extends Employee {
  constructor(name, manager) {
    super(name);
    this.manager = manager;
  }
  pickCall(call) {
    if (!this.isAvailable())
      throw new Error("why did a busy respondent pick a call?");

    this.available = false;

    if (!this.canHandleCall(call.level, 0)) {
      this.available = true;
      return this.dispatchCall(call);
    }
    console.log("respondent handling", call);
    return this;
  }
  //assign to a manager free or not
  dispatchCall(call) {
    return this.manager.pickCall(call);
  }
}

class Call {
  constructor(level) {
    this.level = level; //0,1,2
  }
}

class CallCenter {
  constructor() {
    //init employees
    this.respondents = [];
    const director = new Director("tweed");
    for (let i = 0; i < 5; i++) {
      const manager = new Manager(`manager${i}`, director);
      for (let j = 0; j < 5; j++) {
        const respondent = new Respondent(`respondent${j}-m${i}`, manager);
        this.respondents.push(respondent);
      }
    }
  }

  dispatchCall(call) {
    //assign new calls (must first be applied to a free respondent)
    if (this.respondents.length == 0) return "Call center busy";
    //make whoever picks call unavailable
    const respondent = this.respondents.pop();
    const handler = respondent.pickCall(call);
    console.log(handler);
    //return to respondents array
    if (!(handler instanceof Respondent)) this.respondents.push(respondent);
    return handler;
  }
}

const callCenter = new CallCenter();
let newCall = new Call(0);
let handler = callCenter.dispatchCall(newCall);
console.log(`${handler.constructor.name} ${handler.name} is handling the call`);
newCall = new Call(1);
handler = callCenter.dispatchCall(newCall);
console.log(`${handler.constructor.name} ${handler.name} is handling the call`);
newCall = new Call(1);
handler = callCenter.dispatchCall(newCall);
console.log(`${handler.constructor.name} ${handler.name} is handling the call`);
newCall = new Call(2);
handler = callCenter.dispatchCall(newCall);
console.log(`${handler.constructor.name} ${handler.name} is handling the call`);
console.log("callCenter respondents", callCenter.respondents.length);
