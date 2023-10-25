import generateUtilityClass from '@mui/material/generateUtilityClass'
import useMuiThemeProps from '@mui/material/styles/useThemeProps'

/**
 * from mui/utils
 * @param slots
 * @param getUtilityClass
 * @param classes
 * @returns {{}}
 */
function composeClasses(slots, getUtilityClass, classes) {
  const output = {}

  Object.keys(slots).forEach(
    // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    slot => {
      output[slot] = slots[slot]
        .reduce((acc, key) => {
          if (key) {
            acc.push(getUtilityClass(key))
            if (classes && classes[key]) {
              acc.push(classes[key])
            }
          }
          return acc
        }, [])
        .join(' ')
    }
  )

  return output
}

/**
 * connectThemeSystem
 * @param name: 组件名
 * @param slots： 需要合成 classes 的 slots
 * */
export default function connectThemeSystem(name, slots) {
  const useClasses = ownerState => {
    const classes = ownerState?.classes
    const final = typeof slots === 'function' ? slots(ownerState) : slots

    return composeClasses(
      final,
      slot => generateUtilityClass(name, slot),
      classes
    )
  }

  const useThemeProps = props => useMuiThemeProps({ props, name })

  return {
    name,
    useClasses,
    useThemeProps,
  }
}
