let config = {
  get(obj, key) {
    const res = Reflect.get(obj, key);
    // const res = obj[key];
    //track
    track(obj, key);
    return typeof res == "obj" ? reactive(res) : res;
  },
  set(obj, key, val) {
    Reflect.set(obj, key, val);
    // obj[key] = val;
    trigger(obj, key, val);
  },
};
function reactive(obj) {
  return new Proxy(obj, config);
}
let weakmap = new WeakMap();
let effectStack = [];
function track(obj, key) {
  let effect = effectStack[effectStack.length - 1];
  if (effect) {
    let depsMap = weakmap.get(obj);
    if (!depsMap) {
      depsMap = new Map();
      weakmap.set(obj, depsMap);
    }
    deps = depsMap.get(key);
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    if (!deps.has(effect)) {
      deps.add(effect);
      effect.deps.push(effect);
    }
  }
}

/*
weakmap {
    map{
        dep:[]
    }
}
*/
function trigger(obj, key, val) {
  let depsMap = weakmap.get(obj);
  let computeds = new Set();
  let effects = new Set();
  if (key) {
    let deps = depsMap.get(key);
    deps.forEach((item) => {
      if (item.computed) {
        computeds.add(item);
      } else {
        effects.add(item);
      }
    });
  }
  computeds.forEach((fn) => fn());
  effects.forEach((fn) => fn());
}
function effect(fn, op = {}) {
  let ef = createEffect(fn, op);
  if (!ef.lazy) {
    ef();
  }
  return ef;
}
function createEffect(fn, op) {
  const effect = function (...args) {
    return run(effect, fn);
  };
  effect.lazy = op.lazy;
  effect.deps = [];
  effect.computed = op.computed;
  return effect;
}

function run(effect, fn) {
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect);
      return fn();
    } finally {
      effectStack.pop();
    }
  }
}
