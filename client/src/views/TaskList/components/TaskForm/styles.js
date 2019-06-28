export default theme => ({
    root: {},
    field: {
      margin: theme.spacing.unit * 3
    },
    textField: {
      width: '420px',
      maxWidth: '100%',
      marginRight: theme.spacing.unit * 3
    },
    portletFooter: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    ReactTags__tags: {
      position: "relative"
    },
    ReactTags__tagInput: {
      width: '200px',
      borderRadius: '2px',
      display: 'inline-block'
    },
    ReactTags__tagInputField: {
      height: '31px',
      margin: '0',
      fontSize: '12px',
      width: '100%',
      border: '1px solid #eeeeee'
    },
    ReactTags__selected: {
      border: '1px solid #ddd',
      background: '#ffffff',
      fontSize: '12px',
      display: 'inline-block',
      padding: '8px',
      margin: '0 5px',
      borderRadius: '2px',
      color: '#000000',
      marginLeft: '5px',
      cursor: 'pointer'
    },
    ReactTags__suggestions: {
      position: 'absolute',
      listStyle: 'none',
      boxShadow: '.05rem .01rem .5rem rgba(0,0,0,.2)',
      background: 'white',
      width: '200px',
      fontSize: '12px'
    }
  });