import { AnyAction } from 'redux'
import { stdChannel, runSaga, EffectMiddleware, Effect, Task } from 'redux-saga'

interface MockedEffect {
  effect: Effect
  error?: Error
  result?: any
}

interface SagaInput<S = {}> {
  actions?: AnyAction[]
  mocks?: MockedEffect[]
  state?: S
}

interface SagaOutput {
  effects: Effect[]
  actions?: AnyAction[]
  error?: Error
  result?: any
}

type Saga0 = () => any
type Saga1<T1> = (arg1: T1) => any
type Saga2<T1, T2> = (arg1: T1, arg2: T2) => any
type Saga3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => any

interface ExploreSaga<R = SagaOutput> {
  <S>(input: SagaInput<S>, saga: Saga0): R
  <S, T1>(input: SagaInput<S>, saga: Saga1<T1>, arg1: T1): R
  <S, T1, T2>(input: SagaInput<S>, saga: Saga2<T1, T2>, arg1: T1, arg2: T2): R
  <S, T1, T2, T3>(
    input: SagaInput<S>,
    saga: Saga3<T1, T2, T3>,
    arg1: T1,
    arg2: T2,
    arg3: T3,
  ): R
}

export const exploreSaga: ExploreSaga = <S>(
  { actions = [], mocks = [], state }: SagaInput<S>,
  saga: (...args: any[]) => IterableIterator<Effect>,
  ...args: any[]
) => {
  const collectedEffects: Effect[] = []
  const dispatchedActions: AnyAction[] = []

  const channel = stdChannel<AnyAction>()

  let iterator: IterableIterator<Effect>
  const getIterator = () => iterator

  const task = runSaga(
    {
      channel,
      getState: () => state,
      dispatch: action => dispatchedActions.push(action),
      effectMiddlewares: [
        mockEffectMiddleware(mocks, getIterator),
        collectEffectMiddleware(collectedEffects),
      ],
    },
    function*() {
      iterator = saga(...args)
      return yield* iterator
    },
  )

  actions.forEach(action => channel.put(action))

  if (task.isRunning()) {
    task.cancel()
  }

  return createSagaOutput(collectedEffects, dispatchedActions, task)
}

function mockEffectMiddleware(
  mockedEffects: MockedEffect[],
  getIterator: () => IterableIterator<Effect>,
): EffectMiddleware {
  return next => (effect: Effect) => {
    const mock = mockedEffects.find(
      m => JSON.stringify(m.effect) === JSON.stringify(effect),
    )

    if (mock === undefined) {
      return next(effect)
    }

    if (mock.result !== undefined) {
      return next(mock.result)
    }

    if (!(mock.error instanceof Error)) {
      mock.error = new Error(mock.error)
    }

    next(getIterator().throw!(mock.error).value)
  }
}

const ignoredEffects = ['SELECT', 'TAKE', 'FORK']

function collectEffectMiddleware(collectedEffects: Effect[]): EffectMiddleware {
  return next => effect => {
    if (
      effect instanceof Object &&
      !ignoredEffects.some(name => name in effect)
    ) {
      collectedEffects.push(effect)
    }

    return next(effect)
  }
}

function createSagaOutput(
  collectedEffects: Effect[],
  dispatchedActions: AnyAction[],
  task: Task,
) {
  const output: SagaOutput = {
    effects: collectedEffects,
  }

  const error = task.error()
  const result = task.result()

  if (dispatchedActions) {
    output.actions = dispatchedActions
  }

  if (error) {
    output.error = error
  }

  if (result && !task.isCancelled()) {
    output.result = result
  }

  return output
}
