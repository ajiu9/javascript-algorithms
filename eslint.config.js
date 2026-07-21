import ajiu9 from '@ajiu9/eslint-config'

export default ajiu9(
  {
    typescript: true,
    jsx: false,
  },
  {
    rules: {
      'no-bitwise': 'off',
      'no-lonely-if': 'off',
      'class-methods-use-this': 'off',
      'arrow-body-style': 'off',
      'no-loop-func': 'off',
      'curly': 'off',
    },
  },
)
