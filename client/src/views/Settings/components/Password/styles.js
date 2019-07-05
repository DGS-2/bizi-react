export default theme => ({
    root: {},
    form: {},
    textField: {
      width: '100%',
      marginBottom: theme.spacing.unit * 2
    },
    portletFooter: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    fieldError: {
      color: theme.palette.danger.main,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit
    },
    fieldSuccess: {
      color: theme.palette.success.main,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit
    }
  });