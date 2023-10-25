export const GuiFoo = {
  variants: [
    {
      props: { size: 'medium' },
      style: {
        padding: '5px 16px',
        fontSize: 50,
      },
    },
    {
      props: { size: 'large' },
      style: {
        fontSize: 80,
      },
    },
  ],
  styleOverrides: {
    root: () => ({
      background: 'grey',
      fontSize: 30,
    }),
  },
}
