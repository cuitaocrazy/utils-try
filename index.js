const trySymbol = Symbol('try')

module.exprots = function Try(fn) {
  let res
  let err
  try {
    res = fn()
  } catch (e) {
    err = e
  }

  if(res && res[trySymbol] === 'try') {
    return res
  }

  const ret = fn => {
    if (err) {
      return Try(() => {
        throw err
      })
    } else {
      return Try(() => fn(res))
    }
  }

  ret.catch = function (fn) {
    if (err) {
      return Try(() => fn(err))
    } else {
      return Try(() => res)
    }
  }

  ret[trySymbol] = 'try'

  return ret
}
